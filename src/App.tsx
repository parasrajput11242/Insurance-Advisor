import React, { useState, useRef, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { ChatMessage } from './components/ChatMessage';
import { Message } from './types';
import { insuranceOptions } from './data/insuranceOptions';

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Insurance Advisor. How can I help you today? You can ask me about health, life, or auto insurance.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Process the user's message and generate a response
    setTimeout(() => {
      const response = generateResponse(input.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const generateResponse = (input: string): string => {
    if (input.includes('health')) {
      const option = insuranceOptions.health;
      return `${option.description}\n\nKey benefits:\n${option.benefits.join('\n• ')}`;
    } else if (input.includes('life')) {
      const option = insuranceOptions.life;
      return `${option.description}\n\nKey benefits:\n${option.benefits.join('\n• ')}`;
    } else if (input.includes('auto')) {
      const option = insuranceOptions.auto;
      return `${option.description}\n\nKey benefits:\n${option.benefits.join('\n• ')}`;
    } else if (input.includes('hello') || input.includes('hi')) {
      return "Hello! I can help you understand different insurance options. What type of insurance are you interested in? (health, life, or auto)";
    } else {
      return "I'm not sure about that. I can provide information about health, life, and auto insurance. Which would you like to learn more about?";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-t-lg p-4 border-b flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Shield className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">Insurance Advisor</h1>
            <p className="text-sm text-gray-500">Ask me anything about insurance</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-gray-100 h-[60vh] overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-b-lg border-t p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;