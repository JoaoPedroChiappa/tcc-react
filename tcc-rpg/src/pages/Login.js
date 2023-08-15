import React, { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { app, auth } from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar o botão de logoff


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Verificar o estado de autenticação do usuário
      if (user) {
        // Se o usuário estiver autenticado, definir o estado como verdadeiro e redirecionar para outra página
        setIsLoggedIn(true);
      } else {
        // Se o usuário não estiver autenticado, definir o estado como falso
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Limpar o listener ao desmontar o componente
  });

  const handleLogin = () => {
    setError(""); // Limpa qualquer mensagem de erro anterior

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login bem-sucedido, você pode redirecionar o usuário para outra página ou executar outras ações.
        console.log("Login bem-sucedido:", userCredential.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleLogout = () => {
    setError(""); // Limpa qualquer mensagem de erro anterior

    signOut(auth)
      .then(() => {
        // Logoff bem-sucedido
        console.log("Logoff bem-sucedido");
        setIsLoggedIn(false); // Define o estado como falso para exibir o botão de login novamente
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignup = () => {
    setError(""); // Limpa qualquer mensagem de erro anterior

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Novo usuário criado com sucesso, você pode redirecionar o usuário para outra página ou executar outras ações.
        console.log("Novo usuário criado:", userCredential.user);

        // Salvar os dados do usuário na coleção "users"
        const db = getFirestore(app);
        const userRef = doc(db, "users", userCredential.user.uid);
        const userData = {
          email: userCredential.user.email,
          // Outros dados que você queira salvar, como nome, data de nascimento, etc.
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
        <button onClick={handleLogout}>Logoff</button>
      ) : (
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
          <button onClick={handleSignup}>Criar conta</button>
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
