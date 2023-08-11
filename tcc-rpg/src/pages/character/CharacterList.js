import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { app, db } from "../../firebaseConfig";

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const auth = getAuth(app);

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
    <div>
      <h2>Lista de Personagens</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            Nome: {character.name}, Classe: {character.class}, Raça:{" "}
            {character.race}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharacterList;
