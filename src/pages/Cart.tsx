// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { fetchCart, removeFromCart, updateCartQuantity } from '../store/slices/cartSlice';
// import { RootState, AppDispatch } from '../store/store';
// import LoadingSpinner from '../components/UI/LoadingSpinner';

// const Cart = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { items, isLoading } = useSelector((state: RootState) => state.cart);
  
//   useEffect(() => {
//   window.scrollTo({ top: 0, behavior: 'smooth' });
// }, []);


//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const handleRemoveItem = async (itemId: string) => {
//     try {
//       await dispatch(removeFromCart(itemId)).unwrap();
//       toast.success('Item removed from cart');
//     } catch (error) {
//       toast.error('Failed to remove item');
//     }
//   };

//   const handleUpdateQuantity = async (itemId: string, quantity: number) => {
//     if (quantity < 1) return;
//     try {
//       await dispatch(updateCartQuantity({ itemId, quantity })).unwrap();
//     } catch (error) {
//       toast.error('Failed to update quantity');
//     }
//   };

//   const calculateTotal = () => {
//     return items.reduce((total, item) => {
//       const price = item.product?.price || item.terrakit?.totalPrice || 0;
//       return total + (price * item.quantity);
//     }, 0);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
//             <p className="text-gray-600 mb-8">Add some products to get started!</p>
//             <Link
//               to="/terrastore"
//               className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
//             >
//               Continue Shopping
//             </Link>
//           </div>
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
//           <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
//           <p className="text-xl text-gray-600">Review your items before checkout</p>
//         </motion.div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             <motion.div
//               initial={{ opacity: 0, x: -50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="bg-white rounded-2xl shadow-lg p-6"
//             >
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Cart Items ({items.length})</h2>
              
//               <div className="space-y-6">
//                 {items.map((item, index) => (
//                   <motion.div
//                     key={item._id}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
//                   >
//                     {item.product ? (
//                       <img
//                         src={item.product.images?.[0] || 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'}
//                         alt={item.product.name}
//                         className="w-20 h-20 object-cover rounded-lg"
//                       />
//                     ) : (
//                       <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center">
//                         <span className="text-green-600 font-bold">TK</span>
//                       </div>
//                     )}
                    
//                     <div className="flex-1">
//                       {item.product ? (
//                         <>
//                           <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
//                           <p className="text-gray-600">{item.product.description}</p>
//                         </>
//                       ) : (
//                         <>
//                           <h3 className="text-lg font-semibold text-gray-900">Custom TerraKit</h3>
//                           <p className="text-gray-600">
//                             {item.terrakit?.numberOfPots} pots with {item.terrakit?.pots?.map(pot => pot.plantType).join(', ') || 'plants'}
//                           </p>
//                           <div className="flex flex-wrap gap-1 mt-1">
//                             {item.terrakit?.dripSystem?.enabled && (
//                               <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
//                                 {item.terrakit.dripSystem.type} Drip System
//                               </span>
//                             )}
//                             {item.terrakit?.installation === 'Staff' && (
//                               <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
//                                 Professional Installation
//                               </span>
//                             )}
//                             {item.terrakit?.decorations?.length > 0 && (
//                               <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
//                                 {item.terrakit.decorations.length} Decorations
//                               </span>
//                             )}
//                           </div>
//                         </>
//                       )}
//                       <p className="text-lg font-bold text-green-600 mt-2">
//                         ₹{(item.product?.price || item.terrakit?.totalPrice || 0).toLocaleString()}
//                       </p>
//                     </div>
                    
//                     <div className="flex items-center space-x-3">
//                       <button
//                         onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
//                         className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//                       >
//                         <Minus className="h-4 w-4" />
//                       </button>
//                       <span className="w-8 text-center font-semibold">{item.quantity}</span>
//                       <button
//                         onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
//                         className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//                       >
//                         <Plus className="h-4 w-4" />
//                       </button>
//                     </div>
                    
//                     <button
//                       onClick={() => handleRemoveItem(item._id)}
//                       className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                     >
//                       <Trash2 className="h-5 w-5" />
//                     </button>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Order Summary */}
//           <div className="lg:col-span-1">
//             <motion.div
//               initial={{ opacity: 0, x: 50 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8, delay: 0.4 }}
//               className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
//             >
//               <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
//               <div className="space-y-4 mb-6">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="font-semibold">₹{calculateTotal().toLocaleString()}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="font-semibold">Free</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax</span>
//                   <span className="font-semibold">₹{Math.round(calculateTotal() * 0.18).toLocaleString()}</span>
//                 </div>
//                 <div className="border-t pt-4">
//                   <div className="flex justify-between">
//                     <span className="text-lg font-bold">Total</span>
//                     <span className="text-lg font-bold text-green-600">
//                       ₹{Math.round(calculateTotal() * 1.18).toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               <button
//                 onClick={() => navigate('/checkout')}
//                 className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4"
//               >
//                 Proceed to Checkout
//               </button>
              
//               <Link
//                 to="/terrastore"
//                 className="block text-center text-green-600 hover:text-green-700 font-medium"
//               >
//                 Continue Shopping
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchCart, removeFromCart, updateCartQuantity } from '../store/slices/cartSlice';
import { RootState, AppDispatch } from '../store/store';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, isLoading } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);
  useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

  const handleRemoveItem = async (itemId: string) => {
    try {
      await dispatch(removeFromCart(itemId)).unwrap();
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleUpdateQuantity = async (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    try {
      await dispatch(updateCartQuantity({ itemId, quantity })).unwrap();
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const price = item.product?.price || item.terrakit?.totalPrice || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link
              to="/terrastore"
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <p className="text-xl text-gray-600">Review your items before checkout</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Cart Items ({items.length})</h2>
              
              <div className="space-y-6">
                {items.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                  >
                    {item.product ? (
                      <img
                        src={item.product.images?.[0] || 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-bold">TK</span>
                      </div>
                    )}
                    
                    <div className="flex-1">
                      {item.product ? (
                        <>
                          <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                          <p className="text-gray-600">{item.product.description}</p>
                        </>
                      ) : (
                        <>
                          <h3 className="text-lg font-semibold text-gray-900">Custom TerraKit</h3>
                          <p className="text-gray-600">
                            {item.terrakit?.numberOfPots} pots with {item.terrakit?.pots?.map(pot => pot.plantType).join(', ') || 'plants'}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.terrakit?.dripSystem?.enabled && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                                {item.terrakit.dripSystem.type} Drip System
                              </span>
                            )}
                            {item.terrakit?.installation === 'Staff' && (
                              <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                                Professional Installation
                              </span>
                            )}
                            {item.terrakit?.decorations?.length > 0 && (
                              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                                {item.terrakit.decorations.length} Decorations
                              </span>
                            )}
                          </div>
                        </>
                      )}
                      <p className="text-lg font-bold text-green-600 mt-2">
                        ₹{(item.product?.price || item.terrakit?.totalPrice || 0).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">₹{Math.round(calculateTotal() * 0.18).toLocaleString()}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-green-600">
                      ₹{Math.round(calculateTotal() * 1.18).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/checkout', { state: { cartTotal: calculateTotal() } })}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4"
              >
                Proceed to Checkout
              </button>
              
              <Link
                to="/terrastore"
                className="block text-center text-green-600 hover:text-green-700 font-medium"
              >
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
