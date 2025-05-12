import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Navigation, Car } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface Route {
  id: number;
  name: string;
  type: string;
  duration: string;
  distance: string;
  congestion: string;
  path: number[][];
}

interface RouteSelectorProps {
  route: Route;
}

const RouteSelector: React.FC<RouteSelectorProps> = ({ route }) => {
  const { userPreferences, setActiveRoute } = useAppContext();
  
  // Check if this route matches the user's preferred route type
  const isPreferred = userPreferences.routeType === route.type;
  
  const getRouteTypeIcon = () => {
    switch (route.type) {
      case 'fastest':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'leastCongested':
        return <Car className="w-4 h-4 text-green-600" />;
      case 'scenic':
        return <Navigation className="w-4 h-4 text-amber-600" />;
      default:
        return <Navigation className="w-4 h-4 text-gray-600" />;
    }
  };
  
  const getRouteTypeLabel = () => {
    switch (route.type) {
      case 'fastest':
        return 'Fastest';
      case 'leastCongested':
        return 'Least Congested';
      case 'scenic':
        return 'Scenic';
      default:
        return 'Alternative';
    }
  };
  
  const getCongestionColor = () => {
    switch (route.congestion) {
      case 'low':
        return 'text-green-600';
      case 'moderate':
        return 'text-amber-600';
      case 'high':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`border rounded-lg p-3 cursor-pointer transition-all ${
        isPreferred 
          ? 'border-blue-500 bg-blue-50' 
          : 'border-gray-200 hover:border-blue-300'
      }`}
      onClick={() => setActiveRoute(route)}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {getRouteTypeIcon()}
          <span className="ml-2 font-medium text-gray-800">{getRouteTypeLabel()}</span>
          {isPreferred && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
              Preferred
            </span>
          )}
        </div>
        <div className="text-sm font-medium">{route.duration}</div>
      </div>
      
      <div className="mt-2 flex justify-between items-center text-sm text-gray-600">
        <div>{route.distance}</div>
        <div className={`font-medium ${getCongestionColor()}`}>
          {route.congestion.charAt(0).toUpperCase() + route.congestion.slice(1)} Traffic
        </div>
      </div>
    </motion.div>
  );
};

export default RouteSelector;