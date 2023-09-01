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
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/DiceRoller">DiceRoller</Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/CharacterList">Characters</Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/StoryCreation">StoryCreation</Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/Tutorial">Tutorial</Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/ChatRoom">Chat</Link>
            </li>
            <li className="nav-item">
              <Link to="/tcc-react/Amigos">Amigos</Link>
            </li>
            {user ? (
              <li className="nav-item">
                <Link to="/tcc-react/Login">Logout</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/tcc-react/Login">Login</Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="content-wrapper">
          <Switch>
            <Route path="/tcc-react/Home" exact component={Home} />
            <Route path="/tcc-react/DiceRoller" component={DiceRoller} />
            <Route path="/tcc-react/CharacterList" component={CharacterList} />
            <Route path="/tcc-react/Login" component={Login} />
            <Route path="/tcc-react/StoryCreation" component={StoryCreation} />
            <Route path="/tcc-react/Tutorial" component={Tutorial} />
            <Route
              path="/tcc-react/ChatRoom"
              render={(props) => (
                <ChatRoom {...props} currentUserId={user ? user.uid : null} />
              )}
            />
            <Route
              path="/tcc-react/Amigos"
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
