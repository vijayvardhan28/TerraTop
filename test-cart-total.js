const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testProduct = {
  name: 'Test Product',
  price: 1000,
  description: 'Test product for cart total verification'
};

const testTerraKit = {
  numberOfPots: 3,
  totalPrice: 2500,
  pots: [
    { design: 'Ceramic', mudType: 'Garden Soil', plantType: 'Tomato' },
    { design: 'Plastic', mudType: 'Potting Mix', plantType: 'Basil' },
    { design: 'Terracotta', mudType: 'Compost', plantType: 'Mint' }
  ]
};

async function testCartTotal() {
  try {
    console.log('🧪 Testing Cart Total Calculation...\n');

    // Step 1: Login to get token
    console.log('1. Logging in...');
    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    
    const token = loginResponse.data.token;
    const headers = { Authorization: `Bearer ${token}` };
    
    console.log('✅ Login successful\n');

    // Step 2: Clear cart first
    console.log('2. Clearing cart...');
    await axios.delete(`${API_BASE_URL}/cart/clear`, { headers });
    console.log('✅ Cart cleared\n');

    // Step 3: Add product to cart
    console.log('3. Adding product to cart...');
    const addProductResponse = await axios.post(`${API_BASE_URL}/cart/add`, {
      productId: 'test-product-id',
      quantity: 2
    }, { headers });
    
    console.log('✅ Product added to cart');
    console.log('Cart items:', addProductResponse.data);
    console.log('Expected total: ₹2000 (2 × ₹1000)\n');

    // Step 4: Add TerraKit to cart
    console.log('4. Adding TerraKit to cart...');
    const addTerraKitResponse = await axios.post(`${API_BASE_URL}/cart/add`, {
      terrakitId: 'test-terrakit-id',
      quantity: 1
    }, { headers });
    
    console.log('✅ TerraKit added to cart');
    console.log('Cart items:', addTerraKitResponse.data);
    console.log('Expected total: ₹4500 (₹2000 + ₹2500)\n');

    // Step 5: Get cart and verify total
    console.log('5. Getting cart and verifying total...');
    const cartResponse = await axios.get(`${API_BASE_URL}/cart`, { headers });
    
    console.log('✅ Cart retrieved');
    console.log('Cart items:', cartResponse.data);
    
    const calculatedTotal = cartResponse.data.reduce((total, item) => {
      const price = item.product?.price || item.terrakit?.totalPrice || 0;
      return total + (price * item.quantity);
    }, 0);
    
    console.log(`Calculated total: ₹${calculatedTotal.toLocaleString()}`);
    console.log('Expected total: ₹4500');
    
    if (calculatedTotal === 4500) {
      console.log('✅ Cart total calculation is working correctly!');
    } else {
      console.log('❌ Cart total calculation is incorrect');
    }

  } catch (error) {
    console.error('❌ Error during cart total test:', error.response?.data || error.message);
  }
}

// Run test
console.log('🧪 Cart Total Test Script\n');
console.log('Make sure your server is running on http://localhost:5000\n');
console.log('Make sure you have a test user registered\n');

testCartTotal();
