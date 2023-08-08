// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseConfig";

import Home from "./pages/Home";
import DiceRoller from "./pages/DiceRoller";
import Login from "./pages/Login";
import CharacterCreation from "./pages/CharacterCreation";
import StoryCreation from "./pages/StoryCreation";
import Tutorial from "./pages/Tutorial";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    // Verificar o estado de autenticação do usuário ao montar o componente
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Limpar o listener ao desmontar o componente
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/DiceRoller">DiceRoller</Link>
            </li>
            <li>
              <Link to="/CharacterCreation">CharacterCreation</Link>
            </li>
            <li>
              <Link to="/StoryCreation">StoryCreation</Link>
            </li>
            <li>
              <Link to="/Tutorial">Tutorial</Link>
            </li>
            {user ? (
              <li>
                <Link to="/Login">Logout</Link>
              </li>
            ) : (
              <li>
                <Link to="/Login">Login</Link>
              </li>
            )}
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/DiceRoller" component={DiceRoller} />
          <Route path="/CharacterCreation" component={CharacterCreation} />
          <Route path="/Login" component={Login} />
          <Route path="/StoryCreation" component={StoryCreation} />
          <Route path="/Tutorial" component={Tutorial} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
