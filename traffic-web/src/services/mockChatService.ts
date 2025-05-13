// Traffic related keywords to detect in user messages
const trafficKeywords = [
  'traffic', 'road', 'highway', 'interstate', 'congestion', 'accident',
  'incident', 'closure', 'detour', 'construction', 'jam', 'route',
  'directions', 'path', 'fastest', 'quickest', 'alternative', 'way',
  'commute', 'travel time', 'delay', 'status', 'eta', 'arrival',
  'distance', 'miles', 'kilometers', 'parking', 'toll', 'speed limit',
  'weather', 'roadwork', 'emergency', 'police', 'crash', 'backup'
];

const locationKeywords = [
  'downtown', 'city center', 'highway', 'interstate', 'bridge', 'tunnel',
  'exit', 'junction', 'intersection', 'avenue', 'boulevard', 'street',
  'road', 'freeway', 'expressway', 'parkway', 'north', 'south', 'east',
  'west', 'airport', 'station', 'mall', 'stadium'
];

// Generate a mock response based on user input
export const mockChatResponse = async (userMessage: string): Promise<string> => {
  const userInput = userMessage.toLowerCase();
  
  // Check for greetings
  if (containsAny(userInput, ['hello', 'hi', 'hey', 'greetings'])) {
    return `Hello! I'm your AI traffic assistant. You can ask me about:
- Current traffic conditions
- Accident reports and road closures
- Best routes and travel times
- Construction updates
- Weather impacts on traffic
- Parking availability
- Speed limits and road regulations
How can I help you today?`;
  }
  
  // Check for help or available questions
  if (containsAny(userInput, ['help', 'what can you do', 'what questions', 'examples'])) {
    return `I can help you with various traffic-related questions such as:
1. "How's the traffic on Highway 101?"
2. "What's the fastest route to downtown?"
3. "Are there any accidents on my route?"
4. "Is there construction work affecting traffic?"
5. "What's the current travel time to the airport?"
6. "Where can I find parking downtown?"
7. "Are there any road closures today?"
8. "What's the speed limit on this road?"
Feel free to ask any of these questions!`;
  }
  
  // Check for thanks or goodbye
  if (containsAny(userInput, ['thank', 'thanks', 'bye', 'goodbye'])) {
    return 'You\'re welcome! Feel free to ask if you need any more traffic information. Safe travels!';
  }

  // Check for weather-related traffic questions
  if (containsAny(userInput, ['weather', 'rain', 'snow', 'storm'])) {
    return generateWeatherResponse();
  }

  // Check for parking-related questions
  if (containsAny(userInput, ['parking', 'park', 'garage'])) {
    return generateParkingResponse();
  }

  // Check for speed limit questions
  if (containsAny(userInput, ['speed', 'limit', 'fast'])) {
    return generateSpeedLimitResponse();
  }

  // Check for traffic condition requests
  if (containsAny(userInput, trafficKeywords)) {
    if (userInput.includes('accident') || userInput.includes('incident')) {
      return generateIncidentResponse();
    }
    
    if (userInput.includes('construction')) {
      return generateConstructionResponse();
    }
    
    if (containsAny(userInput, ['route', 'directions', 'fastest', 'quickest'])) {
      return generateRouteResponse();
    }
    
    if (containsAny(userInput, ['status', 'condition', 'how is'])) {
      return generateTrafficConditionResponse();
    }
    
    // Generic traffic response
    return 'Current traffic conditions are moderate with typical delays during this time of day. Can you be more specific about what information you need or which area you\'re interested in?';
  }
  
  // Default response
  return 'I\'m your AI traffic assistant. You can ask me about current traffic conditions, routes, travel times, accidents, construction, parking, weather impacts, or speed limits. How can I assist you with your journey today?';
};

// Helper functions
function containsAny(text: string, keywords: string[]): boolean {
  return keywords.some(word => text.includes(word));
}

function generateIncidentResponse(): string {
  const incidents = [
    'There\'s a minor accident reported on I-95 northbound near exit 23. Emergency vehicles are on scene, and traffic is moving slowly in the right lane.',
    'A vehicle breakdown has been reported on the downtown bridge. The right shoulder is blocked, causing minor delays of about 5-10 minutes.',
    'There are no major incidents reported in your area at this time. Traffic is flowing normally on all main routes.',
    'A multi-vehicle accident has been cleared from Highway 101, but residual delays of about 15 minutes remain while traffic returns to normal.'
  ];
  
  return incidents[Math.floor(Math.random() * incidents.length)];
}

function generateRouteResponse(): string {
  const routes = [
    'Based on current conditions, the fastest route would be via I-95 and the downtown exit. Estimated travel time is 22 minutes.',
    'I recommend taking the parkway to avoid the construction on Main Street. This alternative route will add about 2 miles but save you approximately 15 minutes.',
    'The quickest route right now would be Highway 101 to Junction 25, then local roads. This avoids the congestion reported on the interstate.',
    'Several routes are available. The shortest is via downtown, but taking the ring road would be 5 minutes faster due to better traffic flow, despite being 3 miles longer.'
  ];
  
  return routes[Math.floor(Math.random() * routes.length)];
}

function generateTrafficConditionResponse(): string {
  const conditions = [
    'Traffic is currently flowing smoothly on most major highways. There are minor delays at the downtown exits during this rush hour.',
    'Moderate congestion is reported on the northbound interstate with speeds averaging 35mph. The southbound lanes are moving at normal speeds.',
    'Traffic is heavier than usual today due to the event at the convention center. Expect delays of 15-20 minutes if traveling through downtown.',
    'Current conditions show light traffic across the network. All major routes are moving at or near the speed limit.'
  ];
  
  return conditions[Math.floor(Math.random() * conditions.length)];
}

function generateConstructionResponse(): string {
  const construction = [
    'Major construction work is ongoing on Highway 101 between exits 25-30. Expect lane closures and delays during non-peak hours.',
    'Bridge maintenance is scheduled for tonight from 10 PM to 5 AM. Plan alternate routes during these hours.',
    'Road widening project on Main Street is causing lane restrictions. Work is expected to continue for the next two weeks.',
    'Construction at the downtown intersection is causing delays. Workers are on site from 9 AM to 3 PM on weekdays.'
  ];

  return construction[Math.floor(Math.random() * construction.length)];
}

function generateWeatherResponse(): string {
  const weather = [
    'Current weather conditions are affecting traffic flow. Rain is causing slower speeds on all major highways.',
    'Snow removal operations are in progress on the interstate. Expect delays and drive carefully.',
    'Strong winds are affecting high-profile vehicles on the bridge. Use caution when crossing.',
    'Weather is clear and not impacting traffic at this time. All routes are operating normally.'
  ];

  return weather[Math.floor(Math.random() * weather.length)];
}

function generateParkingResponse(): string {
  const parking = [
    'Downtown parking garages are currently at 70% capacity. The best availability is at the Central Garage on Main Street.',
    'Street parking is free after 6 PM in the business district. Several spots are available near the restaurant area.',
    'The stadium parking lot is full due to the event. Consider using the shuttle service from the Park & Ride.',
    'Multiple parking options are available downtown. Covered garage rates start at $2/hour.'
  ];

  return parking[Math.floor(Math.random() * parking.length)];
}

function generateSpeedLimitResponse(): string {
  const speedLimits = [
    'The speed limit on this stretch of highway is 65 mph. Construction zones reduce this to 45 mph.',
    'Downtown areas have a standard speed limit of 25 mph. School zones are restricted to 15 mph during school hours.',
    'The expressway speed limit is 55 mph. Variable speed limits may be in effect during adverse conditions.',
    'This residential area has a speed limit of 30 mph. Please drive carefully as there are many pedestrians.'
  ];

  return speedLimits[Math.floor(Math.random() * speedLimits.length)];
}