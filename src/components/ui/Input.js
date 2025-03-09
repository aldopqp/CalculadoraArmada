import React from "react";

export function Input({ type, value, onChange, className }) {
  return (
    <input type={type} value={value} onChange={onChange} className={`p-2 border rounded-md ${className}`} />;
  );
}
