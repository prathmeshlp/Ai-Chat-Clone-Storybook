import { useState, useEffect } from 'react';
import { type Message, type ModelConfig } from './types';
import { mockMessages, mockModelConfig } from './data/mockData';
import ParameterPanel from './components/panels/ParameterPanel';
import SourcePanel from './components/panels/SourcePanel';
import ChatBubble from './components/chat/ChatBubble';
import MessageInput from './components/chat/MessageInput';
import ThemeToggle from './components/ui/ThemeToggle';
import ConversationControls from './components/chat/ConversationControls';
import PromptTemplates from './components/chat/PromptTemplates';

function App() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [currentConfig, setCurrentConfig] = useState<ModelConfig>(mockModelConfig);
  const [selectedMessageId, setSelectedMessageId] = useState<string>('2');
  const [isLoading, setIsLoading] = useState(false);

  // Find the selected message and its sources
  const selectedMessage = messages.find(msg => msg.id === selectedMessageId);
  const currentSources = selectedMessage?.sources || [];

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        const messagesWithDates = parsedMessages.map((msg: Message) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(messagesWithDates);
      } catch (error) {
        console.error('Error loading messages from localStorage:', error);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `This is a simulated response to: "${text}". In a real application, this would come from an AI API.`,
        sender: 'ai',
        timestamp: new Date(),
        sources: Math.random() > 0.3 ? [] : undefined,
      };

      setMessages(prev => [...prev, aiMessage]);
      setSelectedMessageId(aiMessage.id);
      setIsLoading(false);
    }, 1500);
  };

  const handleTemplateSelect = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleReply = (text: string) => {
    handleSendMessage(`Regarding your previous message: "${text.substring(0, 50)}..."`);
  };

  const handleSaveConfig = () => {
    localStorage.setItem('modelConfig', JSON.stringify(currentConfig));
    alert('Configuration saved!');
  };

  const handleLoadConfig = () => {
    const saved = localStorage.getItem('modelConfig');
    if (saved) {
      setCurrentConfig(JSON.parse(saved));
      alert('Configuration loaded!');
    } else {
      alert('No saved configuration found!');
    }
  };

  const clearConversation = () => {
    if (window.confirm('Are you sure you want to clear the conversation? This cannot be undone.')) {
      setMessages([]);
      localStorage.removeItem('chatMessages');
      setSelectedMessageId('');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-300 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-zinc-600 dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-white dark:text-white">
              AI Chat Assistant
            </h1>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full sm:w-4/5 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Left Panel - Parameters */}
          <div className="lg:w-1/4 w-full">
            <ParameterPanel
              config={currentConfig}
              onConfigChange={setCurrentConfig}
              onSaveConfig={handleSaveConfig}
              onLoadConfig={handleLoadConfig}
            />
          </div>

          {/* Middle Panel - Chat */}
          <div className="lg:w-2/4 w-full flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 h-[600px] flex flex-col">
              {/* Chat Header with Controls */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-3">
                  <h2 className="font-semibold text-gray-900 dark:text-white">Conversation</h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {messages.length} messages
                  </span>
                </div>
                <ConversationControls
                  onClear={clearConversation}
                  messageCount={messages.length}
                />
                <PromptTemplates onTemplateSelect={handleTemplateSelect} />
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => setSelectedMessageId(message.id)}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedMessageId === message.id
                        ? 'ring-2 ring-indigo-500 rounded-lg'
                        : 'hover:ring-1 hover:ring-gray-300 dark:hover:ring-gray-600 rounded-lg'
                    }`}
                  >
                    <ChatBubble 
                      message={message} 
                      onReply={handleReply}
                    />
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <MessageInput
                  onSendMessage={handleSendMessage}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          {/* Right Panel - Sources */}
          <div className="lg:w-1/4 w-full">
            <SourcePanel
              sources={currentSources}
              selectedMessageId={selectedMessageId}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;