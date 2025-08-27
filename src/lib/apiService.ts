import type{ ApiResponse } from '../lib/type';

export interface WACApiClient {
  sendQuery(query: string, model: string): Promise<ApiResponse>;
}

export const PATHS = Object.freeze({
  QUERIES: () =>
    `/api/queries/query`,
});

export const createApiClient = (token:string): WACApiClient => {
  const sendQuery = async (query: string, model: string): Promise<ApiResponse> => {
    const providerMapping: { [key: string]: string } = {
      'chatgpt': 'openai',
      'gemini': 'gemini',
      'deepseek': 'deepseek',
      'perplexity': 'mistral',
    };

    const provider = providerMapping[model] || 'openai';

    const requestPayload = {
      prompt: query,
      providers: [provider],
    };

    try {
      const response = await fetch(PATHS.QUERIES(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(requestPayload),
      });

      if (!response.ok) {
        let errorDetails = '';
        try {
          const errorBody = await response.text();
          errorDetails = errorBody ? ` - ${errorBody}` : '';
        } catch {}

        throw new Error(`HTTP ${response.status}: ${response.statusText}${errorDetails}`);
      }

      const data = await response.json();
      if (data?.responses?.length > 0) {
        const responseData = data.responses[0];
        return {
          response: responseData.content,
          model: responseData.provider,
        };
      } else {
        throw new Error('No response data received from server');
      }
    } catch (error) {
      let errorMessage = `Sorry, I encountered an error while processing your request with ${model}.`;

      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = `Unable to connect to the server for ${model}. Please check if the API server is running on port 3001.`;
      } else if (error instanceof Error) {
        if (error.message.includes('500')) {
          errorMessage = `Server error with ${provider} provider. Please check your API keys and server logs.`;
        } else if (error.message.includes('404')) {
          errorMessage = `API endpoint not found for ${model}. Please ensure the server route is /api/queries/query.`;
        } else if (error.message.includes('401') || error.message.includes('403')) {
          errorMessage = `Authentication failed for ${provider}. Please check your API key.`;
        }
      }

      return {
        response: errorMessage + ' Please try again or contact support if the issue persists.',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  };

  
  return {
    sendQuery,
  };
};
