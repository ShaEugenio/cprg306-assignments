"use client";
// check if the user is logged in by using the useUserAuth hook and if the user object is null, do not render the shopping list page. Optional: You can redirect the user to the landing page if you want.
import { useUserAuth } from '../../hooks/auth';
import { Redirect } from 'react-router-dom';

import React, { useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import itemsData from './items.json';
import MealIdeas from './meal-ideas'; // Import the new MealIdeas component

// Define the default React component 'Page' responsible for managing a shopping list.
export default function Page() {
  // Initialize state variables using the 'useState' hook to manage the list of items and the selected item's name.
  const [items, setItems] = useState(itemsData); // 'items' represents the list of items, 'setItems' is used to update the list.
  const [selectedItemName, setSelectedItemName] = useState(''); // 'selectedItemName' stores the name of the currently selected item.


  // Function to handle the selection of an item from the list
  const handleItemSelect = (selectedItem) => {
    // Extract the name from the selected item and perform cleaning operations to remove certain Unicode characters.
    let itemName = selectedItem.name.split(',')[0]; // Extracts the name from the selected item.
    // The following line uses a regular expression to remove specific Unicode characters and emojis from the item name.
    itemName = itemName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    const cleanedItemName = itemName.trim(); // Trims extra spaces from the name.
    setSelectedItemName(cleanedItemName); // Sets the cleaned item name in the state.
  };

  // Function to handle the addition of a new item to the list
  const handleAddItem = (newItem) => {
    setItems([...items, newItem]); // Updates the 'items' state by appending the new item to the existing list.
  };

  // CSS styles for the layout of the main page and columns
  const pageStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // Defines a grid layout with three equal-width columns.
    gridGap: '10px', // Sets the gap between grid elements.
    padding: '20px', // Provides padding around the grid layout.
  };

  const columnStyle = {
    padding: '10px', // Defines padding for each column.
  };

  // Render the structure of the Page component, using divs to organize content into columns.
  return (
    <main style={pageStyle}>
      {/* Column 1: Shopping List title and the component to add new items */}
      <div style={columnStyle}>
        <h1 className="text-3xl font-bold text-yellow-300 mb-2">
          Shopping List
        </h1>
        <NewItem onAddItem={handleAddItem} /> {/* 'NewItem' component with the 'handleAddItem' function as a prop */}
      </div>

      {/* Column 2: Display the list of items and handle item selection */}
      <div style={columnStyle}>
        <ItemList items={items} onItemSelect={handleItemSelect} /> {/* 'ItemList' component displaying items */}
      </div>

      {/* Column 3: Display meal ideas based on the selected item */}
      <div style={columnStyle}>
        <MealIdeas ingredient={selectedItemName} /> {/* 'MealIdeas' component using the selected item name */}
      </div>
    </main>
  );
}
