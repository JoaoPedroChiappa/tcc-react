import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import { auth, db } from "../../firebaseConfig";
import "../../css/Characters.css";

const CharacterCreation = () => {
  const history = useHistory();
  const [characterName, setCharacterName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [characterRace, setCharacterRace] = useState("");
  const [error, setError] = useState("");

  const [strength, setStrength] = useState(10);
  const [dexterity, setDexterity] = useState(10);
  const [constitution, setConstitution] = useState(10);
  const [intelligence, setIntelligence] = useState(10);
  const [wisdom, setWisdom] = useState(10);
  const [charism, setCharism] = useState(10);

  const calculateModifier = (value) => {
    return Math.floor((value - 10) / 2);
  };

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

          attributes: {
            strength: {
              value: strength,
              modifier: calculateModifier(strength),
            },
            dexterity: {
              value: dexterity,
              modifier: calculateModifier(dexterity),
            },
            constitution: {
              value: constitution,
              modifier: calculateModifier(constitution),
            },
            intelligence: {
              value: intelligence,
              modifier: calculateModifier(intelligence),
            },
            wisdom: { value: wisdom, modifier: calculateModifier(wisdom) },
            charism: { value: charism, modifier: calculateModifier(charism) },
          },
        };

        // Adicione o personagem ao banco de dados
        const charactersCollection = collection(db, "characters"); // Use a instância do Firestore (db)
        await addDoc(charactersCollection, newCharacter);

        // Limpe os campos após a criação bem-sucedida
        setCharacterName("");
        setCharacterClass("");
        setCharacterRace("");

        // Redirecione para a página de visualização de personagens
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
          <label htmlFor="characterRace">Raça do Personagem</label>
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
        {/*Atributos*/}

        <div className="input-group">
          <label htmlFor="strength">Força</label>
          <input
            type="number"
            id="strength"
            value={strength}
            onChange={(e) => setStrength(Number(e.target.value))}
            min="0"
          />
          <p>Modificador: {calculateModifier(strength)}</p>
        </div>

        <div className="input-group">
          <label htmlFor="dexterity">Destreza</label>
          <input
            type="number"
            id="dexterity"
            value={dexterity}
            onChange={(e) => setDexterity(Number(e.target.value))}
            min="0"
          />
          <p>Modificador: {calculateModifier(dexterity)}</p>
        </div>

        <div className="input-group">
          <label htmlFor="constitution">Constituição</label>
          <input
            type="number"
            id="constitution"
            value={constitution}
            onChange={(e) => setConstitution(Number(e.target.value))}
            min="0"
          />
          <p>Modificador: {calculateModifier(constitution)}</p>
        </div>

        <div className="input-group">
          <label htmlFor="intelligence">Inteligência</label>
          <input
            type="number"
            id="intelligence"
            value={intelligence}
            onChange={(e) => setIntelligence(Number(e.target.value))}
            min="0"
          />
          <p>Modificador: {calculateModifier(intelligence)}</p>
        </div>

        <div className="input-group">
          <label htmlFor="wisdom">Sabedoria</label>
          <input
            type="number"
            id="wisdom"
            value={wisdom}
            onChange={(e) => setWisdom(Number(e.target.value))}
            min="0"
          />
          <p>Modificador: {calculateModifier(wisdom)}</p>
        </div>

        <div className="input-group">
          <label htmlFor="charism">Carisma</label>
          <input
            type="number"
            id="charism"
            value={charism}
            onChange={(e) => setCharism(Number(e.target.value))}
            min="0"
          />
          <p>Modificador: {calculateModifier(charism)}</p>
        </div>

        {/*Atributos*/}
        <button type="submit" className="create-button">
          Criar Personagem
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CharacterCreation;
