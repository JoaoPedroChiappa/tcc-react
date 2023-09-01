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
              <Link to="/DiceRoller">DiceRoller</Link>
            </li>
            <li className="nav-item">
              <Link to="/CharacterList">Characters</Link>
            </li>
            <li className="nav-item">
              <Link to="/StoryCreation">StoryCreation</Link>
            </li>
            <li className="nav-item">
              <Link to="/Tutorial">Tutorial</Link>
            </li>
            <li className="nav-item">
              <Link to="/ChatRoom">Chat</Link>
            </li>
            <li className="nav-item">
              <Link to="/Amigos">Amigos</Link>
            </li>
            {user ? (
              <li className="nav-item">
                <Link to="/Login">Logout</Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/Login">Login</Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="content-wrapper">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/DiceRoller" component={DiceRoller} />
            <Route path="/CharacterList" component={CharacterList} />
            <Route path="/Login" component={Login} />
            <Route path="/StoryCreation" component={StoryCreation} />
            <Route path="/Tutorial" component={Tutorial} />
            <Route
              path="/ChatRoom"
              render={(props) => (
                <ChatRoom {...props} currentUserId={user ? user.uid : null} />
              )}
            />
            <Route
              path="/Amigos"
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
