import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const CharacterEdit = ({ updateCharacterList }) => {
  const history = useHistory();
  const { characterId } = useParams();
  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [characterRace, setCharacterRace] = useState("");

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
        // Adicione aqui os outros campos que deseja atualizar
      });

      // Redireciona para a página de visualização após a atualização
      await updateCharacterList();
      history.push("/CharacterList");
    } catch (error) {
      console.error("Error updating character details: ", error);
    }
  };

  return (
    <div>
      <h2>Editar Personagem</h2>
      <form onSubmit={handleCharacterUpdate}>
        Nome do personagem:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do Personagem"
        />
        Classe do Personagem:
        <input
          type="text"
          value={characterClass}
          onChange={(e) => setCharacterClass(e.target.value)}
          placeholder="Classe do Personagem"
        />
        Raça do Personagem:
        <input
          type="text"
          value={characterRace}
          onChange={(e) => setCharacterRace(e.target.value)}
          placeholder="Raça do Personagem"
        />
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default CharacterEdit;
