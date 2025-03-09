import React from "react";

export function Button({ onClick, children, className }) {
  return (
    <button onClick={onClick} className={`p-2 rounded-lg ${className}`}>
      {children}
    </button>
  );
}
