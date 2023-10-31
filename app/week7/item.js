import React from 'react';

/**
 * The 'Item' component represents a single item in the list.
 * It displays the item's details and triggers an action when clicked.
 * @param {string} name - The name of the item.
 * @param {string} quantity - The quantity of the item.
 * @param {string} category - The category to which the item belongs.
 * @param {function} onSelect - Function to be called when the item is selected.
 */
export default function Item({ name, quantity, category, onSelect }) {
  /**
   * Handles the click event on the item by triggering the 'onSelect' function
   * and passing the item's details (name, quantity, category).
   */
  const handleClick = () => {
    // Trigger the 'onSelect' function and pass the item's details upon click.
    onSelect({ name, quantity, category });
  };

  /**
   * Renders the item with its details in a styled div container.
   * When clicked, the 'handleClick' function is invoked.
   */
  return (
    <div className="border border-sky-500 bg-sky-800 w-full max-w-xs m-4 p-2" onClick={handleClick}>
      {/* Display the name of the item in a bold text */}
      <h3 className="text-xl font-bold">{name}</h3>
      {/* Display the quantity of the item */}
      <p>Quantity: {quantity}</p>
      {/* Display the category of the item */}
      <p>Category: {category}</p>
    </div>
  );
}

