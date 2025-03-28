import React, { useState } from "react";
import "./App.css";
import DataStructureVisualizer from "./DataStructureVisualizer"; // Array Visualizer
import LinkedListVisualizer from "./LinkedListVisualizer";
import GraphVisualizer from "./GraphVisualizer";

function App() {
  const [selectedVisualizer, setSelectedVisualizer] = useState("array");

  return (
    <div className="App">
      <h1>Welcome to Data Structure Visualizer</h1>
      <div className="button-container">
        <button onClick={() => setSelectedVisualizer("array")}>
          Visualize Array
        </button>
        <button onClick={() => setSelectedVisualizer("linkedlist")}>
          Visualize Linked List
        </button>
        <button onClick={() => setSelectedVisualizer("graph")}>
          Visualize Graph
        </button>
      </div>

      <div className="visualization-area">
        {selectedVisualizer === "array" && <DataStructureVisualizer />}
        {selectedVisualizer === "linkedlist" && <LinkedListVisualizer />}
        {selectedVisualizer === "graph" && <GraphVisualizer />}
      </div>
    </div>
  );
}

export default App;
