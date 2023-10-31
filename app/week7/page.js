"use client";
import React, { useState } from 'react';
import ItemList from './item-list';
import NewItem from './new-item';
import itemsData from './items.json';
import MealIdeas from './meal-ideas'; // Import the new MealIdeas component

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState(''); // New state variable for the selected item

  const handleItemSelect = (selectedItem) => {
    let itemName = selectedItem.name.split(',')[0]; 
    itemName = itemName.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/, ''); // Removes emojis
    const cleanedItemName = itemName.trim();
    setSelectedItemName(cleanedItemName);
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  return (
    <main>
      <h1 className="text-4xl font-bold m-6 text-center text-yellow-300">
        Shopping List
      </h1>
      <NewItem onAddItem={handleAddItem} />
      <ItemList items={items} onItemSelect={handleItemSelect} />
      <MealIdeas ingredient={selectedItemName} />
    </main>
  );
}