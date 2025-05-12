import  { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';
import axios from 'axios';

const TrafficAIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "Hi! I'm your AI Traffic Assistant. How can I help you today?",
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message to backend
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newUserMessage = {
      id: messages.length,
      text: inputMessage,
      sender: 'user'
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Replace with your actual backend endpoint
      const response = await axios.post('http://localhost:5000/chat', {
        message: inputMessage
      });

      // Add bot response
      const botMessage = {
        id: messages.length + 1,
        text: response.data.reply,
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: messages.length + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle input submission
  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex flex-col h-[600px] max-w-md mx-auto bg-white shadow-lg rounded-xl">
      {/* Navigation and Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Bot className="mr-2 text-blue-600" />
          Traffic AI Assistant
        </h2>
        <div className="flex space-x-2">
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/ai-bot" 
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            AI Bot
          </Link>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-black'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 p-3 rounded-lg">
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form 
        onSubmit={handleSubmit} 
        className="flex p-4 border-t border-gray-200"
      >
        <input 
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask about traffic, routes, or incidents..."
          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default TrafficAIChatbot;