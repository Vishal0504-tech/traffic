import  { createContext, useContext, useState, ReactNode } from 'react';

interface UserPreferences {
  routeType: 'fastest' | 'leastCongested' | 'scenic';
  avoidTolls: boolean;
  avoidHighways: boolean;
  notificationsEnabled: boolean;
}

interface AppContextType {
  isLoggedIn: boolean;
  userPreferences: UserPreferences;
  currentLocation: { lat: number; lng: number } | null;
  destination: { lat: number; lng: number } | null;
  activeRoute: any | null;
  setUserPreferences: (prefs: Partial<UserPreferences>) => void;
  setCurrentLocation: (location: { lat: number; lng: number } | null) => void;
  setDestination: (destination: { lat: number; lng: number } | null) => void;
  setActiveRoute: (route: any | null) => void;
  login: () => void;
  logout: () => void;
}

const defaultPreferences: UserPreferences = {
  routeType: 'fastest',
  avoidTolls: false,
  avoidHighways: false,
  notificationsEnabled: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPreferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [currentLocation, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [destination, setDest] = useState<{ lat: number; lng: number } | null>(null);
  const [activeRoute, setRoute] = useState<any | null>(null);

  const setUserPreferences = (prefs: Partial<UserPreferences>) => {
    setPreferences({ ...userPreferences, ...prefs });
  };

  const setCurrentLocation = (location: { lat: number; lng: number } | null) => {
    setLocation(location);
  };

  const setDestination = (dest: { lat: number; lng: number } | null) => {
    setDest(dest);
  };

  const setActiveRoute = (route: any | null) => {
    setRoute(route);
  };

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  const value = {
    isLoggedIn,
    userPreferences,
    currentLocation,
    destination,
    activeRoute,
    setUserPreferences,
    setCurrentLocation,
    setDestination,
    setActiveRoute,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}