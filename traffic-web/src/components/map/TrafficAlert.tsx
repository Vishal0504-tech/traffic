import React from 'react';
import { AlertTriangle, AlertCircle } from 'lucide-react';

interface TrafficAlertProps {
  alert: {
    id: number;
    type: string;
    location: string;
    severity: string;
    time: string;
    description: string;
    coordinates: number[];
  };
}

const TrafficAlert: React.FC<TrafficAlertProps> = ({ alert }) => {
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'accident':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'congestion':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      case 'roadwork':
        // Use a custom icon for roadwork (if available in lucide-react)
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-blue-500">
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 11h4" />
            <path d="M12 16h4" />
            <path d="M8 11h.01" />
            <path d="M8 16h.01" />
          </svg>
        );
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = () => {
    switch (alert.severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-3 border-b border-gray-200 hover:bg-gray-50">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="mr-2">{getAlertIcon()}</div>
          <div>
            <h4 className="font-medium text-gray-800">{alert.location}</h4>
            <p className="text-sm text-gray-600">{alert.description}</p>
          </div>
        </div>
        <div className={`text-xs px-2 py-0.5 rounded-full ${getSeverityColor()}`}>
          {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
        </div>
      </div>
      <div className="mt-1 text-xs text-gray-500">{alert.time}</div>
    </div>
  );
};

export default TrafficAlert;