const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  scientificName: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  seeds: {
    type: String,
    required: true
  },
  weatherRequirements: {
    temperature: {
      min: Number,
      max: Number,
      unit: { type: String, default: '°C' }
    },
    humidity: {
      min: Number,
      max: Number,
      unit: { type: String, default: '%' }
    },
    sunlight: {
      type: String,
      enum: ['Full Sun', 'Partial Sun', 'Shade', 'Partial Shade']
    },
    season: [String]
  },
  soilType: {
    type: [String],
    required: true
  },
  diseases: [{
    name: String,
    symptoms: String,
    prevention: String,
    treatment: String
  }],
  recommendedProducts: {
    pesticides: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    fertilizers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }]
  },
  growthInfo: {
    germinationTime: String,
    harvestTime: String,
    spacing: String,
    wateringFrequency: String
  },
  category: {
    type: String,
    enum: ['Vegetables', 'Fruits', 'Herbs', 'Flowers', 'Leafy Greens']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plant', plantSchema);