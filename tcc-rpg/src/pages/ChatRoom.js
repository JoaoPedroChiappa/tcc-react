import React, { useState, useEffect } from "react";
import {  addDoc, collection,  query,  orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";

function ChatRoom({ currentUserId }) {
  const [roomId, setRoomId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const createRoom = async () => {
    try {
      const roomRef = await addDoc(collection(db, "chatRooms"), { createdAt: new Date() });
      setRoomId(roomRef.id);
    } catch (error) {
      console.error("Erro ao criar sala:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const messagesRef = collection(db, "chatRooms", roomId, "messages");
      await addDoc(messagesRef, {
        content: message,
        userId: currentUserId,
        timestamp: new Date(),
      });
      setMessage("");  // Limpar o campo de mensagem após o envio
    } catch (error) {
      console.error("Erro ao enviar mensagem: ", error);
    }
  };

  useEffect(() => {
    if (roomId) {
      const messagesRef = collection(db, "chatRooms", roomId, "messages");
      const q = query(messagesRef, orderBy("timestamp", "desc"));

      // Ouvir as alterações nas mensagens em tempo real
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(fetchedMessages);
      });

      return () => unsubscribe();
    }
  }, [roomId]);

  return (
    <div>
      <button onClick={createRoom}>Criar Sala</button>

      {roomId && (
        <div>
          <h2>Sala de Chat: {roomId}</h2>

          <div className="chat-messages">
            {messages.map(msg => (
              <div key={msg.id}>
                {msg.content}
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
