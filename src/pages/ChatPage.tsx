import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslations, type Language } from '../utils/translations';
import { apiService, type ChatMessage } from '../services/api';
import { Message } from '../components/Message';
import { InputBox } from '../components/InputBox';
import { MenuDropdown } from '../components/MenuDropdown';

// Interface for ChatPage component props
interface ChatPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

// Chat page component
export function ChatPage({ language, onLanguageChange }: ChatPageProps) {
  // Hook to access authentication context
  const { token, username } = useAuth();
  
  // Hook to access translations
  const t = useTranslations(language);
  
  // Local states for chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  
  // Ref for messages container (for auto scroll)
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to auto scroll to last message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Effect for auto scroll when new messages are added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to save messages to localStorage
  const saveMessagesToLocal = (messages: ChatMessage[]) => {
    try {
      localStorage.setItem(`chat_history_${username}`, JSON.stringify(messages));
    } catch (err) {
      console.error('Error saving local history:', err);
    }
  };

  // Função para carregar mensagens do localStorage
  const loadMessagesFromLocal = (): ChatMessage[] => {
    try {
      const saved = localStorage.getItem(`chat_history_${username}`);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Erro ao carregar histórico local:', err);
      return [];
    }
  };

  // Efeito para carregar histórico ao entrar na página
  useEffect(() => {
    const loadChatHistory = async () => {
      if (!token) return;
      
      try {
        setIsLoadingHistory(true);
        
        
        // Primeiro tenta carregar do localStorage
        const localHistory = loadMessagesFromLocal();
        if (localHistory.length > 0) {
          setMessages(localHistory);
          setIsLoadingHistory(false);
          return;
        }
        
        // Se não há histórico local, tenta carregar do backend
        const history = await apiService.getChatHistory(username || undefined, token);
        setMessages(history);
        saveMessagesToLocal(history);
      } catch (err) {
        console.error('Erro ao carregar histórico:', err);
        // Se não conseguir carregar histórico, adiciona mensagem de boas-vindas
        const welcomeMessage: ChatMessage = {
          text: t.messages.welcomeMessage,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
        saveMessagesToLocal([welcomeMessage]);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadChatHistory();
  }, [token, t.messages.welcomeMessage, username]);

  // Função para enviar mensagem para o backend
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      text: input.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    // Adiciona a mensagem do usuário imediatamente
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);
    setError(null);

    try {
      // Envia mensagem para o backend
      const sessionName = 'default';

      const response = await apiService.sendMessage(
        userMessage.text,
        username || undefined,
        token || undefined,
        sessionName,
        language
      );

      // Adiciona a resposta do bot
      const botMessage: ChatMessage = {
        text: response.response,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => {
        const newMessages = [...prev, botMessage];
        saveMessagesToLocal(newMessages);
        return newMessages;
      });
    } catch (err) {
      // Em caso de erro, adiciona mensagem de erro
      const errorMessage: ChatMessage = {
        text: t.messages.errorSendingMessage,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => {
        const newMessages = [...prev, errorMessage];
        saveMessagesToLocal(newMessages);
        return newMessages;
      });
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  // Função para iniciar novo chat
  const handleNewChat = async () => {
    try {
      // Limpa mensagens locais
      setMessages([]);
      setError(null);
      
      // Limpa histórico local
      localStorage.removeItem(`chat_history_${username}`);
      
      // Inicia nova sessão no backend
      if (token) {
        await apiService.startNewSession(token);
      }
      
      // Adiciona mensagem de boas-vindas
      const welcomeMessage: ChatMessage = {
        text: t.messages.welcomeMessage,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
      saveMessagesToLocal([welcomeMessage]);
    } catch (err) {
      console.error('Erro ao iniciar nova sessão:', err);
      // Mesmo com erro, limpa as mensagens locais
      setMessages([]);
      localStorage.removeItem(`chat_history_${username}`);
    }
  };


  return (
    <div className="chat-container">
      {/* Header do chat */}
      <header className="chat-header">
        <div className="header-left">
          {/* Menu dropdown */}
          <MenuDropdown
            language={language}
            onLanguageChange={onLanguageChange}
            onNewChat={handleNewChat}
            onLoadHistory={(messages) => setMessages(messages)}
          />
        </div>

        {/* Nome do bot */}
        <div className="bot-name">
          {t.chat.botName}
        </div>

        {/* Botão de novo chat */}
        <div className="new-chat">
          <button onClick={handleNewChat} disabled={isLoading}>
            {t.chat.newChat}
          </button>
        </div>
      </header>

      {/* Área principal do chat */}
      <main className="main-area">
        {/* Container das mensagens */}
        <div className="chat-box" id="chat-box">
          {/* Estado de carregamento do histórico */}
          {isLoadingHistory && (
            <div className="loading-state">
              <p>{language === 'pt-BR' ? 'Carregando histórico...' : 'Loading history...'}</p>
            </div>
          )}

          {/* Estado vazio quando não há mensagens */}
          {!isLoadingHistory && messages.length === 0 && (
            <div className="empty-state">
              <p>{t.chat.emptyState}</p>
            </div>
          )}

          {/* Lista de mensagens */}
          {!isLoadingHistory && messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              sender={message.sender}
              timestamp={message.timestamp}
            />
          ))}

          {/* Indicador de digitação */}
          {isTyping && (
            <div className="message message-bot">
              <div className="message-content typing-indicator">
                <span className="typing-dots">
                  <span>.</span><span>.</span><span>.</span>
                </span>
                {t.messages.typing}
              </div>
            </div>
          )}

          {/* Ref para scroll automático */}
          <div ref={messagesEndRef} />
        </div>

        {/* Caixa de input */}
        <InputBox
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          language={language}
          disabled={isLoading || isTyping}
        />
      </main>

      {/* Exibição de erros */}
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}
    </div>
  );
}
