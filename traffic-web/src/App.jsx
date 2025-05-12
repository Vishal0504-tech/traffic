
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'; // Make sure the path is correct
import Footer from './components/layout/Footer'; // Make sure the path is correct
import HomePage from './pages/HomePage'; // Make sure the path is correct
import DashboardPage from './pages/DashboardPage'; // Make sure the path is correct
import MapPage from './pages/MapPage'; // Make sure the path is correct
import SettingsPage from './pages/SettingsPage';
import TrafficAIChatbot from './pages/TrafficAiBot'; // Make sure the path is correct
// Make sure the path is correct
import { AppProvider } from './context/AppContext'; // Ensure this file exists and is correctly referenced

function App() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/settings" element={<SettingsPage />} /> 
            <Route path='/ai-bot'element={<TrafficAIChatbot/>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
