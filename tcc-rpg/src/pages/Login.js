import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import "../css/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
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

  const handleLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login bem-sucedido");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    setError("");
    try {
      await signOut(auth);
      console.log("Logoff bem-sucedido");
      setIsLoggedIn(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = async () => {
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Novo usuário criado:", userCredential.user);
      const userRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userRef, {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        username: username,
        friends: [],
      });
      alert("Dados do usuário salvos com sucesso!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      {isLoggedIn ? (
        <>
          <p>Bem-vindo, {currentUserData?.username}!</p>
          <button className="login-button" onClick={handleLogout}>
            Logoff
          </button>
        </>
      ) : (
        <>
          <div className="tabs">
            <button
              className={`tab-button ${showLoginForm ? "active" : ""}`}
              onClick={() => {
                setShowLoginForm(true);
                setShowSignupForm(false);
              }}
            >
              Entrar
            </button>
            <button
              className={`tab-button ${showSignupForm ? "active" : ""}`}
              onClick={() => {
                setShowSignupForm(true);
                setShowLoginForm(false);
              }}
            >
              Criar conta
            </button>
          </div>
          {showLoginForm && (
            <>
              <input
                className="input-field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
              />
              <input
                className="input-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
              />
              <button className="login-button" onClick={handleLogin}>
                Entrar
              </button>
            </>
          )}
          {showSignupForm && (
            <>
              <input
                className="input-field"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                className="input-field"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
              />
              <input
                className="input-field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
              />
              <button className="signup-button" onClick={handleSignup}>
                Criar conta
              </button>
            </>
          )}
        </>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Login;
