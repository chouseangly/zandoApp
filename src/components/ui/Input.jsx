"use client";

import React from 'react';

const Input = ({ label, name, type = "text", value, onChange, placeholder, error }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-md outline-none transition ${
          error ? 'border-red-500 bg-red-50' : 'border-gray-300 focus:border-black'
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default Input;