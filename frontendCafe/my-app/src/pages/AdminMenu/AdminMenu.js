import React, { useEffect, useState } from 'react';
import './AdminMenu.css';
import apiFetch from '../../services/api';

const initialFormState = {
  name: '',
  price: '',
  description: '',
  category: 'food',
  img: ''
};

const AdminMenu = () => {
  const [form, setForm] = useState(initialFormState);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const API_BASE = '/api/foods';

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await apiFetch(API_BASE);
      if (!res.ok) {
        throw new Error('Failed to fetch menu items');
      }
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load menu items. Make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      price: item.price.toString(),
      description: item.description,
      category: item.category,
      img: item.img || ''
    });
    setEditingId(item._id);
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setForm(initialFormState);
    setEditingId(null);
    setError('');
    setSuccess('');
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Failed to delete item');
      }

      setSuccess('Item deleted successfully');
      setDeleteConfirm(null);
      fetchItems();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to delete item');
      setDeleteConfirm(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!form.name.trim() || !form.price || !form.description.trim()) {
      setError('Please fill in name, price, and description.');
      return;
    }

    const priceNum = Number(form.price);
    if (isNaN(priceNum) || priceNum < 0) {
      setError('Price must be a valid positive number.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      price: priceNum,
      description: form.description.trim(),
      category: form.category,
      img: form.img.trim() || undefined
    };

    try {
      setSubmitting(true);

      if (editingId) {
        // Update existing item
        const res = await fetch(`${API_BASE}/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Failed to update menu item');
        }

        setSuccess('Menu item updated successfully!');
        setEditingId(null);
      } else {
        // Create new item
        const res = await fetch(API_BASE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (res.status === 409) {
          const data = await res.json();
          setError(data.message || 'Item already exists');
          return;
        }

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || 'Failed to create menu item');
        }

        setSuccess('Menu item created successfully!');
      }

      setForm(initialFormState);
      fetchItems();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save menu item');
    } finally {
      setSubmitting(false);
    }
  };

  const foodItems = items.filter((item) => item.category === 'food');
  const drinkItems = items.filter((item) => item.category === 'drink');

  return (
    <div className="admin-menu-page">
      <div className="admin-menu-container">
        <h2>Admin: Manage Menu</h2>
        <p className="admin-subtitle">Add, edit, or delete menu items</p>

        <form className="admin-menu-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>{editingId ? 'Edit Menu Item' : 'Add New Menu Item'}</h3>
            {editingId && (
              <button
                type="button"
                className="btn-cancel"
                onClick={handleCancelEdit}
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className="form-grid">
            <div className="form-row">
              <label>
                Name <span className="required">*</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Espresso, Burger, Pizza..."
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Price (ETB) <span className="required">*</span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </label>
            </div>

            <div className="form-row full-width">
              <label>
                Description <span className="required">*</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Short description of the item"
                  required
                />
              </label>
            </div>

            <div className="form-row">
              <label>
                Category <span className="required">*</span>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                >
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                </select>
              </label>
            </div>

            <div className="form-row full-width">
              <label>
                Image URL (optional)
                <input
                  type="url"
                  name="img"
                  value={form.img}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
                <small>Must be a valid image URL (http:// or https://)</small>
              </label>
            </div>
          </div>

          {error && <div className="form-message error">{error}</div>}
          {success && <div className="form-message success">{success}</div>}

          <button type="submit" className="btn-submit" disabled={submitting}>
            {submitting ? 'Saving...' : editingId ? 'Update Item' : 'Add Menu Item'}
          </button>
        </form>

        <div className="admin-menu-lists">
          <section className="menu-section-admin">
            <h3>
              Food Items <span className="item-count">({foodItems.length})</span>
            </h3>
            {loading && <p className="loading-text">Loading menu...</p>}
            {!loading && foodItems.length === 0 && (
              <p className="empty-text">No food items yet. Add one above!</p>
            )}
            {!loading && foodItems.length > 0 && (
              <div className="items-grid">
                {foodItems.map((item) => (
                  <div key={item._id} className="admin-item-card">
                    {item.img ? (
                      <img src={item.img} alt={item.name} />
                    ) : (
                      <div className="item-placeholder">No image</div>
                    )}
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <div className="item-price">{item.price} ETB</div>
                    </div>
                    <div className="item-actions">
                      <button
                        type="button"
                        className="btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => setDeleteConfirm(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                    {deleteConfirm === item._id && (
                      <div className="delete-confirm">
                        <p>Delete this item?</p>
                        <div>
                          <button
                            type="button"
                            className="btn-confirm-yes"
                            onClick={() => handleDelete(item._id)}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className="btn-confirm-no"
                            onClick={() => setDeleteConfirm(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="menu-section-admin">
            <h3>
              Drink Items <span className="item-count">({drinkItems.length})</span>
            </h3>
            {loading && <p className="loading-text">Loading menu...</p>}
            {!loading && drinkItems.length === 0 && (
              <p className="empty-text">No drink items yet. Add one above!</p>
            )}
            {!loading && drinkItems.length > 0 && (
              <div className="items-grid">
                {drinkItems.map((item) => (
                  <div key={item._id} className="admin-item-card">
                    {item.img ? (
                      <img src={item.img} alt={item.name} />
                    ) : (
                      <div className="item-placeholder">No image</div>
                    )}
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <div className="item-price">{item.price} ETB</div>
                    </div>
                    <div className="item-actions">
                      <button
                        type="button"
                        className="btn-edit"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="btn-delete"
                        onClick={() => setDeleteConfirm(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                    {deleteConfirm === item._id && (
                      <div className="delete-confirm">
                        <p>Delete this item?</p>
                        <div>
                          <button
                            type="button"
                            className="btn-confirm-yes"
                            onClick={() => handleDelete(item._id)}
                          >
                            Yes
                          </button>
                          <button
                            type="button"
                            className="btn-confirm-no"
                            onClick={() => setDeleteConfirm(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
