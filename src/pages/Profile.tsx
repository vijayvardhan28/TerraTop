// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { User, Package, Heart, ShoppingCart, Settings } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { RootState } from '../store/store';

// const Profile = () => {
//   const { user } = useSelector((state: RootState) => state.auth);
//   const [activeTab, setActiveTab] = useState('profile');

//   const tabs = [
//     { id: 'profile', label: 'Profile', icon: User },
//     { id: 'orders', label: 'Orders', icon: Package },
//     { id: 'wishlist', label: 'Wishlist', icon: Heart },
//     { id: 'cart', label: 'Cart', icon: ShoppingCart },
//     { id: 'settings', label: 'Settings', icon: Settings }
//   ];

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                 <input
//                   type="text"
//                   value={user?.name || ''}
//                   readOnly
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 <input
//                   type="email"
//                   value={user?.email || ''}
//                   readOnly
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                 <input
//                   type="tel"
//                   value={user?.phone || ''}
//                   readOnly
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
//                 <input
//                   type="text"
//                   value={user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}
//                   readOnly
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
//                 />
//               </div>
//             </div>
//           </div>
//         );
//       case 'orders':
//         return (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
//             <div className="text-center py-12">
//               <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500 text-lg">No orders found</p>
//               <p className="text-gray-400">Your order history will appear here</p>
//             </div>
//           </div>
//         );
//       case 'wishlist':
//         return (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Wishlist</h2>
//             <div className="text-center py-12">
//               <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500 text-lg">Your wishlist is empty</p>
//               <p className="text-gray-400">Add products to your wishlist to see them here</p>
//             </div>
//           </div>
//         );
//       case 'cart':
//         return (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
//             <div className="text-center py-12">
//               <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500 text-lg">Your cart is empty</p>
//               <p className="text-gray-400">Add products to your cart to see them here</p>
//             </div>
//           </div>
//         );
//       case 'settings':
//         return (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
//             <div className="space-y-6">
//               <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                 <div>
//                   <h3 className="font-medium text-gray-900">Email Notifications</h3>
//                   <p className="text-sm text-gray-500">Receive updates about your orders and account</p>
//                 </div>
//                 <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
//                   <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
//                 </button>
//               </div>
//               <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                 <div>
//                   <h3 className="font-medium text-gray-900">SMS Notifications</h3>
//                   <p className="text-sm text-gray-500">Get text messages about order updates</p>
//                 </div>
//                 <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
//                   <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
//           <p className="text-xl text-gray-600">Manage your account and preferences</p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="lg:col-span-1"
//           >
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <div className="text-center mb-6">
//                 <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <User className="h-10 w-10 text-white" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900">{user?.name}</h3>
//                 <p className="text-gray-500">{user?.email}</p>
//               </div>
              
//               <nav className="space-y-2">
//                 {tabs.map(tab => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
//                       activeTab === tab.id
//                         ? 'bg-green-600 text-white'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                   >
//                     <tab.icon className="h-5 w-5" />
//                     <span>{tab.label}</span>
//                   </button>
//                 ))}
//               </nav>
//             </div>
//           </motion.div>

//           {/* Main Content */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="lg:col-span-3"
//           >
//             {renderTabContent()}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { User, Package, Heart, ShoppingCart, Settings, Wrench, Trash2 } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { RootState, AppDispatch } from '../store/store';
// import api from '../services/api'; // UPDATED: Corrected path from ../../ to ../
// import toast from 'react-hot-toast';
// import { addToCart } from '../store/slices/cartSlice'; // UPDATED: Corrected path from ../../ to ../
// import { useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../components/UI/LoadingSpinner';

// // Self-contained component for the "Saved Kits" tab content
// const SavedKitsTab = () => {
//   const [kits, setKits] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchKits = async () => {
//       try {
//         const response = await api.get('/terrakit');
//         setKits(response.data);
//       } catch (error) {
//         toast.error('Failed to fetch saved kits.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchKits();
//   }, []);

//   const handleAddKitToCart = async (terrakitId: string) => {
//     try {
//       await dispatch(addToCart({ terrakitId, quantity: 1 })).unwrap();
//       toast.success('Kit added to cart!');
//       navigate('/cart');
//     } catch (error) {
//       toast.error('Failed to add kit to cart.');
//     }
//   };

//   const handleRemoveKit = async (kitId: string) => {
//     try {
//       await api.delete(`/terrakit/${kitId}`);
//       setKits(currentKits => currentKits.filter(kit => kit._id !== kitId));
//       toast.success('Saved kit removed.');
//     } catch (error) {
//       toast.error('Failed to remove saved kit.');
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center py-12">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   if (kits.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//         <p className="text-gray-500 text-lg">You have no saved kits.</p>
//         <p className="text-gray-400">Custom configurations you save will appear here.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {kits.map((kit) => (
//         <div key={kit._id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between gap-4">
//           <div>
//             <h3 className="font-semibold text-gray-800">Custom TerraKit ({kit.numberOfPots} Pots)</h3>
//             <p className="text-sm text-gray-500">Saved on: {new Date(kit.createdAt).toLocaleDateString()}</p>
//             <p className="text-lg font-bold text-green-600 mt-1">₹{kit.totalPrice.toLocaleString()}</p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button 
//               onClick={() => handleAddKitToCart(kit._id)}
//               className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
//             >
//               <ShoppingCart className="h-4 w-4" />
//               <span>Add to Cart</span>
//             </button>
//             <button
//               onClick={() => handleRemoveKit(kit._id)}
//               className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
//               title="Remove this kit"
//             >
//               <Trash2 className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// const Profile = () => {
//   const { user } = useSelector((state: RootState) => state.auth);
//   const [activeTab, setActiveTab] = useState('profile');

//   const tabs = [
//     { id: 'profile', label: 'Profile', icon: User },
//     { id: 'orders', label: 'Orders', icon: Package },
//     { id: 'savedKits', label: 'Saved Kits', icon: Wrench },
//     { id: 'wishlist', label: 'Wishlist', icon: Heart },
//     { id: 'cart', label: 'Cart', icon: ShoppingCart },
//     { id: 'settings', label: 'Settings', icon: Settings },
//   ];

//   // Guard clause to ensure user data is loaded before rendering
//   if (!user) {
//     return (
//         <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//             <LoadingSpinner size="lg" />
//         </div>
//     );
//   }
  
//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 'profile':
//         return (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                 <input type="text" value={user.name || ''} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                 <input type="email" value={user.email || ''} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
//                 <input type="tel" value={user.phone || ''} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
//                 <input type="text" value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
//               </div>
//             </div>
//           </div>
//         );
//       case 'orders':
//         return (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
//             <div className="text-center py-12">
//               <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//               <p className="text-gray-500 text-lg">No orders found</p>
//             </div>
//           </div>
//         );
//       case 'savedKits':
//         return (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">My Saved Kits</h2>
//             <SavedKitsTab />
//           </div>
//         );
//       case 'wishlist':
//         return (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Wishlist</h2>
//             <div className="text-center py-12">
//                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                <p className="text-gray-500 text-lg">Your wishlist is empty</p>
//             </div>
//           </div>
//         );
//       case 'cart':
//         return (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
//             <div className="text-center py-12">
//                <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
//                <p className="text-gray-500 text-lg">Your cart is empty</p>
//             </div>
//           </div>
//         );
//       case 'settings':
//          return (
//           <div className="bg-white rounded-2xl shadow-lg p-8">
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
//              <div className="space-y-6">
//                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
//                      <div>
//                          <h3 className="font-medium text-gray-900">Email Notifications</h3>
//                          <p className="text-sm text-gray-500">Receive updates about your orders and account</p>
//                      </div>
//                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
//                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
//                      </button>
//                  </div>
//              </div>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
//           <p className="text-xl text-gray-600">Manage your account and preferences</p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-1">
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <div className="text-center mb-6">
//                 <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <User className="h-10 w-10 text-white" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
//                 <p className="text-sm text-gray-500">{user.email}</p>
//               </div>
//               <nav className="space-y-2">
//                 {tabs.map(tab => (
//                   <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
//                     <tab.icon className="h-5 w-5" />
//                     <span>{tab.label}</span>
//                   </button>
//                 ))}
//               </nav>
//             </div>
//           </motion.div>

//           <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-3">
//             {renderTabContent()}
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Package, Heart, ShoppingCart, Settings, Wrench, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { RootState, AppDispatch } from '../store/store';
import api from '../services/api'; // UPDATED: Corrected path
import toast from 'react-hot-toast';
import { addToCart } from '../store/slices/cartSlice'; // UPDATED: Corrected path
import { useNavigate, useLocation } from 'react-router-dom'; // UPDATED: Added useLocation
import LoadingSpinner from '../components/UI/LoadingSpinner';

// Self-contained component for the "Saved Kits" tab content
// UPDATED: Now accepts an `isActive` prop to control data fetching
const SavedKitsTab = ({ isActive }: { isActive: boolean }) => {
  const [kits, setKits] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // UPDATED: This useEffect now only fetches data when the tab is active
  useEffect(() => {
    const fetchKits = async () => {
      setLoading(true);
      try {
        const response = await api.get('/terrakit');
        setKits(response.data);
      } catch (error) {
        toast.error('Failed to fetch saved kits.');
      } finally {
        setLoading(false);
      }
    };

    if (isActive) {
      fetchKits();
    }
  }, [isActive]);

  const handleAddKitToCart = async (terrakitId: string) => {
    try {
      await dispatch(addToCart({ terrakitId, quantity: 1 })).unwrap();
      toast.success('Kit added to cart!');
      navigate('/cart');
    } catch (error) {
      toast.error('Failed to add kit to cart.');
    }
  };

  const handleRemoveKit = async (kitId: string) => {
    try {
      await api.delete(`/terrakit/${kitId}`);
      setKits(currentKits => currentKits.filter(kit => kit._id !== kitId));
      toast.success('Saved kit removed.');
    } catch (error) {
      toast.error('Failed to remove saved kit.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (kits.length === 0) {
    return (
      <div className="text-center py-12">
        <Wrench className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">You have no saved kits.</p>
        <p className="text-gray-400">Custom configurations you save will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {kits.map((kit) => (
        <div key={kit._id} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-gray-800">Custom TerraKit ({kit.numberOfPots} Pots)</h3>
            <p className="text-sm text-gray-500">Saved on: {new Date(kit.createdAt).toLocaleDateString()}</p>
            <p className="text-lg font-bold text-green-600 mt-1">₹{kit.totalPrice.toLocaleString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleAddKitToCart(kit._id)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={() => handleRemoveKit(kit._id)}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors"
              title="Remove this kit"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // UPDATED: Logic to read the initial tab from the navigation state
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.initialTab || 'profile');
  
  // This effect syncs the tab if the user clicks another link while already on the page
  useEffect(() => {
    if (location.state?.initialTab) {
      setActiveTab(location.state.initialTab);
    }
  }, [location.state]);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'savedKits', label: 'Saved Kits', icon: Wrench },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'cart', label: 'Cart', icon: ShoppingCart },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Guard clause to ensure user data is loaded before rendering
  if (!user) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <LoadingSpinner size="lg" />
        </div>
    );
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" value={user.name || ''} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" value={user.email || ''} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" value={user.phone || ''} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                <input type="text" value={user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''} readOnly className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50" />
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order History</h2>
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          </div>
        );
      case 'savedKits':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Saved Kits</h2>
            <SavedKitsTab isActive={activeTab === 'savedKits'} />
          </div>
        );
      case 'wishlist':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Wishlist</h2>
            <div className="text-center py-12">
               <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
               <p className="text-gray-500 text-lg">Your wishlist is empty</p>
            </div>
          </div>
        );
      case 'cart':
        return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h2>
            <div className="text-center py-12">
               <ShoppingCart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
               <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          </div>
        );
      case 'settings':
         return (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
             <div className="space-y-6">
                 <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                     <div>
                         <h3 className="font-medium text-gray-900">Email Notifications</h3>
                         <p className="text-sm text-gray-500">Receive updates about your orders and account</p>
                     </div>
                     <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-600">
                         <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                     </button>
                 </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h1>
          <p className="text-xl text-gray-600">Manage your account and preferences</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id ? 'bg-green-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="lg:col-span-3">
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;