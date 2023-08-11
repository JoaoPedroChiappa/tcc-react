import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; // Importar funções de banco de dados
import { app, db } from "../../firebaseConfig";

const CharacterCreation = () => {
  const [characterName, setCharacterName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [characterRace, setCharacterRace] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth(app);

  const handleCharacterCreation = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = auth.currentUser;
      if (user) {
        // Crie um objeto com os detalhes do personagem
        const newCharacter = {
          name: characterName,
          class: characterClass,
          race: characterRace,
          userId: user.uid, // Vincule o personagem ao usuário logado
        };

        // Adicione o personagem ao banco de dados
        const charactersCollection = collection(db, "characters"); // Use a instância do Firestore (db)
        await addDoc(charactersCollection, newCharacter);

        // Limpe os campos após a criação bem-sucedida
        setCharacterName("");
        setCharacterClass("");
        setCharacterRace("");
      } else {
        setError("Usuário não está logado.");
      }
    } catch (error) {
      setError("Erro ao criar o personagem: " + error.message);
    }
  };

  return (
    <div>
      <h2>Criação de Personagem</h2>
      <form onSubmit={handleCharacterCreation}>
        <input
          type="text"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          placeholder="Nome do Personagem"
        />
        <input
          type="text"
          value={characterClass}
          onChange={(e) => setCharacterClass(e.target.value)}
          placeholder="Classe do Personagem"
        />
        <input
          type="text"
          value={characterRace}
          onChange={(e) => setCharacterRace(e.target.value)}
          placeholder="Raça do Personagem"
        />
        <button type="submit">Criar Personagem</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CharacterCreation;
