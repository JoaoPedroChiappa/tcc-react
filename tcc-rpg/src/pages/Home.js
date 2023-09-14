import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "../css/Home.css";
import jogadoresrpg from "../assets/images/jogadoresrpg.png";
import arcanewarrior from "../assets/images/arcanewarrior.png";

const Home = () => {
  return (
    <Router basename="/tcc-react">
      <div className="home-container">
        <div
          className="card card-image"
          style={{ backgroundImage: `url(${jogadoresrpg})` }}
        >
          <h1 className="title-color">Gerenciador de RPG de Mesa Online</h1>
          <p className="subtitle-color">
            Leve sua experiência de RPG de mesa para o próximo nível com o nosso
            gerenciador online. Crie personagens personalizados, jogue com
            amigos, rolem dados e muito mais. Experimente agora!
          </p>
        </div>

        <div className="card-cadastro card-content">
          <div className="card-content-left">
            <img src={arcanewarrior} alt="Imagem" />
          </div>
          <div className="card-content-right">
            <h2 className="title-color">Cadastre-se e Comece a Jogar</h2>
            <p className="subtitle-color">
              Cadastre-se agora e comece a jogar instantaneamente com outros
              jogadores de RPG de mesa de todo o mundo. Crie um perfil para
              identificar seus amigos e veja o perfil deles. Adicione outros
              jogadores como amigos e comece a jogar hoje mesmo!
            </p>
            <a href="Login" className="signup-button">
              Cadastre-se
            </a>
          </div>
        </div>

        <div className="features-section">
          <h2 className="title-color">Bem-vindo ao Mundo do RPG de Mesa!</h2>
          <p className="subtitle-color">
            Se você é novo no RPG de mesa, não se preocupe! Nós temos um{" "}
            <a href="tutorial" className="link">
              Tutorial
            </a>{" "}
            completo para você começar a jogar em pouco tempo. Aprenda os
            conceitos básicos do jogo, como criar uma história emocionante e
            como interpretar seu personagem ao longo do jogo. Boa sorte!
          </p>
        </div>
      </div>
    </Router>
  );
};

export default Home;
