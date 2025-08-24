// const express = require('express');
// const TerraKit = require('../models/TerraKit');
// const User = require('../models/User');
// const auth = require('../middleware/auth');

// const router = express.Router();

// // Get user terrakits
// router.get('/', auth, async (req, res) => {
//   try {
//     const terrakits = await TerraKit.find({ userId: req.userId });
//     res.json(terrakits);
//   } catch (error) {
//     console.error('Get terrakits error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Create terrakit configuration
// router.post('/create', auth, async (req, res) => {
//   try {
//     const { space, numberOfPots, pots, dripSystem, decorations, installation, totalPrice: clientTotalPrice } = req.body;
    
//     // Calculate total price (simplified calculation) if not provided by client
//     let totalPrice = clientTotalPrice;
//     if (!totalPrice) {
//       totalPrice = 0;
//       totalPrice += numberOfPots * 500; // Base pot price
//       totalPrice += pots.length * 200; // Soil and seeds
//       if (dripSystem.enabled) totalPrice += 2000;
//       if (installation === 'Staff') totalPrice += 1500;
//       totalPrice += decorations.length * 300;
//     }
    
//     const terrakit = new TerraKit({
//       userId: req.userId,
//       space,
//       numberOfPots,
//       pots,
//       dripSystem,
//       decorations,
//       installation,
//       totalPrice
//     });
    
//     await terrakit.save();
//     res.status(201).json(terrakit);
//   } catch (error) {
//     console.error('Create terrakit error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Get terrakit by ID
// router.get('/:id', auth, async (req, res) => {
//   try {
//     const terrakit = await TerraKit.findOne({ 
//       _id: req.params.id, 
//       userId: req.userId 
//     });
    
//     if (!terrakit) {
//       return res.status(404).json({ message: 'TerraKit not found' });
//     }
    
//     res.json(terrakit);
//   } catch (error) {
//     console.error('Get terrakit error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;
const express = require('express');
const TerraKit = require('../models/TerraKit');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user terrakits
router.get('/', auth, async (req, res) => {
  try {
    const terrakits = await TerraKit.find({ userId: req.userId });
    res.json(terrakits);
  } catch (error) {
    console.error('Get terrakits error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create terrakit configuration
router.post('/create', auth, async (req, res) => {
  try {
    const { space, numberOfPots, pots, dripSystem, decorations, installation, totalPrice } = req.body;
    
    const terrakit = new TerraKit({
      userId: req.userId,
      space,
      numberOfPots,
      pots,
      dripSystem,
      decorations,
      installation,
      totalPrice
    });
    
    await terrakit.save();
    res.status(201).json(terrakit);
  } catch (error) {
    console.error('Create terrakit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get terrakit by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const terrakit = await TerraKit.findOne({ _id: req.params.id, userId: req.userId });
    if (!terrakit) {
      return res.status(404).json({ message: 'TerraKit not found' });
    }
    res.json(terrakit);
  } catch (error) {
    console.error('Get terrakit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ADDED: New route to delete a saved TerraKit
router.delete('/:id', auth, async (req, res) => {
  try {
    const terrakit = await TerraKit.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!terrakit) {
      return res.status(404).json({ message: 'TerraKit not found or you are not authorized to delete it.' });
    }

    res.json({ message: 'TerraKit configuration removed successfully.' });
  } catch (error) {
    console.error('Delete terrakit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;