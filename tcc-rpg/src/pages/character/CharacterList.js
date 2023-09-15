import React from "react";
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
import { useQuery, useQueryClient, useMutation } from "react-query";

import CharacterCreation from "./CharacterCreation";
import CharacterEdit from "./CharacterEdit";
import CharacterDetail from "./CharacterDetail";

const fetchCharacters = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const charactersQuery = query(
    collection(db, "characters"),
    where("userId", "==", user.uid)
  );
  const snapshot = await getDocs(charactersQuery);
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

const CharacterList = () => {
  const queryClient = useQueryClient();
  const { data: characters, isLoading } = useQuery(
    "characters",
    fetchCharacters,
    {
      staleTime: 600000, 
    });



  const deleteCharacterMutation = useMutation(
    (characterId) => deleteDoc(doc(db, "characters", characterId)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("characters");
      },
    }
  );

  const handleDeleteCharacter = async (characterId) => {
    try {
      await deleteCharacterMutation.mutateAsync(characterId);
    } catch (error) {
      console.error("Error deleting character: ", error);
    }
  };

  if (isLoading) return <div>Carregando...</div>;


  return (
    <Router>
      <div className="character-list-container">
        <h2>Lista de Personagens</h2>
        <Link to="/CharacterCreation">
          <button className="create-button">Criar Novo Personagem</button>
        </Link>
        <table className="character-table">
          <thead className="table-web">
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
                <td className="table-mobile" data-label="Nome:">
                  {character.name}
                </td>
                <td className="table-mobile" data-label="Classe:">
                  {character.class}
                </td>
                <td className="table-mobile" data-label="Raça:">
                  {character.race}
                </td>
                <td>
                  <Link to={`/CharacterDetail/${character.id}`} className="detail-button">
                    Ver
                  </Link>
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
          path="/CharacterDetail/:characterId"
          component={CharacterDetail}
        />
        <Route
          path="/CharacterCreation"
          render={(props) => <CharacterCreation />}
        />
        <Route
          path="/CharacterEdit/:characterId"
          render={(props) => <CharacterEdit />}
        />
      </Switch>
    </Router>
  );
};

export default CharacterList;
