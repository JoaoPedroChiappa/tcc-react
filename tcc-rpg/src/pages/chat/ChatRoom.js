import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { db, auth } from "../../firebaseConfig";
import "../../css/Chat.css";

function ChatRoom({ currentUserId, initialRoomId }) {
  const [roomId, setRoomId] = useState(
    initialRoomId || localStorage.getItem("roomId") || ""
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [userColors, setUserColors] = useState({});
  const [roomName, setRoomName] = useState("");

  const history = useHistory();

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateInviteLink = () => {
    return window.location.origin + "/tcc-react/join/" + roomId;
  };

  const createRoom = async () => {
    try {
      const roomRef = await addDoc(collection(db, "chatRooms"), {
        createdAt: new Date(),
        members: [currentUserId],
        name: roomName,
      });
      setRoomId(roomRef.id);
      localStorage.setItem("roomId", roomRef.id);
      generateInviteLink();
    } catch (error) {
      console.error("Erro ao criar sala:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const messagesRef = collection(db, "chatRooms", roomId, "messages");
      const username = currentUserData?.username || "Usuário anônimo";

      await addDoc(messagesRef, {
        content: message,
        userId: currentUserId,
        username: username,
        timestamp: new Date(),
      });
      setMessage("");
    } catch (error) {
      console.error("Erro ao enviar mensagem: ", error);
    }
  };

  const handleLeaveRoom = async () => {
    try {
      const roomRef = doc(db, "chatRooms", roomId);
      // 1. Remover o usuário da lista de membros
      await updateDoc(roomRef, {
        members: arrayRemove(currentUserId),
      });

      // 2. Verificar se a sala ainda tem membros
      const roomSnapshot = await getDoc(roomRef);
      const roomData = roomSnapshot.data();
      if (roomData.members.length === 0) {
        // 3. Se não tiver membros, deletar a sala
        await deleteDoc(roomRef);
      }
    } catch (error) {
      console.error("Erro ao sair da sala:", error);
    }

    setRoomId("");
    setRoomName("");
    localStorage.removeItem("roomId");
    history.push("/");
  };

  useEffect(() => {
    if (!roomId && localStorage.getItem("roomId")) {
      setRoomId(localStorage.getItem("roomId"));
    }

    const savedUserColors = localStorage.getItem("userColors");
    if (savedUserColors) {
      setUserColors(JSON.parse(savedUserColors));
    }

    const userLogin = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDataSnapshot = await getDoc(userRef);
        if (userDataSnapshot.exists) {
          setCurrentUserData(userDataSnapshot.data());
        }
      } else {
        setCurrentUserData(null);
      }
    });

    if (roomId && currentUserId) {
      const messagesRef = collection(db, "chatRooms", roomId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "desc"));

      const roomRef = doc(db, "chatRooms", roomId);

      updateDoc(roomRef, {
        members: arrayUnion(currentUserId),
      });

      const fetchRoomData = async () => {
        const roomSnapshot = await getDoc(roomRef);
        const roomData = roomSnapshot.data();
        setRoomName(roomData.name);
      };
      fetchRoomData();

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

      return () => [unsubscribe(), userLogin()];
    }
  }, [roomId, currentUserId]);

  return (
    <div className="chat-box">
      {!roomId && (
        <>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Nome da Sala"
          />
          <button onClick={createRoom}>Criar Sala</button>
        </>
      )}
      {roomId && (
        <div>
          <h2>Sala de Chat: {roomName}</h2>

          <button
            onClick={() => navigator.clipboard.writeText(generateInviteLink())}
          >
            Copiar Link de Convite
          </button>

          <div className="chat-messages">
            {messages.map((msg) => {
              let userColor = userColors[msg.username];
              if (!userColor) {
                userColor = getRandomColor();
                const newUserColors = {
                  ...userColors,
                  [msg.username]: userColor,
                };
                setUserColors(newUserColors);
                localStorage.setItem(
                  "userColors",
                  JSON.stringify(newUserColors)
                );
              }
              return (
                <div key={msg.id} className="message">
                  <strong style={{ color: userColor }}>{msg.username}: </strong>
                  <span className="message-content">{msg.content}</span>
                </div>
              );
            })}
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem"
          />
          <button onClick={handleSendMessage}>Enviar</button>
          {/* Botão para sair da sala */}
          <button onClick={handleLeaveRoom}>Sair da Sala</button>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
