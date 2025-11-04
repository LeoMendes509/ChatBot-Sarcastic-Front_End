/**
 * Interface para as props do componente Message
 * Define a estrutura de dados necessária para exibir uma mensagem
 */
interface MessageProps {
  text: string; // Texto da mensagem
  sender: 'user' | 'bot'; // Quem enviou a mensagem (usuário ou bot)
  timestamp?: string; // Data e hora da mensagem (opcional)
}

/**
 * Componente para exibir mensagens do chat
 * Renderiza mensagens do usuário e do bot com estilos diferentes
 * Inclui formatação de timestamp e responsividade
 */
export function Message({ text, sender, timestamp }: MessageProps) {
  /**
   * Função para formatar o timestamp da mensagem
   * Converte ISO string para formato legível (HH:MM)
   * @param timestamp - String ISO da data/hora
   * @returns String formatada ou string vazia se inválida
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