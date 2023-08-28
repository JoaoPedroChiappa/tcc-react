import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CharacterCreation from "./CharacterCreation";
import CharacterEdit from "./CharacterEdit";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);

  const updateCharacterList = async () => {
    const user = auth.currentUser;
    if (user) {
      const charactersQuery = query(
        collection(db, "characters"),
        where("userId", "==", user.uid)
      );

      try {
        const querySnapshot = await getDocs(charactersQuery);
        const characterList = [];
        querySnapshot.forEach((doc) => {
          characterList.push({ id: doc.id, ...doc.data() });
        });
        setCharacters(characterList);
      } catch (error) {
        console.error("Error fetching characters: ", error);
      }
    }
  };

  const handleDeleteCharacter = async (characterId) => {
    try {
      await deleteDoc(doc(db, "characters", characterId));
      updateCharacterList();
    } catch (error) {
      console.error("Error deleting character: ", error);
    }
  };

  useEffect(() => {
    // Verifica se o usuário está autenticado
    const user = auth.currentUser;
    if (user) {
      // Consulta os personagens associados ao usuário logado
      const charactersQuery = query(
        collection(db, "characters"),
        where("userId", "==", user.uid)
      );

      getDocs(charactersQuery)
        .then((querySnapshot) => {
          const characterList = [];
          querySnapshot.forEach((doc) => {
            characterList.push({ id: doc.id, ...doc.data() });
          });
          setCharacters(characterList);
        })
        .catch((error) => {
          console.error("Error fetching characters: ", error);
        });
    }
  });

  return (
    <Router>
      <div className="character-list-container">
        <h2>Lista de Personagens</h2>
        <Link to="/CharacterCreation">
          <button className="create-button">Criar Novo Personagem</button>
        </Link>
        <table className="character-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Classe</th>
              <th>Raça</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {characters.map((character) => (
              <tr key={character.id}>
                <td>{character.name}</td>
                <td>{character.class}</td>
                <td>{character.race}</td>
                <td>
                  <Link
                    to={`/CharacterEdit/${character.id}`}
                    className="edit-button"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteCharacter(character.id)}
                    className="delete-button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Switch>
        <Route
          path="/CharacterCreation"
          render={(props) => (
            <CharacterCreation
              {...props}
              updateCharacterList={updateCharacterList}
            />
          )}
        />
        <Route
          path="/CharacterEdit/:characterId"
          render={(props) => (
            <CharacterEdit
              {...props}
              updateCharacterList={updateCharacterList}
            />
          )}
        />
      </Switch>
    </Router>
  );
};

export default CharacterList;
