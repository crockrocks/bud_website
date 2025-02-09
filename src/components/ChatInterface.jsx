import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Image, Paperclip, MoreVertical } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/authContext';

const characterThemes = {
    bud: {
        gradient: "from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800",
        primary: "bg-green-600",
        primaryHover: "hover:bg-green-700",
        accent: "bg-green-500",
        border: "border-green-500",
        text: "text-green-600 dark:text-green-400",
        ring: "focus:ring-green-500",
        decorative: [
            "bg-green-200 dark:bg-green-800/20",
            "bg-green-200 dark:bg-green-800/20",
            "bg-green-100 dark:bg-green-900/20"
        ]
    },
    luffy: {
        gradient: "from-red-50 to-yellow-100 dark:from-gray-900 dark:to-red-900/40",
        primary: "bg-red-600",
        primaryHover: "hover:bg-red-700",
        accent: "bg-yellow-500",
        border: "border-red-500",
        text: "text-red-600 dark:text-red-400",
        ring: "focus:ring-red-500",
        decorative: [
            "bg-red-200 dark:bg-red-800/20",
            "bg-yellow-200 dark:bg-yellow-800/20",
            "bg-red-100 dark:bg-red-900/20"
        ]
    },
    deadpool: {
        gradient: "from-red-950 to-gray-900",
        primary: "bg-red-700",
        primaryHover: "hover:bg-red-800",
        accent: "bg-gray-800",
        border: "border-red-700",
        text: "text-red-500",
        ring: "focus:ring-red-700",
        decorative: [
            "bg-red-800/30",
            "bg-gray-800/30",
            "bg-red-900/30"
        ]
    }
};

const ChatInterface = () => {
    const { character } = useParams();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
  
    const currentCharacter = character ? character.split('-')[0].toLowerCase() : 'bud';
    const theme = characterThemes[currentCharacter] || characterThemes.bud;
  
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
  
    useEffect(() => {
      scrollToBottom();
    }, [messages]);
  
    const handleSendMessage = async () => {
      if (!inputMessage.trim() || loading) return;
  
      const newMessage = {
        type: 'user',
        content: inputMessage,
        timestamp: new Date()
      };
  
      setMessages(prev => [...prev, newMessage]);
      setInputMessage('');
      setLoading(true);
  
      try {
        const response = await fetch('http://localhost:5000/api/chat', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${await user.getIdToken()}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: inputMessage,
            character: currentCharacter
          })
        });
  
        if (!response.ok) {
          throw new Error('Failed to send message');
        }
  
        const data = await response.json();
        setMessages(prev => [...prev, {
          type: 'bot',
          content: data.response,
          timestamp: new Date()
        }]);
      } catch (error) {
        console.error('Chat error:', error);
        setMessages(prev => [...prev, {
          type: 'error',
          content: 'Failed to send message. Please try again.',
          timestamp: new Date()
        }]);
      } finally {
        setLoading(false);
      }
    };

    return (
        <div className={`pt-16 h-screen bg-gradient-to-br ${theme.gradient}`}>
            {/* Chat Container */}
            <div className="h-[calc(100vh-4rem)] max-w-6xl mx-auto p-4 flex flex-col">
                {/* Decorative Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute -top-40 -right-40 w-80 h-80 ${theme.decorative[0]} rounded-full blur-3xl opacity-50`} />
                    <div className={`absolute -bottom-40 -left-40 w-80 h-80 ${theme.decorative[1]} rounded-full blur-3xl opacity-50`} />
                    <div className={`absolute top-1/4 left-1/4 w-60 h-60 ${theme.decorative[2]} rounded-full blur-2xl opacity-30`} />
                </div>

                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-t-2xl p-4 shadow-lg relative z-10"
                >
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <img 
                                src={`/images/${character?.toLowerCase() || 'bud'}.png`}
                                alt={character || 'BUD'}
                                className={`w-12 h-12 rounded-full object-cover border-2 ${theme.border}`}
                            />
                            <div className={`absolute bottom-0 right-0 w-3 h-3 ${theme.accent} rounded-full border-2 border-white`}></div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                {character || 'BUD'}
                            </h2>
                            <p className={theme.text}>Online</p>
                        </div>
                        <button className="ml-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                            <MoreVertical className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>
                </motion.div>

                {/* Messages Area */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 overflow-y-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 space-y-4 relative z-10"
                >
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[70%] ${message.type === 'user' ? `${theme.primary} text-white` : 'bg-gray-100 dark:bg-gray-700 dark:text-white'} rounded-2xl px-4 py-3 shadow-md`}>
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs mt-1 opacity-70">
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                </motion.div>

                {/* Input Area */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-b-2xl p-4 shadow-lg relative z-10"
                >
                    <div className="flex items-center space-x-4">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                            <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                            <Image className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your message here..."
                            className={`flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full px-6 py-3 focus:outline-none focus:ring-2 ${theme.ring}`}
                        />
                        <button 
                            onClick={handleSendMessage}
                            className={`p-3 ${theme.primary} ${theme.primaryHover} text-white rounded-full shadow-lg transition-all duration-300`}
                        >
                            <Send className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full">
                            <Mic className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ChatInterface;