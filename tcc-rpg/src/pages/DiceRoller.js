import React, { useState } from "react";
import { useSpring, animated } from 'react-spring';
import "../css/Dice.css";

function Die({ sides, result, setResult }) {
  const [rolling, setRolling] = useState(false);
  const [visible, setVisible] = useState(false);

  const rollDie = () => {
    if (!rolling) {
      setRolling(true);
      setResult(null);
      setVisible(true);

      // Simule um lançamento de dados
      let rollInterval = setInterval(() => {
        setResult(Math.floor(Math.random() * sides) + 1);
      }, 800); // Atualiza o resultado a cada 100 ms

      // Simule uma rolagem de dados por 1 segundo
      setTimeout(() => {
        clearInterval(rollInterval);
        setRolling(false);
      }, 1000); // Tempo da animação
    }
  };

  const animationProps = useSpring({
    opacity: visible ? (result === null ? 0.5 : 1) : 0,
    transform: `rotate(${result === null ? 0 : 720}deg)`,
  });

  return (
    <div>
      <button onClick={rollDie} disabled={rolling}>
        Roll {sides}-sided Die
      </button>
      <animated.div
        style={{
          ...animationProps,
          width: '100px',
          height: '100px',
          backgroundColor: 'blue',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}
      >
        {rolling ? (result !== null ? result : "") : (result !== null ? result : "")}
      </animated.div>
    </div>
  );
}

function DiceRoller() {
  const [result4, setResult4] = useState(null);
  const [result6, setResult6] = useState(null);
  const [result20, setResult20] = useState(null);

  return (
    <div>
      <Die sides={4} result={result4} setResult={setResult4} />
      <Die sides={6} result={result6} setResult={setResult6} />
      <Die sides={20} result={result20} setResult={setResult20} />
    </div>
  );
}

export default DiceRoller;
