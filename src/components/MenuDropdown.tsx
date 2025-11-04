<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTranslations, type Language } from '../utils/translations';
import { apiService, type ChatMessage } from '../services/api';

// Interface para as props do componente MenuDropdown
=======
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslations, type Language } from "../utils/translations";
import { apiService, type ChatMessage } from "../services/api";

// Interface for MenuDropdown component props
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
interface MenuDropdownProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNewChat: () => void;
  onLoadHistory?: (messages: ChatMessage[]) => void;
}

<<<<<<< HEAD
// Componente do menu dropdown com opções do usuário
export function MenuDropdown({ language, onLanguageChange, onNewChat, onLoadHistory }: MenuDropdownProps) {
  // Hook para acessar o contexto de autenticação
  const { username, logout, deleteUser, isLoading, token } = useAuth();
  
  // Hook para acessar as traduções
  const t = useTranslations(language);
  
  // Estados locais para controlar o dropdown
=======
// Menu dropdown component with user options
export function MenuDropdown({
  language,
  onLanguageChange,
  onNewChat,
  onLoadHistory,
}: MenuDropdownProps) {
  // Hook to access authentication context
  const { username, logout, deleteUser, isLoading, token } = useAuth();

  // State that controls current chat session
  const [currentSessionName, setCurrentSessionName] = useState("default");

  // Hook to access translations
  const t = useTranslations(language);

  // Local states to control dropdown
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

<<<<<<< HEAD
  // Função para fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
=======
  // Function to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
        setIsOpen(false);
        setShowDeleteConfirm(false);
        setShowHistory(false);
      }
    };

<<<<<<< HEAD
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
=======
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to load chat history
  const loadChatHistory = async () => {
    if (!token) return;

    setIsLoadingHistory(true);
    try {
      const history = await apiService.getChatHistory(
        token,
        currentSessionName
      );
      setChatHistory(history);
      setShowHistory(true);
    } catch (err) {
      console.error("Error loading history:", err);
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      setChatHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

<<<<<<< HEAD
  // Função para carregar uma conversa específica
=======
  // Function to load a specific conversation
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  const loadConversation = (messages: ChatMessage[]) => {
    if (onLoadHistory) {
      onLoadHistory(messages);
    }
    setShowHistory(false);
    setIsOpen(false);
  };

<<<<<<< HEAD
  // Função para alternar o dropdown
=======
  // Function to toggle dropdown
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setShowDeleteConfirm(false);
    }
  };

<<<<<<< HEAD
  // Função para fazer logout
=======
  // Function to logout
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

<<<<<<< HEAD
  // Função para iniciar novo chat
  const handleNewChat = () => {
    onNewChat();
    setIsOpen(false);
  };

  // Função para alternar idioma
=======
  // Function to generate a new session name
  const generateNewSessionName = (): string => `session_${Date.now()}`;

  // Function to start new chat
  const handleNewChat = async () => {
    try {
      if (!token) return;

      // Save current chat to history before clearing
      if (chatHistory.length > 0) {
        await apiService.saveChatHistory(
          chatHistory,
          token,
          currentSessionName
        );
        console.log("Previous chat saved to history ✅");
      }

      // Generate new session and update state
      const newSession = generateNewSessionName();
      setCurrentSessionName(newSession);

      // Clear local history and call callback
      setChatHistory([]);
      onNewChat();
      setIsOpen(false);
    } catch (err) {
      console.error("Error starting new session:", err);
    }
  };

  // Function to change language
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  const handleLanguageChange = (newLanguage: Language) => {
    onLanguageChange(newLanguage);
    setIsOpen(false);
  };

<<<<<<< HEAD
  // Função para confirmar deleção do usuário
=======
  // Function to confirm user deletion
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  const handleDeleteUser = async () => {
    const success = await deleteUser();
    if (success) {
      setShowDeleteConfirm(false);
      setIsOpen(false);
    }
  };

<<<<<<< HEAD
  // Função para cancelar deleção
=======
  // Function to cancel deletion
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="menu" ref={dropdownRef}>
<<<<<<< HEAD
      {/* Ícone do menu (três pontinhos) */}
      <span 
        className="menu-icon" 
=======
      {/* Menu icon (three dots) */}
      <span
        className="menu-icon"
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
        onClick={toggleDropdown}
        title={t.menu.language}
      >
        &#x2630;
      </span>
<<<<<<< HEAD
      
=======

>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      {/* Dropdown menu */}
      {isOpen && (
        <div className="menu-dropdown">
          <ul>
<<<<<<< HEAD
            {/* Opção de novo chat */}
            <li onClick={handleNewChat} className="menu-item">
              {t.chat.newChat}
            </li>
            
            {/* Opção de histórico */}
            <li onClick={loadChatHistory} className="menu-item">
              {t.menu.history}
            </li>
            
            {/* Opção de alternar idioma */}
=======
            {/* New chat option */}
            <li onClick={handleNewChat} className="menu-item">
              {t.chat.newChat}
            </li>

            {/* History option - Temporarily commented */}
            {/* <li onClick={loadChatHistory} className="menu-item">
              {t.menu.history}
            </li> */}

            {/* Language toggle option */}
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
            <li className="language-option">
              <div className="language-label">{t.menu.language}</div>
              <select
                value={language}
<<<<<<< HEAD
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
=======
                onChange={(e) =>
                  handleLanguageChange(e.target.value as Language)
                }
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
                className="language-select"
                disabled={isLoading}
              >
                <option value="pt-BR">🇧🇷 Português</option>
                <option value="en">🇺🇸 English</option>
              </select>
            </li>
<<<<<<< HEAD
            
            {/* Opção de logout */}
            <li onClick={handleLogout} className="menu-item">
              {t.auth.logout} ({username})
            </li>
            
            {/* Opção de deletar usuário */}
            <li 
              onClick={() => setShowDeleteConfirm(true)} 
=======

            {/* Logout option */}
            <li onClick={handleLogout} className="menu-item">
              {t.auth.logout} ({username})
            </li>

            {/* Delete user option */}
            <li
              onClick={() => setShowDeleteConfirm(true)}
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
              className="menu-item delete-option"
            >
              {t.auth.deleteUser}
            </li>
          </ul>
        </div>
      )}

<<<<<<< HEAD
      {/* Modal de histórico */}
=======
      {/* History modal */}
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      {showHistory && (
        <div className="history-modal">
          <div className="history-content">
            <div className="history-header">
              <h3>{t.menu.history}</h3>
<<<<<<< HEAD
              <button 
=======
              <button
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
                onClick={() => setShowHistory(false)}
                className="close-button"
              >
                ×
              </button>
            </div>
<<<<<<< HEAD
            
=======

>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
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
<<<<<<< HEAD
                    <div 
                      key={index} 
=======
                    <div
                      key={index}
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
                      className="history-item"
                      onClick={() => loadConversation([message])}
                    >
                      <div className="message-preview">
                        {message.text.substring(0, 50)}...
                      </div>
                      <div className="message-time">
<<<<<<< HEAD
                        {message.timestamp ? new Date(message.timestamp).toLocaleString() : ''}
=======
                        {message.timestamp
                          ? new Date(message.timestamp).toLocaleString()
                          : ""}
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* Modal de confirmação para deletar usuário */}
=======
      {/* User deletion confirmation modal */}
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <h3>{t.auth.confirmDelete}</h3>
            <p>{t.messages.deleteUserConfirm}</p>
            <div className="delete-confirm-buttons">
<<<<<<< HEAD
              <button 
=======
              <button
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
                onClick={handleDeleteUser}
                className="delete-confirm-button delete"
                disabled={isLoading}
              >
<<<<<<< HEAD
                {isLoading ? '...' : t.auth.delete}
              </button>
              <button 
=======
                {isLoading ? "..." : t.auth.delete}
              </button>
              <button
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
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
