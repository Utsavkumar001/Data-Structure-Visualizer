import React, { useState } from "react";
import "./DataStructureVisualizer.css";

const DataStructureVisualizer = () => {
  const [array, setArray] = useState([5, 10, 15, 20, 25]);
  const [inputValue, setInputValue] = useState("");

  const insertElement = () => {
    if (inputValue.trim() === "" || isNaN(inputValue)) return; // Prevent empty or invalid input
    setArray((prevArray) => [...prevArray, parseInt(inputValue)]);
    setInputValue(""); // Clear input field after insertion
  };

  const deleteElement = () => {
    if (array.length === 0) return;
    setArray((prevArray) => prevArray.slice(0, -1));
  };

  const reverseArray = () => {
    setArray((prevArray) => [...prevArray].reverse());
  };

  const sortArray = () => {
    setArray((prevArray) => [...prevArray].sort((a, b) => a - b));
  };

  const shuffleArray = () => {
    setArray((prevArray) => [...prevArray].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="visualizer-container">
      <h2>Array Visualizer</h2>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={insertElement}>Insert</button>
      </div>

      <div className="buttons">
        <button onClick={deleteElement} disabled={array.length === 0}>
          Delete
        </button>
        <button onClick={reverseArray} disabled={array.length === 0}>
          Reverse
        </button>
        <button onClick={sortArray} disabled={array.length === 0}>
          Sort
        </button>
        <button onClick={shuffleArray} disabled={array.length === 0}>
          Shuffle
        </button>
      </div>

      <div className="array-container">
        {array.length === 0 ? (
          <p className="empty-message">Array is empty</p>
        ) : (
          array.map((num, index) => (
            <div key={index} className="array-element">
              {num}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DataStructureVisualizer;
