import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ArrowRight, Users, Package, Wrench, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import ProductCard from '../components/UI/ProductCard';
import api from '../services/api';

const Home = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [dashboardStats, setDashboardStats] = useState({
    totalCustomers: 0,
    totalOrders: 0,
    totalKitsInstalled: 0,
    totalPlantsSold: 0
  });
  const [topProducts, setTopProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardStats();
    fetchTopProducts();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  

  const fetchDashboardStats = async () => {
    try {
      const response = await api.get('/dashboard/stats');
      setDashboardStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  const fetchTopProducts = async () => {
    try {
      const response = await api.get('/products?isTopSelling=true&limit=6');
      setTopProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching top products:', error);
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
      icon: Leaf,
      link: '/terrabook',
      color: 'bg-purple-500'
    },
    {
      title: 'Profile',
      description: 'Manage your account & orders',
      icon: Users,
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

      {/* Dashboard Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of urban farmers who are transforming their spaces with TerraceTop.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsCards.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value.toLocaleString()}
                </h3>
                <p className="text-gray-600">{stat.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Selling Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Top Selling Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most popular farming supplies and equipment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/terrastore"
              className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Access</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need for your rooftop farming journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickAccessCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  to={card.link}
                  className="block bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 group"
                >
                  <div className={`${card.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.description}</p>
                  <div className="mt-4 flex items-center text-green-600 group-hover:text-green-700">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
