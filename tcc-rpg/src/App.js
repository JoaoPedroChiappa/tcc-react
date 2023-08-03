// App.js
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import DiceRoller from "./pages/DiceRoller";
import Login from "./pages/Login";
import CharacterCreation from "./pages/CharacterCreation";
import StoryCreation from "./pages/StoryCreation";
import Tutorial from "./pages/Tutorial";

const App = () => {
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
            <li>
              <Link to="/Login">Login</Link>
            </li>
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
