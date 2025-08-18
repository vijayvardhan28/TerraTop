import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addToCart } from '../../store/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../store/slices/wishlistSlice';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    category?: string;
    image: string;
    isDiscounted?: boolean;
    discountPercentage?: number;
    isNewlyLaunched?: boolean;
    isTopSelling?: boolean;
    inStock?: boolean;
    availability?: string; // in case your API uses this string
    // any additional fields will still render in detail page
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items: wishlistItems } = useSelector((state: RootState) => state.wishlist);

  const discountedPrice = product.isDiscounted 
    ? product.price - (product.price * (product.discountPercentage || 0) / 100)
    : product.price;

  const isInWishlist = wishlistItems.some(w => (w.product?._id || w._id) === product._id);

  const ensureAuth = (action: () => void) => {
    if (!isAuthenticated) {
      toast.error('Please login to continue');
      return;
    }
    action();
  };

  const handleAddToCart = () =>
    ensureAuth(() => {
      dispatch(addToCart({ productId: product._id, quantity: 1 }));
      toast.success('Added to cart!');
    });

  const handleWishlistToggle = () =>
    ensureAuth(() => {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product._id));
      } else {
        dispatch(addToWishlist(product._id));
      }
    });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product._id}`}>
        <div className="h-48 bg-gray-100 flex items-center justify-center">
          {product.image && product.image.length > 0 ? (
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="text-3xl font-bold text-green-600">
              {product.name?.charAt(0) || 'P'}
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          {product.isDiscounted && (
            <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium">
              {product.discountPercentage}% OFF
            </span>
          )}
          {product.isNewlyLaunched && (
            <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-medium">
              NEW
            </span>
          )}
          {product.isTopSelling && (
            <span className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-medium">
              BESTSELLER
            </span>
          )}
        </div>

        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>

        {/* brief details so “every information” is surfaced at a glance */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        )}
        <p className="text-xs text-gray-500 mb-3">
          {typeof product.inStock === 'boolean'
            ? (product.inStock ? 'In stock' : 'Out of stock')
            : (product.availability || '')}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-green-600">₹{discountedPrice.toFixed(2)}</span>
            {product.isDiscounted && (
              <span className="text-sm text-gray-500 line-through">₹{product.price.toFixed(2)}</span>
            )}
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full transition-colors ${
                isInWishlist ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Heart className={`h-5 w-5 ${isInWishlist ? 'fill-current' : ''}`} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
              disabled={typeof product.inStock === 'boolean' ? !product.inStock : false}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
