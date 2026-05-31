import React, { useState } from 'react';
import './CanIEat.css';

const healthOptions = [
  'Diabetic',
  'Hypertension',
  'Acidity',
  'Pregnant',
  'Heart Condition',
  'Lactose Intolerant'
];

const climateOptions = ['Hot', 'Cold', 'Rainy', 'Humid', 'Normal'];
const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];
const lifestyleOptions = ['Active', 'Sedentary', 'Fitness'];

const contains = (text, pattern) => pattern.test(text);

const normalizeText = (text) => (text || '').toString().toLowerCase();

const stripHtml = (html) => (html || '').toString().replace(/<[^>]+>/g, '').trim();

const normalizeAllergyTerms = (allergies) => {
  return allergies
    .split(/[,;\/]+/)
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean)
    .map((term) => term.replace(/[^a-z0-9]+/g, ' ').trim())
    .filter(Boolean);
};

const allergyMatches = (foodText, allergies) => {
  if (!allergies || !foodText) return false;
  const normalizedFoodText = normalizeText(foodText);
  const terms = normalizeAllergyTerms(allergies);

  return terms.some((term) => {
    const wordBoundary = new RegExp(`\\b${term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
    return wordBoundary.test(normalizedFoodText) || normalizedFoodText.includes(term);
  });
};

const extractAllergenText = (product) => {
  if (!product) return '';

  const fields = [
    product.allergens,
    Array.isArray(product.allergens_tags) ? product.allergens_tags.join(' ') : product.allergens_tags,
    product.allergens_from_ingredients,
    Array.isArray(product.allergens_from_ingredients_tags) ? product.allergens_from_ingredients_tags.join(' ') : product.allergens_from_ingredients_tags,
    Array.isArray(product.allergens_hierarchy) ? product.allergens_hierarchy.join(' ') : product.allergens_hierarchy,
    product.traces,
    product.traces_from_ingredients,
    product.traces_from_user,
    product.ingredients_text_with_allergens,
    product.ingredients_text_with_allergens_en,
    product.ingredients_text_with_allergens_fr,
    product.ingredients_text,
    Array.isArray(product.ingredients_hierarchy) ? product.ingredients_hierarchy.join(' ') : product.ingredients_hierarchy,
    product.categories,
    product.labels,
    product.generic_name,
    product.product_name
  ];

  return fields.filter(Boolean).join(' ').toLowerCase();
};

const RULES = [
  {
    predicate: (context, profile) => allergyMatches(context.allergens + ' ' + context.ingredients + ' ' + context.query, profile.allergies),
    result: 'avoid',
    reason: 'This food contains one of your listed allergy ingredients.',
    alternative: 'Avoid this item and choose a safe alternative that does not contain your allergens.'
  },
  {
    predicate: (context, profile) => profile.healthConditions.includes('Diabetic') && contains(context.query, /sugar|jalebi|gulab|ladoo|mithai|barfi|kaju katli|ice cream|dessert|cold drink|soda|juice|sweet/),
    result: 'avoid',
    reason: 'High sugar foods can spike blood sugar levels for diabetic users.',
    alternative: 'Choose a low-sugar option like mixed sprouts, salad, or unsweetened curd.'
  },
  {
    predicate: (context, profile) => profile.healthConditions.includes('Diabetic') && (contains(context.query, /biryani|parotta|fried|oily|samosa|pakora/) || contains(context.ingredients, /oil|sugar|fat/)),
    result: 'moderate',
    reason: 'Heavy, oily meals are harder to digest for diabetic users and can affect metabolism.',
    alternative: 'Try a lighter, non-fried meal like khichdi, dal, or steamed vegetables.'
  },
  {
    predicate: (context, profile) => profile.healthConditions.includes('Hypertension') && (contains(context.query, /salt|pickles|papad|biryani|parotta|fried|burger|pizza/) || contains(context.ingredients, /salt|sodium/)),
    result: 'moderate',
    reason: 'High-sodium or very oily foods can raise blood pressure.',
    alternative: 'Choose a balanced meal with vegetables, dal, and whole grains.'
  },
  {
    predicate: (context, profile) => profile.healthConditions.includes('Acidity') && (contains(context.query, /spicy|tomato|chili|coffee|tea|fried|pickle/) || contains(context.ingredients, /chil|spice|tomato|coffee/)),
    result: 'avoid',
    reason: 'This food is likely to worsen acidity or heartburn.',
    alternative: 'Choose soothing foods like moong dal khichdi or plain idli.'
  },
  {
    predicate: (context, profile) => profile.healthConditions.includes('Lactose Intolerant') && (contains(context.query, /milk|cheese|ice cream|yogurt|paneer|butter/) || contains(context.ingredients, /milk|cheese|butter|cream|yogurt/)),
    result: 'avoid',
    reason: 'Dairy products may cause discomfort for lactose intolerant users.',
    alternative: 'Try plant-based milk or coconut yogurt instead.'
  },
  {
    predicate: (context, profile) => profile.healthConditions.includes('Pregnant') && (contains(context.query, /raw fish|undercooked|alcohol|caffeine|coffee|energy drink/) || contains(context.ingredients, /raw fish|uncooked|caffeine/)),
    result: 'avoid',
    reason: 'Certain foods and drinks are best avoided during pregnancy for safety.',
    alternative: 'Choose cooked lean proteins, fresh fruits, and warm dals.'
  },
  {
    predicate: (context, profile) => profile.timeOfDay === 'Night' && (contains(context.query, /heavy|fried|pizza|burger|biryani|parotta|pasta|samosa/) || contains(context.ingredients, /oil|fried|heavy/)),
    result: 'moderate',
    reason: 'Eating heavy meals late at night can disturb sleep and digestion.',
    alternative: 'Try a light dinner like steamed veggies, soup, or idli.'
  },
  {
    predicate: (context, profile) => profile.climate === 'Hot' && (contains(context.query, /fried|oily|pizza|burger|biryani|parotta|samosa|pakora/) || contains(context.ingredients, /oil|fried|heavy/)),
    result: 'moderate',
    reason: 'Heavy and oily foods can feel too heavy in hot weather.',
    alternative: 'Choose a lighter meal like upma, salad, or rasam with rice.'
  },
  {
    predicate: (context, profile) => profile.climate === 'Cold' && (contains(context.query, /soup|stew|tea|coffee|porridge|kheer|halwa|thick gravy/) || contains(context.ingredients, /warm|stew|spice/)),
    result: 'safe',
    reason: 'Warm and comforting foods help maintain body heat in cold weather.',
    alternative: 'Continue with warm meals like soup, dal, or khichdi.'
  },
  {
    predicate: (context, profile) => profile.lifestyle === 'Sedentary' && (contains(context.query, /fried|oily|pizza|burger|biryani|parotta|sweets/) || contains(context.ingredients, /oil|fried|sugar/)),
    result: 'moderate',
    reason: 'Sedentary lifestyles benefit from lighter meals to avoid sluggishness.',
    alternative: 'Choose more vegetables, whole grains, and lean protein.'
  },
  {
    predicate: (context, profile) => Number(profile.age) >= 60 && (contains(context.query, /fried|spicy|biryani|parotta|pakora/) || contains(context.ingredients, /spice|oil|fried/)),
    result: 'moderate',
    reason: 'Older adults may find heavy or spicy foods harder to digest.',
    alternative: 'Choose softer, easier-to-digest meals like idli, porridge, or dal.'
  }
];

const defaultProfile = {
  age: '',
  gender: 'Male',
  healthConditions: [],
  allergies: '',
  climate: 'Normal',
  timeOfDay: 'Afternoon',
  lifestyle: 'Active'
};

const CanIEat = () => {
  const [profile, setProfile] = useState(defaultProfile);
  const [food, setFood] = useState('');
  const [foodInfo, setFoodInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckboxToggle = (condition) => {
    setProfile((prev) => ({
      ...prev,
      healthConditions: prev.healthConditions.includes(condition)
        ? prev.healthConditions.filter((item) => item !== condition)
        : [...prev.healthConditions, condition]
    }));
  };

  const evaluateFood = async () => {
    if (!food.trim()) {
      setError('Please enter a food to evaluate.');
      setResult(null);
      setFoodInfo(null);
      return;
    }

    setError('');
    setLoading(true);
    setFoodInfo(null);

    try {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(food.trim())}&search_simple=1&action=process&json=1&page_size=5&lc=en`;
      const response = await fetch(url);

      if (!response.ok) {
        const contentType = response.headers.get('content-type') || '';
        const errorData = contentType.includes('application/json') ? await response.json() : null;
        const friendlyMessage = response.status === 503
          ? 'OpenFoodFacts is temporarily unavailable. Please try again later.'
          : errorData?.error || `Failed to fetch food data (${response.status}).`;

        throw new Error(friendlyMessage);
      }

      const data = await response.json();
      const products = data.products || [];
      const product = products.find((item) => item.allergens_lc === 'en') || null;

      if (!product) {
        throw new Error('No English allergen product was found for this search. Please try a different food item.');
      }

      setFoodInfo(product);

      const normalizedQuery = food.trim().toLowerCase();
      const allergenText = extractAllergenText(product);
      const context = {
        query: normalizedQuery,
        ingredients: (product?.ingredients_text || '').toLowerCase(),
        allergens: allergenText,
        categories: (product?.categories || '').toLowerCase()
      };

      const matchedRule = RULES.find((rule) => rule.predicate(context, profile));
      if (matchedRule) {
        setResult(matchedRule);
      } else {
        setResult({
          result: 'safe',
          reason: 'This food appears suitable based on your current profile and the available food database information.',
          alternative: 'If you want, try a balanced option like dal, vegetables, or whole grains.'
        });
      }
    } catch (fetchError) {
      setError(fetchError.message || 'Unable to fetch food information.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    evaluateFood();
  };

  return (
    <div className="can-i-eat-page">
      <div className="page-header">
        <h1>Can I Eat?</h1>
        <p>Get a quick food recommendation based on your health, weather, and daily context.</p>
      </div>

      <div className="can-i-eat-grid">
        <section className="profile-card">
          <h2>Your Health Profile</h2>
          <form onSubmit={handleSubmit} className="profile-form">
            <label>
              Age
              <input
                type="number"
                min="1"
                value={profile.age}
                onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                placeholder="Enter your age"
              />
            </label>

            <label>
              Gender
              <select
                value={profile.gender}
                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </label>

            <div className="checkbox-group">
              <span>Health conditions</span>
              {healthOptions.map((condition) => (
                <label key={condition} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={profile.healthConditions.includes(condition)}
                    onChange={() => handleCheckboxToggle(condition)}
                  />
                  {condition}
                </label>
              ))}
            </div>

            <label>
              Allergies
              <input
                type="text"
                value={profile.allergies}
                onChange={(e) => setProfile({ ...profile, allergies: e.target.value })}
                placeholder="e.g. nuts, dairy"
              />
            </label>

            <label>
              Climate
              <select
                value={profile.climate}
                onChange={(e) => setProfile({ ...profile, climate: e.target.value })}
              >
                {climateOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>

            <label>
              Time of day
              <select
                value={profile.timeOfDay}
                onChange={(e) => setProfile({ ...profile, timeOfDay: e.target.value })}
              >
                {timeOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>

            <label>
              Lifestyle
              <select
                value={profile.lifestyle}
                onChange={(e) => setProfile({ ...profile, lifestyle: e.target.value })}
              >
                {lifestyleOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </label>
          </form>
        </section>

        <section className="food-card">
          <h2>Food Check</h2>
          <form onSubmit={handleSubmit} className="food-form">
            <label>
              Food name
              <input
                type="text"
                value={food}
                onChange={(e) => setFood(e.target.value)}
                placeholder="Type a food name like biryani or juice"
              />
            </label>
            <button type="submit" className="evaluate-btn" disabled={loading}>
              {loading ? 'Searching...' : 'Evaluate Food'}
            </button>
            {error && <p className="error-text">{error}</p>}
          </form>

          {loading && <p className="loading-text">Searching food database for the best match...</p>}

          {foodInfo && (
            <div className="food-info-card">
              <h3>Food database match</h3>
              <p><strong>Name:</strong> {foodInfo.product_name}</p>
              {foodInfo.brands && <p><strong>Brand:</strong> {foodInfo.brands}</p>}
              {foodInfo.categories && <p><strong>Categories:</strong> {foodInfo.categories}</p>}
              {(foodInfo.allergens_from_ingredients || foodInfo.allergens) && (
                <p><strong>Allergens:</strong> {stripHtml(foodInfo.allergens_from_ingredients || foodInfo.allergens)}</p>
              )}
              {foodInfo.traces && <p><strong>May contain traces:</strong> {stripHtml(foodInfo.traces)}</p>}
              {foodInfo.ingredients_text_with_allergens_en ? (
                <p><strong>Ingredients (with allergens):</strong> {stripHtml(foodInfo.ingredients_text_with_allergens_en)}</p>
              ) : foodInfo.ingredients_text && (
                <p><strong>Ingredients:</strong> {stripHtml(foodInfo.ingredients_text)}</p>
              )}
            </div>
          )}

          {result && (
            <div className={`result-card result-${result.result}`}>
              <div className="result-badge">
                {result.result === 'safe' ? '✅ Safe to Eat' : result.result === 'moderate' ? '⚠️ Eat Moderately' : '❌ Avoid Now'}
              </div>
              <p className="result-reason"><strong>Why?</strong> {result.reason}</p>
              <p className="result-alt"><strong>Better alternative:</strong> {result.alternative}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CanIEat;
