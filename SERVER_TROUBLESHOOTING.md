# Server Error Troubleshooting Guide

## 🔍 Step-by-Step Debugging

### 1. Check Dependencies
```bash
cd project/server
npm install
```

### 2. Check Environment File
Make sure you have a `.env` file in `project/server/` with:
```env
MONGODB_URI=mongodb://localhost:27017/terracetop
JWT_SECRET=your_secret_key_here
PORT=5000
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Test MongoDB Connection
Make sure MongoDB is running:
```bash
# On Windows
mongod

# On Mac/Linux
sudo systemctl start mongod
```

### 4. Test Simplified Server
```bash
cd project
node server-simple.js
```

### 5. Test Full Server
```bash
cd project/server
npm start
```

## 🐛 Common Error Solutions

### Error: "Cannot find module"
**Solution**: Install missing dependencies
```bash
cd project/server
npm install
```

### Error: "MongoDB connection failed"
**Solutions**:
1. Start MongoDB service
2. Check MONGODB_URI in .env file
3. Make sure MongoDB is running on port 27017

### Error: "Port already in use"
**Solution**: Change port or kill existing process
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change PORT in .env file
PORT=5001
```

### Error: "JWT_SECRET not set"
**Solution**: Add JWT_SECRET to .env file
```env
JWT_SECRET=your_super_secret_key_here
```

### Error: "Email configuration missing"
**Solution**: Add email credentials to .env file
```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

## 🔧 Quick Fixes

### 1. Reset Everything
```bash
cd project/server
rm -rf node_modules package-lock.json
npm install
```

### 2. Check Node Version
```bash
node --version
# Should be 14+ for best compatibility
```

### 3. Clear npm Cache
```bash
npm cache clean --force
```

### 4. Check File Permissions
Make sure you have read/write permissions to the project folder.

## 📋 Debug Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] MongoDB running
- [ ] .env file exists with correct values
- [ ] Port 5000 available
- [ ] Node.js version 14+
- [ ] All required files exist

## 🚀 Test Commands

### Test Basic Server
```bash
cd project
node server-simple.js
```

### Test Registration
```bash
cd project
node test-registration.js
```

### Test API Endpoints
```bash
# Test server health
curl http://localhost:5000/

# Test auth endpoint
curl http://localhost:5000/api/auth/test
```

## 📞 Get Help

If you're still getting errors:

1. **Check the exact error message** - copy and paste it
2. **Check server logs** - look for specific error details
3. **Test with simplified server** - use `server-simple.js`
4. **Verify MongoDB** - make sure it's running and accessible

## 🔍 Error Log Analysis

Common error patterns:

- `MODULE_NOT_FOUND` → Missing dependency
- `ECONNREFUSED` → MongoDB not running
- `EADDRINUSE` → Port already in use
- `ENOENT` → File not found (check .env)
- `ValidationError` → Database schema issue
