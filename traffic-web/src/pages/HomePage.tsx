import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, BarChart2, AlertTriangle, UserCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
const slideUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight blink-animation">
  AI-Powered Traffic Optimization for Smarter Commutes
</h1>

              <p className="mt-6 text-lg text-blue-100">
                Navigate through traffic intelligently with real-time updates, personalized routes, and AI-driven predictions that adapt to changing road conditions.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
  <Link
    to="/map"
    className="rainbow-border px-8 py-4 rounded-lg font-medium text-lg hover:bg-white-50 transition-colors inline-flex items-center  bg-blue-700 text-white"
  >
  
    Start Navigating
    <ArrowRight className="ml-2 h-5 w-5" />
  </Link>
  
  <Link
    to="/dashboard"
    className="px-8 py-4 rounded-lg font-medium text-lg hover:bg-white-600 transition-colors inline-flex items-center bg-white text-blue-700"
  >
    View Dashboard
  </Link>
</div>


            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="hidden md:block"
            >
              <img
                src="https://www.ipvanish.com/wp-content/uploads/2022/12/alternativestogooglemaps_og.png"
                alt="Traffic flow optimization"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Intelligent Traffic Solutions
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform helps you navigate through traffic efficiently with smart features designed for modern commuters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              
              
              variants={slideUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              {/* content */}
            
             
              <div className="bg-blue-100 p-3 inline-block rounded-lg mb-4">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-Time Mapping
              </h3>
              <p className="text-gray-600">
                Get accurate, up-to-the-minute traffic data with intuitive map visualizations showing congestion levels.
              </p>
            </motion.div>

            <motion.div
              
              variants={slideUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
            >
              
            
            
              <div className="bg-teal-100 p-3 inline-block rounded-lg mb-4">
                <BarChart2 className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                AI Route Prediction
              </h3>
              <p className="text-gray-600">
                Our AI algorithms analyze historical and live data to predict traffic patterns and suggest optimal routes.
              </p>
            </motion.div>

            <motion.div
  variants={slideUpVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  whileHover={{ y: -5 }}
  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
>
  

              <div className="bg-amber-100 p-3 inline-block rounded-lg mb-4">
                <AlertTriangle className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Incident Alerts
              </h3>
              <p className="text-gray-600">
                Receive instant notifications about accidents, road closures, and other incidents that might affect your journey.
              </p>
            </motion.div>

            <motion.div
  variants={slideUpVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  whileHover={{ y: -5 }}
  className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
>

              <div className="bg-purple-100 p-3 inline-block rounded-lg mb-4">
                <UserCheck className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Personalized Routes
              </h3>
              <p className="text-gray-600">
                Set your preferences for route types, whether you prefer fastest, least congested, or scenic routes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">30%</div>
              <p className="mt-2 text-gray-600">Reduced commute time</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">85%</div>
              <p className="mt-2 text-gray-600">Accurate traffic predictions</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600">50K+</div>
              <p className="mt-2 text-gray-600">Daily active users</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to outsmart traffic?
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
            Join thousands of drivers who save time and reduce stress with our AI-powered traffic optimization.
          </p>
          <div className="mt-10">
            <Link
              to="/map"
              className="px-8 py-4 rounded-lg bg-white text-blue-700 font-medium text-lg hover:bg-blue-50 transition-colors inline-flex items-center"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;