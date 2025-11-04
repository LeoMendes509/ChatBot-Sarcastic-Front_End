import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslations, type Language } from '../utils/translations';
import { apiService, type ChatMessage } from '../services/api';

// Interface para as props do componente MenuDropdown
interface MenuDropdownProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNewChat: () => void;
  onLoadHistory?: (messages: ChatMessage[]) => void;
}

// Componente do menu dropdown com opções do usuário
export function MenuDropdown({ language, onLanguageChange, onNewChat, onLoadHistory }: MenuDropdownProps) {
  // Hook para acessar o contexto de autenticação
  const { username, logout, deleteUser, isLoading, token } = useAuth();
  
  // Hook para acessar as traduções
  const t = useTranslations(language);
  
  // Estados locais para controlar o dropdown
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Função para fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowDeleteConfirm(false);
        setShowHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Função para carregar histórico do chat
  const loadChatHistory = async () => {
    if (!token) return;
    
    setIsLoadingHistory(true);
    try {
      const history = await apiService.getChatHistory(username ?? undefined, token);
      setChatHistory(history);
      setShowHistory(true);
    } catch (err) {
      console.error('Erro ao carregar histórico:', err);
      setChatHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Função para carregar uma conversa específica
  const loadConversation = (messages: ChatMessage[]) => {
    if (onLoadHistory) {
      onLoadHistory(messages);
    }
    setShowHistory(false);
    setIsOpen(false);
  };

  // Função para alternar o dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setShowDeleteConfirm(false);
    }
  };

  // Função para fazer logout
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Função para iniciar novo chat
  const handleNewChat = () => {
    onNewChat();
    setIsOpen(false);
  };

  // Função para alternar idioma
  const handleLanguageChange = (newLanguage: Language) => {
    onLanguageChange(newLanguage);
    setIsOpen(false);
  };

  // Função para confirmar deleção do usuário
  const handleDeleteUser = async () => {
    const success = await deleteUser();
    if (success) {
      setShowDeleteConfirm(false);
      setIsOpen(false);
    }
  };

  // Função para cancelar deleção
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="menu" ref={dropdownRef}>
      {/* Ícone do menu (três pontinhos) */}
      <span 
        className="menu-icon" 
        onClick={toggleDropdown}
        title={t.menu.language}
      >
        &#x2630;
      </span>
      
      {/* Dropdown menu */}
      {isOpen && (
        <div className="menu-dropdown">
          <ul>
            {/* Opção de novo chat */}
            <li onClick={handleNewChat} className="menu-item">
              {t.chat.newChat}
            </li>
            
            {/* Opção de histórico */}
            <li onClick={loadChatHistory} className="menu-item">
              {t.menu.history}
            </li>
            
            {/* Opção de alternar idioma */}
            <li className="language-option">
              <div className="language-label">{t.menu.language}</div>
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="language-select"
                disabled={isLoading}
              >
                <option value="pt-BR">🇧🇷 Português</option>
                <option value="en">🇺🇸 English</option>
              </select>
            </li>
            
            {/* Opção de logout */}
            <li onClick={handleLogout} className="menu-item">
              {t.auth.logout} ({username})
            </li>
            
            {/* Opção de deletar usuário */}
            <li 
              onClick={() => setShowDeleteConfirm(true)} 
              className="menu-item delete-option"
            >
              {t.auth.deleteUser}
            </li>
          </ul>
        </div>
      )}

      {/* Modal de histórico */}
      {showHistory && (
        <div className="history-modal">
          <div className="history-content">
            <div className="history-header">
              <h3>{t.menu.history}</h3>
              <button 
                onClick={() => setShowHistory(false)}
                className="close-button"
              >
                ×
              </button>
            </div>
            
            <div className="history-body">
              {isLoadingHistory ? (
                <div className="loading-state">
                  <p>{t.chat.loadingHistory}</p>
                </div>
              ) : chatHistory.length === 0 ? (
                <div className="empty-history">
                  <p>{t.chat.historyEmpty}</p>
                </div>
              ) : (
                <div className="history-list">
                  {chatHistory.map((message, index) => (
                    <div 
                      key={index} 
                      className="history-item"
                      onClick={() => loadConversation([message])}
                    >
                      <div className="message-preview">
                        {message.text.substring(0, 50)}...
                      </div>
                      <div className="message-time">
                        {message.timestamp ? new Date(message.timestamp).toLocaleString() : ''}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação para deletar usuário */}
      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <h3>{t.auth.confirmDelete}</h3>
            <p>{t.messages.deleteUserConfirm}</p>
            <div className="delete-confirm-buttons">
              <button 
                onClick={handleDeleteUser}
                className="delete-confirm-button delete"
                disabled={isLoading}
              >
                {isLoading ? '...' : t.auth.delete}
              </button>
              <button 
                onClick={handleCancelDelete}
                className="delete-confirm-button cancel"
                disabled={isLoading}
              >
                {t.auth.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
