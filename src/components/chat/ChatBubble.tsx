import React from 'react';
import { type Message } from '../../types';
import CopyButton from '../ui/CopyButton';

interface ChatBubbleProps {
  message: Message;
  onReply?: (text: string) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, onReply }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-3/4 rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-none'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        
        {!isUser && (
          <div className="mt-3 flex space-x-2">
            <CopyButton 
              text={message.text} 
              className="text-xs" 
            />
            {onReply && (
              <button
                onClick={() => onReply(message.text)}
                className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                aria-label="Reply to this message"
              >
                ↪️ Reply
              </button>
            )}
          </div>
        )}
        
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
            <div className="flex flex-wrap gap-2">
              {message.sources.map((source) => (
                <span
                  key={source.id}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {source.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;