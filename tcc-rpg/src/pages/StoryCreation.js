import React, { useState } from 'react';
import axios from 'axios';

const StoryCreation = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateStory = async () => {
    try {
      const response = await axios.post('/api/stories', {
        title,
        description,
      });
      // Lógica para tratamento de sucesso da criação da história
    } catch (error) {
      setErrorMessage('Erro ao criar a história');
    }
  };

  return (
    <div>
      <h1>Story Creation</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button onClick={handleCreateStory}>Create Story</button>
    </div>
  );
};

export default StoryCreation;
