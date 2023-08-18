import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [currentUserData, setCurrentUserData] = useState(null); // Armazenar os dados do usuário atual

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
        setCurrentUserData(null); // Resetar os dados do usuário antes de definir isLoggedIn para false
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Login bem-sucedido:", userCredential.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogout = () => {
    setError("");
    signOut(auth)
      .then(() => {
        console.log("Logoff bem-sucedido");
        setIsLoggedIn(false);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignup = () => {
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Novo usuário criado:", userCredential.user);
        const userRef = doc(db, "users", userCredential.user.uid);
        const userData = {
          id: userCredential.user.uid,
          email: userCredential.user.email,
          username: username,
          friends: [],
        };
        setDoc(userRef, userData)
          .then(() => {
            alert("Dados do usuário salvos com sucesso!");
          })
          .catch((error) => {
            console.error("Erro ao salvar dados do usuário:", error);
          });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Login</h1>

      {isLoggedIn ? (
        <>
          <p>Bem-vindo, {currentUserData?.username}!</p>
          <button onClick={handleLogout}>Logoff</button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setShowLoginForm(true);
              setShowSignupForm(false);
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              setShowSignupForm(true);
              setShowLoginForm(false);
            }}
          >
            Criar conta
          </button>

          {showLoginForm && (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
              />
              <button onClick={handleLogin}>Login</button>
            </>
          )}

          {showSignupForm && (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
              />
              <button onClick={handleSignup}>Criar conta</button>
            </>
          )}
        </>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
