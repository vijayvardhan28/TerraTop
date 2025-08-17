// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { Toaster } from 'react-hot-toast';
// import { store } from './store/store';

// // Layout Components
// import Navbar from './components/Layout/Navbar';
// import Footer from './components/Layout/Footer';

// // Pages
// import Home from './pages/Home';
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
// import VerifyOTP from './pages/Auth/VerifyOTP';
// import TerraKit from './pages/TerraKit';
// import TerraStore from './pages/TerraStore';
// import TerraBook from './pages/TerraBook';

// function AppContent() {
//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />
//         <main className="pt-16">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/verify-otp" element={<VerifyOTP />} />
//             <Route path="/terrakit" element={<TerraKit />} />
//             <Route path="/terrastore" element={<TerraStore />} />
//             <Route path="/terrabook" element={<TerraBook />} />
//           </Routes>
//         </main>
//         <Footer />
//         <Toaster position="top-right" />
//       </div>
//     </Router>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }

// export default App;

// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import { Toaster } from 'react-hot-toast';
// import { store } from './store/store';
// import { fetchCart } from './store/slices/cartSlice';
// import { fetchWishlist } from './store/slices/wishlistSlice';
// import { RootState, AppDispatch } from './store/store';

// // Layout Components
// import Navbar from './components/Layout/Navbar';
// import Footer from './components/Layout/Footer';

// // Pages
// import Home from './pages/Home';
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
// import VerifyOTP from './pages/Auth/VerifyOTP';
// import TerraKit from './pages/TerraKit';
// import TerraStore from './pages/TerraStore';
// import TerraBook from './pages/TerraBook';
// import Cart from './pages/Cart';
// import Profile from './pages/Profile';
// // The following imports are commented out because the files do not exist yet.
// // You can uncomment them as you create the pages.
// // import ProductDetail from './pages/ProductDetail';
// // import Checkout from './pages/Checkout';
// // import Orders from './pages/Orders';
// import Wishlist from './pages/Wishlist';
// // import PlantDetail from './pages/PlantDetail';
// // import Services from './pages/Services';

// function AppContent() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
//   useEffect(() => {
//     // Fetch cart and wishlist data when app initializes if user is authenticated
//     if (isAuthenticated) {
//       dispatch(fetchCart());
//       dispatch(fetchWishlist());
//     }
//   }, [dispatch, isAuthenticated]);

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         <Navbar />
//         <main className="flex-grow pt-16">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/verify-otp" element={<VerifyOTP />} />
//             <Route path="/terrakit" element={<TerraKit />} />
//             <Route path="/terrastore" element={<TerraStore />} />
//             <Route path="/terrabook" element={<TerraBook />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/profile" element={<Profile />} />
//             {/* The following routes are commented out because the components do not exist yet. */}
//             {/* You can uncomment them as you create the pages. */}
//             {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}
//             {/* <Route path="/checkout" element={<Checkout />} /> */}
//             {/* <Route path="/orders" element={<Orders />} /> */}
//             <Route path="/wishlist" element={<Wishlist />} />
//             {/* <Route path="/plants/:plantId" element={<PlantDetail />} /> */}
//             {/* <Route path="/services" element={<Services />} /> */}
//           </Routes>
//         </main>
//         <Footer />
//         <Toaster position="top-right" />
//       </div>
//     </Router>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }

// export default App;

// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Provider, useDispatch, useSelector } from 'react-redux';
// import { Toaster } from 'react-hot-toast';
// import { store } from './store/store';
// import { fetchCart } from './store/slices/cartSlice';
// import { fetchWishlist } from './store/slices/wishlistSlice';
// import { RootState, AppDispatch } from './store/store';

// // Layout Components
// import Navbar from './components/Layout/Navbar';
// import Footer from './components/Layout/Footer';

// // Pages
// import Home from './pages/Home';
// import Login from './pages/Auth/Login';
// import Register from './pages/Auth/Register';
// import VerifyOTP from './pages/Auth/VerifyOTP';
// import ForgotPassword from './pages/Auth/ForgotPassword';
// import ResetPassword from './pages/Auth/ResetPassword';
// import TerraKit from './pages/TerraKit';
// import TerraStore from './pages/TerraStore';
// import TerraBook from './pages/TerraBook';
// import Cart from './pages/Cart';
// import Profile from './pages/Profile';
// import ProductDetail from './pages/ProductDetail';
// import Checkout from './pages/Checkout';
// import Orders from './pages/Orders';
// import Wishlist from './pages/Wishlist';
// import PlantDetail from './pages/PlantDetail';

// function AppContent() {
//   const dispatch = useDispatch<AppDispatch>();
//   const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
//   useEffect(() => {
//     // Fetch cart and wishlist data when app initializes if user is authenticated
//     if (isAuthenticated) {
//       dispatch(fetchCart());
//       dispatch(fetchWishlist());
//     }
//   }, [dispatch, isAuthenticated]);

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50 flex flex-col">
//         <Navbar />
//         <main className="flex-grow pt-16">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="/verify-otp" element={<VerifyOTP />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password" element={<ResetPassword />} />
//             <Route path="/terrakit" element={<TerraKit />} />
//             <Route path="/terrastore" element={<TerraStore />} />
//             <Route path="/terrabook" element={<TerraBook />} />
//             <Route path="/cart" element={<Cart />} />
//             <Route path="/profile" element={<Profile />} />
//             <Route path="/products/:id" element={<ProductDetail />} />
//             <Route path="/checkout" element={<Checkout />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/wishlist" element={<Wishlist />} />
//             <Route path="/plant/:id" element={<PlantDetail />} />
//           </Routes>
//         </main>
//         <Footer />
//         <Toaster position="top-right" />
//       </div>
//     </Router>
//   );
// }

// function App() {
//   return (
//     <Provider store={store}>
//       <AppContent />
//     </Provider>
//   );
// }

// export default App;

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './store/store';
import { fetchCart } from './store/slices/cartSlice';
import { fetchWishlist } from './store/slices/wishlistSlice';
import { RootState, AppDispatch } from './store/store';
import { getCurrentUser } from './store/slices/authSlice';

// Layout Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import VerifyOTP from './pages/Auth/VerifyOTP';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import TerraKit from './pages/TerraKit';
import TerraStore from './pages/TerraStore';
import TerraBook from './pages/TerraBook';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import PlantDetail from './pages/PlantDetail';

function AppContent() {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user, token } = useSelector((state: RootState) => state.auth);

  // -------------------- Hydrate user on refresh --------------------
  useEffect(() => {
    if (token && !user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, user]);

  // -------------------- Fetch cart & wishlist --------------------
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/terrakit" element={<TerraKit />} />
            <Route path="/terrastore" element={<TerraStore />} />
            <Route path="/terrabook" element={<TerraBook />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/plant/:id" element={<PlantDetail />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
