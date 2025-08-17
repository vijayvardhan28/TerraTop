// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { CreditCard, MapPin, Phone, Mail } from 'lucide-react';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { RootState, AppDispatch } from '../store/store';
// import { fetchCart, clearCart, selectCartTotal } from '../store/slices/cartSlice';
// import api from '../services/api';
// import LoadingSpinner from '../components/UI/LoadingSpinner';

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// const Checkout = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { items } = useSelector((state: RootState) => state.cart);
//   const { user } = useSelector((state: RootState) => state.auth);
//   const cartTotal = useSelector(selectCartTotal);

//   const [isLoading, setIsLoading] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState('Razorpay');
//   const [shippingAddress, setShippingAddress] = useState({
//     name: user?.name || '',
//     phone: user?.phone || '',
//     street: '',
//     city: '',
//     state: '',
//     zipCode: '',
//     country: 'India'
//   });

//   // Handle TerraKit from state
//   const terrakit = location.state?.terrakit;

//   useEffect(() => {
//     if (!terrakit && items.length === 0) {
//       dispatch(fetchCart());
//     }
//   }, [dispatch, terrakit, items.length]);

//   // Debug logging
//   useEffect(() => {
//     console.log('Checkout Debug:', {
//       terrakit,
//       items,
//       itemsLength: items.length,
//       cartTotal,
//       calculateTotal: calculateTotal(),
//       totalWithTax
//     });
//   }, [terrakit, items, cartTotal, totalWithTax]);

//   const calculateTotal = () => {
//     if (terrakit) {
//       return terrakit.totalPrice;
//     }
    
//     // Use the calculated total from the cart slice
//     if (cartTotal > 0) {
//       return cartTotal;
//     }
    
//     // Fallback calculation
//     return items.reduce((total, item) => {
//       // Handle both product and terrakit items
//       const price = item.product?.price || item.terrakit?.totalPrice || 0;
//       return total + (price * item.quantity);
//     }, 0);
//   };

//   const totalWithTax = Math.round(calculateTotal() * 1.18);

//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setShippingAddress({
//       ...shippingAddress,
//       [e.target.name]: e.target.value
//     });
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.street || 
//         !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
//       toast.error('Please fill in all shipping address fields');
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Create order items
//       const orderItems = terrakit 
//         ? [{ terrakit: terrakit._id, quantity: 1, price: terrakit.totalPrice }]
//         : items.map(item => ({
//             product: item.product?._id,
//             terrakit: item.terrakit?._id,
//             quantity: item.quantity,
//             price: item.product?.price || item.terrakit?.totalPrice || 0
//           }));

//       // Create order
//       const orderResponse = await api.post('/orders/create', {
//         items: orderItems,
//         totalAmount: totalWithTax,
//         paymentMethod,
//         shippingAddress
//       });

//       const order = orderResponse.data;

//       if (paymentMethod === 'Razorpay') {
//         const scriptLoaded = await loadRazorpayScript();
//         if (!scriptLoaded) {
//           toast.error('Failed to load payment gateway');
//           return;
//         }

//         // Create Razorpay order
//         const paymentResponse = await api.post('/payment/create-order', {
//           amount: totalWithTax,
//           currency: 'INR'
//         });

//         const options = {
//           key: process.env.REACT_APP_RAZORPAY_KEY_ID,
//           amount: paymentResponse.data.amount,
//           currency: paymentResponse.data.currency,
//           name: 'TerraceTop',
//           description: 'Rooftop Farming Kit',
//           order_id: paymentResponse.data.id,
//           handler: async (response: any) => {
//             try {
//               await api.post('/payment/verify', {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//                 orderId: order._id
//               });

//               dispatch(clearCart());
//               toast.success('Payment successful!');
//               navigate('/orders');
//             } catch (error) {
//               toast.error('Payment verification failed');
//             }
//           },
//           prefill: {
//             name: user?.name,
//             email: user?.email,
//             contact: user?.phone
//           },
//           theme: {
//             color: '#16a34a'
//           }
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.open();
//       } else {
//         // COD
//         dispatch(clearCart());
//         toast.success('Order placed successfully!');
//         navigate('/orders');
//       }
//     } catch (error) {
//       toast.error('Failed to place order');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (!terrakit && items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">No items to checkout</h2>
//           <button
//             onClick={() => navigate('/terrastore')}
//             className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Checkout</h1>
//           <p className="text-xl text-gray-600">Complete your order</p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Shipping & Payment */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="space-y-8"
//           >
//             {/* Shipping Address */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//                 <MapPin className="h-6 w-6 mr-2 text-green-600" />
//                 Shipping Address
//               </h2>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={shippingAddress.name}
//                     onChange={handleAddressChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={shippingAddress.phone}
//                     onChange={handleAddressChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
//                   <input
//                     type="text"
//                     name="street"
//                     value={shippingAddress.street}
//                     onChange={handleAddressChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                   <input
//                     type="text"
//                     name="city"
//                     value={shippingAddress.city}
//                     onChange={handleAddressChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
//                   <input
//                     type="text"
//                     name="state"
//                     value={shippingAddress.state}
//                     onChange={handleAddressChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
//                   <input
//                     type="text"
//                     name="zipCode"
//                     value={shippingAddress.zipCode}
//                     onChange={handleAddressChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={shippingAddress.country}
//                     onChange={handleAddressChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
//                     readOnly
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Payment Method */}
//             <div className="bg-white rounded-2xl shadow-lg p-6">
//               <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
//                 <CreditCard className="h-6 w-6 mr-2 text-green-600" />
//                 Payment Method
//               </h2>
              
//               <div className="space-y-4">
//                 <label className="flex items-center space-x-3 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="Razorpay"
//                     checked={paymentMethod === 'Razorpay'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="text-green-600 focus:ring-green-500"
//                   />
//                   <span className="font-medium">Online Payment (Razorpay)</span>
//                 </label>
//                 <label className="flex items-center space-x-3 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="paymentMethod"
//                     value="COD"
//                     checked={paymentMethod === 'COD'}
//                     onChange={(e) => setPaymentMethod(e.target.value)}
//                     className="text-green-600 focus:ring-green-500"
//                   />
//                   <span className="font-medium">Cash on Delivery</span>
//                 </label>
//               </div>
//             </div>
//           </motion.div>

//           {/* Order Summary */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//             className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24"
//           >
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
//             {/* Order Items */}
//             <div className="space-y-4 mb-6">
//               {terrakit ? (
//                 <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
//                   <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
//                     <span className="text-green-600 font-bold">TK</span>
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-semibold">Custom TerraKit</h3>
//                     <p className="text-sm text-gray-600">{terrakit.numberOfPots} pots configuration</p>
//                     <p className="font-bold text-green-600">₹{terrakit.totalPrice.toLocaleString()}</p>
//                   </div>
//                 </div>
//               ) : (
//                 items.map((item) => (
//                   <div key={item._id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
//                     {item.product ? (
//                       <img
//                         src={item.product?.images?.[0] || 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'}
//                         alt={item.product?.name}
//                         className="w-16 h-16 object-cover rounded-lg"
//                       />
//                     ) : (
//                       <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
//                         <span className="text-green-600 font-bold">TK</span>
//                       </div>
//                     )}
//                     <div className="flex-1">
//                       {item.product ? (
//                         <>
//                           <h3 className="font-semibold">{item.product?.name}</h3>
//                           <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
//                           <p className="font-bold text-green-600">₹{(item.product?.price * item.quantity).toLocaleString()}</p>
//                         </>
//                       ) : (
//                         <>
//                           <h3 className="font-semibold">Custom TerraKit</h3>
//                           <p className="text-sm text-gray-600">
//                             {item.terrakit?.numberOfPots} pots configuration
//                           </p>
//                           <p className="font-bold text-green-600">₹{(item.terrakit?.totalPrice * item.quantity).toLocaleString()}</p>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
            
//             {/* Price Breakdown */}
//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Subtotal</span>
//                 <span className="font-semibold">₹{calculateTotal().toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Shipping</span>
//                 <span className="font-semibold">Free</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Tax (18%)</span>
//                 <span className="font-semibold">₹{Math.round(calculateTotal() * 0.18).toLocaleString()}</span>
//               </div>
//               <div className="border-t pt-3">
//                 <div className="flex justify-between">
//                   <span className="text-lg font-bold">Total</span>
//                   <span className="text-lg font-bold text-green-600">₹{totalWithTax.toLocaleString()}</span>
//                 </div>
//               </div>
//             </div>
            
//             <button
//               onClick={handlePayment}
//               disabled={isLoading}
//               className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//             >
//               {isLoading ? <LoadingSpinner size="sm" /> : `Place Order - ₹${totalWithTax.toLocaleString()}`}
//             </button>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Checkout;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { RootState, AppDispatch } from '../store/store';
import { fetchCart, clearCart } from '../store/slices/cartSlice';
import api from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');
  const [shippingAddress, setShippingAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  // From navigate state
  const terrakit = location.state?.terrakit;
  const cartTotalFromState = location.state?.cartTotal;

  useEffect(() => {
    if (!terrakit && items.length === 0) {
      dispatch(fetchCart());
    }
  }, [dispatch, terrakit, items.length]);
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
  const calculateTotal = () => {
    if (cartTotalFromState) {
      return cartTotalFromState;
    }
    if (terrakit) {
      return terrakit.totalPrice;
    }
    return items.reduce((total, item) => {
      const price = item.product?.price || item.terrakit?.totalPrice || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const totalWithTax = Math.round(calculateTotal() * 1.18);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!shippingAddress.name || !shippingAddress.phone || !shippingAddress.street || 
        !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
      toast.error('Please fill in all shipping address fields');
      return;
    }

    setIsLoading(true);

    try {
      const orderItems = terrakit 
        ? [{ terrakit: terrakit._id, quantity: 1, price: terrakit.totalPrice }]
        : items.map(item => ({
            product: item.product?._id,
            quantity: item.quantity,
            price: item.product?.price || item.terrakit?.totalPrice || 0
          }));

      const orderResponse = await api.post('/orders/create', {
        items: orderItems,
        totalAmount: totalWithTax,
        paymentMethod,
        shippingAddress
      });

      const order = orderResponse.data;

      if (paymentMethod === 'Razorpay') {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          toast.error('Failed to load payment gateway');
          return;
        }

        const paymentResponse = await api.post('/payment/create-order', {
          amount: totalWithTax,
          currency: 'INR'
        });

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID,
          amount: paymentResponse.data.amount,
          currency: paymentResponse.data.currency,
          name: 'TerraceTop',
          description: 'Rooftop Farming Kit',
          order_id: paymentResponse.data.id,
          handler: async (response: any) => {
            try {
              await api.post('/payment/verify', {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: order._id
              });

              dispatch(clearCart());
              toast.success('Payment successful!');
              navigate('/orders');
            } catch {
              toast.error('Payment verification failed');
            }
          },
          prefill: {
            name: user?.name,
            email: user?.email,
            contact: user?.phone
          },
          theme: {
            color: '#16a34a'
          }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        dispatch(clearCart());
        toast.success('Order placed successfully!');
        navigate('/orders');
      }
    } catch {
      toast.error('Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  if (!terrakit && items.length === 0 && !cartTotalFromState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No items to checkout</h2>
          <button
            onClick={() => navigate('/terrastore')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Checkout</h1>
          <p className="text-xl text-gray-600">Complete your order</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping & Payment */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="h-6 w-6 mr-2 text-green-600" />
                Shipping Address
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={shippingAddress.name}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleAddressChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                    readOnly
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <CreditCard className="h-6 w-6 mr-2 text-green-600" />
                Payment Method
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Razorpay"
                    checked={paymentMethod === 'Razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span className="font-medium">Online Payment (Razorpay)</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-green-600 focus:ring-green-500"
                  />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>
            </div>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {terrakit ? (
                <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 font-bold">TK</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Custom TerraKit</h3>
                    <p className="text-sm text-gray-600">{terrakit.numberOfPots} pots configuration</p>
                    <p className="font-bold text-green-600">₹{terrakit.totalPrice.toLocaleString()}</p>
                  </div>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.product?.images?.[0] || 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'}
                      alt={item.product?.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.product?.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-bold text-green-600">₹{(item.product?.price || item.terrakit?.totalPrice) * item.quantity}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (18%)</span>
                <span className="font-semibold">₹{Math.round(calculateTotal() * 0.18).toLocaleString()}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-green-600">₹{totalWithTax.toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? <LoadingSpinner size="sm" /> : `Place Order - ₹${totalWithTax.toLocaleString()}`}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
