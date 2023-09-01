import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import "../src/css/App.css";

import Home from "./pages/Home";
import DiceRoller from "./pages/DiceRoller";
import Login from "./pages/Login";
import CharacterList from "./pages/character/CharacterList";
import StoryCreation from "./pages/StoryCreation";
import Tutorial from "./pages/Tutorial";
import FriendsAdd from "./pages/FriendsAdd";
import ChatRoom from "./pages/ChatRoom";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <nav className="app-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/tcc-react/tcc-rpg/src/pages/Home">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/tcc-rpg/src/pages/DiceRoller">
                DiceRoller
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/tcc-rpg/src/pages/character/CharacterList">
                Characters
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/tcc-rpg/src/pages/StoryCreation">
                StoryCreation
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/tcc-rpg/src/pages/Tutorial">Tutorial</Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/tcc-rpg/src/pages/ChatRoom">Chat</Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/tcc-rpg/src/pages/Amigos">Amigos</Link>
            </li>
            {user ? (
              <li className="nav-item">
                <Link to="/tcc-react/tcc-rpg/src/pages/Login">Logout</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/tcc-react/tcc-rpg/src/pages/Login">Login</Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="content-wrapper">
          <Switch>
            <Route
              path="/tcc-react/tcc-rpg/src/pages/Home"
              exact
              component={Home}
            />
            <Route
              path="/tcc-react/tcc-rpg/src/pages/DiceRoller"
              component={DiceRoller}
            />
            <Route
              path="/tcc-react/tcc-rpg/src/pages/character/CharacterList"
              component={CharacterList}
            />
            <Route
              path="/tcc-react/tcc-rpg/src/pages/Login"
              component={Login}
            />
            <Route
              path="/tcc-react/tcc-rpg/src/pages/StoryCreation"
              component={StoryCreation}
            />
            <Route
              path="/tcc-react/tcc-rpg/src/pages/Tutorial"
              component={Tutorial}
            />
            <Route
              path="/tcc-react/tcc-rpg/src/pages/ChatRoom"
              render={(props) => (
                <ChatRoom {...props} currentUserId={user ? user.uid : null} />
              )}
            />
            <Route
              path="/tcc-react/tcc-rpg/src/pages/Amigos"
              render={(props) => (
                <FriendsAdd {...props} currentUserId={user ? user.uid : null} />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
