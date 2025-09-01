import type { ApiResponse } from "../lib/type";
const BASE_URL = import.meta.env.VITE_APP_HOST as string;

const providerMapping: { [key: string]: string } = {
  chatgpt: "openai",
  gemini: "gemini",
  deepseek: "deepseek",
  perplexity: "mistral",
};
export interface WACApiClient {
  sendQuery(query: string, model: string[]): Promise<ApiResponse>;
  login(email: string, password: string): Promise<ApiResponse>;
  register(name: string, email: string, password: string): Promise<boolean>;
  logout(token: string): Promise<boolean>;
}

export const PATHS = Object.freeze({
  QUERIES: () => `/api/queries/query`,
  LOGIN: () => `/login`,
  REGISTER: () => `/register`,
  LOGOUT: () => `logout`,
});

export const createApiClient = (): WACApiClient => {
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
      },

      body: JSON.stringify(requestPayload),
    }).then((response) => {
      return response.json();
    });
    return responses;
  };

  const login = async (
    email: string,
    password: string
  ): Promise<ApiResponse> => {
    const { response } = await fetch(`${BASE_URL}${PATHS.LOGIN()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      return response.json();
    });
    return response;
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    const response = await fetch(`${BASE_URL}${PATHS.REGISTER()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return response.ok;
  };

  const logout = async (token: any) => {
    const response = await fetch(`${BASE_URL}${PATHS.LOGOUT()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    return response.ok;
  };
  return {
    sendQuery,
    login,
    register,
    logout,
  };
};
