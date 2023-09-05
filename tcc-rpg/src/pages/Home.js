import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

import "../css/Home.css";

import Login from "./Login";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        const userRef = doc(db, "users", user.uid);
        const userDataSnapshot = await getDoc(userRef);
        if (userDataSnapshot.exists) {
          setCurrentUserData(userDataSnapshot.data());
        }
      } else {
        setCurrentUserData(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router basename="/tcc-react">
      <div className="home-container">
        <div className="header">Bem-vindo ao Gerenciador de RPG</div>
        <div className="description">
          O lugar para se conectar com amigos, compartilhar momentos e criar
          memórias.
        </div>

        <div className="features-section">
          <h2>Recursos</h2>
          <ul className="features-list">
            <li className="feature-item">Criar Personagens</li>
            <li className="feature-item">Compartilhar Histórias Épicas</li>
            <li className="feature-item">Conectar com Amigos</li>
            <li className="feature-item">Criar e Participar de Grupos</li>
          </ul>
        </div>

        {!isLoggedIn ? (
          <div className="get-started-section">
            <h2>Comece Hoje Mesmo!</h2>
            <div className="get-started-links">
              <p>
                Não tem uma conta? <a href="tcc-react/login">Cadastrar</a>
              </p>
              <p>
                Já é um membro? <a href="tcc-react/login">Entrar</a>
              </p>
            </div>
          </div>
        ) : (
          <div className="get-started-section">
            <h2>Bem-vindo de volta, {currentUserData?.username}!</h2>
            <p>
              Estamos felizes por tê-lo aqui novamente. Vá em frente e
              conecte-se com seus amigos!
            </p>
          </div>
        )}
      </div>

      <Switch>
        <Route path="tcc-react/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default Home;
