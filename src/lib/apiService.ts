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
}

export const PATHS = Object.freeze({
  QUERIES: () => `/api/queries/query`,
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

  return {
    sendQuery,
  };
};
