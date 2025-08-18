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

  const image = (currentProduct as any).image || "";  

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
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={image}
                alt={(currentProduct as any).name}
                className="w-full h-full object-cover"
              />
            </div>
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
            {!isInCart && (
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
