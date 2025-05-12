/**
 * Calculates the distance between two coordinates in kilometers
 * using the Haversine formula
 * 
 * @param from [latitude, longitude]
 * @param to [latitude, longitude]
 * @returns distance in kilometers
 */
export const calculateDistance = (
  from: [number, number], 
  to: [number, number]
): number => {
  const toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
  };

  const earthRadiusKm = 6371; // Earth's radius in kilometers
  
  const dLat = toRadians(to[0] - from[0]);
  const dLon = toRadians(to[1] - from[1]);
  
  const lat1 = toRadians(from[0]);
  const lat2 = toRadians(to[0]);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = earthRadiusKm * c;
  
  return distance;
};

/**
 * Formats a distance in a human-readable format
 * 
 * @param distance distance in kilometers
 * @returns formatted distance string
 */
export const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(2)} km`;
};

/**
 * Calculates estimated travel time based on distance and mode of transport
 * 
 * @param distance distance in kilometers
 * @param mode mode of transport ('driving' | 'cycling' | 'walking')
 * @returns formatted time string
 */
export const calculateTravelTime = (
  distance: number,
  mode: 'driving' | 'cycling' | 'walking' = 'driving'
): string => {
  // Average speeds in km/h
  const speeds = {
    driving: 50, // Urban average
    cycling: 15,
    walking: 5
  };

  const hours = distance / speeds[mode];
  
  if (hours < 1/60) { // Less than 1 minute
    return '< 1 min';
  }
  
  if (hours < 1) {
    return `${Math.round(hours * 60)} mins`;
  }
  
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  
  if (minutes === 0) {
    return `${wholeHours} ${wholeHours === 1 ? 'hour' : 'hours'}`;
  }
  
  return `${wholeHours} ${wholeHours === 1 ? 'hour' : 'hours'} ${minutes} mins`;
};