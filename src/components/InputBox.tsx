import { useTranslations, type Language } from '../utils/translations';

/**
<<<<<<< HEAD
 * Interface para as props do componente InputBox
 * Define as propriedades necessárias para o componente de input
 */
interface InputBoxProps {
  input: string; // Valor atual do input
  setInput: (value: string) => void; // Função para atualizar o valor do input
  onSend: () => void; // Função chamada quando a mensagem é enviada
  language: Language; // Idioma atual da aplicação
  disabled?: boolean; // Se o input está desabilitado (opcional, padrão false)
}

/**
 * Componente para a caixa de input do chat
 * Permite ao usuário digitar e enviar mensagens
 * Inclui suporte a Enter para envio e validações
 */
export function InputBox({ input, setInput, onSend, language, disabled = false }: InputBoxProps) {
  // Hook para acessar as traduções baseadas no idioma atual
  const t = useTranslations(language);

  /**
   * Função para lidar com o envio da mensagem
   * Verifica se há texto e se não está desabilitado antes de enviar
=======
 * Interface for InputBox component props
 * Defines the properties needed for the input component
 */
interface InputBoxProps {
  input: string; // Current input value
  setInput: (value: string) => void; // Function to update input value
  onSend: () => void; // Function called when message is sent
  language: Language; // Current application language
  disabled?: boolean; // If input is disabled (optional, default false)
}

/**
 * Component for chat input box
 * Allows user to type and send messages
 * Includes Enter key support for sending and validations
 */
export function InputBox({ input, setInput, onSend, language, disabled = false }: InputBoxProps) {
  // Hook to access translations based on current language
  const t = useTranslations(language);

  /**
   * Function to handle message sending
   * Checks if there is text and if not disabled before sending
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
   */
  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend();
    }
  };

  /**
   * Função para lidar com teclas pressionadas
   * Envia a mensagem quando Enter é pressionado (sem Shift)
   * @param e - Evento de teclado
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="input-box">
      {/* Campo de input para a mensagem */}
      <input 
        type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={t.chat.placeholder}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className="message-input"
      />
      
      {/* Botão de envio da mensagem */}
      <button 
        onClick={handleSend}
        disabled={disabled || !input.trim()}
        className="send-button"
      >
        {t.chat.send}
      </button>
    </div>
  );
}