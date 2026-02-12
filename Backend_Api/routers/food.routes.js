const express = require('express');
const router = express.Router();
const { getAllFoods, createFood, updateFood, deleteFood, patchFood } = require('../controllers/food.controller');
const upload = require('../middleware/upload');




router.get('/foods', getAllFoods);
router.post('/foods', upload.single('img'), createFood);
router.put('/foods/:id', updateFood);
router.delete('/foods/:id', deleteFood);
router.patch('/foods/:id', patchFood);


module.exports = router;
