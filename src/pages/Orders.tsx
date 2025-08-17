import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, X } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

interface Order {
  _id: string;
  orderNumber: string;
  items: Array<{
    product?: {
      name: string;
      images: string[];
      price: number;
    };
    terrakit?: {
      numberOfPots: number;
      totalPrice: number;
    };
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
  estimatedDelivery: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  

  const fetchOrders = async () => {
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'Confirmed':
      case 'Processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'Shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Cancelled':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Shipped':
        return 'bg-purple-100 text-purple-800';
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No Orders Yet</h1>
            <p className="text-gray-600 mb-8">Start shopping to see your orders here!</p>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Orders</h1>
          <p className="text-xl text-gray-600">Track your order history and status</p>
        </motion.div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(order.status)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Order #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      ₹{order.totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <img
                        src={
                          item.product?.images?.[0] || 
                          'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'
                        }
                        alt={item.product?.name || 'TerraKit'}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.product?.name || 'Custom TerraKit'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.product 
                            ? `Quantity: ${item.quantity}`
                            : `${item.terrakit?.numberOfPots} pots configuration`
                          }
                        </p>
                        <p className="font-bold text-green-600">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress.name}<br />
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                  </p>
                </div>

                {/* Order Timeline */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Order Timeline</h4>
                  <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 ${
                      ['Confirmed', 'Processing', 'Shipped', 'Delivered'].includes(order.status)
                        ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        ['Confirmed', 'Processing', 'Shipped', 'Delivered'].includes(order.status)
                          ? 'bg-green-600' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-sm font-medium">Confirmed</span>
                    </div>
                    <div className={`flex-1 h-0.5 ${
                      ['Processing', 'Shipped', 'Delivered'].includes(order.status)
                        ? 'bg-green-600' : 'bg-gray-300'
                    }`}></div>
                    <div className={`flex items-center space-x-2 ${
                      ['Processing', 'Shipped', 'Delivered'].includes(order.status)
                        ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        ['Processing', 'Shipped', 'Delivered'].includes(order.status)
                          ? 'bg-green-600' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-sm font-medium">Processing</span>
                    </div>
                    <div className={`flex-1 h-0.5 ${
                      ['Shipped', 'Delivered'].includes(order.status)
                        ? 'bg-green-600' : 'bg-gray-300'
                    }`}></div>
                    <div className={`flex items-center space-x-2 ${
                      ['Shipped', 'Delivered'].includes(order.status)
                        ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        ['Shipped', 'Delivered'].includes(order.status)
                          ? 'bg-green-600' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-sm font-medium">Shipped</span>
                    </div>
                    <div className={`flex-1 h-0.5 ${
                      order.status === 'Delivered' ? 'bg-green-600' : 'bg-gray-300'
                    }`}></div>
                    <div className={`flex items-center space-x-2 ${
                      order.status === 'Delivered' ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-600' : 'bg-gray-300'
                      }`}></div>
                      <span className="text-sm font-medium">Delivered</span>
                    </div>
                  </div>
                </div>

                {order.estimatedDelivery && order.status !== 'Delivered' && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;