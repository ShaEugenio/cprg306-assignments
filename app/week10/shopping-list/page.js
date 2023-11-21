"use client";
// check if the user is logged in by using the useUserAuth hook and if the user object is null, do not render the shopping list page. Optional: You can redirect the user to the landing page if you want.
import { useUserAuth } from './_utils/auth-context';
import { Redirect } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getItems, addItem } from '../../_services/shopping-list-service'; // Import getItems and addItem functions

import ItemList from './item-list';
import NewItem from './new-item';
import MealIdeas from './meal-ideas';

export default function Page() {
  const { user } = useUserAuth(); // Use the useUserAuth hook to get the user object

  // Initialize state variables using the 'useState' hook to manage the list of items and the selected item's name.
  const [items, setItems] = useState([]);
  const [selectedItemName, setSelectedItemName] = useState('');

  // Function to handle the selection of an item from the list
  const handleItemSelect = (selectedItem) => {
    let itemName = selectedItem.name.split(',')[0];
    itemName = itemName.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
    const cleanedItemName = itemName.trim();
    setSelectedItemName(cleanedItemName);
  };

  // Function to handle the addition of a new item to the list
  const handleAddItem = async (newItem) => {
    try {
      // Call the addItem function to add the item to the shopping list
      const newItemId = await addItem(user.uid, newItem);

      // Set the id of the new item
      const newItemWithId = { ...newItem, id: newItemId };

      // Update the state of items to include the new item
      setItems([...items, newItemWithId]);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  // useEffect hook: Load the shopping list items when the component is mounted
  useEffect(() => {
    const loadItems = async () => {
      try {
        // Call the getItems function to get the shopping list items for the current user
        const userItems = await getItems(user.uid);
        setItems(userItems);
      } catch (error) {
        console.error('Error loading items:', error);
      }
    };

    // Check if the user is logged in before attempting to load items
    if (user) {
      loadItems();
    }
  }, [user]);

  // CSS styles for the layout of the main page and columns
  const pageStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '10px',
    padding: '20px',
  };

  const columnStyle = {
    padding: '10px',
  };

  // Render the structure of the Page component, using divs to organize content into columns.
  return (
    <main style={pageStyle}>
      {/* Check if the user is logged in, if not, redirect to the landing page */}
      {!user ? (
        <Redirect to="/" />
      ) : (
        <>
          {/* Column 1: Shopping List title and the component to add new items */}
          <div style={columnStyle}>
            <h1 className="text-3xl font-bold text-yellow-300 mb-2">
              Shopping List
            </h1>
            <NewItem onAddItem={handleAddItem} />
          </div>

          {/* Column 2: Display the list of items and handle item selection */}
          <div style={columnStyle}>
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>

          {/* Column 3: Display meal ideas based on the selected item */}
          <div style={columnStyle}>
            <MealIdeas ingredient={selectedItemName} />
          </div>
        </>
      )}
    </main>
  );
}
