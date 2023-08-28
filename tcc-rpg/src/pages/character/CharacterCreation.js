import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import "../../css/Characters.css";

const CharacterCreation = ({ updateCharacterList }) => {
  const history = useHistory();
  const [characterName, setCharacterName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [characterRace, setCharacterRace] = useState("");
  const [error, setError] = useState("");

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

        // Redirecione para a página de visualização de personagens
        await updateCharacterList();
        history.push("/CharacterList");
      } else {
        setError("Usuário não está logado.");
      }
    } catch (error) {
      setError("Erro ao criar o personagem: " + error.message);
    }
  };

  return (
    <div className="character-creation-container">
      <h2>Criação de Personagem</h2>
      <form className="character-form" onSubmit={handleCharacterCreation}>
        <div className="input-group">
          <label htmlFor="characterName">Nome do Personagem</label>
          <input
            type="text"
            id="characterName"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Nome do Personagem"
          />
        </div>
        <div className="input-group">
          <label htmlFor="characterClass">Classe do Personagem</label>
          <input
            type="text"
            id="characterClass"
            value={characterClass}
            onChange={(e) => setCharacterClass(e.target.value)}
            placeholder="Classe do Personagem"
          />
        </div>
        <div className="input-group">
          <label htmlFor="characterRace">Raça do Personagem</label>
          <input
            type="text"
            id="characterRace"
            value={characterRace}
            onChange={(e) => setCharacterRace(e.target.value)}
            placeholder="Raça do Personagem"
          />
        </div>
        <button type="submit" className="create-button">
          Criar Personagem
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CharacterCreation;
