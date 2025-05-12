from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import openrouteservice

# Create a separate Flask app for the chatbot
chatbot_app = Flask(__name__)
CORS(chatbot_app)

# Use the same ORS client from app.py
ORS_API_KEY = "5b3ce3597851110001cf6248f9ccd111584e478babaaf6a9fcae4ed4"
ors_client = openrouteservice.Client(key=ORS_API_KEY)

# Predefined response templates
TRAFFIC_RESPONSES = {
    'route': [
        "I recommend taking the most efficient route based on current traffic conditions.",
        "The fastest route currently avoids major congestion points.",
        "Consider an alternate route to save time and avoid delays."
    ],
    'incident': [
        "I've detected potential traffic incidents in your area.",
        "There are some reported traffic disruptions to be aware of.",
        "Current traffic conditions suggest being cautious on certain routes."
    ],
    'general': [
        "I'm your AI traffic assistant. How can I help you today?",
        "Need traffic insights? I'm here to assist you.",
        "Ask me about routes, traffic conditions, or potential incidents."
    ]
}

# AI-powered response generation
def generate_ai_response(user_message, coords=None):
    # Convert message to lowercase for easier matching
    message = user_message.lower()
    
    # Context-aware response generation
    if any(word in message for word in ['route', 'direction', 'way', 'navigate']):
        # If coordinates are provided, use routing information
        if coords and len(coords) >= 2:
            try:
                route = ors_client.directions(
                    coordinates=coords,
                    profile="driving-car",
                    format="geojson"
                )
                distance = route['features'][0]['properties']['summary']['distance'] / 1000  # Convert to km
                duration = route['features'][0]['properties']['summary']['duration'] / 60  # Convert to minutes
                
                return (
                    f"Route analysis: Estimated distance is {distance:.2f} km. "
                    f"Estimated travel time is {duration:.2f} minutes. "
                    f"{random.choice(TRAFFIC_RESPONSES['route'])}"
                )
            except Exception as e:
                print("Routing error:", str(e))
        
        return random.choice(TRAFFIC_RESPONSES['route'])
    
    if any(word in message for word in ['accident', 'incident', 'traffic', 'congestion']):
        return random.choice(TRAFFIC_RESPONSES['incident'])
    
    # Fallback to general responses
    return random.choice(TRAFFIC_RESPONSES['general'])

@chatbot_app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    # Optional: Extract coordinates if provided
    coords = data.get('coordinates', None)
    
    # Generate AI response
    reply = generate_ai_response(user_message, coords)
    
    return jsonify({
        'reply': reply
    })

if __name__ == '__main__':
    chatbot_app.run(debug=True, port=5001)  # Use a different port