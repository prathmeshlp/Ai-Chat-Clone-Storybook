import React from 'react';
import Button from '../ui/Button';

interface ConversationControlsProps {
  onClear: () => void;
  messageCount: number;
}

const ConversationControls: React.FC<ConversationControlsProps> = ({
  onClear,
  messageCount
}) => {
  const handleExport = () => {
    const conversation = {
      exportedAt: new Date().toISOString(),
      messageCount,
      messages: "Export functionality would include actual messages here"
    };
    const dataStr = JSON.stringify(conversation, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `conversation-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="flex space-x-3 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onClear}
        disabled={messageCount === 0}
      >
        🗑️ Clear Chat
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleExport}
        disabled={messageCount === 0}
      >
        💾 Export Chat
      </Button>
    </div>
  );
};

export default ConversationControls;