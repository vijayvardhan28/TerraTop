const express = require('express');
const Pot = require('../models/Pot');
const router = express.Router();

router.get('/pots', async (req, res) => {
  try {
    const pots = await Pot.find();
    res.json(pots);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pots' });
  }
});

module.exports = router;
