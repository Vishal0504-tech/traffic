import React from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { MapPin, BarChart2, Clock, Car, AlertTriangle } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardPage: React.FC = () => {
  // Traffic volume by hour data
  const trafficVolumeData = {
    labels: ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'],
    datasets: [
      {
        label: 'Today',
        data: [1200, 1900, 2700, 2300, 1800, 1600, 1900, 2100, 1700, 1800, 2200, 2600, 2800, 2400, 1900],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Average',
        data: [1100, 1700, 2500, 2200, 1900, 1700, 1800, 2000, 1900, 2000, 2300, 2700, 2600, 2300, 1800],
        borderColor: 'rgb(156, 163, 175)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        borderDash: [5, 5],
        fill: true,
        tension: 0.4,
      }
    ]
  };

  // Traffic incidents by type data
  const incidentsData = {
    labels: ['Accidents', 'Congestion', 'Road Work', 'Weather', 'Events'],
    datasets: [
      {
        data: [15, 40, 20, 8, 17],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(245, 158, 11)',
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(139, 92, 246)'
        ],
        borderWidth: 1,
      }
    ]
  };

  // Route efficiency data
  const routeEfficiencyData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'AI Recommended',
        data: [92, 88, 90, 85, 87, 95, 97],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
      },
      {
        label: 'Traditional',
        data: [80, 75, 72, 68, 70, 82, 85],
        backgroundColor: 'rgba(156, 163, 175, 0.7)',
      }
    ]
  };

  // Traffic statistics for current day
  const trafficStats = [
    { 
      icon: <Car className="w-6 h-6 text-blue-600" />, 
      title: 'Total Traffic Volume', 
      value: '42,879', 
      change: '+5.2%',
      isPositive: false
    },
    { 
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />, 
      title: 'Active Incidents', 
      value: '23', 
      change: '-12%',
      isPositive: true
    },
    { 
      icon: <Clock className="w-6 h-6 text-green-600" />, 
      title: 'Avg. Time Saved', 
      value: '18 min', 
      change: '+7.3%',
      isPositive: true
    },
    { 
      icon: <MapPin className="w-6 h-6 text-red-600" />, 
      title: 'Congestion Hotspots', 
      value: '8', 
      change: '-3',
      isPositive: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Traffic Dashboard</h1>
        <p className="text-gray-600">Insights and analytics for traffic conditions</p>
      </div>

      {/* Traffic Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {trafficStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-5 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  <p className={`ml-2 text-sm font-medium ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </p>
                </div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Traffic Volume Chart */}
      <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart2 className="w-5 h-5 mr-2 text-blue-600" />
            Traffic Volume by Hour
          </h2>
          <div className="flex space-x-3">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Today</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Week</button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Month</button>
          </div>
        </div>
        <div className="h-80">
          <Line 
            data={trafficVolumeData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(229, 231, 235, 0.5)',
                  }
                },
                x: {
                  grid: {
                    display: false
                  }
                }
              },
              plugins: {
                legend: {
                  position: 'top',
                  align: 'end',
                }
              }
            }}
          />
        </div>
      </div>

      {/* Two-Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Traffic Incidents by Type */}
        <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-amber-600" />
            Traffic Incidents by Type
          </h2>
          <div className="h-64">
            <Doughnut 
              data={incidentsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  }
                },
                cutout: '60%'
              }}
            />
          </div>
        </div>

        {/* Route Efficiency */}
        <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Car className="w-5 h-5 mr-2 text-green-600" />
            Route Efficiency (%)
          </h2>
          <div className="h-64">
            <Bar 
              data={routeEfficiencyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                      color: 'rgba(229, 231, 235, 0.5)',
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top',
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Traffic Hotspots */}
      <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-red-600" />
          Traffic Congestion Hotspots
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Congestion Level
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bay Bridge</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    High
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2h 45m</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">↑ Increasing</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Market Street</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">
                    Moderate
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1h 30m</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-600">→ Stable</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">101 South</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                    High
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3h 15m</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">↑ Increasing</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Van Ness Avenue</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Low
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45m</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">↓ Decreasing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;