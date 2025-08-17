// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Lock, Eye, EyeOff, Hash } from 'lucide-react';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { clearError } from '../../store/slices/authSlice';
// import { RootState, AppDispatch } from '../../store/store';
// import LoadingSpinner from '../../components/UI/LoadingSpinner';

// const ResetPassword = () => {
//     const [formData, setFormData] = useState({
//         otp: '',
//         newPassword: '',
//         confirmPassword: ''
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const dispatch = useDispatch<AppDispatch>();
//     const navigate = useNavigate();
//     const { isLoading, error } = useSelector((state: RootState) => state.auth);
//     const [userId, setUserId] = useState<string | null>(null);

//     useEffect(() => {
//         const storedUserId = localStorage.getItem('resetUserId');
//         if (storedUserId) {
//             setUserId(storedUserId);
//         } else {
//             toast.error("No user found for password reset. Please try again.");
//             navigate('/forgot-password');
//         }
//     }, [navigate]);

//     useEffect(() => {
//         if (error) {
//             toast.error(error);
//             dispatch(clearError());
//         }
//     }, [error, dispatch]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!userId) {
//             toast.error("Something went wrong. Please request a new OTP.");
//             return;
//         }
//         if (!formData.otp || !formData.newPassword || !formData.confirmPassword) {
//             toast.error('Please fill in all fields.');
//             return;
//         }
//         if (formData.newPassword !== formData.confirmPassword) {
//             toast.error('Passwords do not match.');
//             return;
//         }
//         if (formData.newPassword.length < 6) {
//             toast.error('Password must be at least 6 characters long.');
//             return;
//         }
//         try {
//             // For now, just show a message since resetPassword action doesn't exist
//             toast.success('Password reset functionality not implemented yet.');
//             navigate('/login');
//         } catch (err) {
//             // Error is handled by the useEffect hook
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//             <motion.div
//                 initial={{ opacity: 0, y: 50 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.8 }}
//                 className="max-w-md w-full space-y-8"
//             >
//                 <div className="bg-white rounded-2xl shadow-xl p-8">
//                     <div className="text-center">
//                         <img src="/Untitled design (1).png" alt="TerraceTop" className="h-12 w-auto mx-auto mb-4" />
//                         <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
//                         <p className="text-gray-600">Enter the OTP from your email and create a new password.</p>
//                     </div>
//                     <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//                         <div className="space-y-4">
//                             <div>
//                                 <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">OTP Code</label>
//                                 <div className="relative">
//                                     <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                                     <input id="otp" name="otp" type="text" required value={formData.otp} onChange={handleChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" placeholder="Enter the 6-digit OTP" />
//                                 </div>
//                             </div>
//                             <div>
//                                 <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
//                                 <div className="relative">
//                                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                                     <input id="newPassword" name="newPassword" type={showPassword ? 'text' : 'password'} required value={formData.newPassword} onChange={handleChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" placeholder="Create a new password" />
//                                     <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                                         {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                                     </button>
//                                 </div>
//                             </div>
//                             <div>
//                                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
//                                 <div className="relative">
//                                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
//                                     <input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} required value={formData.confirmPassword} onChange={handleChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all" placeholder="Confirm your new password" />
//                                     <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
//                                         {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                         <button type="submit" disabled={isLoading} className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
//                             {isLoading ? <LoadingSpinner size="sm" /> : 'Reset Password'}
//                         </button>
//                     </form>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default ResetPassword;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || ""; // email passed from ForgotPassword
  const [newPassword, setNewPassword] = useState("");

  const handleResetPassword = async () => {
    try {
      const res = await api.post("/auth/reset-password", { email, newPassword });
      toast.success(res.data.message);
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
        />

        <button
          onClick={handleResetPassword}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
