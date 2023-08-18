// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";

import Home from "./pages/Home";
import DiceRoller from "./pages/DiceRoller";
import Login from "./pages/Login";
import CharacterList from "./pages/character/CharacterList";
import StoryCreation from "./pages/StoryCreation";
import Tutorial from "./pages/Tutorial";
import FriendsAdd from "./pages/FriendsAdd";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
              <Link to="/CharacterList">Characters</Link>
            </li>
            <li>
              <Link to="/StoryCreation">StoryCreation</Link>
            </li>
            <li>
              <Link to="/Tutorial">Tutorial</Link>
            </li>
            <li>
              <Link to="/Amigos">Amigos</Link>
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
          <Route path="/CharacterList" component={CharacterList} />
          <Route path="/Login" component={Login} />
          <Route path="/StoryCreation" component={StoryCreation} />
          <Route path="/Tutorial" component={Tutorial} />
          <Route
            path="/Amigos"
            render={(props) => (
              <FriendsAdd {...props} currentUserId={user ? user.uid : null} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
