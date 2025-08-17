import React, { useState, useEffect } from 'react';
import { Search, Leaf, Thermometer, Droplets, Sun, Bug } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

interface Plant {
  _id: string;
  name: string;
  scientificName: string;
  description: string;
  images: string[];
  category: string;
  weatherRequirements: {
    temperature: { min: number; max: number; unit: string };
    humidity: { min: number; max: number; unit: string };
    sunlight: string;
    season: string[];
  };
  soilType: string[];
  growthInfo: {
    germinationTime: string;
    harvestTime: string;
    spacing: string;
    wateringFrequency: string;
  };
}

const TerraBook = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [searchSuggestions, setSearchSuggestions] = useState<Plant[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const categories = ['All', 'Vegetables', 'Fruits', 'Herbs', 'Flowers', 'Leafy Greens'];
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  
  useEffect(() => {
    fetchPlants();
  }, [selectedCategory]);

  useEffect(() => {
    if (searchTerm.length > 2) {
      fetchSearchSuggestions();
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const fetchPlants = async () => {
    try {
      setIsLoading(true);
      const params: any = { limit: 20 };
      if (selectedCategory && selectedCategory !== 'All') {
        params.category = selectedCategory;
      }
      if (searchTerm) {
        params.search = searchTerm;
      }

      const response = await api.get('/plants', { params });
      setPlants(response.data.plants || []);
    } catch (error) {
      console.error('Error fetching plants:', error);
      // Mock data for demonstration
      setPlants([
        {
          _id: '1',
          name: 'Tomato',
          scientificName: 'Solanum lycopersicum',
          description: 'A popular vegetable plant that produces juicy, red fruits perfect for cooking and salads.',
          images: ['https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg'],
          category: 'Vegetables',
          weatherRequirements: {
            temperature: { min: 18, max: 29, unit: '°C' },
            humidity: { min: 60, max: 80, unit: '%' },
            sunlight: 'Full Sun',
            season: ['Spring', 'Summer']
          },
          soilType: ['Well-drained', 'Loamy'],
          growthInfo: {
            germinationTime: '7-14 days',
            harvestTime: '75-85 days',
            spacing: '18-24 inches',
            wateringFrequency: 'Daily'
          }
        },
        {
          _id: '2',
          name: 'Lettuce',
          scientificName: 'Lactuca sativa',
          description: 'A leafy green vegetable that is perfect for salads and sandwiches.',
          images: ['https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg'],
          category: 'Leafy Greens',
          weatherRequirements: {
            temperature: { min: 15, max: 20, unit: '°C' },
            humidity: { min: 50, max: 70, unit: '%' },
            sunlight: 'Partial Sun',
            season: ['Spring', 'Fall']
          },
          soilType: ['Well-drained', 'Rich'],
          growthInfo: {
            germinationTime: '4-7 days',
            harvestTime: '45-65 days',
            spacing: '6-8 inches',
            wateringFrequency: 'Every 2 days'
          }
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSearchSuggestions = async () => {
    try {
      const response = await api.get(`/plants/search/${searchTerm}`);
      setSearchSuggestions(response.data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching search suggestions:', error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSuggestionClick = (plant: Plant) => {
    setSearchTerm(plant.name);
    setShowSuggestions(false);
    // Filter plants to show only the selected one
    setPlants([plant]);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'All' ? '' : category);
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Leaf className="h-10 w-10 mr-3 text-green-600" />
            TerraBook
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your comprehensive plant encyclopedia for rooftop farming
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Bar with Suggestions */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search plants by name or scientific name..."
                value={searchTerm}
                onChange={handleSearch}
                onFocus={() => searchSuggestions.length > 0 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              
              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
                  {searchSuggestions.map(plant => (
                    <button
                      key={plant._id}
                      onClick={() => handleSuggestionClick(plant)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                    >
                      <img
                        src={plant.images[0] || 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'}
                        alt={plant.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{plant.name}</p>
                        <p className="text-sm text-gray-500 italic">{plant.scientificName}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    (category === 'All' && !selectedCategory) || selectedCategory === category
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Plants Grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plants.map((plant, index) => (
              <motion.div
                key={plant._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={`/plant/${plant._id}`}>
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:-translate-y-1 group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={plant.images[0] || 'https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg'}
                        alt={plant.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {plant.category}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plant.name}</h3>
                      <p className="text-sm text-gray-500 italic mb-3">{plant.scientificName}</p>
                      <p className="text-gray-600 mb-4 line-clamp-3">{plant.description}</p>
                      
                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Thermometer className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-gray-600">
                            {plant.weatherRequirements.temperature.min}-{plant.weatherRequirements.temperature.max}{plant.weatherRequirements.temperature.unit}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Sun className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm text-gray-600">{plant.weatherRequirements.sunlight}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Droplets className="h-4 w-4 text-blue-500" />
                          <span className="text-sm text-gray-600">{plant.growthInfo.wateringFrequency}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Leaf className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-600">{plant.growthInfo.harvestTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {plant.weatherRequirements.season.slice(0, 2).map(season => (
                            <span key={season} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                              {season}
                            </span>
                          ))}
                        </div>
                        <span className="text-green-600 font-medium text-sm group-hover:text-green-700">
                          Learn More →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {plants.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <Leaf className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No plants found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                fetchPlants();
              }}
              className="mt-4 text-green-600 hover:text-green-700 font-medium"
            >
              Clear filters and show all plants
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerraBook;