import React from 'react';

export default function Item({ name, quantity, category, onSelect }) {
  const handleClick = () => {
    // Trigger the onSelect function when an item is clicked
    onSelect({ name, quantity, category });
  };

  return (
    <div className="border border-sky-500 bg-sky-800 w-full max-w-xs m-4 p-2" onClick={handleClick}>
      <h3 className="text-xl font-bold">{name}</h3>
      <p>Quantity: {quantity}</p>
      <p>Category: {category}</p>
    </div>
  );
}
