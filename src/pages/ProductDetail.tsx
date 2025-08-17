// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { fetchProductById } from '../store/slices/productsSlice';
// import { addToCart } from '../store/slices/cartSlice';
// import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
// import { RootState, AppDispatch } from '../store/store';
// import LoadingSpinner from '../components/UI/LoadingSpinner';

// const ProductDetail = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
  
//   const { currentProduct, isLoading } = useSelector((state: RootState) => state.products);
//   const { isAuthenticated } = useSelector((state: RootState) => state.auth);
//   const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchProductById(id));
//     }
//   }, [dispatch, id]);
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, []);
  

//   const isInWishlist = currentProduct && wishlistItems.some(item => item._id === currentProduct._id);
  
//   const discountedPrice = currentProduct?.isDiscounted 
//     ? currentProduct.price - (currentProduct.price * currentProduct.discountPercentage / 100)
//     : currentProduct?.price || 0;

//   const handleAddToCart = () => {
//     if (!isAuthenticated) {
//       toast.error('Please login to add items to cart');
//       navigate('/login');
//       return;
//     }
//     if (!currentProduct) return;
    
//     dispatch(addToCart({ productId: currentProduct._id, quantity }));
//     toast.success('Added to cart!');
//   };

//   const handleWishlistToggle = () => {
//     if (!isAuthenticated) {
//       toast.error('Please login to add items to wishlist');
//       navigate('/login');
//       return;
//     }
//     if (!currentProduct) return;
    
//     if (isInWishlist) {
//       dispatch(removeFromWishlist(currentProduct._id));
//       toast.success('Removed from wishlist');
//     } else {
//       dispatch(addToWishlist(currentProduct._id));
//       toast.success('Added to wishlist!');
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <LoadingSpinner size="lg" />
//       </div>
//     );
//   }

//   if (!currentProduct) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
//           <button
//             onClick={() => navigate('/terrastore')}
//             className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
//           >
//             Back to Store
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Back Button */}
//         <motion.button
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.5 }}
//           onClick={() => navigate(-1)}
//           className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-8 transition-colors"
//         >
//           <ArrowLeft className="h-5 w-5" />
//           <span>Back</span>
//         </motion.button>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Product Images */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             className="space-y-4"
//           >
//             <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
//               <img
//                 src={currentProduct.images[selectedImage] || 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'}
//                 alt={currentProduct.name}
//                 className="w-full h-full object-cover"
//               />
//             </div>
            
//             {currentProduct.images.length > 1 && (
//               <div className="flex space-x-4 overflow-x-auto">
//                 {currentProduct.images.map((image, index) => (
//                   <button
//                     key={index}
//                     onClick={() => setSelectedImage(index)}
//                     className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
//                       selectedImage === index ? 'border-green-600' : 'border-gray-200'
//                     }`}
//                   >
//                     <img
//                       src={image}
//                       alt={`${currentProduct.name} ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </motion.div>

//           {/* Product Info */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="space-y-6"
//           >
//             <div>
//               <div className="flex items-center space-x-2 mb-2">
//                 {currentProduct.isDiscounted && (
//                   <span className="bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     {currentProduct.discountPercentage}% OFF
//                   </span>
//                 )}
//                 {currentProduct.isNewlyLaunched && (
//                   <span className="bg-green-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     NEW
//                   </span>
//                 )}
//                 {currentProduct.isTopSelling && (
//                   <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
//                     BESTSELLER
//                   </span>
//                 )}
//               </div>
              
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentProduct.name}</h1>
//               <p className="text-gray-600 mb-4">{currentProduct.description}</p>
              
//               {/* Rating */}
//               <div className="flex items-center space-x-2 mb-4">
//                 <div className="flex items-center">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className={`h-5 w-5 ${
//                         i < Math.floor(currentProduct.ratings.average)
//                           ? 'text-yellow-400 fill-current'
//                           : 'text-gray-300'
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-sm text-gray-600">
//                   {currentProduct.ratings.average.toFixed(1)} ({currentProduct.ratings.count} reviews)
//                 </span>
//               </div>
//             </div>

//             {/* Price */}
//             <div className="space-y-2">
//               <div className="flex items-center space-x-4">
//                 <span className="text-3xl font-bold text-green-600">
//                   ₹{discountedPrice.toFixed(2)}
//                 </span>
//                 {currentProduct.isDiscounted && (
//                   <span className="text-xl text-gray-500 line-through">
//                     ₹{currentProduct.price.toFixed(2)}
//                   </span>
//                 )}
//               </div>
//               <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                 currentProduct.inStock 
//                   ? 'bg-green-100 text-green-800' 
//                   : 'bg-red-100 text-red-800'
//               }`}>
//                 {currentProduct.inStock ? 'In Stock' : 'Out of Stock'}
//               </span>
//             </div>

//             {/* Quantity Selector */}
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
//                 <div className="flex items-center space-x-3">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
//                   >
//                     <Minus className="h-4 w-4" />
//                   </button>
//                   <span className="w-12 text-center font-semibold">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(quantity + 1)}
//                     className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
//                   >
//                     <Plus className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex space-x-4">
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={!currentProduct.inStock}
//                   className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
//                 >
//                   <ShoppingCart className="h-5 w-5" />
//                   <span>Add to Cart</span>
//                 </button>
                
//                 <button
//                   onClick={handleWishlistToggle}
//                   className={`p-3 rounded-lg border-2 transition-colors ${
//                     isInWishlist
//                       ? 'border-red-500 bg-red-50 text-red-500'
//                       : 'border-gray-300 hover:border-red-500 hover:text-red-500'
//                   }`}
//                 >
//                   <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
//                 </button>
//               </div>
//             </div>

//             {/* Product Specifications */}
//             {currentProduct.specifications && Object.keys(currentProduct.specifications).length > 0 && (
//               <div className="bg-gray-50 rounded-lg p-6">
//                 <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
//                 <div className="space-y-2">
//                   {Object.entries(currentProduct.specifications).map(([key, value]) => (
//                     <div key={key} className="flex justify-between">
//                       <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
//                       <span className="font-medium">{value}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Category */}
//             <div className="bg-green-50 rounded-lg p-4">
//               <span className="text-sm text-gray-600">Category: </span>
//               <span className="font-medium text-green-600">{currentProduct.category}</span>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, Heart, ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchProductById } from '../store/slices/productSlice'; 
import { addToCart } from '../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../store/slices/wishlistSlice';
import { RootState, AppDispatch } from '../store/store';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  const { currentProduct, isLoading } = useSelector((state: RootState) => state.products);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const { items: cartItems } = useSelector((state: RootState) => state.cart); // ✅ cart items
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const isInWishlist = currentProduct
    ? wishlistItems.some(item => (item.product?._id || item._id) === (currentProduct as any)._id)
    : false;

  // ✅ Check if product is already in cart
  const isInCart = currentProduct
    ? cartItems.some(item => (item.product?._id || item._id) === (currentProduct as any)._id)
    : false;
  
  const discountedPrice = currentProduct?.isDiscounted 
    ? currentProduct.price - (currentProduct.price * (currentProduct.discountPercentage || 0) / 100)
    : currentProduct?.price || 0;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    if (!currentProduct) return;
    
    dispatch(addToCart({ productId: (currentProduct as any)._id, quantity }));
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to wishlist');
      navigate('/login');
      return;
    }
    if (!currentProduct) return;
    
    if (isInWishlist) {
      dispatch(removeFromWishlist((currentProduct as any)._id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist((currentProduct as any)._id));
      toast.success('Added to wishlist!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!currentProduct) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/terrastore')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Store
          </button>
        </div>
      </div>
    );
  }

  const images = (currentProduct as any).images || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-green-600 mb-8 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={images[selectedImage] || 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'}
                alt={(currentProduct as any).name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto">
                {images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-green-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${(currentProduct as any).name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{(currentProduct as any).name}</h1>
              <p className="text-gray-600 mb-4">{(currentProduct as any).description}</p>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-green-600">
                  ₹{discountedPrice.toFixed(2)}
                </span>
                {(currentProduct as any).isDiscounted && (
                  <span className="text-xl text-gray-500 line-through">
                    ₹{(currentProduct as any).price.toFixed(2)}
                  </span>
                )}
              </div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                (currentProduct as any).inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {(currentProduct as any).inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* Quantity Selector */}
            {!isInCart && ( // ✅ Only show quantity when product not yet in cart
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4">
              {isInCart ? (
                <button
                  onClick={() => navigate('/cart')}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Go to Cart</span>
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={!(currentProduct as any).inStock}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              )}
              
              <button
                onClick={handleWishlistToggle}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  isInWishlist
                    ? 'border-red-500 bg-red-50 text-red-500'
                    : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                }`}
              >
                <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
