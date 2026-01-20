import React, { useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Search } from 'lucide-react';

export default function WeatherDashboard() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mock weather data - In real app, replace with actual API call
  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call with mock data
    setTimeout(() => {
      const mockData = {
        city: city,
        temperature: Math.floor(Math.random() * 15) + 20,
        condition: ['Sunny', 'Cloudy', 'Rainy'][Math.floor(Math.random() * 3)],
        humidity: Math.floor(Math.random() * 30) + 50,
        windSpeed: Math.floor(Math.random() * 15) + 5,
        forecast: [
          { day: 'Mon', temp: 28, condition: 'Sunny' },
          { day: 'Tue', temp: 26, condition: 'Cloudy' },
          { day: 'Wed', temp: 24, condition: 'Rainy' },
          { day: 'Thu', temp: 27, condition: 'Sunny' },
          { day: 'Fri', temp: 29, condition: 'Sunny' }
        ]
      };
      setWeather(mockData);
      setLoading(false);
    }, 1000);
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny': return <Sun className="w-16 h-16 text-yellow-400" />;
      case 'Cloudy': return <Cloud className="w-16 h-16 text-gray-400" />;
      case 'Rainy': return <CloudRain className="w-16 h-16 text-blue-400" />;
      default: return <Sun className="w-16 h-16 text-yellow-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Weather Dashboard</h1>
        
        {/* Search Box */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
              placeholder="Enter city name..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fetchWeather}
              disabled={loading}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              {loading ? 'Loading...' : 'Search'}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* Weather Display */}
        {weather && (
          <div className="space-y-6">
            {/* Current Weather */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{weather.city}</h2>
                  <p className="text-6xl font-bold text-gray-900 mt-4">{weather.temperature}°C</p>
                  <p className="text-xl text-gray-600 mt-2">{weather.condition}</p>
                </div>
                <div>
                  {getWeatherIcon(weather.condition)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                  <Droplets className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Humidity</p>
                    <p className="text-xl font-bold">{weather.humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                  <Wind className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Wind Speed</p>
                    <p className="text-xl font-bold">{weather.windSpeed} km/h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 5-Day Forecast */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">5-Day Forecast</h3>
              <div className="grid grid-cols-5 gap-4">
                {weather.forecast.map((day, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <p className="font-semibold text-gray-700">{day.day}</p>
                    <div className="my-3 flex justify-center">
                      {day.condition === 'Sunny' && <Sun className="w-8 h-8 text-yellow-400" />}
                      {day.condition === 'Cloudy' && <Cloud className="w-8 h-8 text-gray-400" />}
                      {day.condition === 'Rainy' && <CloudRain className="w-8 h-8 text-blue-400" />}
                    </div>
                    <p className="text-xl font-bold text-gray-900">{day.temp}°C</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!weather && !loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Cloud className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Search for a City</h3>
            <p className="text-gray-600">Enter a city name above to see current weather and forecast</p>
          </div>
        )}
      </div>
    </div>
  );
}
