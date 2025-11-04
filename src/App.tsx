import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthPage } from './pages/AuthPage';
import { ChatPage } from './pages/ChatPage';
import { type Language } from './utils/translations';
import './App.css';

/**
<<<<<<< HEAD
 * Componente principal da aplicação
 * Gerencia o roteamento entre a página de autenticação e a página do chat
 * Controla o idioma global da aplicação
 */
function App() {
  // Estado para controlar o idioma da aplicação (português ou inglês)
  const [language, setLanguage] = useState<Language>(() => {
    // Lê o idioma salvo no localStorage e garante fallback para 'pt-BR'
=======
 * Main application component
 * Manages routing between authentication page and chat page
 * Controls global application language
 */
function App() {
  // State to control application language (Portuguese or English)
  const [language, setLanguage] = useState<Language>(() => {
    // Reads saved language from localStorage and ensures fallback to 'pt-BR'
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
    const saved = localStorage.getItem('app_language');
    return (saved ?? 'pt-BR') as Language;
  });

<<<<<<< HEAD
  // Hook para acessar o contexto de autenticação
  const { isAuthenticated } = useAuth();

  // Salva o idioma no localStorage sempre que ele muda
=======
  // Hook to access authentication context
  const { isAuthenticated } = useAuth();

  // Saves language to localStorage whenever it changes
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

<<<<<<< HEAD
  // Função para alterar o idioma
=======
  // Function to change language
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

<<<<<<< HEAD
  // Se não autenticado, mostra página de login
=======
  // If not authenticated, shows login page
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
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

<<<<<<< HEAD
  // Se autenticado, mostra página do chat
=======
  // If authenticated, shows chat page
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
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
<<<<<<< HEAD
 * Componente raiz que envolve a aplicação com o provider de autenticação
=======
 * Root component that wraps the application with authentication provider
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
 */
function AppWithProviders() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithProviders;
