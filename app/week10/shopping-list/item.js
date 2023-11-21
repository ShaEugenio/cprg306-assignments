import React from 'react';

export default function Item({ name, quantity, category, onSelect, onDelete }) {
  return (
    <div>
      {/* Display item information */}
      <p>Name: {name}</p>
      <p>Quantity: {quantity}</p>
      <p>Category: {category}</p>
      {/* Buttons to handle item selection and deletion */}
      <button onClick={onSelect}>Select</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}
