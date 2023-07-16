import React, { useState } from 'react';

function DiceRoller() {
  const [result, setResult] = useState(null);

  const rollDice = (sides) => {
    const randomNumber = Math.floor(Math.random() * sides) + 1;
    setResult(randomNumber);
  };

  return (
    <div>
      <h1>Dice Roller</h1>
      <button onClick={() => rollDice(6)}>Roll d6</button>
      <button onClick={() => rollDice(10)}>Roll d10</button>
      <button onClick={() => rollDice(20)}>Roll d20</button>
      <button onClick={() => rollDice(100)}>Roll d100</button>

      {result && (
        <div>
          <h2>Result: {result}</h2>
        </div>
      )}
    </div>
  );
}

export default DiceRoller;
