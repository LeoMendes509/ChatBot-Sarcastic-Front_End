import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useTranslations, type Language } from "../utils/translations";
import { apiService, type ChatMessage } from "../services/api";

// Interface for MenuDropdown component props
interface MenuDropdownProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onNewChat: () => void;
  onLoadHistory?: (messages: ChatMessage[]) => void;
}

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
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Function to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setShowDeleteConfirm(false);
        setShowHistory(false);
      }
    };

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
      setChatHistory([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Function to load a specific conversation
  const loadConversation = (messages: ChatMessage[]) => {
    if (onLoadHistory) {
      onLoadHistory(messages);
    }
    setShowHistory(false);
    setIsOpen(false);
  };

  // Function to toggle dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (isOpen) {
      setShowDeleteConfirm(false);
    }
  };

  // Function to logout
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

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
  const handleLanguageChange = (newLanguage: Language) => {
    onLanguageChange(newLanguage);
    setIsOpen(false);
  };

  // Function to confirm user deletion
  const handleDeleteUser = async () => {
    const success = await deleteUser();
    if (success) {
      setShowDeleteConfirm(false);
      setIsOpen(false);
    }
  };

  // Function to cancel deletion
  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="menu" ref={dropdownRef}>
      {/* Menu icon (three dots) */}
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
            {/* New chat option */}
            <li onClick={handleNewChat} className="menu-item">
              {t.chat.newChat}
            </li>

            {/* History option - Temporarily commented */}
            {/* <li onClick={loadChatHistory} className="menu-item">
              {t.menu.history}
            </li> */}

            {/* Language toggle option */}
            <li className="language-option">
              <div className="language-label">{t.menu.language}</div>
              <select
                value={language}
                onChange={(e) =>
                  handleLanguageChange(e.target.value as Language)
                }
                className="language-select"
                disabled={isLoading}
              >
                <option value="pt-BR">🇧🇷 Português</option>
                <option value="en">🇺🇸 English</option>
              </select>
            </li>

            {/* Logout option */}
            <li onClick={handleLogout} className="menu-item">
              {t.auth.logout} ({username})
            </li>

            {/* Delete user option */}
            <li
              onClick={() => setShowDeleteConfirm(true)}
              className="menu-item delete-option"
            >
              {t.auth.deleteUser}
            </li>
          </ul>
        </div>
      )}

      {/* History modal */}
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
                        {message.timestamp
                          ? new Date(message.timestamp).toLocaleString()
                          : ""}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* User deletion confirmation modal */}
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
                {isLoading ? "..." : t.auth.delete}
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
