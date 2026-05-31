import React, { useState } from 'react';
import './AICook.css';

const INGREDIENT_CATEGORIES = [
  {
    label: 'Vegetables',
    ingredients: [
      { name: 'Tomato', img: 'https://img.icons8.com/color/96/000000/tomato.png' },
      { name: 'Potato', img: 'https://img.icons8.com/color/96/000000/potato.png' },
      { name: 'Carrot', img: 'https://img.icons8.com/color/96/000000/carrot.png' },
      { name: 'Onion', img: 'https://img.icons8.com/color/96/000000/onion.png' },
      { name: 'Broccoli', img: 'https://img.icons8.com/color/96/000000/broccoli.png' },
      { name: 'Bell Pepper', img: 'https://img.icons8.com/color/96/000000/paprika.png' },
      { name: 'Garlic', img: 'https://img.icons8.com/color/96/000000/garlic.png' },
      { name: 'Cucumber', img: 'https://img.icons8.com/color/96/000000/cucumber.png' },
      { name: 'Lettuce', img: 'https://img.icons8.com/color/96/000000/lettuce.png' },
      { name: 'Corn', img: 'https://img.icons8.com/color/96/000000/corn.png' },
      { name: 'Peas', img: 'https://img.icons8.com/color/96/000000/peas.png' },
      { name: 'Zucchini', img: 'https://img.icons8.com/color/96/000000/zucchini.png' },
      { name: 'Pumpkin', img: 'https://img.icons8.com/color/96/000000/pumpkin.png' },
      { name: 'Cabbage', img: 'https://img.icons8.com/color/96/000000/cabbage.png' },
      { name: 'Chili Pepper', img: 'https://img.icons8.com/color/96/000000/chili-pepper.png' },
      { name: 'Celery', img: 'https://img.icons8.com/color/96/000000/celery.png' },
      { name: 'Eggplant', img: 'https://img.icons8.com/color/96/000000/eggplant.png' },
      { name: 'Sweet Potato', img: 'https://img.icons8.com/color/96/000000/sweet-potato.png' },
      { name: 'Avocado', img: 'https://img.icons8.com/color/96/000000/avocado.png' },
      { name: 'Cauliflower', img: 'https://img.icons8.com/color/96/000000/cauliflower.png' },
      { name: 'Ginger', img: 'https://img.icons8.com/color/96/000000/ginger.png' },
      { name: 'Lime', img: 'https://img.icons8.com/color/96/000000/lime.png' },
      { name: 'Lemon', img: 'https://twemoji.maxcdn.com/v/latest/72x72/1f34b.png' },
    ]
  },
  {
    label: 'Fruits',
    ingredients: [
      { name: 'Apple', img: 'https://img.icons8.com/color/96/000000/apple.png' },
      { name: 'Banana', img: 'https://img.icons8.com/color/96/000000/banana.png' },
      { name: 'Coconut', img: 'https://img.icons8.com/color/96/000000/coconut.png' },
      { name: 'Lime', img: 'https://img.icons8.com/color/96/000000/lime.png' },
      { name: 'Lemon', img: 'https://twemoji.maxcdn.com/v/latest/72x72/1f34b.png' },
      { name: 'Pumpkin', img: 'https://img.icons8.com/color/96/000000/pumpkin.png' },
      { name: 'Avocado', img: 'https://img.icons8.com/color/96/228B22/avocado.png' },
    ]
  },
  {
    label: 'Meat & Seafood',
    ingredients: [
      { name: 'Chicken', img: 'https://img.icons8.com/color/96/000000/chicken.png' },
      { name: 'Fish', img: 'https://img.icons8.com/color/96/000000/fish-food.png' },
      { name: 'Beef', img: 'https://img.icons8.com/color/96/000000/steak.png' },
      { name: 'Shrimp', img: 'https://img.icons8.com/color/96/FF69B4/prawn.png' },
      { name: 'Bacon', img: 'https://img.icons8.com/color/96/000000/bacon.png' },
      { name: 'Lamb', img: 'https://img.icons8.com/color/96/8B4513/steak.png' },
      { name: 'Turkey', img: 'https://img.icons8.com/color/96/000000/turkey.png' },
      { name: 'Ham', img: 'https://img.icons8.com/color/96/FF6347/bacon.png' },
      { name: 'Salmon', img: 'https://img.icons8.com/color/96/000000/salmon.png' },
      { name: 'Pork', img: 'https://twemoji.maxcdn.com/v/latest/72x72/1f953.png' },
      { name: 'Duck', img: 'https://img.icons8.com/color/96/000000/duck.png' },
      { name: 'Sausage', img: 'https://twemoji.maxcdn.com/v/latest/72x72/1f32d.png' },
    ]
  },
  {
    label: 'Dairy & Eggs',
    ingredients: [
      { name: 'Egg', img: 'https://img.icons8.com/color/96/000000/egg.png' },
      { name: 'Cheese', img: 'https://img.icons8.com/color/96/000000/cheese.png' },
      { name: 'Milk', img: 'https://img.icons8.com/color/96/000000/milk-bottle.png' },
      { name: 'Butter', img: 'https://img.icons8.com/color/96/000000/butter.png' },
      { name: 'Yogurt', img: 'https://img.icons8.com/color/96/000000/yogurt.png' },
      { name: 'Tofu', img: 'https://img.icons8.com/color/96/F5DEB3/cheese.png' },
    ]
  },
  {
    label: 'Grains & Legumes',
    ingredients: [
      { name: 'Pasta', img: 'https://img.icons8.com/color/96/000000/spaghetti.png' },
      { name: 'Rice', img: 'https://img.icons8.com/color/96/000000/rice-bowl.png' },
      { name: 'Bread', img: 'https://img.icons8.com/color/96/000000/bread.png' },
      { name: 'Chickpea', img: 'https://img.icons8.com/color/96/000000/chickpeas.png' },
      { name: 'Beans', img: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f4ab.png' },
      { name: 'Mushroom', img: 'https://img.icons8.com/color/96/000000/mushroom.png' },
      { name: 'Spinach', img: 'https://img.icons8.com/color/96/000000/spinach.png' },
    ]
  },
];

const MOCK_RECIPES = [
  {
    name: 'Tomato Omelette',
    ingredients: ['Tomato', 'Egg', 'Onion'],
    desc: 'A quick omelette with tomato and onion.'
  },
  {
    name: 'Chicken Curry',
    ingredients: ['Chicken', 'Onion', 'Tomato'],
    desc: 'Classic chicken curry with onion and tomato.'
  },
  {
    name: 'Veggie Stir Fry',
    ingredients: ['Broccoli', 'Carrot', 'Mushroom', 'Onion'],
    desc: 'A healthy stir fry with mixed veggies.'
  },
  {
    name: 'Cheesy Potato Bake',
    ingredients: ['Potato', 'Cheese'],
    desc: 'Baked potatoes with melted cheese.'
  },
  {
    name: 'Fish Fry',
    ingredients: ['Fish', 'Onion'],
    desc: 'Simple fried fish with onion.'
  },
  {
    name: 'Beef Stew',
    ingredients: ['Beef', 'Potato', 'Carrot', 'Onion'],
    desc: 'Hearty beef stew with root vegetables.'
  },
  {
    name: 'Spinach Omelette',
    ingredients: ['Egg', 'Spinach', 'Onion'],
    desc: 'Omelette with fresh spinach and onion.'
  }
];

function getRecipes(selected) {
  // Simple filter: recipe is shown if all its ingredients are in selected
  return MOCK_RECIPES.filter(r => r.ingredients.every(i => selected.includes(i)));
}

const AICook = () => {
  const [selected, setSelected] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [instructions, setInstructions] = useState('');
  const [loadingInstructions, setLoadingInstructions] = useState(false);
  const [tab, setTab] = useState(0);
  const [diet, setDiet] = useState('all');
  const [customInput, setCustomInput] = useState('');
  const [customIngredients, setCustomIngredients] = useState([]);

  const toggleIngredient = (name) => {
    setSelected(sel =>
      sel.includes(name) ? sel.filter(i => i !== name) : [...sel, name]
    );
  };

  const handleAddCustomIngredient = () => {
    if (customInput.trim() && !customIngredients.includes(customInput.trim())) {
      const newIngredient = customInput.trim();
      setCustomIngredients([...customIngredients, newIngredient]);
      setSelected([...selected, newIngredient]);
      setCustomInput('');
    }
  };

  const handleRemoveCustomIngredient = (name) => {
    setCustomIngredients(customIngredients.filter(i => i !== name));
    setSelected(selected.filter(i => i !== name));
  };

  const fetchWithTimeout = (url, timeout = 5000) => {
    return Promise.race([
      fetch(url),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Fetch timeout')), timeout)
      )
    ]);
  };

  const fetchFromTheMealDB = async (ingredients, filterVegetarian = false) => {
    try {
      const allMeals = new Map();
      const nonVegCategories = /seafood|meat|beef|pork|chicken/i;
      
      for (const ingredient of ingredients) {
        try {
          const res = await fetchWithTimeout(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`, 8000);
          if (!res.ok) continue;
          const data = await res.json();
          
          if (data.meals) {
            for (const meal of data.meals) {
              if (!allMeals.has(meal.idMeal)) {
                allMeals.set(meal.idMeal, {
                  id: meal.idMeal,
                  title: meal.strMeal,
                  image: meal.strMealThumb,
                  usedIngredients: [{ name: ingredient }],
                  missedIngredients: [],
                  source: 'themealdb',
                });
              } else {
                const existing = allMeals.get(meal.idMeal);
                existing.usedIngredients.push({ name: ingredient });
              }
            }
          }
        } catch (e) {
          console.warn(`Failed to fetch meals for ${ingredient}:`, e.message);
          continue;
        }
      }
      
      const candidates = Array.from(allMeals.values());
      if (candidates.length === 0) return null;
      
      if (!filterVegetarian) {
        return candidates.slice(0, 10);
      }
      
      const vegetarianResults = [];
      for (const meal of candidates) {
        if (vegetarianResults.length >= 10) break;
        if (nonVegCategories.test(meal.title)) continue;
        
        try {
          const detailRes = await fetchWithTimeout(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.id}`, 5000);
          if (!detailRes.ok) continue;
          const detailData = await detailRes.json();
          const fullMeal = detailData.meals?.[0];
          const category = fullMeal?.strCategory || '';
          const instructions = fullMeal?.strInstructions;
          
          if (nonVegCategories.test(category)) continue;
          
          vegetarianResults.push({
            ...meal,
            category,
            instructions,
          });
        } catch (e) {
          console.warn(`Failed to fetch details for ${meal.id}:`, e.message);
          continue;
        }
      }
      
      return vegetarianResults.length > 0 ? vegetarianResults : null;
    } catch (e) {
      console.error('TheMealDB error:', e);
      return null;
    }
  };

  const handleFindRecipes = async () => {
    setLoading(true);
    setError('');
    setShowResults(false);
    const apiKey = 'c973c874400d484dbace82e33c0ada06';
    const query = encodeURIComponent(selected.join(','));
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10&addRecipeInformation=true&apiKey=${apiKey}`;
    const nonVegKeywords = /chicken|beef|fish|pork|lamb|shrimp|meat|seafood|salmon|tuna|turkey|duck|bacon|ham|sausage|mutton/i;
    
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Spoonacular API error');
      const data = await res.json();
      
      let filteredData = data;

      if (diet === 'vegetarian') {
        const vegetarianResults = await Promise.all(data.map(async (recipe) => {
          if (nonVegKeywords.test(recipe.title)) {
            return null;
          }
          if (recipe.vegetarian === true || /vegetarian/i.test(recipe.title)) {
            return recipe;
          }
          try {
            const detailsRes = await fetch(
              `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`
            );
            if (!detailsRes.ok) return null;
            const details = await detailsRes.json();
            return details.vegetarian && !nonVegKeywords.test(details.title) ? { ...recipe, vegetarian: true } : null;
          } catch {
            return /vegetarian/i.test(recipe.title) && !nonVegKeywords.test(recipe.title) ? recipe : null;
          }
        }));
        filteredData = vegetarianResults.filter(Boolean);
      }

      if (filteredData.length === 0) {
        throw new Error('No recipes found from Spoonacular, trying alternative source...');
      }

      setRecipes(filteredData.map(r => ({ ...r, source: 'spoonacular' })));
    } catch (spoonacularError) {
      console.warn('Spoonacular failed, trying TheMealDB...', spoonacularError.message);
      const mealDBResults = await fetchFromTheMealDB(selected, diet === 'vegetarian');
      
      if (mealDBResults && mealDBResults.length > 0) {
        let filteredData = mealDBResults;
        
        if (diet === 'vegetarian') {
          filteredData = mealDBResults.filter(r => 
            !nonVegKeywords.test(r.title)
          );
        }
        
        setRecipes(filteredData.length > 0 ? filteredData : []);
        if (filteredData.length === 0) {
          setError('No vegetarian recipes found. Try "All" diet preference.');
        }
      } else {
        setRecipes([]);
        setError('Failed to fetch recipes from both sources. Please try again.');
      }
    }
    
    setShowResults(true);
    setLoading(false);
  };

  const handleReset = () => {
    setSelected([]);
    setRecipes([]);
    setShowResults(false);
    setSelectedRecipe(null);
    setInstructions('');
    setDiet('all');
  };

  const handleRecipeClick = async (recipe) => {
    setSelectedRecipe(recipe);
    setInstructions('');
    setLoadingInstructions(true);
    setError('');
    try {
      let instructionsText = '';
      
      if (recipe.instructions) {
        instructionsText = recipe.instructions;
      } else if (recipe.source === 'themealdb') {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.id}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch recipe details');
        const data = await res.json();
        if (data.meals && data.meals[0]) {
          instructionsText = data.meals[0].strInstructions || 'No instructions found.';
        } else {
          instructionsText = 'No instructions found.';
        }
      } else {
        const apiKey = 'c973c874400d484dbace82e33c0ada06';
        const url = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch recipe details');
        const data = await res.json();
        instructionsText = data.instructions || 'No instructions found.';
      }
      
      setInstructions(instructionsText);
    } catch (e) {
      setInstructions('Failed to fetch instructions.');
    }
    setLoadingInstructions(false);
  };

  return (
    <div className="ai-cook-page">
      <h1>🍳 AI Cook: Recipe Finder</h1>
      <p>Select the ingredients you have, and discover recipes you can cook right now!</p>
      <div className="diet-toggle">
        <span>Diet preference:</span>
        <button className={`diet-btn ${diet === 'all' ? 'active' : ''}`} onClick={() => setDiet('all')}>
          All
        </button>
        <button className={`diet-btn ${diet === 'vegetarian' ? 'active' : ''}`} onClick={() => setDiet('vegetarian')}>
          Vegetarian only
        </button>
      </div>
      
      <div className="ingredient-tabs">
        {INGREDIENT_CATEGORIES.map((cat, idx) => (
          <button
            key={cat.label}
            className={`tab-btn ${idx === tab ? 'active' : ''}`}
            onClick={() => setTab(idx)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      
      <div className="ingredients-grid">
        {(INGREDIENT_CATEGORIES[tab]?.ingredients || []).map(ing => (
          <div
            key={ing.name}
            className={`ingredient-card${selected.includes(ing.name) ? ' selected' : ''}`}
            onClick={() => toggleIngredient(ing.name)}
          >
            <img src={ing.img} alt={ing.name} />
            <span>{ing.name}</span>
          </div>
        ))}
      </div>

      <div className="custom-ingredient-section">
        <h3>Can't find an ingredient?</h3>
        <div className="custom-input-group">
          <input
            type="text"
            placeholder="Type an ingredient name..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddCustomIngredient()}
            className="custom-input"
          />
          <button onClick={handleAddCustomIngredient} className="add-btn">
            Add Ingredient
          </button>
        </div>
        
        {customIngredients.length > 0 && (
          <div className="custom-ingredients-list">
            <h4>Your Custom Ingredients:</h4>
            <div className="custom-tags">
              {customIngredients.map(ing => (
                <div key={ing} className="custom-tag">
                  <span>{ing}</span>
                  <button
                    className="remove-tag-btn"
                    onClick={() => handleRemoveCustomIngredient(ing)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="ai-cook-actions">
        <button className="find-recipes-btn" onClick={handleFindRecipes} disabled={selected.length === 0 || loading}>
          {loading ? '🔄 Searching...' : '🔍 Find Recipes'}
        </button>
        <button className="reset-btn" onClick={handleReset} disabled={(selected.length === 0 && !showResults) || loading}>
          ↻ Reset
        </button>
      </div>

      {loading && (
        <div className="recipes-list"><p>⏳ Loading recipes...</p></div>
      )}
      {error && (
        <div className="recipes-list"><p className="error-message">{error}</p></div>
      )}
      {showResults && !loading && !error && !selectedRecipe && (
        <div className="recipes-list">
          <h2>Recipes you can make:</h2>
          {recipes.length === 0 ? (
            <p className="no-recipes">No recipes found for the selected ingredients.</p>
          ) : (
            <ul>
              {recipes.map(r => (
                <li key={r.id} className="recipe-item" onClick={() => handleRecipeClick(r)}>
                  <strong>{r.title}</strong>
                  {r.image && <div className="recipe-image-container"><img src={r.image} alt={r.title} className="recipe-img" /></div>}
                  <br />
                  <span className="recipe-ings">
                    ✓ Used: {r.usedIngredients?.map(i => i.name).join(', ')}<br/>
                    ✗ Missed: {r.missedIngredients?.map(i => i.name).join(', ')}
                  </span>
                  <div className="view-recipe-btn">👉 Click for full recipe</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {selectedRecipe && (
        <div className="recipes-list recipe-details">
          <button onClick={() => { setSelectedRecipe(null); setInstructions(''); }} className="back-btn">
            ← Back to recipes
          </button>
          <h2>{selectedRecipe.title}</h2>
          {selectedRecipe.image && <div className="recipe-detail-image"><img src={selectedRecipe.image} alt={selectedRecipe.title} /></div>}
          <div className="recipe-ings recipe-info">
            <div className="ingredients-info">
              <strong>✓ Used Ingredients:</strong> {selectedRecipe.usedIngredients?.map(i => i.name).join(', ')}
            </div>
            <div className="missing-info">
              <strong>✗ Missed Ingredients:</strong> {selectedRecipe.missedIngredients?.map(i => i.name).join(', ')}
            </div>
          </div>
          {loadingInstructions ? (
            <p>⏳ Loading instructions...</p>
          ) : (
            <div className="instructions-section">
              <h3>Instructions</h3>
              <div className="instructions-content" dangerouslySetInnerHTML={{__html: instructions}} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AICook;
