export interface ChatRequest {
  message: string;
  user_id?: string;
}

export interface ChatResponse {
  reply: string;
}

const API_URL = "http://localhost:8000/chat";

export const sendMessage = async (payload: ChatRequest): Promise<ChatResponse> => {
  const response = await fetch(`${API_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Error en la API: ${response.status}`);
  }

  return response.json();
};
