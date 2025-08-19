// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { sendOTP } = require('../utils/emailService');
// const { generateOTP } = require('../utils/helpers');

// // Temporary OTP store (in production, use Redis or database)
// let otpStore = {};

// // ======================= Request Registration OTP =======================
// router.post("/request-register-otp", async (req, res) => {
//   const { name, email, password, phone, role } = req.body;
//   try {
//     // Validate required fields
//     if (!name || !email || !password || !phone) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists with this email" });
//     }

//     // Generate OTP
//     const otp = generateOTP();
//     console.log("Generated OTP for registration:", otp, "for email:", email);

//     // Store OTP with temporary user data
//     otpStore[email] = {
//       otp,
//       expires: Date.now() + 10 * 60 * 1000, // 10 minutes
//       tempUser: { name, email, password, phone, role }
//     };

//     // Send OTP via email
//     await sendOTP(email, otp);

//     res.json({ 
//       message: "OTP sent to your email for registration",
//       email: email 
//     });
//   } catch (err) {
//     console.error("Register OTP Error:", err);
//     res.status(500).json({ message: "Error sending registration OTP" });
//   }
// });

// // ======================= Verify Registration OTP =======================
// router.post("/verify-register-otp", async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     // Validate OTP
//     if (!otpStore[email]) {
//       return res.status(400).json({ message: "No OTP requested for this email" });
//     }
    
//     if (otpStore[email].otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }
    
//     if (Date.now() > otpStore[email].expires) {
//       delete otpStore[email];
//       return res.status(400).json({ message: "OTP has expired" });
//     }

//     const tempUser = otpStore[email].tempUser;
//     if (!tempUser) {
//       return res.status(400).json({ message: "User data missing" });
//     }

//     // Create user (password will be hashed by the pre-save middleware)
//     const user = new User({
//       name: tempUser.name,
//       email: tempUser.email,
//       password: tempUser.password,
//       phone: tempUser.phone,
//       role: tempUser.role || "user",
//     });

//     await user.save();
    
//     // Clean up OTP store
//     delete otpStore[email];

//     // Generate JWT token
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     res.json({
//       message: "Registration successful",
//       token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Verify Register OTP Error:", err);
//     res.status(500).json({ message: "Error verifying registration OTP" });
//   }
// });

// // ======================= Login =======================
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
//     res.json({ 
//       message: "Login successful",
//       token, 
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//       }
//     });
//   } catch (err) {
//     console.error("Login Error:", err);
//     res.status(500).json({ message: "Server error during login" });
//   }
// });

// // ======================= Request Password Reset =======================
// router.post('/request-password-reset', async (req, res) => {
//   const { email } = req.body;
//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate OTP
//     const otp = generateOTP();
//     console.log("Generated OTP for password reset:", otp, "for email:", email);

//     // Store OTP
//     otpStore[email] = { 
//       otp, 
//       expires: Date.now() + 10 * 60 * 1000, // 10 minutes
//       type: 'password-reset'
//     };

//     // Send OTP via email
//     await sendOTP(email, otp);

//     res.json({ 
//       message: "OTP sent to your email for password reset",
//       email: email 
//     });
//   } catch (err) {
//     console.error("Password Reset OTP Error:", err);
//     res.status(500).json({ message: "Error sending password reset OTP" });
//   }
// });

// // ======================= Verify Password Reset OTP =======================
// router.post('/verify-reset-otp', async (req, res) => {
//   const { email, otp } = req.body;
//   try {
//     // Validate OTP
//     if (!otpStore[email]) {
//       return res.status(400).json({ message: "No OTP requested for this email" });
//     }
    
//     if (otpStore[email].otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }
    
//     if (Date.now() > otpStore[email].expires) {
//       delete otpStore[email];
//       return res.status(400).json({ message: "OTP has expired" });
//     }

//     if (otpStore[email].type !== 'password-reset') {
//       return res.status(400).json({ message: "Invalid OTP type" });
//     }

//     res.json({ message: "OTP verified successfully" });
//   } catch (err) {
//     console.error("Verify Reset OTP Error:", err);
//     res.status(500).json({ message: "Error verifying OTP" });
//   }
// });

// // ======================= Reset Password =======================
// router.post('/reset-password', async (req, res) => {
//   const { email, newPassword } = req.body;
//   try {
//     // Check if OTP was verified
//     if (!otpStore[email] || otpStore[email].type !== 'password-reset') {
//       return res.status(400).json({ message: "OTP not verified" });
//     }

//     // Update user password (will be hashed by pre-save middleware)
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
    
//     user.password = newPassword;
//     await user.save();
    
//     // Clean up OTP store
//     delete otpStore[email];

//     res.json({ message: "Password reset successfully" });
//   } catch (err) {
//     console.error("Reset Password Error:", err);
//     res.status(500).json({ message: "Error resetting password" });
//   }
// });

// // ======================= Get Current User =======================
// router.get('/me', async (req, res) => {
//   try {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select('-password');
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (err) {
//     console.error("Get User Error:", err);
//     res.status(401).json({ message: "Invalid token" });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTP } = require('../utils/emailService');
const { generateOTP } = require('../utils/helpers');
// Temporary OTP store (in production, use Redis or database)
let otpStore = {};
// ======================= Request Registration OTP =======================
router.post("/request-register-otp", async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  try {
  // Validate required fields
  if (!name || !email || !password || !phone) {
  return res.status(400).json({ message: "All fields are required" });
  }
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser){ {
  return res.status(400).json({ message: "User already exists with this email" });
  }
  if (existingUser.phone === phone) {
  return res.status(400).json({ message: "User already exists with this phone number" });
  }
}
  // Generate OTP
  const otp = generateOTP();
  console.log("Generated OTP for registration:", otp, "for email:", email);
  // Store OTP with temporary user data
  otpStore[email] = {
  otp,
  expires: Date.now() + 10 * 60 * 1000, // 10 minutes
  tempUser: { name, email, password, phone, role }
  };
  // Send OTP via email
  await sendOTP(email, otp);
  res.json({ 
  message: "OTP sent to your email for registration",
  email: email 
  });
  } catch (err) {
  console.error("Register OTP Error:", err);
  res.status(500).json({ message: "Error sending registration OTP" });
  }
});
// ======================= Verify Registration OTP =======================
router.post("/verify-register-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
  // Validate OTP
  if (!otpStore[email]) {
  return res.status(400).json({ message: "No OTP requested for this email" });
  }
  
  if (otpStore[email].otp !== otp) {
  return res.status(400).json({ message: "Invalid OTP" });
  }
  
  if (Date.now() > otpStore[email].expires) {
  delete otpStore[email];
  return res.status(400).json({ message: "OTP has expired" });
  }
  const tempUser = otpStore[email].tempUser;
  if (!tempUser) {
  return res.status(400).json({ message: "User data missing" });
  }
  // Create user (password will be hashed by the pre-save middleware)
  const user = new User({
  name: tempUser.name,
  email: tempUser.email,
  password: tempUser.password,
  phone: tempUser.phone,
  role: tempUser.role || "user",
  isVerified: true
  });
  await user.save();
  
  // Clean up OTP store
  delete otpStore[email];
  
  res.json({ message: "Registration successful. You can now log in." });
  } catch (err) {
  console.error("Verify Register OTP Error:", err);
  res.status(500).json({ message: "Error verifying registration OTP" });
  }
});
// ======================= Login =======================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
  const user = await User.findOne({ email });
  if (!user) {
  return res.status(400).json({ message: "Invalid credentials" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
  return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 
 "1d" });
  
  res.json({ 
  message: "Login successful",
  token, 
  user: {
  id: user._id,
  name: user.name,
  email: user.email,
 
  phone: user.phone,
  role: user.role,
  }
  });
  } catch (err) {
  console.error("Login Error:", err);
  res.status(500).json({ message: "Server error during login" });
  }
});
// ======================= Request Password Reset =======================
router.post('/request-password-reset', async (req, res) => {
  const { email } = req.body;
  try {
  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) {
  return res.status(404).json({ message: "User not found" });
  }
  // Generate OTP
  const otp = generateOTP();
  console.log("Generated OTP for password reset:", otp, "for email:", email);
  // Store OTP
  otpStore[email] = { 
  otp, 
  expires: Date.now() + 10 * 60 * 1000, // 10 minutes
  type: 'password-reset'
  };
  // Send OTP via email
  await sendOTP(email, otp);
  res.json({ 
  message: "OTP sent to your email for password reset",
  email: email 
  });
  } catch (err) {
  console.error("Password Reset OTP Error:", err);
  res.status(500).json({ message: "Error sending password reset OTP" });
  }
});
// ======================= Verify Password Reset OTP =======================
router.post('/verify-reset-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
  // Validate OTP
  if (!otpStore[email]) {
  return res.status(400).json({ message: "No OTP requested for this email" });
  }
  
  if (otpStore[email].otp !== otp) {
  return res.status(400).json({ message: "Invalid OTP" });
  }
  
  if (Date.now() > otpStore[email].expires) {
  delete otpStore[email];
  return res.status(400).json({ message: "OTP has expired" });
  }
  if (otpStore[email].type !== 'password-reset') {
  return res.status(400).json({ message: "Invalid OTP type" });
  }
  
  res.json({ message: "OTP verified successfully" });
  } catch (err) {
  console.error("Verify Reset OTP Error:", err);
  res.status(500).json({ message: "Error verifying OTP" });
  }
});
// ======================= Reset Password =======================
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  try {
  // Check if OTP was verified
  if (!otpStore[email] || otpStore[email].type !== 'password-reset') {
  return res.status(400).json({ message: "OTP not verified" });
  }
  // Update user password (will be hashed by pre-save middleware)
  const user = await User.findOne({ email });
  if (!user) {
  return res.status(404).json({ message: "User not found" });
  }
  
  user.password = newPassword;
  await user.save();
  
  // Clean up OTP store
  delete otpStore[email];
  res.json({ message: "Password reset successfully" });
  } catch (err) {
  console.error("Reset Password Error:", err);
  res.status(500).json({ message: "Error resetting password" });
  }
});
// ======================= Get Current User =======================
router.get('/me', async (req, res) => {
  try {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
  return res.status(401).json({ message: "No token provided" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select('-password');
  
  if (!user) {
  return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
  } catch (err) {
  console.error("Get User Error:", err);
  res.status(401).json({ message: "Invalid token" });
  }
});
module.exports = router;