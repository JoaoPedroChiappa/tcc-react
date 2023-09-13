import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "../css/Dice.css";

import d6 from "../assets/d6.png";
import d10 from "../assets/d10.png";
import d20 from "../assets/d20.png";

function Die({ sides, result, setResult }) {
  const [rolling, setRolling] = useState(false);
  const [visible, setVisible] = useState(false);

  const rollDie = () => {
    if (!rolling) {
      setRolling(true);
      setResult(null);
      setVisible(true);

      let rollInterval = setInterval(() => {
        setResult(Math.floor(Math.random() * sides) + 1);
      }, 800);

      setTimeout(() => {
        clearInterval(rollInterval);
        setRolling(false);
      }, 1000);
    }
    console.log(result);
  };

  const animationProps = useSpring({
    opacity: visible ? (result === null ? 0.5 : 1) : 0.5,
    transform: `rotate(${result === null ? 0 : 720}deg)`,
  });

  const diceImages = {
    6: d6,
    10: d10,
    20: d20,
  };

  const diceSize = sides === 6 ? "95%" : "100%";

  return (
    <div style={{ display: "inline-block", margin: "20px 20px" }}>
      <button onClick={rollDie} disabled={rolling}>
        Roll {sides}-sided Die
      </button>
      <div
        style={{
          position: "relative",
          width: "200px",
          height: "200px",
          marginTop: "10px",
        }}
      >
        <animated.img
          src={diceImages[sides]}
          alt={"dice"}
          style={{ ...animationProps, width: diceSize, height: diceSize }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            fontSize: "25px",
            fontWeight: "bold",
          }}
        >
          {!rolling && result}
        </div>
      </div>
    </div>
  );
}

function DiceRoller() {
  const [result6, setResult6] = useState(null);
  const [result10, setResult10] = useState(null);
  const [result20, setResult20] = useState(null);

  return (
    <div
      class="diceWrapper"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Die sides={6} result={result6} setResult={setResult6} />
      <Die sides={10} result={result10} setResult={setResult10} />
      <Die sides={20} result={result20} setResult={setResult20} />
    </div>
  );
}

export default DiceRoller;
