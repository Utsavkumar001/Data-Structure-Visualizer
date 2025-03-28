import React, { useState } from "react";
import "./LinkedListVisualizer.css";

class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

const LinkedListVisualizer = () => {
  const [head, setHead] = useState(null);
  const [value, setValue] = useState("");
  const [position, setPosition] = useState("");

  // Insert at the end
  const insertAtEnd = () => {
    if (value === "") return;
    const newNode = new Node(value);
    if (!head) {
      setHead(newNode);
    } else {
      let temp = head;
      while (temp.next) {
        temp = temp.next;
      }
      temp.next = newNode;
      setHead({ ...head });
    }
    setValue("");
  };

  // Insert at a specific position
  const insertAtPosition = () => {
    if (value === "" || position === "") return;
    const pos = parseInt(position);
    if (pos < 1) return alert("Position must be greater than 0!");

    const newNode = new Node(value);
    if (pos === 1) {
      newNode.next = head;
      setHead(newNode);
    } else {
      let temp = head;
      let count = 1;
      while (temp && count < pos - 1) {
        temp = temp.next;
        count++;
      }
      if (!temp) return alert("Position out of bounds!");
      newNode.next = temp.next;
      temp.next = newNode;
    }
    setValue("");
    setPosition("");
  };

  // Delete from the start
  const deleteFromStart = () => {
    if (head) setHead(head.next);
  };

  // Reverse the Linked List
  const reverseList = () => {
    let prev = null;
    let current = head;
    while (current) {
      let next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    setHead(prev);
  };

  // Search for a value
  const searchValue = () => {
    if (value === "") return;
    let temp = head;
    let pos = 1;
    while (temp) {
      if (temp.value === value) {
        alert(`Value found at position ${pos}`);

        return;
      }
      temp = temp.next;
      pos++;
    }
    alert("Value not found!");
  };

  return (
    <div className="linked-list-container">
      <h2>Linked List Visualization</h2>
      <div className="controls">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />
        <input
          type="number"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Position (optional)"
        />
        <button onClick={insertAtEnd}>Insert at End</button>
        <button onClick={insertAtPosition}>Insert at Position</button>
        <button onClick={deleteFromStart}>Delete from Start</button>
        <button onClick={reverseList}>Reverse</button>
        <button onClick={searchValue}>Search</button>
      </div>
      <div className="list">
        {head ? (
          <>
            {(() => {
              let temp = head;
              let nodes = [];
              while (temp) {
                nodes.push(
                  <span key={temp.value} className="node">
                    {temp.value}
                  </span>
                );
                if (temp.next) nodes.push(<span className="node-arrow">→</span>);
                temp = temp.next;
              }
              return nodes;
            })()}
          </>
        ) : (
          <p>No Nodes</p>
        )}
      </div>
    </div>
  );
};

export default LinkedListVisualizer;