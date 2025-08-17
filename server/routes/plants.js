const express = require('express');
const Plant = require('../models/Plant');

const router = express.Router();

// Get all plants with search
router.get('/', async (req, res) => {
  try {
    const { search, category, page = 1, limit = 12 } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { scientificName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (category) {
      query.category = category;
    }
    
    const plants = await Plant.find(query)
      .populate('recommendedProducts.pesticides')
      .populate('recommendedProducts.fertilizers')
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Plant.countDocuments(query);
    
    res.json({
      plants,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get plants error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get plant by ID
router.get('/:id', async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id)
      .populate('recommendedProducts.pesticides')
      .populate('recommendedProducts.fertilizers');
    
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    
    res.json(plant);
  } catch (error) {
    console.error('Get plant error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search plants (instant search)
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    
    const plants = await Plant.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { scientificName: { $regex: query, $options: 'i' } }
      ]
    }).limit(10).select('name scientificName images');
    
    res.json(plants);
  } catch (error) {
    console.error('Search plants error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;