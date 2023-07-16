import React, { useState } from 'react';
import axios from 'axios';

const CharacterCreation = () => {
  const [name, setName] = useState('');
  const [level, setLevel] = useState('');
  const [race, setRace] = useState('');
  const [characterClass, setCharacterClass] = useState('');

  const handleCreateCharacter = async () => {
    try {
      const response = await axios.post('/api/characters', {
        name,
        level,
        race,
        characterClass,
      });
      // Lógica para tratar a resposta após a criação do personagem
    } catch (error) {
      // Lógica para tratar erros de criação do personagem
    }
  };

  return (
    <div>
      <h1>Character Creation</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Level"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />
      <input
        type="text"
        placeholder="Race"
        value={race}
        onChange={(e) => setRace(e.target.value)}
      />
      <input
        type="text"
        placeholder="Class"
        value={characterClass}
        onChange={(e) => setCharacterClass(e.target.value)}
      />
      <button onClick={handleCreateCharacter}>Create Character</button>
    </div>
  );
};

export default CharacterCreation;
