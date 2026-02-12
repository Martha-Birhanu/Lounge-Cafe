import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Food.css';
import apiFetch from '../../services/api';   // ← import your helper

const FoodPage = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFood = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use apiFetch – it handles base URL automatically
        const data = await apiFetch('/foods?category=food');

        setFoodItems(data || []);
      } catch (err) {
        console.error('Failed to fetch food items:', err);
        setError(err.message || 'Could not load the food menu. Please try again later.');
        setFoodItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadFood();
  }, []);

  return (
    <div className="menu-page">
      <div className="menu-page-header">
        <button 
          type="button" 
          className="menu-page-back" 
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <h2>Our Food Menu</h2>
      </div>

      {loading && <p className="menu-page-message">Loading menu…</p>}

      {error && <p className="menu-page-message menu-page-error">{error}</p>}

      {!loading && !error && foodItems.length === 0 && (
        <p className="menu-page-message">No food items yet. Check back soon.</p>
      )}

      {!loading && !error && foodItems.length > 0 && (
        <div className="menu-grid">
          {foodItems.map(item => (
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

export default FoodPage;