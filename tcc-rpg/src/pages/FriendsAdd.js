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
import { db } from "../firebaseConfig";
import "../css/FriendsAdd.css";

function FriendsAdd({ currentUserId }) {
  const [friends, setFriends] = useState([]); // Para armazenar a lista de amigos
  const [friendUsername, setFriendUsername] = useState(""); // Alterado de friendEmail para friendUsername

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
        const friendSnapshot = querySnapshot.docs[0]; // Pega o primeiro documento que corresponde (deve ser único)

        if (friendSnapshot && friendSnapshot.id) {
          const friendUserId = friendSnapshot.id;

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

          alert("Amigo adicionado com sucesso!");
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
  };

  return (
    <div className="friends-add-container">
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
              <button
                className="remove-button"
                onClick={() => handleRemoveFriend(friend.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FriendsAdd;
