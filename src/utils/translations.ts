// Sistema de traduções centralizado para o chatbot
// Suporta português brasileiro e inglês com todas as mensagens necessárias

export type Language = 'pt-BR' | 'en';

// Interface para definir a estrutura das traduções
export interface Translations {
  // Traduções para o chat
  chat: {
    placeholder: string;
    send: string;
    newChat: string;
    emptyState: string;
    botName: string;
    loadingHistory: string;
    newChatConfirm: string;
    clearHistory: string;
    historyEmpty: string;
  };
  
  // Traduções para autenticação
  auth: {
    loginTitle: string;
    registerTitle: string;
    forgotTitle: string;
    username: string;
    password: string;
    email: string;
    name: string;
    age: string;
    login: string;
    register: string;
    forgot: string;
    backToLogin: string;
    logout: string;
    welcome: string;
    deleteUser: string;
    confirmDelete: string;
    cancel: string;
    delete: string;
  };
  
  // Traduções para menu
  menu: {
    history: string;
    login: string;
    info: string;
    language: string;
    settings: string;
    account: string;
  };
  
  // Traduções para mensagens de erro/sucesso
  messages: {
    loginSuccess: string;
    registerSuccess: string;
    loginError: string;
    registerError: string;
    networkError: string;
    serverError: string;
    forgotPasswordSent: string;
    connectionError: string;
    userExists: string;
    emailExists: string;
    userNotExists: string;
    deleteUserSuccess: string;
    deleteUserConfirm: string;
    deleteUserCancel: string;
    typing: string;
    welcomeMessage: string;
    loading: string;
    errorSendingMessage: string;
    newChatStarted: string;
    historyCleared: string;
    sessionExpired: string;
    invalidCredentials: string;
    accountCreated: string;
    pleaseLogin: string;
  };
  
  // Traduções para informações
  info: {
    title: string;
    description: string;
    version: string;
    features: string;
  };
}

// Objeto com todas as traduções
export const translations: Record<Language, Translations> = {
  'pt-BR': {
    chat: {
      placeholder: 'Digite sua mensagem...',
      send: 'Enviar',
      newChat: 'Novo Chat',
      emptyState: 'Comece uma conversa com o SarcasticBot',
      botName: 'SarcasticBot',
      loadingHistory: 'Carregando histórico...',
      newChatConfirm: 'Iniciar novo chat?',
      clearHistory: 'Limpar Histórico',
      historyEmpty: 'Nenhuma conversa anterior encontrada'
    },
    auth: {
      loginTitle: 'Entrar',
      registerTitle: 'Registrar',
      forgotTitle: 'Esqueci minha senha',
      username: 'Usuário',
      password: 'Senha',
      email: 'E-mail',
      name: 'Nome',
      age: 'Idade',
      login: 'Entrar',
      register: 'Registrar',
      forgot: 'Esqueci minha senha',
      backToLogin: '← Voltar ao Login',
      logout: 'Sair',
      welcome: 'Bem-vindo',
      deleteUser: 'Deletar Usuário',
      confirmDelete: 'Confirmar Exclusão',
      cancel: 'Cancelar',
      delete: 'Deletar'
    },
    menu: {
      history: 'Histórico de Chat',
      login: 'Login / Conta',
      info: 'Informações',
      language: 'Idioma',
      settings: 'Configurações',
      account: 'Conta'
    },
    messages: {
      loginSuccess: 'Login realizado com sucesso!',
      registerSuccess: 'Conta criada com sucesso! Faça login para continuar.',
      loginError: 'Erro no login. Verifique suas credenciais.',
      registerError: 'Erro no registro. Tente novamente.',
      networkError: 'Erro de conexão com o servidor.',
      serverError: 'Erro interno do servidor.',
      forgotPasswordSent: 'Se o e-mail existir, você receberá instruções para redefinir sua senha.',
      connectionError: 'Falha de rede ao falar com servidor',
      userExists: 'Este usuário já existe',
      emailExists: 'Este e-mail já está registrado',
      userNotExists: 'Este usuário não existe',
      deleteUserSuccess: 'Usuário deletado com sucesso!',
      deleteUserConfirm: 'Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.',
      deleteUserCancel: 'Cancelar',
      typing: 'Digitando...',
      welcomeMessage: 'Olá! Sou o SarcasticBot. Como posso ajudá-lo hoje?',
      loading: 'Carregando...',
      errorSendingMessage: 'Erro ao enviar mensagem. Tente novamente.',
      newChatStarted: 'Novo chat iniciado!',
      historyCleared: 'Histórico limpo com sucesso!',
      sessionExpired: 'Sessão expirada. Faça login novamente.',
      invalidCredentials: 'Credenciais inválidas.',
      accountCreated: 'Conta criada com sucesso!',
      pleaseLogin: 'Faça login para continuar.'
    },
    info: {
      title: 'Informações',
      description: 'Sou um bot sarcástico para testar integrações.',
      version: 'Versão 1.0.0',
      features: 'Funcionalidades: Chat em tempo real, Histórico persistente, Múltiplos idiomas'
    }
  },
  en: {
    chat: {
      placeholder: 'Type your message...',
      send: 'Send',
      newChat: 'New Chat',
      emptyState: 'Start a conversation with SarcasticBot',
      botName: 'SarcasticBot',
      loadingHistory: 'Loading history...',
      newChatConfirm: 'Start new chat?',
      clearHistory: 'Clear History',
      historyEmpty: 'No previous conversations found'
    },
    auth: {
      loginTitle: 'Sign In',
      registerTitle: 'Register',
      forgotTitle: 'Forgot Password',
      username: 'Username',
      password: 'Password',
      email: 'Email',
      name: 'Name',
      age: 'Age',
      login: 'Sign In',
      register: 'Register',
      forgot: 'Forgot Password',
      backToLogin: '← Back to Login',
      logout: 'Logout',
      welcome: 'Welcome',
      deleteUser: 'Delete User',
      confirmDelete: 'Confirm Deletion',
      cancel: 'Cancel',
      delete: 'Delete'
    },
    menu: {
      history: 'Chat History',
      login: 'Login / Account',
      info: 'Information',
      language: 'Language',
      settings: 'Settings',
      account: 'Account'
    },
    messages: {
      loginSuccess: 'Login successful!',
      registerSuccess: 'Account created successfully! Please login to continue.',
      loginError: 'Login error. Please check your credentials.',
      registerError: 'Registration error. Please try again.',
      networkError: 'Connection error with server.',
      serverError: 'Internal server error.',
      forgotPasswordSent: 'If the email exists, you will receive instructions to reset your password.',
      connectionError: 'Network failure when talking to server',
      userExists: 'This username already exists',
      emailExists: 'This email is already registered',
      userNotExists: 'This user does not exist',
      deleteUserSuccess: 'User deleted successfully!',
      deleteUserConfirm: 'Are you sure you want to delete your account? This action cannot be undone.',
      deleteUserCancel: 'Cancel',
      typing: 'Typing...',
      welcomeMessage: 'Hello! I\'m SarcasticBot. How can I help you today?',
      loading: 'Loading...',
      errorSendingMessage: 'Error sending message. Please try again.',
      newChatStarted: 'New chat started!',
      historyCleared: 'History cleared successfully!',
      sessionExpired: 'Session expired. Please login again.',
      invalidCredentials: 'Invalid credentials.',
      accountCreated: 'Account created successfully!',
      pleaseLogin: 'Please login to continue.'
    },
    info: {
      title: 'Information',
      description: 'I am a sarcastic bot to test integrations.',
      version: 'Version 1.0.0',
      features: 'Features: Real-time chat, Persistent history, Multiple languages'
    }
  }
};

// Hook para usar traduções no componente
export const useTranslations = (language: Language) => {
  return translations[language];
};
