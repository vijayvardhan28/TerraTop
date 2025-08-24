// import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { Menu, X, User, ShoppingBag, Heart } from 'lucide-react';
// import { logout } from '../../store/slices/authSlice';
// import { RootState, AppDispatch } from '../../store/store';
// import { selectCartCount } from '../../store/slices/cartSlice';
// import { selectWishlistItemCount } from '../../store/slices/wishlistSlice';
// // import { fetchCart, selectCartTotalItems } from '../store/slices/cartSlice';


// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const dispatch = useDispatch<AppDispatch>();
//   const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
//   const cartCount = useSelector(selectCartCount);
//   const wishlistCount = useSelector(selectWishlistItemCount);

//   const navigation = [
//     { name: 'Home', href: '/' },
//     { name: 'TerraKit', href: '/terrakit' },
//     { name: 'TerraStore', href: '/terrastore' },
//     { name: 'TerraBook', href: '/terrabook' },
//   ];

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/" className="flex items-center space-x-2">
//               <img 
//                 src="/Untitled design (1).png" 
//                 alt="TerraceTop" 
//                 className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform"
//               />
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   location.pathname === item.href
//                     ? 'text-green-600 bg-green-50'
//                     : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
//                 }`}
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </div>

//           {/* Right side */}
//           <div className="hidden md:flex items-center space-x-4">
//             {isAuthenticated && user ? (
//               <>
//                 {/* Wishlist Icon with Count */}
//                 <Link to="/wishlist" className="relative flex items-center mr-2">
//                   <Heart className="h-6 w-6 text-green-600" />
//                   {wishlistCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                       {wishlistCount}
//                     </span>
//                   )}
//                 </Link>
                
//                 {/* Cart Icon with Count */}
//                 <Link to="/cart" className="relative flex items-center mr-2">
//                   <ShoppingBag className="h-6 w-6 text-green-600" />
//                   {cartCount > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
//                       {cartCount}
//                     </span>
//                   )}
//                 </Link>
//                 <div className="flex items-center space-x-2">
//                   <User className="h-6 w-6 text-green-600" />
//                   <span className="text-sm font-medium text-green-700">{user.name}</span>
//                   <button
//                     onClick={handleLogout}
//                     className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="flex items-center space-x-4">
//                 <Link
//                   to="/register"
//                   className="text-green-600 hover:text-green-700 font-medium"
//                 >
//                   Sign Up
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
//                 >
//                   Login
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-600 hover:text-green-600 transition-colors"
//             >
//               {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
//             {navigation.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className={`block px-3 py-2 rounded-md text-base font-medium ${
//                   location.pathname === item.href
//                     ? 'text-green-600 bg-green-50'
//                     : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
//                 }`}
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.name}
//               </Link>
//             ))}
//             {isAuthenticated && user ? (
//               <>
//                 <div className="flex items-center space-x-2 px-3 py-2">
//                   <User className="h-6 w-6 text-green-600" />
//                   <span className="text-base font-medium text-green-700">{user.name}</span>
//                 </div>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsOpen(false);
//                   }}
//                   className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
//                 >
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/register"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Sign Up
//                 </Link>
//                 <Link
//                   to="/login"
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50"
//                   onClick={() => setIsOpen(false)}
//                 >
//                   Login
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, User, ShoppingBag, Heart, Settings, Package, Wrench } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store/store';
import { selectCartCount } from '../../store/slices/cartSlice';
import { selectWishlistItemCount } from '../../store/slices/wishlistSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector(selectWishlistItemCount);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'TerraKit', href: '/terrakit' },
    { name: 'TerraStore', href: '/terrastore' },
    { name: 'TerraBook', href: '/terrabook' },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/Untitled design (1).png" 
                alt="TerraceTop" 
                className="h-10 w-auto cursor-pointer hover:scale-105 transition-transform"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.href
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-700 hover:text-green-600 hover:bg-green-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-gray-100">
                  <Heart className="h-6 w-6 text-green-600" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                
                <Link to="/cart" className="relative p-2 rounded-full hover:bg-gray-100">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                  {cartCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
                
                {/* User Dropdown Menu */}
                <div className="relative group">
                  <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-100">
                    <User className="h-6 w-6 text-green-600" />
                    <span className="text-sm font-medium text-green-700">{user.name}</span>
                  </div>
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20
                                  invisible opacity-0 group-hover:visible group-hover:opacity-100
                                  transition-all duration-200 transform group-hover:scale-100 scale-95">
                    <Link to="/profile" state={{ initialTab: 'profile' }} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="mr-2 h-4 w-4" /> Profile
                    </Link>
                    <Link to="/orders" className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Package className="mr-2 h-4 w-4" /> Orders
                    </Link>
                    <Link to="/profile" state={{ initialTab: 'savedKits' }} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Wrench className="mr-2 h-4 w-4" /> Saved Kits
                    </Link>
                    <Link to="/profile" state={{ initialTab: 'settings' }} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                    </Link>
                  </div>
                </div>

                {/* UPDATED: Logout button moved back here */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                  Sign Up
                </Link>
                <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-green-600 transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
            {/* ... mobile menu JSX from previous step ... */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;