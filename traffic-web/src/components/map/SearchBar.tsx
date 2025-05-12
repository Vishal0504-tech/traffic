import React, { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Mock location suggestions
  const suggestions = [
    'San Francisco Airport (SFO)',
    'Golden Gate Bridge',
    'Fisherman\'s Wharf',
    'Union Square, San Francisco',
    'Oracle Park'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search request to the backend
    setShowSuggestions(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-3">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-2">
          <div className="mr-2 text-blue-600">
            <MapPin className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={origin}
            onChange={(e) => {
              setOrigin(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder="Starting point"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center">
          <div className="mr-2 text-blue-600">
            <Navigation className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder="Where to?"
            className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="ml-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>
      
      {/* Location suggestions */}
      {showSuggestions && (origin.length > 0 || destination.length > 0) && (
        <div className="mt-2 bg-white rounded-lg shadow-lg absolute left-0 right-0 z-10">
          <ul className="py-1">
            {suggestions
              .filter(suggestion => 
                suggestion.toLowerCase().includes(
                  (origin || destination).toLowerCase()
                )
              )
              .map((suggestion, index) => (
                <li 
                  key={index}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    if (origin === '') {
                      setOrigin(suggestion);
                    } else {
                      setDestination(suggestion);
                    }
                    setShowSuggestions(false);
                  }}
                >
                  {suggestion}
                </li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;