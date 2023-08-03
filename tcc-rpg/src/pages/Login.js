// Login.js
import React, { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth(app);

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

  const handleLogin = () => {
    setError(""); // Limpa qualquer mensagem de erro anterior

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login bem-sucedido, você pode redirecionar o usuário para outra página ou executar outras ações.
        console.log("Login bem-sucedido:", userCredential.user);
        alert("Login feito");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={handleLogin}>Entrar</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
