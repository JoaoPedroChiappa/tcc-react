import React from 'react';
import "../css/Tutorial.css";

const Tutorial = () => {
  return (
    <div className="tutorial-container">
      <h1>Tutorial</h1>
      <h2>Guia para Iniciantes: Como Jogar RPG de Mesa</h2>

      <Accordion title="Passo 1: Escolha de Sistema e Tema">
        O primeiro passo é escolher um sistema de RPG e um tema que seja do seu interesse. Existem vários sistemas disponíveis, como Dungeons & Dragons, Pathfinder, GURPS e muitos outros. Cada sistema tem suas próprias regras e estilo de jogo, então pesquise e escolha aquele que mais lhe agrada. Além disso, defina o tema da campanha, que pode ser fantasia medieval, ficção científica, horror, entre outros.
      </Accordion>

      <Accordion title="Passo 2: Criação de Personagem">
        Após escolher o sistema e o tema, é hora de criar seu personagem. Normalmente, você precisará determinar a raça, classe, atributos, habilidades e antecedentes do seu personagem. Siga as instruções do sistema escolhido e use sua criatividade para dar vida ao seu herói. Lembre-se de considerar a personalidade e motivações do personagem para torná-lo mais interessante.
      </Accordion>

      <Accordion title="Passo 3: Conhecendo as Regras Básicas">
        Antes de começar a jogar, é importante familiarizar-se com as regras básicas do sistema. Leia o livro de regras ou o manual do jogador para entender como funciona o combate, a resolução de testes de habilidade e outros aspectos do jogo. Você não precisa memorizar todas as regras de uma vez, mas tenha uma compreensão geral para que possa jogar de forma fluente.
      </Accordion>

      <Accordion title="Passo 4: O Papel do Mestre">
        O mestre, também conhecido como narrador, é responsável por criar o mundo, descrever o ambiente, interpretar personagens não-jogadores (PNJs) e arbitrar as regras do jogo. É o mestre que conduz a história e apresenta os desafios para os jogadores. Se você está começando como jogador, é provável que alguém já esteja assumindo o papel de mestre. Caso contrário, você pode se voluntariar ou procurar grupos de jogadores que estejam aceitando novos membros.
      </Accordion>

      <Accordion title="Passo 5: Aventurando-se no Mundo do RPG">
        Com personagens criados, regras básicas compreendidas e um mestre para guiar a história, é hora de começar a jogar. As sessões de RPG geralmente ocorrem em encontros regulares, com cada sessão durando algumas horas. Durante o jogo, você vai interagir com outros jogadores, tomar decisões para o seu personagem, rolar dados para resolver ações e participar de combates emocionantes.
      </Accordion>

      <Accordion title="Passo 6: Desenvolvimento do Personagem">
        À medida que você joga, seu personagem vai adquirindo experiência e evoluindo. Com o tempo, você ganhará pontos de experiência para gastar em melhorias, como aumento de atributos, aprendizado de novas habilidades e obtenção de itens poderosos. Aproveite esse processo para desenvolver a história do seu personagem e explorar sua evolução dentro do mundo do jogo.
      </Accordion>

      <p className="final-note">
        O RPG de mesa é um hobby incrível que permite que você se aventure em mundos imaginários, crie histórias cativantes e desenvolva personagens únicos. Com este guia básico, você está pronto para iniciar sua jornada no RPG de mesa. Lembre-se de se divertir, ser criativo e colaborar com os outros jogadores para construir uma experiência memorável. Boa sorte e que suas aventuras sejam épicas!
      </p>
    </div>
  )
};

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="accordion-container">
      <h3 onClick={() => setIsOpen(!isOpen)}>{title}</h3>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default Tutorial;
