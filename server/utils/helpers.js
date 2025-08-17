const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `TT${timestamp.slice(-6)}${random}`;
};

module.exports = {
  generateOTP,
  generateOrderNumber
};