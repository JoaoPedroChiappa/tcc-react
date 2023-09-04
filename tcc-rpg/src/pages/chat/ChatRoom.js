import React, { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";

function ChatRoom({ currentUserId, initialRoomId }) {
  const [roomId, setRoomId] = useState(initialRoomId || "");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);

  const generateInviteLink = () => {
    return window.location.origin + "/tcc-react/join/" + roomId;
  };

  const createRoom = async () => {
    try {
      const roomRef = await addDoc(collection(db, "chatRooms"), {
        createdAt: new Date(),
        members: [currentUserId],
      });
      setRoomId(roomRef.id);
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
      setMessage(""); // Limpar o campo de mensagem após o envio
    } catch (error) {
      console.error("Erro ao enviar mensagem: ", error);
    }
  };

  useEffect(() => {
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

    if (roomId) {
      const messagesRef = collection(db, "chatRooms", roomId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "desc"));

      // Ouvir as alterações nas mensagens em tempo real
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

      return () => [unsubscribe(), userLogin()];
    }
  }, [roomId]);

  return (
    <div>
      <button onClick={createRoom}>Criar Sala</button>

      {roomId && (
        <div>
          <h2>Sala de Chat: {roomId}</h2>

          <button
            onClick={() => navigator.clipboard.writeText(generateInviteLink())}
          >
            Copiar Link de Convite
          </button>

          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id}>
                <strong>{msg.username}: </strong> {msg.content}
              </div>
            ))}
          </div>

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Digite sua mensagem"
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
