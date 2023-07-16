import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Home from './pages/Home';
import DiceRoller from './pages/DiceRoller';
import Login from './pages/Login';
import CharacterCreation from './pages/CharacterCreation';
import StoryCreation from './pages/StoryCreation';
import Tutorial from './pages/Tutorial';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/DiceRoller">DiceRoller</a>
            </li>
            <li>
              <a href="/CharacterCreation">CharacterCreation</a>
            </li>
            <li>
              <a href="/StoryCreation">StoryCreation</a>
            </li>
            <li>
              <a href="/Tutorial">Tutorial</a>
            </li>
            <li>
              <a href="/Login">Login</a>
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
