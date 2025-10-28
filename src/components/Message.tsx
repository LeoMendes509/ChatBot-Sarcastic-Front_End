/**
 * Interface for Message component props
 * Defines the data structure needed to display a message
 */
interface MessageProps {
  text: string; // Message text
  sender: 'user' | 'bot'; // Who sent the message (user or bot)
  timestamp?: string; // Message date and time (optional)
}

/**
 * Component to display chat messages
 * Renders user and bot messages with different styles
 * Includes timestamp formatting and responsiveness
 */
export function Message({ text, sender, timestamp }: MessageProps) {
  /**
   * Function to format message timestamp
   * Converts ISO string to readable format (HH:MM)
   * @param timestamp - ISO string of date/time
   * @returns Formatted string or empty string if invalid
   */
  const formatTimestamp = (timestamp?: string): string => {
    if (!timestamp) return '';
    
    try {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return '';
    }
  };

  return (
    <div className={`message message-${sender}`}>
      {/* Conteúdo principal da mensagem */}
      <div className="message-content">
        {text}
      </div>
      
      {/* Timestamp da mensagem (exibido apenas se disponível) */}
      {timestamp && (
        <div className="message-timestamp">
          {formatTimestamp(timestamp)}
        </div>
      )}
    </div>
  );
}