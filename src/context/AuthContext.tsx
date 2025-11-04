import { createContext, useState, useContext, type ReactNode } from "react";

<<<<<<< HEAD
// Interface para dados de login
=======
// Interface for login data
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
export interface LoginData {
  username: string;
  password: string;
}

<<<<<<< HEAD
// Interface para dados de registro
=======
// Interface for registration data
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
export interface RegisterData {
  username: string;
  password: string;
  email: string;
  name: string;
  age: number;
}

<<<<<<< HEAD
// Interface para resposta de login do backend
=======
// Interface for login response from backend
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
export interface LoginResponse {
  token: string;
  username: string;
}

<<<<<<< HEAD
// Interface para o contexto de autenticação
interface AuthContextProps {
  // Estados de autenticação
=======
// Interface for authentication context
interface AuthContextProps {
  // Authentication states
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  token: string | null;
  username: string | null;
  isLoading: boolean;
  error: string | null;
  
<<<<<<< HEAD
  // Funções de autenticação
=======
  // Authentication functions
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  login: (data: LoginData) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  deleteUser: () => Promise<boolean>;
  clearError: () => void;
  
<<<<<<< HEAD
  // Função para verificar se está autenticado
=======
  // Function to check if authenticated
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  isAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

<<<<<<< HEAD
// Provider do contexto de autenticação
export function AuthProvider({ children }: { children: ReactNode }) {
  // Estados locais para gerenciar autenticação
=======
// Authentication context provider
export function AuthProvider({ children }: { children: ReactNode }) {
  // Local states to manage authentication
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  const [token, setToken] = useState<string | null>(() => 
    localStorage.getItem('auth_token')
  );
  const [username, setUsername] = useState<string | null>(() => 
    localStorage.getItem('username')
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

<<<<<<< HEAD
  // Função para fazer login no backend
=======
  // Function to login to backend
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
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
        
<<<<<<< HEAD
        // Verifica se é erro de usuário não existente
        if (errorText.includes('user') || errorText.includes('usuário') || 
            errorText.includes('not found') || errorText.includes('não encontrado')) {
          setError('Este usuário não existe');
        } else if (errorText.includes('password') || errorText.includes('senha') ||
                   errorText.includes('invalid') || errorText.includes('inválida')) {
          setError('Senha incorreta');
        } else {
          setError(errorText || 'Erro no login');
=======
        // Checks if it's user not found error
        if (errorText.includes('user') || errorText.includes('usuário') || 
            errorText.includes('not found') || errorText.includes('não encontrado')) {
          setError('User not registered');
        } else if (errorText.includes('password') || errorText.includes('senha') ||
                   errorText.includes('invalid') || errorText.includes('inválida')) {
          setError('User not registered');
        } else {
          setError(errorText || 'User not registered');
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
        }
        return false;
      }

      const loginData: LoginResponse = await response.json();
      
<<<<<<< HEAD
      // Salva os dados de autenticação
=======
      // Saves authentication data
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      setToken(loginData.token);
      setUsername(loginData.username);
      localStorage.setItem('auth_token', loginData.token);
      localStorage.setItem('username', loginData.username);
      
      return true;
    } catch (err) {
<<<<<<< HEAD
      setError('Erro de conexão com o servidor');
      console.error('Erro no login:', err);
=======
      setError('User not registered');
      console.error('Login error:', err);
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      return false;
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  // Função para registrar novo usuário
=======
  // Function to register new user
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
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
        
<<<<<<< HEAD
        // Verifica se é erro de usuário ou email existente
        if (errorText.includes('username') || errorText.includes('usuário')) {
          setError('Este usuário já existe');
        } else if (errorText.includes('email') || errorText.includes('e-mail')) {
          setError('Este e-mail já está registrado');
        } else {
          setError(errorText || 'Erro no registro');
=======
        // Checks if it's existing user or email error
        if (errorText.includes('username') || errorText.includes('usuário')) {
          setError('This username already exists');
        } else if (errorText.includes('email') || errorText.includes('e-mail')) {
          setError('This username already exists');
        } else {
          setError(errorText || 'This username already exists');
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
        }
        return false;
      }

<<<<<<< HEAD
      // Registro bem-sucedido
      return true;
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro no registro:', err);
=======
      // Registration successful
      return true;
    } catch (err) {
      setError('This username already exists');
      console.error('Registration error:', err);
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      return false;
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  // Função para fazer logout
=======
  // Function to logout
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  const logout = () => {
    setToken(null);
    setUsername(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    setError(null);
  };

<<<<<<< HEAD
  // Função para deletar usuário
  const deleteUser = async (): Promise<boolean> => {
    if (!token) {
      setError('Token de autenticação não encontrado');
=======
  // Function to delete user
  const deleteUser = async (): Promise<boolean> => {
    if (!token) {
      setError('Authentication token not found');
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
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
<<<<<<< HEAD
        setError(errorText || 'Erro ao deletar usuário');
        return false;
      }

      // Deleta o usuário e faz logout
      logout();
      return true;
    } catch (err) {
      setError('Erro de conexão com o servidor');
      console.error('Erro ao deletar usuário:', err);
=======
        setError(errorText || 'Error deleting user');
        return false;
      }

      // Deletes user and logs out
      logout();
      return true;
    } catch (err) {
      setError('User not registered');
      console.error('Error deleting user:', err);
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
      return false;
    } finally {
      setIsLoading(false);
    }
  };

<<<<<<< HEAD
  // Função para limpar erros
=======
  // Function to clear errors
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  const clearError = () => {
    setError(null);
  };

<<<<<<< HEAD
  // Função para verificar se está autenticado
=======
  // Function to check if authenticated
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
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

<<<<<<< HEAD
// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
=======
// Hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
>>>>>>> 215eddaadd9dbc839647eb2b5daff08257ec029a
  }
  return context;
};