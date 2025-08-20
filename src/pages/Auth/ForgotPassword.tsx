// // import React, { useState, useEffect } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Mail } from 'lucide-react';
// // import { motion } from 'framer-motion';
// // import toast from 'react-hot-toast';
// // import { clearError } from '../../store/slices/authSlice';
// // import { RootState, AppDispatch } from '../../store/store';
// // import LoadingSpinner from '../../components/UI/LoadingSpinner';

// // const ForgotPassword = () => {
// //     const [email, setEmail] = useState('');
// //     const dispatch = useDispatch<AppDispatch>();
// //     const navigate = useNavigate();
// //     const { isLoading, error } = useSelector((state: RootState) => state.auth);

// //     // Effect to handle and display any errors from the Redux state
// //     useEffect(() => {
// //         if (error) {
// //             toast.error(error);
// //             dispatch(clearError());
// //         }
// //     }, [error, dispatch]);

// //     // Form submission handler
// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         if (!email) {
// //             toast.error('Please enter your email address.');
// //             return;
// //         }
// //         try {
// //             // For now, just show a message since forgotPassword action doesn't exist
// //             toast.success('Password reset functionality not implemented yet.');
// //             navigate('/login');
// //         } catch (err) {
// //             // The error will be caught and displayed by the useEffect hook
// //             console.error("Forgot Password failed:", err);
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
// //             <motion.div
// //                 initial={{ opacity: 0, y: 50 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.8 }}
// //                 className="max-w-md w-full space-y-8"
// //             >
// //                 <div className="bg-white rounded-2xl shadow-xl p-8">
// //                     <div className="text-center">
// //                         <img
// //                             src="/Untitled design (1).png"
// //                             alt="TerraceTop"
// //                             className="h-12 w-auto mx-auto mb-4"
// //                         />
// //                         <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h2>
// //                         <p className="text-gray-600">Enter your email to receive a reset code.</p>
// //                     </div>
// //                     <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
// //                         <div className="space-y-4">
// //                             <div>
// //                                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
// //                                     Email Address
// //                                 </label>
// //                                 <div className="relative">
// //                                     <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
// //                                     <input
// //                                         id="email"
// //                                         name="email"
// //                                         type="email"
// //                                         autoComplete="email"
// //                                         required
// //                                         value={email}
// //                                         onChange={(e) => setEmail(e.target.value)}
// //                                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
// //                                         placeholder="Enter your email"
// //                                     />
// //                                 </div>
// //                             </div>
// //                         </div>
// //                         <button
// //                             type="submit"
// //                             disabled={isLoading}
// //                             className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
// //                         >
// //                             {isLoading ? <LoadingSpinner size="sm" /> : 'Send Reset Code'}
// //                         </button>
// //                         <div className="text-center">
// //                             <p className="text-gray-600">
// //                                 Remember your password?{' '}
// //                                 <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
// //                                     Sign In
// //                                 </Link>
// //                             </p>
// //                         </div>
// //                     </form>
// //                 </div>
// //             </motion.div>
// //         </div>
// //     );
// // };

// // export default ForgotPassword;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import toast from "react-hot-toast";

// const ForgotPassword = () => {
//   const [step, setStep] = useState<"email" | "otp">("email");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [timeLeft, setTimeLeft] = useState<number>(0); // countdown
//   const navigate = useNavigate();

//   // Step 1: Send OTP
//   const handleSendOTP = async () => {
//     try {
//       const res = await api.post("/auth/request-password-reset", { email });
//       toast.success(res.data.message);
//       setStep("otp");
//       setTimeLeft(600); // 10 min countdown
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Error sending OTP");
//     }
//   };

//   // Step 2: Verify OTP
//   const handleVerifyOTP = async () => {
//     try {
//       const res = await api.post("/auth/verify-reset-otp", { email, otp });
//       toast.success(res.data.message);
//       navigate("/reset-password", { state: { email } });
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Invalid OTP");
//     }
//   };

//   // Countdown effect
//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6">
//           {step === "email" ? "Forgot Password" : "Verify OTP"}
//         </h2>

//         {step === "email" && (
//           <>
//             <input
//               type="email"
//               placeholder="Enter registered email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full mb-4 px-4 py-2 border rounded-lg"
//             />
//             <button
//               onClick={handleSendOTP}
//               className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
//             >
//               Send OTP
//             </button>
//           </>
//         )}

//         {step === "otp" && (
//           <>
//             <input
//               type="text"
//               placeholder="Enter OTP"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               className="w-full mb-4 px-4 py-2 border rounded-lg"
//             />

//             {timeLeft > 0 ? (
//               <p className="text-gray-600 mb-4 text-sm">
//                 OTP expires in <span className="font-semibold">{formatTime(timeLeft)}</span>
//               </p>
//             ) : (
//               <p className="text-red-500 mb-4 text-sm">OTP expired. Please request again.</p>
//             )}

//             <button
//               onClick={handleVerifyOTP}
//               disabled={timeLeft <= 0}
//               className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//             >
//               Verify OTP
//             </button>

//             {timeLeft <= 0 && (
//               <button
//                 onClick={handleSendOTP}
//                 className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600"
//               >
//                 Resend OTP
//               </button>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { requestPasswordReset, clearError } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store/store';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }
    try {
      await dispatch(requestPasswordReset(email)).unwrap();
      toast.success('OTP sent to your email! Please check and verify.');
      navigate('/verify-password-reset', { state: { email } });
    } catch (err) {
      // Error is handled by the useEffect hook
      console.error("Forgot Password failed:", err);
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password</h2>
            <p className="text-gray-600">Enter your email to receive a reset code.</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : 'Send OTP'}
            </button>
            <div className="text-center">
              <p className="text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
