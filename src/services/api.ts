// Centralized service for backend API communication
// Manages all HTTP requests for the chatbot

// Interface for chat message
export interface ChatMessage {
  text: string;
  sender: "user" | "bot";
  timestamp?: string;
}

// Interface for message sending request
export interface SendMessageRequest {
  message: string;
  username?: string;
  language?: string;
}

// Interface for chat response
export interface ChatResponse {
  response: string;
}

// Class responsible for managing API calls
class ApiService {
  private baseUrl: string;

  constructor() {
    // Base URL for Spring Boot backend
    this.baseUrl = "http://localhost:8081/api";
  }

  // Generic method for HTTP requests
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultHeaders = {
      "Content-Type": "application/json",
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

      // If backend returns error, displays text and throws exception
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP error! status: ${response.status}`);
      }

      // Returns JSON response
      return await response.json();
    } catch (error) {
      console.error("❌ API request error:", error);
      throw error;
    }
  }

  // Method to send message to chatbot
  async sendMessage(
    message: string,
    username?: string,
    token?: string,
    sessionName: string = "default",
    language?: string
  ): Promise<ChatResponse> {
    // Default headers
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // If token exists, adds to Authorization header
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const body: SendMessageRequest = { message, username, language };

    return this.makeRequest<ChatResponse>(
      `/chat/send?sessionName=${encodeURIComponent(sessionName)}`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );
  }

  // Method to fetch complete chat history
  async getChatHistory(
    token?: string,
    sessionName: string = "default"
  ): Promise<ChatMessage[]> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const url = `/chat/history?sessionName=${encodeURIComponent(sessionName)}`;

    return this.makeRequest<ChatMessage[]>(url, {
      method: "GET",
      headers,
    });
  }
  // Method to fetch messages from a specific session
  async getChatSession(
    sessionName: string = "default",
    token?: string
  ): Promise<ChatMessage[]> {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const endpoint = `/chat/history?sessionName=${encodeURIComponent(
      sessionName
    )}`;

    return this.makeRequest<ChatMessage[]>(endpoint, {
      method: "GET",
      headers,
    });
  }

  // Method to start new session (clears old messages)
  async startNewSession(token?: string): Promise<void> {
    const headers: Record<string, string> = {};

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return this.makeRequest<void>("/chat/new-session", {
      method: "POST",
      headers,
    });
  }

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
      },
    });
  }
}

// Single instance (singleton) of the service
export const apiService = new ApiService();
