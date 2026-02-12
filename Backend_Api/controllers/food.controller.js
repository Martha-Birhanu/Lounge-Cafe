const Food = require('../models/food.model.js');


// GET all food or drink items (optionally filtered by category)
const getAllFoods = async (req, res) => {
  const { category } = req.query;

  try {
    const query = category ? { category } : {};
    const foods = await Food.find(query);
    res.status(200).json(foods);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ message: 'Failed to retrieve food items.' });
  }
};

const createFood = async (req, res) => {
  const { name, price, description, category = 'food', img } = req.body;
  // Prefer uploaded file path if present, otherwise accept image URL/string from body
  const imgPath = req.file ? req.file.path : img || null;

  try {
    const existing = await Food.findOne({ name });
    if (existing) {
      return res.status(409).json({ message: 'Food item already exists.' });
    }

    const newFood = new Food({ name, price, description, category, img: imgPath });
    await newFood.save();

    res.status(201).json({ message: 'Food item created successfully!', food: newFood });
  } catch (error) {
    console.error('Error creating food:', error);
    res.status(500).json({ message: 'Failed to create food item.' });
  }
};


// PUT — Fully update a food item
const updateFood = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, img } = req.body;

  try {
    const updated = await Food.findByIdAndUpdate(
      id,
      { name, price, description, category, img },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    res.status(200).json({ message: 'Food item updated successfully.', food: updated });
  } catch (error) {
    console.error('Error updating food:', error);
    res.status(500).json({ message: 'Failed to update food item.' });
  }
};


// PATCH — Partially update a food item
const patchFood = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const patched = await Food.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!patched) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    res.status(200).json({ message: 'Food item patched successfully.', food: patched });
  } catch (error) {
    console.error('Error patching food:', error);
    res.status(500).json({ message: 'Failed to patch food item.' });
  }
};

// DELETE — Delete a food item
const deleteFood = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Food.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Food item not found.' });
    }

    res.status(200).json({ message: 'Food item deleted successfully.' });
  } catch (error) {
    console.error('Error deleting food:', error);
    res.status(500).json({ message: 'Failed to delete food item.' });
  }
};






module.exports = {
  getAllFoods,
  createFood,
  updateFood,
  deleteFood,
  patchFood
};
