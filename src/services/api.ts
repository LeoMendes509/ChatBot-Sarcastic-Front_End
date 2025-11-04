<<<<<<< HEAD
// Serviço centralizado para comunicação com a API do backend
// Gerencia todas as requisições HTTP do chatbot

// Interface para mensagem do chat
export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

// Interface para requisição de envio de mensagem
=======
// Centralized service for backend API communication
// Manages all HTTP requests for the chatbot

// Interface for chat message
export interface ChatMessage {
  text: string;
  sender: "user" | "bot";
  timestamp?: string;
}

// Interface for message sending request
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
export interface SendMessageRequest {
  message: string;
  username?: string;
  language?: string;
}

<<<<<<< HEAD
// Interface para resposta do chat
=======
// Interface for chat response
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
export interface ChatResponse {
  response: string;
}

<<<<<<< HEAD
// Classe responsável por gerenciar as chamadas à API
=======
// Class responsible for managing API calls
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
class ApiService {
  private baseUrl: string;

  constructor() {
<<<<<<< HEAD
    // URL base do backend Spring Boot
    this.baseUrl = 'http://localhost:8081/api';
  }

  // Método genérico para requisições HTTP
=======
    // Base URL for Spring Boot backend
    this.baseUrl = "http://localhost:8081/api";
  }

  // Generic method for HTTP requests
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
<<<<<<< HEAD
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
=======

    const defaultHeaders = {
      "Content-Type": "application/json",
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

<<<<<<< HEAD
      // Caso o backend retorne erro, exibe o texto e lança uma exceção
=======
      // If backend returns error, displays text and throws exception
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

<<<<<<< HEAD
      // Retorna o JSON da resposta
      return await response.json();
    } catch (error) {
      console.error('❌ Erro na requisição API:', error);
=======
      // Returns JSON response
      return await response.json();
    } catch (error) {
      console.error("❌ API request error:", error);
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      throw error;
    }
  }

<<<<<<< HEAD
  // Método para enviar mensagem ao chatbot
=======
  // Method to send message to chatbot
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  async sendMessage(
    message: string,
    username?: string,
    token?: string,
<<<<<<< HEAD
    sessionName: string = 'default',
    language?: string
  ): Promise<ChatResponse> {
    // Cabeçalhos padrão
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Se o token existir, adiciona ao header Authorization
=======
    sessionName: string = "default",
    language?: string
  ): Promise<ChatResponse> {
    // Default headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // If token exists, adds to Authorization header
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const body: SendMessageRequest = { message, username, language };

    return this.makeRequest<ChatResponse>(
      `/chat/send?sessionName=${encodeURIComponent(sessionName)}`,
      {
<<<<<<< HEAD
        method: 'POST',
=======
        method: "POST",
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
        headers,
        body: JSON.stringify(body),
      }
    );
  }

<<<<<<< HEAD
  // Método para buscar histórico completo do chat
  async getChatHistory(username?: string, token?: string): Promise<ChatMessage[]> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
=======
  // Method to fetch complete chat history
  async getChatHistory(
    token?: string,
    sessionName: string = "default"
  ): Promise<ChatMessage[]> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

<<<<<<< HEAD
    const url = username
      ? `/chat/history?username=${encodeURIComponent(username)}`
      : '/chat/history';

    return this.makeRequest<ChatMessage[]>(url, {
      method: 'GET',
      headers,
    });
  }
  // Método para buscar mensagens de uma sessão específica
  async getChatSession(
    sessionName: string = 'default',
=======
    const url = `/chat/history?sessionName=${encodeURIComponent(sessionName)}`;

    return this.makeRequest<ChatMessage[]>(url, {
      method: "GET",
      headers,
    });
  }
  // Method to fetch messages from a specific session
  async getChatSession(
    sessionName: string = "default",
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
    token?: string
  ): Promise<ChatMessage[]> {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

<<<<<<< HEAD
    const endpoint = `/chat/history?sessionName=${encodeURIComponent(sessionName)}`;

    return this.makeRequest<ChatMessage[]>(
      endpoint,
      {
        method: 'GET',
        headers,
      }
    );
  }

  // Método para iniciar nova sessão (limpa mensagens antigas)
=======
    const endpoint = `/chat/history?sessionName=${encodeURIComponent(
      sessionName
    )}`;

    return this.makeRequest<ChatMessage[]>(endpoint, {
      method: "GET",
      headers,
    });
  }

  // Method to start new session (clears old messages)
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  async startNewSession(token?: string): Promise<void> {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

<<<<<<< HEAD
    return this.makeRequest<void>('/chat/new-session', {
      method: 'POST',
=======
    return this.makeRequest<void>("/chat/new-session", {
      method: "POST",
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      headers,
    });
  }

<<<<<<< HEAD
  // Método para deletar usuário
  async deleteUser(token?: string): Promise<void> {
    if (!token) {
      throw new Error('Token de autenticação necessário');
    }

    return this.makeRequest<void>('/auth/delete', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
=======
  // Method to save chat history
  async saveChatHistory(
    messages: ChatMessage[], 
    token?: string, 
    sessionName: string = 'default'
  ): Promise<void> {
    if (!token) throw new Error("Token required");

    await this.makeRequest<void>(`/chat/save-history?sessionName=${encodeURIComponent(sessionName)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(messages)
    });
  }


  // Method to delete user
  async deleteUser(token?: string): Promise<void> {
    if (!token) {
      throw new Error("Authentication token required");
    }

    return this.makeRequest<void>("/auth/delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      },
    });
  }
}

<<<<<<< HEAD
// Instância única (singleton) do serviço
=======
// Single instance (singleton) of the service
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
export const apiService = new ApiService();
