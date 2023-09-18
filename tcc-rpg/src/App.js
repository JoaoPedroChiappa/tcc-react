import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import "../src/css/App.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { GiHamburgerMenu } from "react-icons/gi";
import icon from "../src/assets/images/logo/logo.png";

import Home from "./pages/Home";
import DiceRoller from "./pages/DiceRoller";
import Login from "./pages/Login";
import CharacterList from "./pages/character/CharacterList";
import Tutorial from "./pages/Tutorial";
import FriendsAdd from "./pages/FriendsAdd";
import ChatRoom from "./pages/chat/ChatRoom";
import JoinRoom from "./pages/chat/JoinChatRoom";

const App = () => {
  const [user, setUser] = useState(null);
  const queryClient = new QueryClient();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dropdownRef = useRef(null);
  const hamburgerButtonRef = useRef(null);

  useEffect(() => {
    // 1. Função para o onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // 2. Função para o resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // 3. Função para clique fora do dropdown
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          hamburgerButtonRef.current !== event.target) {
          setDropdownOpen(false);
      }
  }
    document.addEventListener("mousedown", handleClickOutside);

    // Retorna a função de limpeza para remover os event listeners e a assinatura
    return () => {
        unsubscribe();
        window.removeEventListener("resize", handleResize);
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Router basename="/tcc-react">
      <div className="app-container">
        <nav className="app-nav">
          {windowWidth <= 768 ? (
            <>
              <button ref={hamburgerButtonRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
                <GiHamburgerMenu />
            </button>
              <Link to="/">
                <img
                  src={icon}
                  width={58}
                  height={78}
                  style={{ position: "absolute", top: "-8px" }}
                  alt="logo"
                />
              </Link>
              {dropdownOpen && (
                <ul className="nav-list-mobile" ref={dropdownRef}>
                  <li className="nav-item">
                  <Link to="/" onClick={() => setDropdownOpen(false)}>Home</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/DiceRoller" onClick={() => setDropdownOpen(false)}>Dados</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/CharacterList" onClick={() => setDropdownOpen(false)}>Personagens</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Tutorial" onClick={() => setDropdownOpen(false)}>Tutorial</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/ChatRoom" onClick={() => setDropdownOpen(false)}>Chat</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/Amigos" onClick={() => setDropdownOpen(false)}>Amigos</Link>
                  </li>
                  <div className="spacer"></div>
                  {user ? (
                    <li className="nav-item">
                      <Link to="/Login" onClick={() => setDropdownOpen(false)}>Logout</Link>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link to="/Login" onClick={() => setDropdownOpen(false)}>Login</Link>
                    </li>
                  )}
                </ul>
              )}
            </>
          ) : (
            <ul className="nav-list">
              <li>
                <Link to="/">
                  <img
                    src={icon}
                    width={60}
                    height={80}
                    alt="logo"
                    style={{ position: "absolute", top: "-7px", left: "12px" }}
                  />
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/DiceRoller">Dados</Link>
              </li>
              <li className="nav-item">
                <Link to="/CharacterList">Personagens</Link>
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
          )}
        </nav>

        <div className="content-wrapper">
          <Switch>
            <QueryClientProvider client={queryClient}>
              <Route path="/" exact component={Home} />
              <Route path="/DiceRoller" component={DiceRoller} />
              <Route path="/CharacterList" component={CharacterList} />
              <Route path="/Login" component={Login} />
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
                  <FriendsAdd
                    {...props}
                    currentUserId={user ? user.uid : null}
                  />
                )}
              />
              <Route
                path="/join/:inviteCode"
                render={(props) => (
                  <JoinRoom {...props} currentUserId={user ? user.uid : null} />
                )}
              />
            </QueryClientProvider>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
