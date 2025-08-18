const express = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all products with filtering and search
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      category, 
      sortBy = 'createdAt', 
      sortOrder = 'desc',
      page = 1,
      limit = 12,
      isDiscounted,
      isTopSelling,
      isNewlyLaunched
    } = req.query;

    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Category filter
    if (category) {
      query.category = { $regex: `^${category}$`, $options: 'i' };
    }

    // Special filters
    if (isDiscounted === 'true') query.isDiscounted = true;
    if (isTopSelling === 'true') query.isTopSelling = true;
    if (isNewlyLaunched === 'true') query.isNewlyLaunched = true;

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get top selling products
router.get('/top', async (req, res) => {
  try {
    const limit = req.query.limit || 6;
    const topProducts = await Product.find({ isTopSelling: true })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));
    
    res.json(topProducts);
  } catch (error) {
    console.error('Get top products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;