import { createContext, useState, useContext, type ReactNode } from "react";

// Interface for login data
export interface LoginData {
  username: string;
  password: string;
}

// Interface for registration data
export interface RegisterData {
  username: string;
  password: string;
  email: string;
  name: string;
  age: number;
}

// Interface for login response from backend
export interface LoginResponse {
  token: string;
  username: string;
}

// Interface for authentication context
interface AuthContextProps {
  // Authentication states
  token: string | null;
  username: string | null;
  isLoading: boolean;
  error: string | null;
  
  // Authentication functions
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  deleteUser: () => Promise<boolean>;
  clearError: () => void;
  
  // Function to check if authenticated
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

// Authentication context provider
export function AuthProvider({ children }: { children: ReactNode }) {
  // Local states to manage authentication
  const [token, setToken] = useState<string | null>(() => 
    localStorage.getItem('auth_token')
  );
  const [username, setUsername] = useState<string | null>(() => 
    localStorage.getItem('username')
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to login to backend
  const login = async (data: LoginData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        
        // Checks if it's user not found error
        if (errorText.includes('user') || errorText.includes('usuário') || 
            errorText.includes('not found') || errorText.includes('não encontrado')) {
          setError('User not registered');
        } else if (errorText.includes('password') || errorText.includes('senha') ||
                   errorText.includes('invalid') || errorText.includes('inválida')) {
          setError('User not registered');
        } else {
          setError(errorText || 'User not registered');
        }
        return false;
      }

      const loginData: LoginResponse = await response.json();
      
      // Saves authentication data
      setToken(loginData.token);
      setUsername(loginData.username);
      localStorage.setItem('auth_token', loginData.token);
      localStorage.setItem('username', loginData.username);
      
      return true;
    } catch (err) {
      setError('User not registered');
      console.error('Login error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to register new user
  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8081/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        
        // Checks if it's existing user or email error
        if (errorText.includes('username') || errorText.includes('usuário')) {
          setError('This username already exists');
        } else if (errorText.includes('email') || errorText.includes('e-mail')) {
          setError('This username already exists');
        } else {
          setError(errorText || 'This username already exists');
        }
        return false;
      }

      // Registration successful
      return true;
    } catch (err) {
      setError('This username already exists');
      console.error('Registration error:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to logout
  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    setError(null);
  };

  // Function to delete user
  const deleteUser = async (): Promise<boolean> => {
    if (!token) {
      setError('Authentication token not found');
      return false;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8081/api/auth/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || 'Error deleting user');
        return false;
      }

      // Deletes user and logs out
      logout();
      return true;
    } catch (err) {
      setError('User not registered');
      console.error('Error deleting user:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to clear errors
  const clearError = () => {
    setError(null);
  };

  // Function to check if authenticated
  const isAuthenticated = (): boolean => {
    return token !== null && username !== null;
    };

  return (
    <AuthContext.Provider 
      value={{
        token,
        username,
        isLoading,
        error,
        login,
        register,
        logout,
        deleteUser,
        clearError,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};