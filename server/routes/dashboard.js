const express = require('express');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const TerraKit = require('../models/TerraKit');

const router = express.Router();

// Get dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({ isVerified: true });
    const totalOrders = await Order.countDocuments();
    const totalKitsInstalled = await TerraKit.countDocuments({ status: 'Completed' });
    const totalPlantsSold = await Order.aggregate([
      { $unwind: '$items' },
      { $group: { _id: null, total: { $sum: '$items.quantity' } } }
    ]);
    
    res.json({
      totalCustomers,
      totalOrders,
      totalKitsInstalled,
      totalPlantsSold: totalPlantsSold[0]?.total || 0
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;