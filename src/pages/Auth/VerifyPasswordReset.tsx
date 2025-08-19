// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { verifyPasswordResetOTP, clearError } from '../../store/slices/authSlice';
// import { RootState, AppDispatch } from '../../store/store';
// import LoadingSpinner from '../../components/UI/LoadingSpinner';

// const VerifyPasswordReset = () => {
//   const [otp, setOtp] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const { isLoading, error } = useSelector((state: RootState) => state.auth);
//   const email = location.state?.email || '';

//   useEffect(() => {
//     if (!email) {
//       toast.error("Invalid state. Please request a new password reset.");
//       navigate('/forgot-password');
//     }
//   }, [email, navigate]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!otp || otp.length !== 6) {
//       toast.error('Please enter a valid 6-digit OTP');
//       return;
//     }
//     try {
//       await dispatch(verifyPasswordResetOTP({ email, otp })).unwrap();
//       toast.success('OTP verified successfully!');
//       navigate('/reset-password', { state: { email } });
//     } catch (err) {
//       // Error is handled by the useEffect hook
//       console.error("OTP verification failed:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="max-w-md w-full space-y-8"
//       >
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="text-center">
//             <img
//               src="/Untitled design (1).png"
//               alt="TerraceTop"
//               className="h-12 w-auto mx-auto mb-4"
//             />
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h2>
//             <p className="text-gray-600">We've sent a verification code to your email.</p>
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
//                 Enter OTP
//               </label>
//               <input
//                 id="otp"
//                 name="otp"
//                 type="text"
//                 required
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 maxLength={6}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
//                 placeholder="000000"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isLoading ? <LoadingSpinner size="sm" /> : 'Verify OTP'}
//             </button>
//             <div className="text-center mt-4">
//               <Link to="/forgot-password" className="text-sm text-green-600 hover:underline">
//                 Request a new code?
//               </Link>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default VerifyPasswordReset;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { verifyPasswordResetOTP, clearError, requestPasswordReset } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store/store';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const VerifyPasswordReset = () => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds for OTP timer
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const email = location.state?.email || '';

  useEffect(() => {
    if (!email) {
      toast.error("Invalid state. Please request a new password reset.");
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleResendOTP = async () => {
    if (email) {
      try {
        await dispatch(requestPasswordReset(email)).unwrap();
        toast.success('A new OTP has been sent to your email.');
        setTimeLeft(30); // Reset timer to 30 seconds
      } catch (err) {
        // Error handling is managed by the useEffect hook listening to the Redux state
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    try {
      await dispatch(verifyPasswordResetOTP({ email, otp })).unwrap();
      toast.success('OTP verified successfully!');
      navigate('/reset-password', { state: { email } });
    } catch (err) {
      // Error is handled by the useEffect hook
      console.error("OTP verification failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <img
              src="/Untitled design (1).png"
              alt="TerraceTop"
              className="h-12 w-auto mx-auto mb-4"
            />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h2>
            <p className="text-gray-600">We've sent a verification code to your email.</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                id="otp"
                name="otp"
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
                placeholder="000000"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : 'Verify OTP'}
            </button>
            <div className="flex items-center justify-between text-sm mt-4">
              <span className="text-gray-500">
                Resend in: <span className="font-semibold text-green-600">{formatTime(timeLeft)}</span>
              </span>
              <button
                type="button"
                onClick={handleResendOTP}
                disabled={timeLeft > 0 || isLoading}
                className="font-semibold text-green-600 hover:text-green-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyPasswordReset;
