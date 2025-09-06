import type { ApiResponse } from "../lib/type";
const BASE_URL = import.meta.env.VITE_APP_HOST as string;

const providerMapping: { [key: string]: string } = {
  chatgpt: "openai",
  gemini: "gemini",
  deepseek: "deepseek",
  perplexity: "mistral",
};
export interface WACApiClient {
  getProfile(): Promise<Response>;
  sendQuery(query: string, model: string[]): Promise<ApiResponse>;
  login(email: string, password: string): Promise<Response>;
  register(name: string, email: string, password: string): Promise<Response>;
  logout(token: string): Promise<Response>;
  googleLogin(idToken: string): Promise<Response>;
}

export const PATHS = Object.freeze({
  QUERIES: () => `/api/queries/query`,
  LOGIN: () => `/api/auth/login`,
  REGISTER: () => `/api/auth/register`,
  LOGOUT: () => `/api/auth/logout`,
  GOOGLE_LOGIN: () => `/api/auth/google-login`,
  GET_PROFILE: () => `/api/auth/profile`,
});

export const createApiClient = (token: any): WACApiClient => {
  const sendQuery = async (
    query: string,
    model: string[]
  ): Promise<ApiResponse> => {
    const provider = model.map((list) => {
      return providerMapping[list];
    });
    const requestPayload = {
      prompt: query,
      providers: provider,
    };
    const { responses } = await fetch(`${BASE_URL}${PATHS.QUERIES()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },

      body: JSON.stringify(requestPayload),
    }).then((response) => {
      return response.json();
    });
    return responses;
  };

  const login = async (email: string, password: string): Promise<Response> => {
    return await fetch(`${BASE_URL}${PATHS.LOGIN()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<Response> => {
    return await fetch(`${BASE_URL}${PATHS.REGISTER()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
  };

  const logout = async (token: any): Promise<Response> => {
    return await fetch(`${BASE_URL}${PATHS.LOGOUT()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  };

  const googleLogin = async (idToken: string): Promise<Response> => {
    return await fetch(`${BASE_URL}${PATHS.GOOGLE_LOGIN()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
    });
  };

  const getProfile = async (): Promise<Response> => {
    return await fetch(`${BASE_URL}${PATHS.GET_PROFILE()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  };

  return {
    sendQuery,
    login,
    register,
    logout,
    googleLogin,
    getProfile,
  };
};
