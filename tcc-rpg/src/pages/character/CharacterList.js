import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { app, db } from "../../firebaseConfig";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CharacterCreation from "./CharacterCreation";
import CharacterEdit from "./CharacterEdit";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const auth = getAuth(app);

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
  }, [auth]);

  return (
    <Router>
    <div>
      <h2>Lista de Personagens</h2>
      <Link to="/CharacterCreation">
        <button>Criar Novo Personagem</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Classe</th>
            <th>Raça</th>
            </tr>
            </thead>
            <tbody>
            {characters.map((character) => (
              <tr key={character.id}>
              <td>{character.name}</td>
              <td>{character.class}</td>
              <td>{character.race}</td>
              <td>
                <Link to={`/CharacterEdit/${character.id}`}>Editar</Link>
              </td>
              </tr>
               ))}
            </tbody>
            </table>
    </div>

    <Switch>
      <Route path="/CharacterCreation" render={(props) => (
    <CharacterCreation {...props} updateCharacterList={updateCharacterList} />
  )} />
      <Route path="/CharacterEdit/:characterId" render={(props) => (
    <CharacterEdit {...props} updateCharacterList={updateCharacterList} />
  )} />
    </Switch>

    </Router>
  );
};

export default CharacterList;



