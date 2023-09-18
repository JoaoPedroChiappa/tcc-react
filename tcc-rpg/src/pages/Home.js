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
          <h1 className="title-color">Gerenciador de RPG de Mesa</h1>
          <p className="subtitle-color">
            Leve sua experiência de RPG de mesa para o próximo nível com o nosso
            gerenciador. Crie personagens personalizados, jogue com
            amigos, rolem dados e muito mais. Experimente agora!
          </p>
        </div>

        <div className="features-section">
          <h2 className="title-color">Bem-vindo ao mundo do RPG de mesa!</h2>
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

        <div className="card-cadastro card-content">
          <div className="card-content-left">
            <img src={arcanewarrior} alt="Imagem" />
          </div>
          <div className="card-content-right">
            <h2 className="title-color">Cadastre-se e comece a jogar</h2>
            <p className="subtitle-color">
              Cadastre-se agora e comece a jogar instantaneamente com outros
              jogadores de RPG de mesa de todo o mundo. Crie um perfil para
              identificar seus amigos e veja o perfil deles. Adicione outros
              jogadores como amigos e comece a jogar hoje mesmo!
            </p>
            <a href="Login" className="signup-button-home">
              Cadastre-se
            </a>
          </div>
        </div>

        <div className="card-personagem card-content">
          <h2 className="title-color">Criação de personagens</h2>
          <p className="subtitle-color">
            Planeje seu personagem com a nossa ferramenta de criação de personagens intuitiva.
            Escolha sua raça, classe, atributos e muito mais.
            Crie um personagem único que reflita sua personalidade e estilo de jogo.
          </p>
          <div className="mini-cards">
            <div className="mini-card">
              <h3 className="title-color">Raças</h3>
              <p className="subtitle-color">Escolha entre elfos, anões, humanos e muito mais.</p>
            </div>
            <div className="mini-card">
              <h3 className="title-color">Classes</h3>
              <p className="subtitle-color">Seja um guerreiro, mago, ladino ou qualquer outra coisa que desejar.</p>
            </div>
            <div className="mini-card">
              <h3 className="title-color">Atributos</h3>
              <p className="subtitle-color">Atribua pontos para força, inteligência, destreza, constituição, sabedoria e carisma.</p>
            </div>
            <div className="mini-card">
              <h3 className="title-color">Habilidades</h3>
              <p className="subtitle-color">Crie o seu conjunto de habilidades exclusivo para enfrentar desafios emocionantes. (em desenvolvimento)</p>
            </div>
          </div>
        </div>

        <div className="card-comunicacao card-content">
            <h2 className="title-color">Bate-papo com amigos</h2>
            <p className="subtitle-color">
                Comunique-se facilmente com seus amigos durante o jogo. Use o nosso chat para discutir estratégias, trocar ideias e se divertir com seus amigos.
            </p>
        </div>

      </div>
    </Router>
  );
};

export default Home;
