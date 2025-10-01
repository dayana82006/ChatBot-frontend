export interface ApiMessage {
  id: number;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
}

export interface ApiChatItem {
  last_message: string;
  id: number;
  user_id: string;
  channel: string;
  created_at: string;
  updated_at: string;
  messages: ApiMessage[];
}

export interface ApiChatResponse {
  items: ApiChatItem[];
  total: number;
}
