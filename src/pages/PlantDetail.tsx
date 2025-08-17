import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Thermometer, Droplets, Sun, Bug, Leaf, Calendar, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

interface Plant {
  _id: string;
  name: string;
  scientificName: string;
  description: string;
  images: string[];
  seeds: string;
  weatherRequirements: {
    temperature: { min: number; max: number; unit: string };
    humidity: { min: number; max: number; unit: string };
    sunlight: string;
    season: string[];
  };
  soilType: string[];
  diseases: Array<{
    name: string;
    symptoms: string;
    prevention: string;
    treatment: string;
  }>;
  recommendedProducts: {
    pesticides: Array<{ _id: string; name: string; price: number }>;
    fertilizers: Array<{ _id: string; name: string; price: number }>;
  };
  growthInfo: {
    germinationTime: string;
    harvestTime: string;
    spacing: string;
    wateringFrequency: string;
  };
  category: string;
}

const PlantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchPlant();
    }
  }, [id]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  

  const fetchPlant = async () => {
    try {
      const response = await api.get(`/plants/${id}`);
      setPlant(response.data);
    } catch (error) {
      console.error('Error fetching plant:', error);
      // Mock data for demonstration
      setPlant({
        _id: id || '1',
        name: 'Tomato',
        scientificName: 'Solanum lycopersicum',
        description: 'Tomatoes are one of the most popular vegetables for home gardening. They are rich in vitamins and can be grown easily in containers on rooftops.',
        images: [
          'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
          'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg'
        ],
        seeds: 'Hybrid tomato seeds with high yield potential',
        weatherRequirements: {
          temperature: { min: 18, max: 29, unit: '°C' },
          humidity: { min: 60, max: 80, unit: '%' },
          sunlight: 'Full Sun',
          season: ['Spring', 'Summer']
        },
        soilType: ['Well-drained', 'Loamy', 'Rich in organic matter'],
        diseases: [
          {
            name: 'Blight',
            symptoms: 'Brown spots on leaves, wilting',
            prevention: 'Proper spacing, avoid overhead watering',
            treatment: 'Copper-based fungicides'
          },
          {
            name: 'Aphids',
            symptoms: 'Small green insects on leaves',
            prevention: 'Companion planting with marigolds',
            treatment: 'Neem oil spray'
          }
        ],
        recommendedProducts: {
          pesticides: [
            { _id: '1', name: 'Neem Oil Spray', price: 299 },
            { _id: '2', name: 'Copper Fungicide', price: 399 }
          ],
          fertilizers: [
            { _id: '3', name: 'Organic Compost', price: 199 },
            { _id: '4', name: 'NPK Fertilizer', price: 249 }
          ]
        },
        growthInfo: {
          germinationTime: '7-14 days',
          harvestTime: '75-85 days',
          spacing: '18-24 inches',
          wateringFrequency: 'Daily'
        },
        category: 'Vegetables'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!plant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Plant not found</h2>
          <button
            onClick={() => navigate('/terrabook')}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to TerraBook
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Leaf },
    { id: 'growing', label: 'Growing Guide', icon: Calendar },
    { id: 'diseases', label: 'Diseases & Care', icon: Bug },
    { id: 'products', label: 'Recommended Products', icon: Leaf }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Plant Information</h3>
              <p className="text-gray-600 leading-relaxed">{plant.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Thermometer className="h-5 w-5 mr-2 text-blue-600" />
                  Weather Requirements
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Temperature:</span>
                    <span className="font-medium">
                      {plant.weatherRequirements.temperature.min}-{plant.weatherRequirements.temperature.max}{plant.weatherRequirements.temperature.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Humidity:</span>
                    <span className="font-medium">
                      {plant.weatherRequirements.humidity.min}-{plant.weatherRequirements.humidity.max}{plant.weatherRequirements.humidity.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunlight:</span>
                    <span className="font-medium">{plant.weatherRequirements.sunlight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Season:</span>
                    <span className="font-medium">{plant.weatherRequirements.season.join(', ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Leaf className="h-5 w-5 mr-2 text-green-600" />
                  Soil Requirements
                </h4>
                <div className="space-y-2">
                  {plant.soilType.map((soil, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">{soil}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'growing':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-yellow-50 rounded-lg p-6 text-center">
                <Calendar className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Germination</h4>
                <p className="text-gray-600">{plant.growthInfo.germinationTime}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <Leaf className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Harvest Time</h4>
                <p className="text-gray-600">{plant.growthInfo.harvestTime}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <Ruler className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Spacing</h4>
                <p className="text-gray-600">{plant.growthInfo.spacing}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <Droplets className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">Watering</h4>
                <p className="text-gray-600">{plant.growthInfo.wateringFrequency}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Seeds Information</h4>
              <p className="text-gray-600">{plant.seeds}</p>
            </div>
          </div>
        );
      
      case 'diseases':
        return (
          <div className="space-y-6">
            {plant.diseases.map((disease, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Bug className="h-5 w-5 mr-2 text-red-600" />
                  {disease.name}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Symptoms</h5>
                    <p className="text-gray-600 text-sm">{disease.symptoms}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Prevention</h5>
                    <p className="text-gray-600 text-sm">{disease.prevention}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Treatment</h5>
                    <p className="text-gray-600 text-sm">{disease.treatment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'products':
        return (
          <div className="space-y-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommended Pesticides</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plant.recommendedProducts.pesticides.map((product) => (
                  <div key={product._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h5 className="font-medium text-gray-900 mb-2">{product.name}</h5>
                    <p className="text-green-600 font-bold">₹{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommended Fertilizers</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {plant.recommendedProducts.fertilizers.map((product) => (
                  <div key={product._id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h5 className="font-medium text-gray-900 mb-2">{product.name}</h5>
                    <p className="text-green-600 font-bold">₹{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

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
          <span>Back to TerraBook</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Plant Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={plant.images[selectedImage] || 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'}
                alt={plant.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {plant.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto">
                {plant.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-green-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${plant.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Plant Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {plant.category}
                </span>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{plant.name}</h1>
              <p className="text-xl text-gray-500 italic mb-4">{plant.scientificName}</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Thermometer className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Temperature</p>
                <p className="font-semibold">
                  {plant.weatherRequirements.temperature.min}-{plant.weatherRequirements.temperature.max}{plant.weatherRequirements.temperature.unit}
                </p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <Sun className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Sunlight</p>
                <p className="font-semibold">{plant.weatherRequirements.sunlight}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Droplets className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Watering</p>
                <p className="font-semibold">{plant.growthInfo.wateringFrequency}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Calendar className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Harvest</p>
                <p className="font-semibold">{plant.growthInfo.harvestTime}</p>
              </div>
            </div>

            {/* Seasons */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Best Growing Seasons</h3>
              <div className="flex flex-wrap gap-2">
                {plant.weatherRequirements.season.map((season) => (
                  <span key={season} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {season}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-600 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            {renderTabContent()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlantDetail;