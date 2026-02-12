import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Drink.css';

const DrinkPage = () => {
  const navigate = useNavigate();
  const [drinkItems, setDrinkItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch('/api/foods?category=drink')
      .then(res => res.json())
      .then(data => setDrinkItems(data))
      .catch(err => {
        console.error('Failed to fetch drink items', err);
        setError('Could not load the menu.');
        setDrinkItems([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="menu-page">
      <div className="menu-page-header">
        <button type="button" className="menu-page-back" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2>Our Drink Menu</h2>
      </div>
      {loading && <p className="menu-page-message">Loading menu…</p>}
      {error && <p className="menu-page-message menu-page-error">{error}</p>}
      {!loading && !error && drinkItems.length === 0 && (
        <p className="menu-page-message">No drinks yet. Check back soon.</p>
      )}
      {!loading && !error && drinkItems.length > 0 && (
        <div className="menu-grid">
          {drinkItems.map(item => (
            <div key={item._id} className="menu-item-card">
              {item.img ? (
                <img src={item.img} alt={item.name} />
              ) : (
                <div className="menu-item-card-placeholder">No image</div>
              )}
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span>{item.price} ETB</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DrinkPage;