# Quick Setup Guide

## 1. Create Environment File
Create a `.env` file in the root directory with:

```env
MONGODB_URI=mongodb://localhost:27017/terracetop
JWT_SECRET=your_secret_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## 2. Install Dependencies
```bash
npm install
cd server && npm install && cd ..
```

## 3. Start MongoDB
- **Local**: Start MongoDB service
- **Atlas**: Use your connection string in `.env`

## 4. Start Application
```bash
# Terminal 1 - Backend
npm run dev:server

# Terminal 2 - Frontend  
npm run dev
```

## 5. Test Registration
1. Go to http://localhost:5173/register
2. Fill the form
3. Check email for OTP
4. Verify OTP
5. Login with credentials

## Database Collections Created
- `users` - User accounts and authentication
- `products` - Product catalog
- `orders` - User orders
- `plants` - Plant information
- `terrakits` - Terra kit products

## API Testing
Test endpoints at http://localhost:5000/api/auth/register
