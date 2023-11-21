import React from 'react';
import { useState } from 'react';
import Item from './item';

export default function ItemList(props) {
  const [sortBy, setSortBy] = useState('name');
  const [grouped, setGrouped] = useState(false);

  const handleSortByName = () => setSortBy('name');
  const handleSortByCategory = () => setSortBy('category');
  const handleToggleGrouping = () => setGrouped(!grouped);

  const { items, onItemSelect } = props;

  const handleItemClick = (selectedItem) => {
    onItemSelect(selectedItem);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      // Implement logic to delete an item using the itemId
      // For example: await deleteItem(userId, itemId);

      // Update the state to reflect the deletion
      const updatedItems = items.filter(item => item.id !== itemId);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const sortedItems = [...items].sort((a, b) => a.name.localeCompare(b.name));

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

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', borderBottom: '2px solid black' }}>Item List</h1>
      <div>
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
      {grouped
        ? Object.keys(groupedItems)
            .sort()
            .map((category) => (
              <div key={category}>
                <h2 className="capitalize">{category}</h2>
                {groupedItems[category]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <Item
                      key={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      category={item.category}
                      onSelect={() => handleItemClick(item)}
                      onDelete={() => handleDeleteItem(item.id)}
                    />
                  ))}
              </div>
            ))
        : sortedItems.map((item) => (
            <Item
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              category={item.category}
              onSelect={() => handleItemClick(item)}
              onDelete={() => handleDeleteItem(item.id)}
            />
          ))}
    </div>
  );
}
