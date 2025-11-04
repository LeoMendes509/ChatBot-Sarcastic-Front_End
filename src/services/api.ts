// Serviço centralizado para comunicação com a API do backend
// Gerencia todas as requisições HTTP do chatbot

// Interface para mensagem do chat
export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string;
}

// Interface para requisição de envio de mensagem
export interface SendMessageRequest {
  message: string;
  username?: string;
  language?: string;
}

// Interface para resposta do chat
export interface ChatResponse {
  response: string;
}

// Classe responsável por gerenciar as chamadas à API
class ApiService {
  private baseUrl: string;

  constructor() {
    // URL base do backend Spring Boot
    this.baseUrl = 'http://localhost:8081/api';
  }

  // Método genérico para requisições HTTP
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
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

      // Caso o backend retorne erro, exibe o texto e lança uma exceção
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      // Retorna o JSON da resposta
      return await response.json();
    } catch (error) {
      console.error('❌ Erro na requisição API:', error);
      throw error;
    }
  }

  // Método para enviar mensagem ao chatbot
  async sendMessage(
    message: string,
    username?: string,
    token?: string,
    sessionName: string = 'default',
    language?: string
  ): Promise<ChatResponse> {
    // Cabeçalhos padrão
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Se o token existir, adiciona ao header Authorization
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const body: SendMessageRequest = { message, username, language };

    return this.makeRequest<ChatResponse>(
      `/chat/send?sessionName=${encodeURIComponent(sessionName)}`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      }
    );
  }

  // Método para buscar histórico completo do chat
  async getChatHistory(username?: string, token?: string): Promise<ChatMessage[]> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

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
    token?: string
  ): Promise<ChatMessage[]> {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

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
  async startNewSession(token?: string): Promise<void> {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.makeRequest<void>('/chat/new-session', {
      method: 'POST',
      headers,
    });
  }

  // Método para deletar usuário
  async deleteUser(token?: string): Promise<void> {
    if (!token) {
      throw new Error('Token de autenticação necessário');
    }

    return this.makeRequest<void>('/auth/delete', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

// Instância única (singleton) do serviço
export const apiService = new ApiService();
