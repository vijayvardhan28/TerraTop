# TerraceTop - Urban Farming Platform

A comprehensive urban farming platform with user authentication, product management, and e-commerce capabilities.

## Features

- 🔐 User Authentication (Register/Login with OTP verification)
- 🛒 Shopping Cart & Wishlist
- 🌱 Plant & Product Management
- 📦 Order Management
- 💳 Payment Integration
- 📱 Responsive Design

## Tech Stack

### Frontend
- React 18 + TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Framer Motion for animations
- React Router for navigation

### Backend
- Node.js + Express
- MongoDB with Mongoose
- JWT for authentication
- Nodemailer for email services
- bcryptjs for password hashing

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Gmail account for email services

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd project-bolt-sb1-rwrq3cyl/project
```

### 2. Install dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/terracetop

# JWT Secret (generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here

# Server Port
PORT=5000

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### Gmail App Password Setup
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use this password in the `EMAIL_PASS` variable

### 4. MongoDB Setup

#### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Create database: `terracetop`

#### Option B: MongoDB Atlas
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### 5. Start the application

#### Terminal 1 - Backend Server
```bash
npm run dev:server
```

#### Terminal 2 - Frontend Development
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/verify-otp` - OTP verification
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Cart & Wishlist
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart` - Add to cart (protected)
- `DELETE /api/cart/:id` - Remove from cart (protected)
- `GET /api/wishlist` - Get user wishlist (protected)
- `POST /api/wishlist` - Add to wishlist (protected)
- `DELETE /api/wishlist/:id` - Remove from wishlist (protected)

## Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required, unique),
  password: String (required, min: 6),
  isVerified: Boolean (default: false),
  otp: String,
  otpExpires: Date,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String (default: 'India')
  },
  orders: [ObjectId],
  cart: [{
    product: ObjectId,
    quantity: Number,
    terrakit: ObjectId
  }],
  wishlist: [ObjectId],
  timestamps: true
}
```

## Authentication Flow

1. **Registration**: User fills registration form → OTP sent to email
2. **Verification**: User enters OTP → Account verified → JWT token generated
3. **Login**: User enters credentials → JWT token generated
4. **Protected Routes**: JWT token validated for protected endpoints

## Development Scripts

- `npm run dev` - Start frontend development server
- `npm run server` - Start backend server
- `npm run dev:server` - Start backend with nodemon (auto-restart)
- `npm run build` - Build frontend for production
- `npm run lint` - Run ESLint

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access for Atlas

2. **Email Not Sending**
   - Check Gmail credentials in `.env`
   - Verify App Password is correct
   - Check Gmail security settings

3. **JWT Token Issues**
   - Ensure `JWT_SECRET` is set in `.env`
   - Check token expiration
   - Verify Authorization header format

4. **CORS Issues**
   - Check `FRONTEND_URL` in `.env`
   - Verify frontend is running on correct port

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=true
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
