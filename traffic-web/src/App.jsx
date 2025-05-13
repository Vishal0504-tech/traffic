
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'; 
import Footer from './components/layout/Footer'; 
import HomePage from './pages/HomePage';   
import DashboardPage from './pages/DashboardPage';  
import MapPage from './pages/MapPage';  
import SettingsPage from './pages/SettingsPage';
import TrafficAIChatbot from './pages/TrafficAiBot'; 
import { AppProvider } from './context/AppContext';  

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
