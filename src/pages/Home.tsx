import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { ArrowRight, Users, Package, Wrench, Leaf, ShoppingBag, Book, User } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/UI/ProductCard';
import api from '../services/api';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [dashboardStats, setDashboardStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalKitsInstalled: 0,
    totalPlantsSold: 0
  });
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  

  useEffect(() => {
    fetchDashboardStats();
    fetchTopProducts();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch this data from your API
      // For now, we'll use placeholder data
      setDashboardStats({
        totalCustomers: 1250,
        totalOrders: 450,
        totalKitsInstalled: 320,
        totalPlantsSold: 1800
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopProducts = async () => {
    try {
      setLoading(true);
      // Updated to match Home2.tsx API endpoint
      const response = await api.get('/products?isTopSelling=true&limit=6');
      setTopProducts(response.data.products || []);
    } catch (error) {
      console.error('Error fetching top products:', error);
      setTopProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const quickAccessCards = [
    {
      title: 'TerraKit',
      description: 'Customize your rooftop farming kit',
      icon: Wrench,
      link: '/terrakit',
      color: 'bg-blue-500'
    },
    {
      title: 'TerraStore',
      description: 'Shop for farming supplies',
      icon: Package,
      link: '/terrastore',
      color: 'bg-green-500'
    },
    {
      title: 'TerraBook',
      description: 'Plant encyclopedia & guides',
      icon: Book,
      link: '/terrabook',
      color: 'bg-purple-500'
    },
    {
      title: 'Profile',
      description: 'Manage your account & orders',
      icon: User,
      link: '/profile',
      color: 'bg-orange-500'
    }
  ];

  const statsCards = [
    {
      title: 'Total Customers',
      value: dashboardStats.totalCustomers,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Orders Completed',
      value: dashboardStats.totalOrders,
      icon: Package,
      color: 'text-green-600'
    },
    {
      title: 'Kits Installed',
      value: dashboardStats.totalKitsInstalled,
      icon: Wrench,
      color: 'text-purple-600'
    },
    {
      title: 'Plants Sold',
      value: dashboardStats.totalPlantsSold,
      icon: Leaf,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transform Your Rooftop Into a Green Paradise
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Create sustainable urban farming solutions with our customizable TerraKit systems.
              </p>

              {!isAuthenticated ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/register"
                    className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-lg p-6 shadow-lg max-w-md">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Welcome back, {user?.name}! 👋
                  </h2>
                  <p className="text-gray-600 mb-4">
                    You're all set to start your urban farming journey.
                  </p>
                  <Link
                    to="/terrakit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all inline-flex items-center"
                  >
                    Explore Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg"
                alt="Rooftop Farming"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Stats Section */}
      {isAuthenticated && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Join thousands of urban farmers who are making a difference with TerraceTop
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((card, index) => (
                <motion.div 
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  className="bg-white rounded-lg shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
                    <div className={`p-3 rounded-full ${card.color.replace('text', 'bg').replace('600', '100')}`}>
                      <card.icon className={`h-6 w-6 ${card.color}`} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900">
                    {card.value?.toLocaleString() || 0}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick Access Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Everything you need for your urban farming journey in one place
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccessCards.map((card, index) => (
              <motion.div 
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                <div className={`h-2 ${card.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-full ${card.color.replace('bg', 'bg').replace('500', '100')} mr-4`}>
                      <card.icon className={`h-6 w-6 ${card.color.replace('bg', 'text')}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {card.description}
                  </p>
                  <Link to={card.link} className={`${card.color.replace('bg', 'text')} font-medium flex items-center hover:underline`}>
                    Explore
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Selling Products</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our most popular products loved by urban farmers around the world
            </p>
          </motion.div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {topProducts.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index % 4) }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-12 text-center"
              >
                <Link 
                  to="/terrastore"
                  className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Quick Links and Contact Info */}
      
    </div>
  );
};

export default Home;
