import React from "react";
import { useParams, useHistory  } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useQuery } from "react-query";
import "../../css/Characters.css";

const fetchCharacterDetail = async (characterId) => {
  const characterRef = doc(db, "characters", characterId);
  const docSnapshot = await getDoc(characterRef);
  if (!docSnapshot.exists) {
    throw new Error("Character not found");
  }
  return docSnapshot.data();
};

const CharacterDetail = () => {
  const { characterId } = useParams();
  const history = useHistory();
  const {
    data: character,
    isLoading,
    isError,
  } = useQuery(["character", characterId], () =>
    fetchCharacterDetail(characterId)
  );

  if (isLoading) {
    return <div>Carregando detalhes do personagem...</div>;
  }

  if (isError) {
    return (
      <div>
        Erro ao carregar detalhes do personagem. Por favor, tente novamente.
      </div>
    );
  }

  return (
    <div className="character-detail-container">
      <button onClick={history.goBack}>Voltar</button>
      <h2>Detalhes do Personagem</h2>
      <p>
        <strong>Nome:</strong> {character.name}
      </p>
      <p>
        <strong>Classe:</strong> {character.class}
      </p>
      <p>
        <strong>Raça:</strong> {character.race}
      </p>

      {/*Atributos*/}

      <div className="attributes-row">
        <div className="attribute-box">
          <div className="attribute-name">Força</div>
          <div className="attribute-value">
            {character.attributes.strength.value}
          </div>
          <div className="attribute-modifier">
            {character.attributes.strength.modifier}
          </div>
        </div>

        <div className="attribute-box">
          <div className="attribute-name">Destreza</div>
          <div className="attribute-value">
            {character.attributes.dexterity.value}
          </div>
          <div className="attribute-modifier">
            {character.attributes.dexterity.modifier}
          </div>
        </div>

        <div className="attribute-box">
          <div className="attribute-name">Constituição</div>
          <div className="attribute-value">
            {character.attributes.constitution.value}
          </div>
          <div className="attribute-modifier">
            {character.attributes.constitution.modifier}
          </div>
        </div>
      </div>

      <div className="attributes-row">
        <div className="attribute-box">
          <div className="attribute-name">Inteligência</div>
          <div className="attribute-value">
            {character.attributes.intelligence.value}
          </div>
          <div className="attribute-modifier">
            {character.attributes.intelligence.modifier}
          </div>
        </div>

        <div className="attribute-box">
          <div className="attribute-name">Sabedoria</div>
          <div className="attribute-value">
            {character.attributes.wisdom.value}
          </div>
          <div className="attribute-modifier">
            {character.attributes.wisdom.modifier}
          </div>
        </div>

        <div className="attribute-box">
          <div className="attribute-name">Carisma</div>
          <div className="attribute-value">
            {character.attributes.charism.value}
          </div>
          <div className="attribute-modifier">
            {character.attributes.charism.modifier}
          </div>
        </div>
      </div>

      {/*Atributos*/}
    </div>
  );
};

export default CharacterDetail;
