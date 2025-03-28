import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button 
      onClick={onClick} 
      style={{
        padding: "10px 20px",
        margin: "10px",
        fontSize: "16px",
        cursor: "pointer",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px"
      }}
    >
      {children}
    </button>
  );
};

export default Button;
