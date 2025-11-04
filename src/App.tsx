import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthPage } from './pages/AuthPage';
import { ChatPage } from './pages/ChatPage';
import { type Language } from './utils/translations';
import './App.css';

/**
 * Componente principal da aplicação
 * Gerencia o roteamento entre a página de autenticação e a página do chat
 * Controla o idioma global da aplicação
 */
function App() {
  // Estado para controlar o idioma da aplicação (português ou inglês)
  const [language, setLanguage] = useState<Language>(() => {
    // Lê o idioma salvo no localStorage e garante fallback para 'pt-BR'
    const saved = localStorage.getItem('app_language');
    return (saved ?? 'pt-BR') as Language;
  });

  // Hook para acessar o contexto de autenticação
  const { isAuthenticated } = useAuth();

  // Salva o idioma no localStorage sempre que ele muda
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  // Função para alterar o idioma
  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  // Se não autenticado, mostra página de login
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

  // Se autenticado, mostra página do chat
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
 * Componente raiz que envolve a aplicação com o provider de autenticação
 */
function AppWithProviders() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithProviders;
