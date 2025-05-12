import React from 'react';
import {  Bell, Map, Car, Clock, Shield } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const SettingsPage: React.FC = () => {
  const { userPreferences, setUserPreferences } = useAppContext();

  const handleRouteTypeChange = (type: 'fastest' | 'leastCongested' | 'scenic') => {
    setUserPreferences({ routeType: type });
  };

  const handleToggleChange = (key: keyof typeof userPreferences, value: boolean) => {
    setUserPreferences({ [key]: value });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Settings</h1>
        <p className="text-gray-600">Customize your traffic optimization experience</p>
      </div>

      {/* Route Preferences */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Map className="w-5 h-5 mr-2 text-blue-600" />
          Route Preferences
        </h2>
        
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Preferred Route Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div 
              onClick={() => handleRouteTypeChange('fastest')}
              className={`cursor-pointer border rounded-lg p-4 ${
                userPreferences.routeType === 'fastest' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <h4 className="font-medium text-gray-900">Fastest</h4>
              </div>
              <p className="text-sm text-gray-600">
                Prioritize speed over all other factors
              </p>
            </div>
            
            <div 
              onClick={() => handleRouteTypeChange('leastCongested')}
              className={`cursor-pointer border rounded-lg p-4 ${
                userPreferences.routeType === 'leastCongested' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <Car className="w-5 h-5 text-green-600 mr-2" />
                <h4 className="font-medium text-gray-900">Least Congested</h4>
              </div>
              <p className="text-sm text-gray-600">
                Avoid traffic jams and high-congestion areas
              </p>
            </div>
            
            <div 
              onClick={() => handleRouteTypeChange('scenic')}
              className={`cursor-pointer border rounded-lg p-4 ${
                userPreferences.routeType === 'scenic' 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <Map className="w-5 h-5 text-amber-600 mr-2" />
                <h4 className="font-medium text-gray-900">Scenic</h4>
              </div>
              <p className="text-sm text-gray-600">
                Prefer routes with better views and less stress
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Route Options</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-900">Avoid Toll Roads</span>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={userPreferences.avoidTolls}
                    onChange={() => handleToggleChange('avoidTolls', !userPreferences.avoidTolls)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-900">Avoid Highways</span>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={userPreferences.avoidHighways}
                    onChange={() => handleToggleChange('avoidHighways', !userPreferences.avoidHighways)}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Notification Settings */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-blue-600" />
          Notification Settings
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-gray-900">Enable Notifications</span>
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={userPreferences.notificationsEnabled}
                  onChange={() => handleToggleChange('notificationsEnabled', !userPreferences.notificationsEnabled)}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        
        {userPreferences.notificationsEnabled && (
          <div className="mt-4 space-y-4 pl-4 border-l-2 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-900">Traffic Alerts</span>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-900">Route Updates</span>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-gray-900">Weather Alerts</span>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        )}
      </motion.section>

      {/* Account Settings */}
      <motion.section 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2 text-blue-600" />
          Privacy & Data
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-gray-900">Share Anonymous Usage Data</span>
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-gray-900">Store Location History</span>
            </div>
            <div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              Clear All Data
            </button>
          </div>
        </div>
      </motion.section>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;