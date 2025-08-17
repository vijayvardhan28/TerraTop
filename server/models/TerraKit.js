const mongoose = require('mongoose');

const terraKitSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  space: {
    type: Number,
    required: true,
    min: 1
  },
  numberOfPots: {
    type: Number,
    required: true,
    min: 1
  },
  pots: [{
    design: {
      type: String,
      required: true,
      enum: ['Ceramic', 'Plastic', 'Terracotta', 'Metal', 'Wooden']
    },
    mudType: {
      type: String,
      required: true,
      enum: ['Garden Soil', 'Potting Mix', 'Compost', 'Coco Peat', 'Perlite Mix']
    },
    plantType: {
      type: String,
      required: true
    }
  }],
  dripSystem: {
    enabled: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      enum: ['Basic', 'Advanced', 'Smart']
    }
  },
  decorations: [{
    type: String
  }],
  installation: {
    type: String,
    required: true,
    enum: ['Self', 'Staff'],
    default: 'Self'
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['Draft', 'Ordered', 'In Progress', 'Completed'],
    default: 'Draft'
  },
  layout: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('TerraKit', terraKitSchema);