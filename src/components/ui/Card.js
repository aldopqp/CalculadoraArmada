import React from "react";

export function Card({ children, className }) {
  return (
    <div className={`p-4 border border-gray-300 rounded-lg shadow-lg bg-white ${className}`}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={`p-2 ${className}`}>
      {children}
    </div>
  );
}
