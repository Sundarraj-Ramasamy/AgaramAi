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
      { name: 'Bell Pepper', img: 'https://img.icons8.com/color/96/000000/bell-pepper.png' },
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
      { name: 'Lemon', img: 'https://img.icons8.com/color/96/000000/lemon.png' },
    ]
  },
  {
    label: 'Fruits',
    ingredients: [
      { name: 'Apple', img: 'https://img.icons8.com/color/96/000000/apple.png' },
      { name: 'Banana', img: 'https://img.icons8.com/color/96/000000/banana.png' },
      { name: 'Coconut', img: 'https://img.icons8.com/color/96/000000/coconut.png' },
      { name: 'Lime', img: 'https://img.icons8.com/color/96/000000/lime.png' },
      { name: 'Lemon', img: 'https://img.icons8.com/color/96/000000/lemon.png' },
      { name: 'Pumpkin', img: 'https://img.icons8.com/color/96/000000/pumpkin.png' },
      { name: 'Avocado', img: 'https://img.icons8.com/color/96/000000/avocado.png' },
    ]
  },
  {
    label: 'Meat & Seafood',
    ingredients: [
      { name: 'Chicken', img: 'https://img.icons8.com/color/96/000000/chicken.png' },
      { name: 'Fish', img: 'https://img.icons8.com/color/96/000000/fish-food.png' },
      { name: 'Beef', img: 'https://img.icons8.com/color/96/000000/steak.png' },
      { name: 'Shrimp', img: 'https://img.icons8.com/color/96/000000/shrimp.png' },
      { name: 'Bacon', img: 'https://img.icons8.com/color/96/000000/bacon.png' },
      { name: 'Lamb', img: 'https://img.icons8.com/color/96/000000/lamb-rack.png' },
      { name: 'Turkey', img: 'https://img.icons8.com/color/96/000000/turkey.png' },
      { name: 'Ham', img: 'https://img.icons8.com/color/96/000000/ham.png' },
      { name: 'Salmon', img: 'https://img.icons8.com/color/96/000000/salmon.png' },
      { name: 'Pork', img: 'https://img.icons8.com/color/96/000000/pork.png' },
      { name: 'Duck', img: 'https://img.icons8.com/color/96/000000/duck.png' },
      { name: 'Sausage', img: 'https://img.icons8.com/color/96/000000/sausage.png' },
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
      { name: 'Tofu', img: 'https://img.icons8.com/color/96/000000/tofu.png' },
    ]
  },
  {
    label: 'Grains & Legumes',
    ingredients: [
      { name: 'Pasta', img: 'https://img.icons8.com/color/96/000000/spaghetti.png' },
      { name: 'Rice', img: 'https://img.icons8.com/color/96/000000/rice-bowl.png' },
      { name: 'Bread', img: 'https://img.icons8.com/color/96/000000/bread.png' },
      { name: 'Chickpea', img: 'https://img.icons8.com/color/96/000000/chickpeas.png' },
      { name: 'Beans', img: 'https://img.icons8.com/color/96/000000/beans.png' },
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

  const toggleIngredient = (name) => {
    setSelected(sel =>
      sel.includes(name) ? sel.filter(i => i !== name) : [...sel, name]
    );
  };

  const handleFindRecipes = async () => {
    setLoading(true);
    setError('');
    setShowResults(false);
    const apiKey = 'c973c874400d484dbace82e33c0ada06';
    const query = selected.join(',');
    const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10&apiKey=${apiKey}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      setRecipes(data);
    } catch (e) {
      setRecipes([]);
      setError('Failed to fetch recipes. Please try again.');
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
  };

  const handleRecipeClick = async (recipe) => {
    setSelectedRecipe(recipe);
    setInstructions('');
    setLoadingInstructions(true);
    setError('');
    try {
      const apiKey = 'c973c874400d484dbace82e33c0ada06';
      const url = `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${apiKey}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch recipe details');
      const data = await res.json();
      setInstructions(data.instructions || 'No instructions found.');
    } catch (e) {
      setInstructions('Failed to fetch instructions.');
    }
    setLoadingInstructions(false);
  };

  return (
    <div className="ai-cook-page">
      <h1>AI Cook: Recipe Finder</h1>
      <p>Select the ingredients you have, and discover recipes you can cook right now!</p>
      <div className="ingredient-tabs">
        {INGREDIENT_CATEGORIES.map((cat, idx) => (
          <button
            key={cat.label}
            className={idx === tab ? 'active' : ''}
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
      <div className="ai-cook-actions">
        <button onClick={handleFindRecipes} disabled={selected.length === 0 || loading}>
          {loading ? 'Searching...' : 'Find Recipes'}
        </button>
        <button onClick={handleReset} disabled={(selected.length === 0 && !showResults) || loading}>
          Reset
        </button>
      </div>
      {loading && (
        <div className="recipes-list"><p>Loading recipes...</p></div>
      )}
      {error && (
        <div className="recipes-list"><p style={{color: 'red'}}>{error}</p></div>
      )}
      {showResults && !loading && !error && !selectedRecipe && (
        <div className="recipes-list">
          <h2>Recipes you can make:</h2>
          {recipes.length === 0 ? (
            <p>No recipes found for the selected ingredients.</p>
          ) : (
            <ul>
              {recipes.map(r => (
                <li key={r.id} style={{cursor: 'pointer'}} onClick={() => handleRecipeClick(r)}>
                  <strong>{r.title}</strong>
                  {r.image && <div><img src={r.image} alt={r.title} style={{maxWidth: '200px'}} /></div>}
                  <br />
                  <span className="recipe-ings">
                    Used: {r.usedIngredients?.map(i => i.name).join(', ')}<br/>
                    Missed: {r.missedIngredients?.map(i => i.name).join(', ')}
                  </span>
                  <div style={{color:'#0097a7', fontSize:'0.95rem'}}>Click for full recipe</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {selectedRecipe && (
        <div className="recipes-list">
          <button onClick={() => { setSelectedRecipe(null); setInstructions(''); }} style={{marginBottom:'1rem'}}>← Back to recipes</button>
          <h2>{selectedRecipe.title}</h2>
          {selectedRecipe.image && <div><img src={selectedRecipe.image} alt={selectedRecipe.title} style={{maxWidth: '300px'}} /></div>}
          <div className="recipe-ings">
            Used: {selectedRecipe.usedIngredients?.map(i => i.name).join(', ')}<br/>
            Missed: {selectedRecipe.missedIngredients?.map(i => i.name).join(', ')}
          </div>
          {loadingInstructions ? (
            <p>Loading instructions...</p>
          ) : (
            <div style={{marginTop:'1rem'}}>
              <h3>Instructions</h3>
              <div dangerouslySetInnerHTML={{__html: instructions}} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AICook;
