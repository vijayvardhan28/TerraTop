// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import { Wrench, Droplets, Palette, Settings } from 'lucide-react';
// import toast from 'react-hot-toast';
// import { RootState, AppDispatch } from '../store/store';
// import api from '../services/api';
// import { addToCart, fetchCart } from '../store/slices/cartSlice';

// interface PotConfig {
//   design: string;
//   mudType: string;
//   plantType: string;
// }

// const TerraKit = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const { isAuthenticated } = useSelector((state: RootState) => state.auth);

//   // Load config from localStorage if available
//   const getInitialConfig = () => {
//     const saved = localStorage.getItem('terrakitConfig');
//     if (saved) {
//       try {
//         return JSON.parse(saved);
//       } catch {
//         // fallback to default if corrupted
//       }
//     }
//     return {
//       space: '',
//       numberOfPots: 1,
//       pots: [{ design: 'Ceramic', mudType: 'Garden Soil', plantType: 'Tomato' }],
//       dripSystem: { enabled: false, type: 'Basic' },
//       decorations: [],
//       installation: 'Self',
//     };
//   };

//   const [config, setConfig] = useState(getInitialConfig);

//   const [totalPrice, setTotalPrice] = useState(0);

//   const potDesigns = ['Ceramic', 'Plastic', 'Terracotta', 'Metal', 'Wooden'];
//   const mudTypes = ['Garden Soil', 'Potting Mix', 'Compost', 'Coco Peat', 'Perlite Mix'];
//   const plantTypes = ['Tomato', 'Lettuce', 'Herbs', 'Peppers', 'Spinach', 'Carrots', 'Radish'];
//   const decorationOptions = ['Garden Stones', 'Fairy Lights', 'Wind Chimes', 'Plant Labels', 'Decorative Pots'];

//   React.useEffect(() => {
//     calculatePrice();
//   }, [config]);

//   React.useEffect(() => {
//     // Update pots array when numberOfPots changes
//     const newPots = Array.from({ length: config.numberOfPots }, (_, index) => 
//       config.pots[index] || { design: 'Ceramic', mudType: 'Garden Soil', plantType: 'Tomato' }
//     );
//     setConfig(prev => ({ ...prev, pots: newPots }));
//   }, [config.numberOfPots]);

//   // Save config to localStorage on every change
//   React.useEffect(() => {
//     localStorage.setItem('terrakitConfig', JSON.stringify(config));
//   }, [config]);

//   const calculatePrice = () => {
//     let price = 0;
//     price += config.numberOfPots * 500; // Base pot price
//     price += config.pots.length * 200; // Soil and seeds
//     if (config.dripSystem.enabled) price += 2000;
//     if (config.installation === 'Staff') price += 1500;
//     price += config.decorations.length * 300;
//     setTotalPrice(price);
//   };

//   const handleSpaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setConfig({ ...config, space: e.target.value });
//   };

//   const handlePotsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const numberOfPots = parseInt(e.target.value);
//     setConfig({ ...config, numberOfPots });
//   };

//   const handlePotConfigChange = (index: number, field: keyof PotConfig, value: string) => {
//     const newPots = [...config.pots];
//     newPots[index] = { ...newPots[index], [field]: value };
//     setConfig({ ...config, pots: newPots });
//   };

//   const handleDripSystemToggle = () => {
//     const enabled = !config.dripSystem.enabled;
//     setConfig({
//       ...config,
//       dripSystem: { ...config.dripSystem, enabled },
//       installation: enabled ? 'Staff' : config.installation
//     });
//   };

//   const handleDecorationToggle = (decoration: string) => {
//     const newDecorations = config.decorations.includes(decoration)
//       ? config.decorations.filter(d => d !== decoration)
//       : [...config.decorations, decoration];
//     setConfig({ ...config, decorations: newDecorations });
//   };

//   const handleAddToCart = async () => {
//     if (!isAuthenticated) {
//       toast.error('Please login to add TerraKit to cart');
//       navigate('/login');
//       return;
//     }
//     if (!config.space) {
//       toast.error('Please enter your space area');
//       return;
//     }
//     try {
//       // Save TerraKit config and get its ID
//       const response = await api.post('/terrakit/create', {
//         ...config,
//         space: parseFloat(config.space),
//         totalPrice: totalPrice // Make sure to include the calculated price
//       });
//       const terrakitId = response.data._id;
//       if (!terrakitId) {
//         toast.error('TerraKit creation did not return an ID.');
//         return;
//       }
//       // Add to cart
//       await dispatch(addToCart({ terrakitId, quantity: 1 })).unwrap();
//       dispatch(fetchCart());
//       toast.success('TerraKit added to cart!');
      
//       // Ask user if they want to proceed to checkout
//       const goToCheckout = window.confirm('TerraKit added to cart! Would you like to proceed to checkout?');
//       if (goToCheckout) {
//         navigate('/checkout');
//       }
//     } catch (error: any) {
//       if (error?.response?.data?.message) {
//         toast.error('Failed: ' + error.response.data.message);
//       } else {
//         toast.error('Failed to add TerraKit to cart');
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-12"
//         >
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Customize Your TerraKit</h1>
//           <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//             Design your perfect rooftop farming setup with our interactive customization tool
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Configuration Form */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="bg-white rounded-2xl shadow-xl p-8"
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//               <Settings className="h-6 w-6 mr-2 text-green-600" />
//               Configuration
//             </h2>

//             <div className="space-y-6">
//               {/* Space Input */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Available Space (sq.ft)
//                 </label>
//                 <input
//                   type="number"
//                   value={config.space}
//                   onChange={handleSpaceChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   placeholder="Enter your space in square feet"
//                 />
//               </div>

//               {/* Number of Pots */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   Number of Pots
//                 </label>
//                 <select
//                   value={config.numberOfPots}
//                   onChange={handlePotsChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                 >
//                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
//                     <option key={num} value={num}>{num} Pots</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Pot Configurations */}
//               <div className="space-y-4">
//                 <h3 className="text-lg font-semibold text-gray-900">Pot Configurations</h3>
//                 {config.pots.map((pot, index) => (
//                   <div key={index} className="bg-gray-50 p-4 rounded-lg">
//                     <h4 className="font-medium text-gray-900 mb-3">Pot {index + 1}</h4>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                       <div>
//                         <label className="block text-xs font-medium text-gray-600 mb-1">Design</label>
//                         <select
//                           value={pot.design}
//                           onChange={(e) => handlePotConfigChange(index, 'design', e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 text-sm"
//                         >
//                           {potDesigns.map(design => (
//                             <option key={design} value={design}>{design}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium text-gray-600 mb-1">Soil Type</label>
//                         <select
//                           value={pot.mudType}
//                           onChange={(e) => handlePotConfigChange(index, 'mudType', e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 text-sm"
//                         >
//                           {mudTypes.map(mud => (
//                             <option key={mud} value={mud}>{mud}</option>
//                           ))}
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-xs font-medium text-gray-600 mb-1">Plant</label>
//                         <select
//                           value={pot.plantType}
//                           onChange={(e) => handlePotConfigChange(index, 'plantType', e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 text-sm"
//                         >
//                           {plantTypes.map(plant => (
//                             <option key={plant} value={plant}>{plant}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Drip System */}
//               <div>
//                 <div className="flex items-center justify-between mb-3">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center">
//                     <Droplets className="h-5 w-5 mr-2 text-blue-600" />
//                     Drip System
//                   </h3>
//                   <button
//                     type="button"
//                     onClick={handleDripSystemToggle}
//                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                       config.dripSystem.enabled ? 'bg-green-600' : 'bg-gray-200'
//                     }`}
//                   >
//                     <span
//                       className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                         config.dripSystem.enabled ? 'translate-x-6' : 'translate-x-1'
//                       }`}
//                     />
//                   </button>
//                 </div>
//                 {config.dripSystem.enabled && (
//                   <select
//                     value={config.dripSystem.type}
//                     onChange={(e) => setConfig({
//                       ...config,
//                       dripSystem: { ...config.dripSystem, type: e.target.value }
//                     })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                   >
//                     <option value="Basic">Basic System</option>
//                     <option value="Advanced">Advanced System</option>
//                     <option value="Smart">Smart System</option>
//                   </select>
//                 )}
//               </div>

//               {/* Decorations */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
//                   <Palette className="h-5 w-5 mr-2 text-purple-600" />
//                   Decorations
//                 </h3>
//                 <div className="grid grid-cols-2 gap-3">
//                   {decorationOptions.map(decoration => (
//                     <label key={decoration} className="flex items-center space-x-2 cursor-pointer">
//                       <input
//                         type="checkbox"
//                         checked={config.decorations.includes(decoration)}
//                         onChange={() => handleDecorationToggle(decoration)}
//                         className="rounded border-gray-300 text-green-600 focus:ring-green-500"
//                       />
//                       <span className="text-sm text-gray-700">{decoration}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* Installation */}
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
//                   <Wrench className="h-5 w-5 mr-2 text-orange-600" />
//                   Installation
//                 </h3>
//                 <div className="grid grid-cols-2 gap-4">
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="installation"
//                       value="Self"
//                       checked={config.installation === 'Self'}
//                       onChange={(e) => setConfig({ ...config, installation: e.target.value })}
//                       disabled={config.dripSystem.enabled}
//                       className="text-green-600 focus:ring-green-500"
//                     />
//                     <span className={`text-sm ${config.dripSystem.enabled ? 'text-gray-400' : 'text-gray-700'}`}>
//                       Self Installation
//                     </span>
//                   </label>
//                   <label className="flex items-center space-x-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="installation"
//                       value="Staff"
//                       checked={config.installation === 'Staff'}
//                       onChange={(e) => setConfig({ ...config, installation: e.target.value })}
//                       className="text-green-600 focus:ring-green-500"
//                     />
//                     <span className="text-sm text-gray-700">Staff Installation</span>
//                   </label>
//                 </div>
//                 {config.dripSystem.enabled && (
//                   <p className="text-xs text-gray-500 mt-2">
//                     Staff installation is required for drip systems
//                   </p>
//                 )}
//               </div>
//             </div>
//             {/* Add to Cart Button */}
//             <button
//               onClick={handleAddToCart}
//               className="w-full mt-6 bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors mb-4"
//             >
//               Add to Cart
//             </button>
//           </motion.div>

//           {/* Live Preview */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="bg-white rounded-2xl shadow-xl p-8"
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Preview</h2>
            
//             {/* Visual Layout */}
//             <div className="bg-green-50 rounded-lg p-6 mb-6 min-h-64">
//               <div className="grid grid-cols-3 gap-4">
//                 {config.pots.map((pot, index) => (
//                   <div
//                     key={index}
//                     className="bg-white rounded-lg p-3 shadow-sm border-2 border-green-200 text-center"
//                   >
//                     <div className="w-12 h-12 bg-green-600 rounded-full mx-auto mb-2"></div>
//                     <p className="text-xs font-medium text-gray-700">{pot.plantType}</p>
//                     <p className="text-xs text-gray-500">{pot.design}</p>
//                   </div>
//                 ))}
//               </div>
//               {config.dripSystem.enabled && (
//                 <div className="mt-4 flex justify-center">
//                   <div className="bg-blue-200 px-3 py-1 rounded-full text-xs font-medium text-blue-800">
//                     Drip System Enabled
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Price Breakdown */}
//             <div className="bg-gray-50 rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span>Pots ({config.numberOfPots})</span>
//                   <span>₹{(config.numberOfPots * 500).toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Soil & Seeds</span>
//                   <span>₹{(config.pots.length * 200).toLocaleString()}</span>
//                 </div>
//                 {config.dripSystem.enabled && (
//                   <div className="flex justify-between">
//                     <span>Drip System</span>
//                     <span>₹2,000</span>
//                   </div>
//                 )}
//                 {config.installation === 'Staff' && (
//                   <div className="flex justify-between">
//                     <span>Staff Installation</span>
//                     <span>₹1,500</span>
//                   </div>
//                 )}
//                 {config.decorations.length > 0 && (
//                   <div className="flex justify-between">
//                     <span>Decorations ({config.decorations.length})</span>
//                     <span>₹{(config.decorations.length * 300).toLocaleString()}</span>
//                   </div>
//                 )}
//                 <div className="border-t pt-2 font-semibold flex justify-between">
//                   <span>Total</span>
//                   <span className="text-green-600">₹{totalPrice.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>

//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TerraKit;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Wrench, Droplets, Palette, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import { RootState, AppDispatch } from '../store/store';
import api from '../services/api';
import { addToCart, fetchCart } from '../store/slices/cartSlice';

interface PotConfig {
  design: string;
  mudType: string;
  plantType: string;
}

const TerraKit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const getInitialConfig = () => {
    const saved = localStorage.getItem('terrakitConfig');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {}
    }
    return {
      space: '',
      numberOfPots: 1,
      pots: [{ design: 'Ceramic', mudType: 'Garden Soil', plantType: 'Tomato' }],
      dripSystem: { enabled: false, type: 'Basic' },
      decorations: [],
      installation: 'Self',
    };
  };

  const [config, setConfig] = useState(getInitialConfig);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAdded, setIsAdded] = useState(false); // NEW state

  const potDesigns = ['Ceramic', 'Plastic', 'Terracotta', 'Metal', 'Wooden'];
  const mudTypes = ['Garden Soil', 'Potting Mix', 'Compost', 'Coco Peat', 'Perlite Mix'];
  const plantTypes = ['Tomato', 'Lettuce', 'Herbs', 'Peppers', 'Spinach', 'Carrots', 'Radish'];
  const decorationOptions = ['Garden Stones', 'Fairy Lights', 'Wind Chimes', 'Plant Labels', 'Decorative Pots'];

  React.useEffect(() => {
    calculatePrice();
  }, [config]);
  

  React.useEffect(() => {
    const newPots = Array.from({ length: config.numberOfPots }, (_, index) => 
      config.pots[index] || { design: 'Ceramic', mudType: 'Garden Soil', plantType: 'Tomato' }
    );
    setConfig(prev => ({ ...prev, pots: newPots }));
  }, [config.numberOfPots]);

  React.useEffect(() => {
    localStorage.setItem('terrakitConfig', JSON.stringify(config));
  }, [config]);

  const calculatePrice = () => {
    let price = 0;
    price += config.numberOfPots * 500;
    price += config.pots.length * 200;
    if (config.dripSystem.enabled) price += 2000;
    if (config.installation === 'Staff') price += 1500;
    price += config.decorations.length * 300;
    setTotalPrice(price);
  };

  const handleSpaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfig({ ...config, space: e.target.value });
  };

  const handlePotsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const numberOfPots = parseInt(e.target.value);
    setConfig({ ...config, numberOfPots });
  };

  const handlePotConfigChange = (index: number, field: keyof PotConfig, value: string) => {
    const newPots = [...config.pots];
    newPots[index] = { ...newPots[index], [field]: value };
    setConfig({ ...config, pots: newPots });
  };

  const handleDripSystemToggle = () => {
    const enabled = !config.dripSystem.enabled;
    setConfig({
      ...config,
      dripSystem: { ...config.dripSystem, enabled },
      installation: enabled ? 'Staff' : config.installation
    });
  };

  const handleDecorationToggle = (decoration: string) => {
    const newDecorations = config.decorations.includes(decoration)
      ? config.decorations.filter(d => d !== decoration)
      : [...config.decorations, decoration];
    setConfig({ ...config, decorations: newDecorations });
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add TerraKit to cart');
      navigate('/login');
      return;
    }
    if (!config.space) {
      toast.error('Please enter your space area');
      return;
    }

    // If already added, go to cart
    if (isAdded) {
      navigate('/cart');
      return;
    }

    try {
      const response = await api.post('/terrakit/create', {
        ...config,
        space: parseFloat(config.space),
        totalPrice: totalPrice
      });
      const terrakitId = response.data._id;
      if (!terrakitId) {
        toast.error('TerraKit creation did not return an ID.');
        return;
      }

      await dispatch(addToCart({ terrakitId, quantity: 1 })).unwrap();
      dispatch(fetchCart());
      toast.success('TerraKit added to cart!');
      setIsAdded(true); // change button to "Go to Cart"
    } catch (error: any) {
      if (error?.response?.data?.message) {
        toast.error('Failed: ' + error.response.data.message);
      } else {
        toast.error('Failed to add TerraKit to cart');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Customize Your TerraKit</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Design your perfect rooftop farming setup with our interactive customization tool
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Configuration Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Settings className="h-6 w-6 mr-2 text-green-600" />
              Configuration
            </h2>

            <div className="space-y-6">
              {/* Space Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Space (sq.ft)
                </label>
                <input
                  type="number"
                  value={config.space}
                  onChange={handleSpaceChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your space in square feet"
                />
              </div>

              {/* Number of Pots */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Pots
                </label>
                <select
                  value={config.numberOfPots}
                  onChange={handlePotsChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>{num} Pots</option>
                  ))}
                </select>
              </div>

              {/* Pot Configurations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Pot Configurations</h3>
                {config.pots.map((pot, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Pot {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Design</label>
                        <select
                          value={pot.design}
                          onChange={(e) => handlePotConfigChange(index, 'design', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 text-sm"
                        >
                          {potDesigns.map(design => (
                            <option key={design} value={design}>{design}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Soil Type</label>
                        <select
                          value={pot.mudType}
                          onChange={(e) => handlePotConfigChange(index, 'mudType', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 text-sm"
                        >
                          {mudTypes.map(mud => (
                            <option key={mud} value={mud}>{mud}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Plant</label>
                        <select
                          value={pot.plantType}
                          onChange={(e) => handlePotConfigChange(index, 'plantType', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 text-sm"
                        >
                          {plantTypes.map(plant => (
                            <option key={plant} value={plant}>{plant}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Drip System */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Droplets className="h-5 w-5 mr-2 text-blue-600" />
                    Drip System
                  </h3>
                  <button
                    type="button"
                    onClick={handleDripSystemToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      config.dripSystem.enabled ? 'bg-green-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        config.dripSystem.enabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                {config.dripSystem.enabled && (
                  <select
                    value={config.dripSystem.type}
                    onChange={(e) => setConfig({
                      ...config,
                      dripSystem: { ...config.dripSystem, type: e.target.value }
                    })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="Basic">Basic System</option>
                    <option value="Advanced">Advanced System</option>
                    <option value="Smart">Smart System</option>
                  </select>
                )}
              </div>

              {/* Decorations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Palette className="h-5 w-5 mr-2 text-purple-600" />
                  Decorations
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {decorationOptions.map(decoration => (
                    <label key={decoration} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.decorations.includes(decoration)}
                        onChange={() => handleDecorationToggle(decoration)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm text-gray-700">{decoration}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Installation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Wrench className="h-5 w-5 mr-2 text-orange-600" />
                  Installation
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="installation"
                      value="Self"
                      checked={config.installation === 'Self'}
                      onChange={(e) => setConfig({ ...config, installation: e.target.value })}
                      disabled={config.dripSystem.enabled}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className={`text-sm ${config.dripSystem.enabled ? 'text-gray-400' : 'text-gray-700'}`}>
                      Self Installation
                    </span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="installation"
                      value="Staff"
                      checked={config.installation === 'Staff'}
                      onChange={(e) => setConfig({ ...config, installation: e.target.value })}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-sm text-gray-700">Staff Installation</span>
                  </label>
                </div>
                {config.dripSystem.enabled && (
                  <p className="text-xs text-gray-500 mt-2">
                    Staff installation is required for drip systems
                  </p>
                )}
              </div>
            </div>
            {/* Add/Go to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full mt-6 bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600 transition-colors mb-4"
            >
              {isAdded ? 'Go to Cart' : 'Add to Cart'}
            </button>
          </motion.div>

          {/* Live Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Live Preview</h2>
            <div className="bg-green-50 rounded-lg p-6 mb-6 min-h-64">
              <div className="grid grid-cols-3 gap-4">
                {config.pots.map((pot, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-3 shadow-sm border-2 border-green-200 text-center"
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-full mx-auto mb-2"></div>
                    <p className="text-xs font-medium text-gray-700">{pot.plantType}</p>
                    <p className="text-xs text-gray-500">{pot.design}</p>
                  </div>
                ))}
              </div>
              {config.dripSystem.enabled && (
                <div className="mt-4 flex justify-center">
                  <div className="bg-blue-200 px-3 py-1 rounded-full text-xs font-medium text-blue-800">
                    Drip System Enabled
                  </div>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Pots ({config.numberOfPots})</span>
                  <span>₹{(config.numberOfPots * 500).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Soil & Seeds</span>
                  <span>₹{(config.pots.length * 200).toLocaleString()}</span>
                </div>
                {config.dripSystem.enabled && (
                  <div className="flex justify-between">
                    <span>Drip System</span>
                    <span>₹2,000</span>
                  </div>
                )}
                {config.installation === 'Staff' && (
                  <div className="flex justify-between">
                    <span>Staff Installation</span>
                    <span>₹1,500</span>
                  </div>
                )}
                {config.decorations.length > 0 && (
                  <div className="flex justify-between">
                    <span>Decorations ({config.decorations.length})</span>
                    <span>₹{(config.decorations.length * 300).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t pt-2 font-semibold flex justify-between">
                  <span>Total</span>
                  <span className="text-green-600">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TerraKit;
