import React, { useState, useEffect } from 'react';

// MealIdeas component updated to use the provided ingredient for fetching recipes
export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

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

  useEffect(() => {
    if (ingredient) {
      fetchMealsByIngredient(ingredient);
    }
  }, [ingredient]);

  return (
    <div>
      <h2>Meals with Ingredients similar to {ingredient}:</h2>
      <ul>
        {meals.map((meal) => (
          <li key={meal.idMeal}>{meal.strMeal}</li>
        ))}
      </ul>
    </div>
  );
}