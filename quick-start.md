# 🚀 Quick Start - Authentication Only

## 1. Create Environment File
Copy `env-template.txt` to `.env` and fill in your values:

```bash
cp env-template.txt .env
```

Then edit `.env` with your actual values:
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Any random string for security
- `EMAIL_USER` - Your Gmail address
- `EMAIL_PASS` - Your Gmail app password

## 2. Install Dependencies
```bash
# Frontend dependencies
npm install

# Backend dependencies  
cd server && npm install && cd ..
```

## 3. Start MongoDB
- **Local**: Start MongoDB service
- **Atlas**: Use your connection string in `.env`

## 4. Start the Application
```bash
# Terminal 1 - Backend (Authentication API)
npm run dev:server

# Terminal 2 - Frontend
npm run dev
```

## 5. Test Authentication
1. Go to http://localhost:5173/register
2. Fill the registration form
3. Check email for OTP
4. Verify OTP
5. Login with your credentials

## ✅ What's Working Now:
- User registration with email verification
- User login with JWT tokens
- MongoDB database storage
- Protected routes
- Email OTP system

## 🔄 What's Disabled (for later):
- Payment gateway (Razorpay)
- Product management
- Cart & wishlist
- Orders system

## 🐛 If You Get Errors:
1. **MongoDB Connection**: Check your `.env` file
2. **Email Issues**: Verify Gmail app password
3. **Port Conflicts**: Change PORT in `.env`

The authentication system is now completely isolated and should work without any payment gateway issues!
