import React, { useState } from "react";

const StoryCreation = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateStory = async () => {};

  return (
    <div>
      <h1>Story Creation</h1>
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
