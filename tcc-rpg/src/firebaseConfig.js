import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjue9rOd_eTlxdq6p_7tmsOLw4yCmlxt0",
  authDomain: "tcc-rpg.firebaseapp.com",
  projectId: "tcc-rpg",
  storageBucket: "tcc-rpg.appspot.com",
  messagingSenderId: "864858146434",
  appId: "1:864858146434:web:d3be0c2c6da02ca34ad69b",
  measurementId: "G-WJ6RNEV6JM",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Habilitar a persistência de autenticação "local"
auth.setPersistence(getAuth(), browserLocalPersistence);

export default app;
