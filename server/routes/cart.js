const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const TerraKit = require('../models/TerraKit');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user cart
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .populate('cart.product')
      .populate('cart.terrakit');
    
    res.json(user.cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to cart
router.post('/add', auth, async (req, res) => {
  try {
    const { productId, terrakitId, quantity = 1 } = req.body;
    
    const user = await User.findById(req.userId);
    
    if (productId) {
      const existingItem = user.cart.find(item => 
        item.product && item.product.toString() === productId
      );
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        user.cart.push({ product: productId, quantity });
      }
    }
    
    if (terrakitId) {
      // Check if terrakit already exists in cart
      const existingTerrakit = user.cart.find(item => 
        item.terrakit && item.terrakit.toString() === terrakitId
      );
      
      if (existingTerrakit) {
        // TerraKit is already in cart, just update quantity if needed
        existingTerrakit.quantity = quantity;
      } else {
        // Add new TerraKit to cart
        user.cart.push({ terrakit: terrakitId, quantity: 1 });
      }
    }
    
    await user.save();
    await user.populate('cart.product cart.terrakit');
    
    res.json(user.cart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear cart
router.delete('/clear', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart = [];
    await user.save();
    
    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Remove from cart
router.delete('/remove/:itemId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart = user.cart.filter(item => item._id.toString() !== req.params.itemId);
    await user.save();
    
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item quantity
router.put('/update/:itemId', auth, async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.userId);
    
    const cartItem = user.cart.find(item => item._id.toString() === req.params.itemId);
    if (cartItem) {
      cartItem.quantity = quantity;
      await user.save();
    }
    
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;