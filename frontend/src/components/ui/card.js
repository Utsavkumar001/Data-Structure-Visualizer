import React from "react";

const CardContent = ({ children }) => {
  return (
    <div 
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        margin: "20px auto",
        width: "300px",
        textAlign: "center",
        borderRadius: "10px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)"
      }}
    >
      {children}
    </div>
  );
};

export default CardContent;
