// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { verifyRegisterOTP, clearError } from '../../store/slices/authSlice';
// import { RootState, AppDispatch } from '../../store/store';
// import LoadingSpinner from '../../components/UI/LoadingSpinner';

// const VerifyOTP = () => {
//   const [otp, setOtp] = useState('');
//   const [email, setEmail] = useState('');
  
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem('tempEmail');
//     if (storedEmail) {
//       setEmail(storedEmail);
//     } else {
//       navigate('/register');
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (isAuthenticated) {
//       localStorage.removeItem('tempEmail');
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

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
//       await dispatch(verifyRegisterOTP({ email, otp })).unwrap();
//       toast.success('Registration successful! Welcome to TerraceTop.');
//     } catch (error) {
//       // Error is handled by the effect above
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
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
//             <p className="text-gray-600">
//               We've sent a 6-digit verification code to your email
//             </p>
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
//               {isLoading ? <LoadingSpinner size="sm" /> : 'Verify Email'}
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default VerifyOTP;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { verifyRegisterOTP, clearError } from '../../store/slices/authSlice';
// import { RootState, AppDispatch } from '../../store/store';
// import LoadingSpinner from '../../components/UI/LoadingSpinner';

// const VerifyOTP = () => {
//   const [otp, setOtp] = useState('');
//   const [email, setEmail] = useState('');
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { isLoading, error } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem('tempEmail');
//     if (storedEmail) {
//       setEmail(storedEmail);
//     } else {
//       navigate('/register');
//     }
//   }, [navigate]);

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
//       await dispatch(verifyRegisterOTP({ email, otp })).unwrap();
//       toast.success('Registration successful! Please log in with your new account.');
//       localStorage.removeItem('tempEmail');
//       navigate('/login');
//     } catch (error) {
//       // Error is handled by the effect above
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
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
//             <p className="text-gray-600">
//               We've sent a 6-digit verification code to your email
//             </p>
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
//               {isLoading ? (
//                 <LoadingSpinner size="sm" />
//               ) : (
//                 <span>Verify Email</span>
//               )}
//             </button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default VerifyOTP;

// import React, { useState, useEffect } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { verifyRegisterOTP, clearError, requestRegisterOTP } from '../../store/slices/authSlice';
// import { RootState, AppDispatch } from '../../store/store';
// import LoadingSpinner from '../../components/UI/LoadingSpinner';

// const VerifyOTP = () => {
//   const [otp, setOtp] = useState('');
//   const [email, setEmail] = useState('');
//   const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
//   
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { isLoading, error, registrationData } = useSelector((state: RootState) => state.auth);

//   useEffect(() => {
//     const storedEmail = localStorage.getItem('tempEmail');
//     if (storedEmail) {
//       setEmail(storedEmail);
//     } else {
//       navigate('/register');
//     }
//   }, [navigate]);

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timerId = setInterval(() => {
//       setTimeLeft(prevTime => prevTime - 1);
//     }, 1000);
//     return () => clearInterval(timerId);
//   }, [timeLeft]);
//   
//   const formatTime = (seconds: number) => {
//     const minutes = Math.floor(seconds / 60);
//     const remainingSeconds = seconds % 60;
//     return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//   };

//   const handleResendOTP = async () => {
//     // Access the full registration data from the Redux store
//     if (registrationData && registrationData.tempUser) {
//       try {
//         await dispatch(requestRegisterOTP(registrationData.tempUser)).unwrap();
//         toast.success('A new OTP has been sent to your email.');
//         setTimeLeft(60); // Reset timer for 1 minute
//       } catch (err) {
//         // Error handling is managed by the useEffect hook listening to the Redux state
//       }
//     } else {
//       toast.error('Could not find registration data. Please register again.');
//       navigate('/register');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!otp || otp.length !== 6) {
//       toast.error('Please enter a valid 6-digit OTP');
//       return;
//     }
//     // Check to ensure the email is still valid from local storage
//     if (!localStorage.getItem('tempEmail')) {
//       toast.error('Please go back to registration and resubmit your details.');
//       return;
//     }
//     try {
//       await dispatch(verifyRegisterOTP({ email, otp })).unwrap();
//       toast.success('Registration successful! Please log in with your new account.');
//       localStorage.removeItem('tempEmail');
//       navigate('/login');
//     } catch (error) {
//       // Error is handled by the effect above
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//         className="max-w-md w-full space-y-8"
//       >
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="text-center">
//             <img
//               src="/Untitled design (1).png"
//               alt="TerraceTop"
//               className="h-12 w-auto mx-auto mb-4"
//             />
//             <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
//             <p className="text-gray-600">
//               We've sent a 6-digit verification code to your email
//             </p>
//           </div>
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
//                 Enter OTP
//               </label>
//               <input
//                 id="otp"
//                 name="otp"
//                 type="text"
//                 required
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 maxLength={6}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-center text-lg tracking-widest"
//                 placeholder="000000"
//               />
//             </div>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isLoading ? (
//                 <LoadingSpinner size="sm" />
//               ) : (
//                 <span>Verify Email</span>
//               )}
//             </button>
//             <div className="flex items-center justify-between text-sm mt-4">
//               <span className="text-gray-500">
//                 Resend in: <span className="font-semibold text-green-600">{formatTime(timeLeft)}</span>
//               </span>
//               <button
//                 type="button"
//                 onClick={handleResendOTP}
//                 disabled={timeLeft > 0 || isLoading}
//                 className="font-semibold text-green-600 hover:text-green-700 disabled:text-gray-400 disabled:cursor-not-allowed"
//               >
//                 Resend OTP
//               </button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default VerifyOTP;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { verifyRegisterOTP, clearError, requestRegisterOTP } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store/store';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const VerifyOTP = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, registrationData } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedEmail = localStorage.getItem('tempEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      navigate('/register');
    }
  }, [navigate]);

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
    // Access the full registration data from the Redux store
    if (registrationData && registrationData.tempUser) {
      try {
        await dispatch(requestRegisterOTP(registrationData.tempUser)).unwrap();
        toast.success('A new OTP has been sent to your email.');
        setTimeLeft(60); // Reset timer for 1 minute
      } catch (err) {
        // Error handling is managed by the useEffect hook listening to the Redux state
      }
    } else {
      toast.error('Could not find registration data. Please register again.');
      navigate('/register');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    // Check to ensure the email is still valid from local storage
    if (!localStorage.getItem('tempEmail')) {
      toast.error('Please go back to registration and resubmit your details.');
      return;
    }
    try {
      await dispatch(verifyRegisterOTP({ email, otp })).unwrap();
      toast.success('Registration successful! Please log in with your new account.');
      localStorage.removeItem('tempEmail');
      navigate('/login');
    } catch (error) {
      // Error is handled by the effect above
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
            <p className="text-gray-600">
              We've sent a 6-digit verification code to your email to <span className="font-semibold text-green-600">{email}</span>
            </p>
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
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <span>Verify Email</span>
              )}
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

export default VerifyOTP;

