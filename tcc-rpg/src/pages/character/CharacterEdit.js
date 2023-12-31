import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useQueryClient } from "react-query";

const CharacterEdit = ({ updateCharacterList }) => {
  const history = useHistory();
  const { characterId } = useParams();
  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [characterRace, setCharacterRace] = useState("");
  const queryClient = useQueryClient();


  useEffect(() => {
    // Consulta o personagem pelo ID
    const characterRef = doc(db, "characters", characterId);

    getDoc(characterRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          const characterData = docSnapshot.data();
          setName(characterData.name);
          setCharacterClass(characterData.class);
          setCharacterRace(characterData.race);
        }
      })
      .catch((error) => {
        console.error("Error fetching character details: ", error);
      });
  }, [characterId]);

  const handleCharacterUpdate = async (e) => {
    e.preventDefault();
    // Atualiza os detalhes do personagem no banco de dados
    const characterRef = doc(db, "characters", characterId);

    try {
      await updateDoc(characterRef, {
        name: name,
        class: characterClass,
        race: characterRace,
      });
  
      queryClient.invalidateQueries("characters");
      history.push("/CharacterList");
    } catch (error) {
      console.error("Error updating character details: ", error);
    }
  };

  return (
    <div className="character-edit-container">
      <h2>Editar Personagem</h2>
      <form className="character-form" onSubmit={handleCharacterUpdate}>
        <div className="input-group">
          <label htmlFor="name">Nome do personagem:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome do Personagem"
          />
        </div>
        <div className="input-group">
          <label htmlFor="characterClass">Classe do Personagem:</label>
          <select
            id="characterClass"
            value={characterClass}
            onChange={(e) => setCharacterClass(e.target.value)}
          >
            <option value="">Selecione uma classe</option>
            {[
              "Bárbaro",
              "Bardo",
              "Bruxo",
              "Clérigo",
              "Druida",
              "Feiticeiro",
              "Guerreiro",
              "Ladino",
              "Mago",
              "Monge",
              "Paladino",
              "Ranger",
            ].map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <label htmlFor="characterRace">Raça do Personagem:</label>
          <select
            id="characterRace"
            value={characterRace}
            onChange={(e) => setCharacterRace(e.target.value)}
          >
            <option value="">Selecione uma raça</option>
            {[
              "Anão",
              "Dragonborn",
              "Elfo",
              "Gnomo",
              "Halfling",
              "Humano",
              "Meio-elfo",
              "Meio-orcm",
              "Tiefling",
            ].map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="save-button">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
};

export default CharacterEdit;
