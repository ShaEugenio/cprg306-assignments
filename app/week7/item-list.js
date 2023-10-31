import React from 'react';
import { useState } from 'react';
import Item from './item';

// Define the 'ItemList' component responsible for displaying and managing the list of items.
export default function ItemList(props) {
  // Initialize state variables using the 'useState' hook to manage sorting and grouping options.
  const [sortBy, setSortBy] = useState('name'); // 'sortBy' determines the current sorting method (by name or category).
  const [grouped, setGrouped] = useState(false); // 'grouped' stores whether items are grouped by category or not.

  // Functions to update state based on user interactions
  const handleSortByName = () => setSortBy('name'); // Set sorting by item name.
  const handleSortByCategory = () => setSortBy('category'); // Set sorting by item category.
  const handleToggleGrouping = () => setGrouped(!grouped); // Toggle grouping of items by category.

  // Destructuring props to obtain 'items' and 'onItemSelect' function from the parent component.
  const { items, onItemSelect } = props;

  // Function to handle an item click event
  const handleItemClick = (selectedItem) => {
    // Call the provided 'onItemSelect' function when an item is clicked
    onItemSelect(selectedItem);
  };

  // Sort items by name in a new array (non-mutating operation)
  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

  // If 'grouped' is true, group items by category into an object
  const groupedItems = grouped
    ? items.reduce((result, item) => {
        const category = item.category;
        if (!result[category]) {
          result[category] = [];
        }
        result[category].push(item);
        return result;
      }, {})
    : null;

  // Render the list of items with sorting and grouping options
  return (
    <div>
      <h1 style={{ fontWeight: 'bold', borderBottom: '2px solid black' }}>Item List</h1>
      <div>
        {/* Buttons to control sorting and grouping */}
        <button
          onClick={handleSortByName}
          style={{ backgroundColor: sortBy === 'name' ? 'lightblue' : 'black' }}
        >
          Sort by Name
        </button>
        <button
          onClick={handleSortByCategory}
          style={{ backgroundColor: sortBy === 'category' ? 'lightblue' : 'black' }}
        >
          Sort by Category
        </button>
        <button
          onClick={handleToggleGrouping}
          style={{ backgroundColor: grouped ? 'lightblue' : 'black' }}
        >
          {grouped ? 'Grouped Category' : 'Ungrouped Category'}
        </button>
      </div>
      {/* Display items either grouped by category or in a plain list */}
      {grouped
        ? Object.keys(groupedItems)
            .sort()
            .map((category) => (
              <div key={category}>
                <h2 className="capitalize">{category}</h2>
                {groupedItems[category]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    // Render individual Item components with category grouping
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                      onSelect={() => handleItemClick(item)}
                    />
                  ))}
              </div>
            ))
        : sortedItems.map((item) => (
            // Render individual Item components in a plain list
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => handleItemClick(item)}
            />
          ))}
    </div>
  );
}
