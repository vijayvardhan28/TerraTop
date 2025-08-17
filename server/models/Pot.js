const mongoose = require('mongoose');

const potSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  dimensions: { type: String, required: true },
  price: { type: Number, required: true },
  availability: { type: String, enum: ['available', 'out of stock'], required: true },
  category: { type: String, required: true } // e.g., "pots"
}, { timestamps: true });

module.exports = mongoose.model('Pot', potSchema);
