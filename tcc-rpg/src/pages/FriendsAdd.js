import React, { useState, useEffect } from "react";
import {
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  collection,
  getDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import "../css/FriendsAdd.css";

function NotLoggedInFriendsCard() {
  return (
    <div className="not-logged-in-card">
      Bem-vindo à página de amigos! Para adicionar ou ver seus amigos, faça <Link to="/Login">login</Link> ou <Link to="/Login">cadastre-se</Link>.
    </div>
  );
}

function FriendsAdd({ currentUserId }) {
  const [friends, setFriends] = useState([]); // Para armazenar a lista de amigos
  const [friendUsername, setFriendUsername] = useState(""); // Alterado de friendEmail para friendUsername
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendToRemove, setFriendToRemove] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [addedFriendName, setAddedFriendName] = useState('');


  useEffect(() => {
    const fetchFriends = async () => {
      if (currentUserId) {
        try {
          const userDocRef = doc(db, "users", currentUserId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData && userData.friends) {
              const friendDataPromises = userData.friends.map(
                async (friendId) => {
                  const friendDoc = await getDoc(doc(db, "users", friendId));
                  return {
                    id: friendId,
                    username: friendDoc.data().username,
                  };
                }
              );

              const friendData = await Promise.all(friendDataPromises);
              setFriends(friendData);
            }
          }
        } catch (error) {
          console.error("Erro ao buscar amigos: ", error);
        }
      }
    };

    fetchFriends();
  }, [currentUserId]);

  const openRemoveModal = (friendId) => {
    setFriendToRemove(friendId);
    setIsModalOpen(true);
  };

  const closeRemoveModal = () => {
    setIsModalOpen(false);
    setFriendToRemove(null);
  };  

  const openSuccessModal = (friendName) => {
    setAddedFriendName(friendName);
    setIsSuccessModalOpen(true);
  };
  
  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setAddedFriendName('');
  };  

  const handleAddFriend = async () => {
    if (!currentUserId) {
      alert("Por favor, faça login primeiro.");
      return;
    }
    try {
      // Primeiro, tente encontrar o amigo pelo username
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", friendUsername)); // Procurando por username agora
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const friendSnapshot = querySnapshot.docs[0];

        if (friendSnapshot && friendSnapshot.id) {
            const friendUserId = friendSnapshot.id;
            const friendData = friendSnapshot.data();  // Obtendo os dados do amigo

            // Atualiza a lista de amigos do usuário atual
            const currentUserRef = doc(db, "users", currentUserId);
            await updateDoc(currentUserRef, {
                friends: arrayUnion(friendUserId),
            });

            // Opcionalmente, adicione o usuário atual como amigo do amigo
            const friendUserRef = doc(db, "users", friendUserId);
            await updateDoc(friendUserRef, {
                friends: arrayUnion(currentUserId),
            });

            openSuccessModal(friendData.username);

            setFriends(prevFriends => [
              ...prevFriends,
              {
                  id: friendUserId,
                  username: friendData.username
              }
          ]);
        } else {
          alert("Erro ao obter o ID do usuário amigo!");
        }
      } else {
        alert("Usuário não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao adicionar amigo: ", error);
      alert(
        "Ocorreu um erro ao adicionar o amigo. Por favor, tente novamente."
      );
    }
  };

  const handleRemoveFriend = async (friendId) => {
    if (friendToRemove) {
    try {
      // Remove o amigo da lista de amigos do usuário atual
      const userRef = doc(db, "users", currentUserId);
      await updateDoc(userRef, {
        friends: arrayRemove(friendId),
      });

      // Opcionalmente, remova o usuário atual da lista de amigos do amigo
      const friendUserRef = doc(db, "users", friendId);
      await updateDoc(friendUserRef, {
        friends: arrayRemove(currentUserId),
      });

      // Atualiza a lista de amigos no estado local
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.id !== friendId)
      );
    } catch (error) {
      console.error("Erro ao remover amigo: ", error);
      alert("Ocorreu um erro ao remover o amigo. Por favor, tente novamente.");
    }
    closeRemoveModal();
    setFriendToRemove(null);
  }
};

const renderRemoveModal = () => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmação</h2>
        <p>Tem certeza de que deseja remover este amigo?</p>
        <div className="modal-buttons">
        <button onClick={() => handleRemoveFriend(friendToRemove)}>Sim, Remover</button>
        <button className="remove-button" onClick={closeRemoveModal}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const renderSuccessModal = () => {
  return (
    <div className="modal success-modal">
      <div className="modal-content">
        <h2>Sucesso!</h2>
        <p>{addedFriendName} adicionado com sucesso!</p>
        <button onClick={closeSuccessModal}>Ok</button>
      </div>
    </div>
  );
};


return currentUserId ? (
  <div className="friends-add-container">
    {isModalOpen && renderRemoveModal()}
    {isSuccessModalOpen && renderSuccessModal()}
    <h1 className="title-color">Adicionar Amigos</h1>
    <p className="subtitle-color">Adicione seus amigos pelo username e mantenha-se conectado!</p>
    <input
      className="input-field"
      type="text"
      value={friendUsername}
      onChange={(e) => setFriendUsername(e.target.value)}
      placeholder="Username do amigo"
    />
    <button className="add-button" onClick={handleAddFriend}>
      Adicionar Amigo
    </button>
    <div className="friends-list">
      <h3>Meus Amigos</h3>
      <ul>
        {friends.map((friend, index) => (
          <li key={index} className="friend-item">
            {friend.username}{" "}
            <button className="remove-button" onClick={() => openRemoveModal(friend.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
) : (
  <NotLoggedInFriendsCard />
);

  
}

export default FriendsAdd;
