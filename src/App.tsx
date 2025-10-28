import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthPage } from './pages/AuthPage';
import { ChatPage } from './pages/ChatPage';
import { type Language } from './utils/translations';
import './App.css';

/**
 * Main application component
 * Manages routing between authentication page and chat page
 * Controls global application language
 */
function App() {
  // State to control application language (Portuguese or English)
  const [language, setLanguage] = useState<Language>(() => {
    // Reads saved language from localStorage and ensures fallback to 'pt-BR'
    const saved = localStorage.getItem('app_language');
    return (saved ?? 'pt-BR') as Language;
  });

  // Hook to access authentication context
  const { isAuthenticated } = useAuth();

  // Saves language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  // Function to change language
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  // If not authenticated, shows login page
  if (!isAuthenticated()) {
    return (
      <div className="app-wrapper">
        <AuthPage
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      </div>
    );
  }

  // If authenticated, shows chat page
  return (
    <div className="app-wrapper">
      <ChatPage
        language={language}
        onLanguageChange={handleLanguageChange}
      />
    </div>
  );
}

/**
 * Root component that wraps the application with authentication provider
 */
function AppWithProviders() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithProviders;
