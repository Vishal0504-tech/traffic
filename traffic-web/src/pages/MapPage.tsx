import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMap } from 'react-leaflet';
import { Icon, LatLngExpression, LatLngBounds } from 'leaflet';
import { motion } from 'framer-motion';
import { Search, Car } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Configuration constants
const CONFIG = {
  DEFAULT_CENTER: [51.505, -0.09] as LatLngExpression,
  OPEN_ROUTE_SERVICE_API_KEY: '5b3ce3597851110001cf6248f9ccd111584e478babaaf6a9fcae4ed4',
  TILE_LAYER_URL: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  TILE_LAYER_ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
};

// Interfaces for type safety
interface MarkerPoint {
  id: number;
  position: LatLngExpression;
  name: string;
}

interface LocationSearch {
  start: string;
  destination: string;
}

interface RouteSegment {
  distance: number;
  duration: number;
  type?: string;
}

interface RouteDetails {
  totalDistance: number;
  totalDuration: number;
  segments: RouteSegment[];
}

// Utility functions
const createCustomIcon = (): Icon => new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const formatDistance = (meters: number): string => {
  return meters >= 1000 
    ? `${(meters / 1000).toFixed(1)} km`
    : `${Math.round(meters)} m`;
};

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  return hours > 0 
    ? `${hours} hr ${minutes} min`
    : `${minutes} min`;
};

// Map Component Helpers
const MapClickHandler: React.FC<{
  onMapClick: (position: LatLngExpression) => void;
}> = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      onMapClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const MapBoundsHandler: React.FC<{ markers: MarkerPoint[] }> = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length >= 2) {
      const bounds = new LatLngBounds(
        markers.map(marker => marker.position as [number, number])
      );
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [markers, map]);

  return null;
};

// Search Form Component
const LocationSearchForm: React.FC<{
  locationSearch: LocationSearch;
  isSearching: boolean;
  searchError: string | null;
  onLocationChange: (field: keyof LocationSearch, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}> = ({ 
  locationSearch, 
  isSearching, 
  searchError, 
  onLocationChange, 
  onSubmit 
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full"
  >
    <form 
      onSubmit={onSubmit}
      className="bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4"
    >
      <div>
        <label htmlFor="start-location" className="block text-sm font-medium text-gray-700 mb-1">
          Start Location
        </label>
        <input
          id="start-location"
          type="text"
          placeholder="Enter start location"
          value={locationSearch.start}
          onChange={(e) => onLocationChange('start', e.target.value)} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
          Destination
        </label>
        <input
          id="destination"
          type="text"
          placeholder="Enter destination"
          value={locationSearch.destination}
          onChange={(e) => onLocationChange('destination', e.target.value)} 
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        disabled={isSearching || !locationSearch.start || !locationSearch.destination}
        className={`w-full px-6 py-2 rounded-lg flex items-center justify-center transition-colors ${
          isSearching || !locationSearch.start || !locationSearch.destination
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isSearching ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          <>
            <Search className="w-5 h-5 mr-2" />
            Search
          </>
        )}
      </button>
    </form>
    
    {searchError && (
      <div className="mt-2 p-3 bg-red-100 text-red-700 rounded-lg">
        {searchError}
      </div>
    )}
  </motion.div>
);

// Route Details Sidebar Component
const RouteDetailsSidebar: React.FC<{
  routeDetails: RouteDetails | null;
}> = ({ routeDetails }) => {
  if (!routeDetails) {
    return (
      <div className="text-center text-gray-500">
        Search for locations to see route details
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Route Details</h2>
      
      {/* Overall Route Summary */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <Car className="mr-2 text-blue-600" />
          <h3 className="font-semibold">Total Route</h3>
        </div>
        <p>Distance: {formatDistance(routeDetails.totalDistance)}</p>
        <p>Duration: {formatDuration(routeDetails.totalDuration)}</p>
      </div>

      {/* Segment Details Chart */}
      <div>
        <h3 className="font-semibold mb-2">Route Segments</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={routeDetails.segments}>
            <XAxis dataKey="type" />
            <YAxis label={{ value: 'Distance (m)', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value, name) => [
                name === 'distance' ? formatDistance(value as number) : formatDuration(value as number), 
                name === 'distance' ? 'Distance' : 'Duration'
              ]}
            />
            <Bar dataKey="distance" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Segment Information */}
      <div>
        <h3 className="font-semibold mb-2">Segment Breakdown</h3>
        {routeDetails.segments.map((segment, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg mb-2">
            <p className="font-medium">Segment {index + 1}</p>
            <p>Distance: {formatDistance(segment.distance)}</p>
            <p>Duration: {formatDuration(segment.duration)}</p>
            <p>Type: {segment.type || 'Unknown'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const MapPage: React.FC = () => {
  // State variables
  const [markers, setMarkers] = useState<MarkerPoint[]>([]);
  const [locationSearch, setLocationSearch] = useState<LocationSearch>({
    start: '',
    destination: ''
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [route, setRoute] = useState<any>(null);
  const [routeDetails, setRouteDetails] = useState<RouteDetails | null>(null);
  const nextId = useRef(1);

  // Memoized custom icon to prevent recreation
  const customIcon = useMemo(() => createCustomIcon(), []);

  // Handler to update location search
  const handleLocationChange = (field: keyof LocationSearch, value: string) => {
    setLocationSearch(prev => ({ ...prev, [field]: value }));
  };

  // Handler to add a marker
  const handleAddMarker = (position: LatLngExpression) => {
    const newMarker = {
      id: nextId.current,
      position,
      name: `Location ${nextId.current}`
    };
    
    setMarkers(prev => [...prev, newMarker]);
    nextId.current += 1;
  };

  // Handler to remove a marker
  const handleRemoveMarker = (id: number) => {
    setMarkers(prev => prev.filter(marker => marker.id !== id));
  };

  // Handler to clear all markers
  const handleClearMarkers = () => {
    setMarkers([]);
    setLocationSearch({ start: '', destination: '' });
    setSearchError(null);
    setRoute(null);
    setRouteDetails(null);
  };

  // Location search submit handler
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setSearchError(null);
    
    try {
      const startResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationSearch.start)}&limit=1`
      );
      const startData = await startResponse.json();
      
      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const destResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationSearch.destination)}&limit=1`
      );
      const destData = await destResponse.json();
      
      if (startData[0] && destData[0]) {
        setMarkers([
          {
            id: 1,
            position: [parseFloat(startData[0].lat), parseFloat(startData[0].lon)],
            name: startData[0].display_name
          },
          {
            id: 2,
            position: [parseFloat(destData[0].lat), parseFloat(destData[0].lon)],
            name: destData[0].display_name
          }
        ]);
      } else {
        setSearchError('Could not find one or both locations. Please try again with more specific addresses.');
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchError('An error occurred while searching. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Fetch route details
  useEffect(() => {
    const fetchRouteDetails = async () => {
      if (markers.length >= 2) {
        const coordinates = markers.map(marker => {
          const [lat, lng] = marker.position as [number, number];
          return [lng, lat]; // ORS expects [lng, lat]
        });

        try {
          const response = await axios.post(
            'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
            {
              coordinates: coordinates
            },
            {
              headers: {
                Authorization: CONFIG.OPEN_ROUTE_SERVICE_API_KEY,
                'Content-Type': 'application/json',
              },
            }
          );

          // Set route geometry
          setRoute(response.data);

          // Extract route details
          const routeFeature = response.data.features[0];
          const segments = routeFeature.properties.segments.map((segment: any) => ({
            distance: segment.distance,
            duration: segment.duration,
            type: segment.steps && segment.steps[0] ? segment.steps[0].type : 'Unknown'
          }));

          setRouteDetails({
            totalDistance: routeFeature.properties.summary.distance,
            totalDuration: routeFeature.properties.summary.duration,
            segments: segments
          });
        } catch (error) {
          console.error('Error fetching route:', error);
          setSearchError('Failed to fetch route details');
        }
      }
    };

    fetchRouteDetails();
  }, [markers]);

  return (
    <div className="relative w-full h-screen flex">
      {/* Left Sidebar with Search Form */}
      <div className="w-80 bg-gray-50 p-4 flex flex-col">
        {/* Search Form */}
        <LocationSearchForm 
          locationSearch={locationSearch}
          isSearching={isSearching}
          searchError={searchError}
          onLocationChange={handleLocationChange}
          onSubmit={handleSearchSubmit}
        />

        {/* Route Details */}
        <div className="mt-4 flex-1 overflow-y-auto">
          <RouteDetailsSidebar routeDetails={routeDetails} />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          <MapContainer 
            center={CONFIG.DEFAULT_CENTER}
            zoom={13} 
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution={CONFIG.TILE_LAYER_ATTRIBUTION}
              url={CONFIG.TILE_LAYER_URL}
            />
            
            {markers.map((marker) => (
              <Marker key={marker.id} position={marker.position} icon={customIcon}>
                <Popup>
                  <div className="max-w-xs">
                    <p className="font-semibold text-sm mb-2">{marker.name}</p>
                    <button 
                      onClick={() => handleRemoveMarker(marker.id)}
                      className="mt-2 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 w-full"
                    >
                      Remove
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {route && (
              <Polyline 
                positions={route.features[0].geometry.coordinates.map(([lon, lat]: [number, number]) => [lat, lon])} 
                color="#3B82F6" 
                weight={4}
                opacity={0.7}
              />
            )}

            <MapClickHandler onMapClick={handleAddMarker} />
            <MapBoundsHandler markers={markers} />
          </MapContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default MapPage;