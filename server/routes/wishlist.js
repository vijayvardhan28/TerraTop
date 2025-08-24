// const express = require('express');
// const User = require('../models/User');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // Get user wishlist
// router.get('/', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).populate('wishlist');
//     res.json(user.wishlist);
//   } catch (error) {
//     console.error('Get wishlist error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Add to wishlist
// router.post('/add/:productId', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);
    
//     if (!user.wishlist.includes(req.params.productId)) {
//       user.wishlist.push(req.params.productId);
//       await user.save();
//     }
    
//     res.json({ message: 'Added to wishlist' });
//   } catch (error) {
//     console.error('Add to wishlist error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Remove from wishlist
// router.delete('/remove/:productId', auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.userId);
//     user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
//     await user.save();
    
//     res.json({ message: 'Removed from wishlist' });
//   } catch (error) {
//     console.error('Remove from wishlist error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product'); // UPDATED: Added this missing import
const auth = require('../middleware/auth');

const router = express.Router();

// Get user wishlist
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to wishlist
router.post('/add', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.userId);
    
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    
    // Populate and send back the updated wishlist
    await user.populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from wishlist
router.delete('/remove/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
    await user.save();

    // Populate and send back the updated wishlist
    await user.populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;