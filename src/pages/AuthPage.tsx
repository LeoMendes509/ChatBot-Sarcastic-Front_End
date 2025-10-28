import { useState, useEffect } from 'react';
import { useAuth, type LoginData, type RegisterData } from '../context/AuthContext';
import { useTranslations, type Language } from '../utils/translations';

// Interface for AuthPage component props
interface AuthPageProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

// Authentication page component
export function AuthPage({ language, onLanguageChange }: AuthPageProps) {
  // Hook to access authentication context
  const { login, register, isLoading, error, clearError } = useAuth();
  
  // Hook to access translations
  const t = useTranslations(language);
  
  // Local states to control form
  const [formMode, setFormMode] = useState<'login' | 'register'>('login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    age: ''
  });

  // Clears errors when form mode changes
  useEffect(() => {
    clearError();
  }, [formMode, clearError]);

  // Function to update form data
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Function to handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim()) {
      return;
    }

    const loginData: LoginData = {
      username: formData.username.trim(),
      password: formData.password
    };

    const success = await login(loginData);
    if (success) {
      // Login successful - context already manages redirection
      setFormData({ username: '', password: '', email: '', name: '', age: '' });
    }
  };

  // Function to handle registration form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password.trim() || 
        !formData.email.trim() || !formData.name.trim() || !formData.age.trim()) {
      return;
    }

    const registerData: RegisterData = {
      username: formData.username.trim(),
      password: formData.password,
      email: formData.email.trim(),
      name: formData.name.trim(),
      age: parseInt(formData.age)
    };

    const success = await register(registerData);
    if (success) {
      // Registration successful - switches to login mode
      setFormMode('login');
      setFormData({ username: '', password: '', email: '', name: '', age: '' });
    }
  };

  // Function to toggle between login and registration
  const toggleFormMode = () => {
    setFormMode(prev => prev === 'login' ? 'register' : 'login');
    setFormData({ username: '', password: '', email: '', name: '', age: '' });
    clearError();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header with title and language selector */}
        <div className="auth-header">
          <h1>{formMode === 'login' ? t.auth.loginTitle : t.auth.registerTitle}</h1>
          
          {/* Language selector */}
          <div className="language-selector">
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="language-select"
            >
              <option value="pt-BR">🇧🇷 Português</option>
              <option value="en">🇺🇸 English</option>
            </select>
          </div>
        </div>

        {/* Login Form */}
        {formMode === 'login' && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">{t.auth.username}</label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder={t.auth.username}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t.auth.password}</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder={t.auth.password}
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="auth-button primary"
              disabled={isLoading}
            >
              {isLoading ? '...' : t.auth.login}
            </button>

            <button 
              type="button" 
              className="auth-button secondary"
              onClick={toggleFormMode}
              disabled={isLoading}
            >
              {t.auth.registerTitle}
            </button>
          </form>
        )}

        {/* Registration Form */}
        {formMode === 'register' && (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label htmlFor="reg-username">{t.auth.username}</label>
              <input
                id="reg-username"
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                placeholder={t.auth.username}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-name">{t.auth.name}</label>
              <input
                id="reg-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={t.auth.name}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email">{t.auth.email}</label>
              <input
                id="reg-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t.auth.email}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-age">{t.auth.age}</label>
              <input
                id="reg-age"
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                placeholder={t.auth.age}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-password">{t.auth.password}</label>
              <input
                id="reg-password"
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder={t.auth.password}
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="auth-button primary"
              disabled={isLoading}
            >
              {isLoading ? '...' : t.auth.register}
            </button>

            <button 
              type="button" 
              className="auth-button secondary"
              onClick={toggleFormMode}
              disabled={isLoading}
            >
              {t.auth.backToLogin}
            </button>
          </form>
        )}

        {/* Error display */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
