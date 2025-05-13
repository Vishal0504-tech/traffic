import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Home, Send } from 'lucide-react';
import { mockChatResponse } from '../services/mockChatService';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const TrafficAIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "Hi! I'm your AI Traffic Assistant. How can I help you today? You can ask about traffic conditions, routes, or travel advice.",
      sender: 'bot'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth", 
      block: "nearest" 
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const newUserMessage: Message = {
      id: messages.length,
      text: inputMessage,
      sender: 'user'
    };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Using mock service instead of actual API call
      const botResponse = await mockChatResponse(inputMessage);
      
      // Add bot response with a slight delay to simulate thinking
      setTimeout(() => {
        const botMessage: Message = {
          id: messages.length + 1,
          text: botResponse,
          sender: 'bot'
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: messages.length + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot'
      };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      setIsLoading(false);
    }
  };

  // Handle input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-white shadow-lg">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center">
          <Bot className="mr-2" />
          Traffic AI Assistant
        </h2>
        <Link 
          to="/" 
          className="p-2 hover:bg-blue-700 rounded-full transition-colors"
          aria-label="Home"
        >
          <Home size={20} />
        </Link>
      </div>

      {/* Chat Messages Container */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg shadow-sm animate-fadeIn ${
                  message.sender === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <form 
        onSubmit={handleSubmit} 
        className="p-4 border-t border-gray-200 bg-white"
      >
        <div className="flex rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
          <input 
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about traffic, routes, or incidents..."
            className="flex-grow p-3 focus:outline-none"
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputMessage.trim()}
            className="bg-blue-500 text-white p-3 hover:bg-blue-600 disabled:opacity-50 transition-colors flex items-center"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TrafficAIChatbot;