import React, { useState, useEffect } from 'react';

// Define a React component named 'MealIdeas' responsible for displaying meal ideas based on a provided ingredient.
export default function MealIdeas({ ingredient }) {
  // State variables managed using the 'useState' hook.
  const [meals, setMeals] = useState([]); // Stores the list of meals fetched based on the provided ingredient.
  const [selected, setSelected] = useState(false); // Represents whether a meal has been selected for display or not.
  const [selectedMealIngredients, setSelectedMealIngredients] = useState(null); // Stores the ingredients of the selected meal.

  // Function to fetch meals based on the provided ingredient.
  const fetchMealsByIngredient = async (ingredient) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.error("Error fetching meal ideas: ", error);
      setMeals([]);
    }
  };

  // Function to fetch ingredients of a specific meal by its ID.
  const fetchIngredientsByMeal = async (mealId) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      if (data.meals) {
        setSelectedMealIngredients(data.meals[0]);
      } else {
        setSelectedMealIngredients(null);
      }
    } catch (error) {
      console.error("Error fetching meal ingredients: ", error);
      setSelectedMealIngredients(null);
    }
  };

  // useEffect hook: Triggers the fetching of meals when the 'ingredient' prop changes.
  useEffect(() => {
    if (ingredient) {
      setSelected(false); // Resets the selected meal state flag.
      setMeals([]); // Clears the existing list of meals.
      fetchMealsByIngredient(ingredient); // Fetches meals based on the provided ingredient.
    }
  }, [ingredient]);

  // Function to handle the click event on a meal item to display its ingredients.
  const handleMealClick = (meal) => {
    setSelected(true); // Set the selected state to true to display selected meal details.
    fetchIngredientsByMeal(meal.idMeal); // Fetch ingredients for the selected meal.
  };

  // Render content based on the selected state and available meals.
  return (
    <div>
      <h1 style={{ fontWeight: 'bold', borderBottom: '2px solid black' }}>Meal Ideas</h1>

      {selected ? ( // If a meal is selected, display its details and ingredients.
        selectedMealIngredients ? (
          <div>
            {/* Display selected meal name, image, and its ingredients */}
            <h2>Selected Meal: {selectedMealIngredients.strMeal}</h2>
            <img src={selectedMealIngredients.strMealThumb} alt={selectedMealIngredients.strMeal} style={{ width: '150px', height: '150px' }} />
            <h3>Ingredients:</h3>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                const ingredient = selectedMealIngredients[`strIngredient${i}`];
                const measure = selectedMealIngredients[`strMeasure${i}`];
                return ingredient ? <li key={i}>{`${ingredient}: ${measure}`}</li> : null;
              })}
            </ul>
          </div>
        ) : <p>No meal selected</p>
      ) : (
        meals.length > 0 ? ( // If no meal is selected, display the list of meals based on the ingredient.
          <div>
            <h2>Here are some meal ideas using {ingredient}:</h2>
            <ul>
              {meals.map((meal) => (
                <li key={meal.idMeal} onClick={() => handleMealClick(meal)}>
                  {meal.strMeal}
                  <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '50px', height: '50px' }} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No meals found for {ingredient}</p> // If no meals are found for the ingredient.
        )
      )}
    </div>
  );
}
