export interface ApiChatItem {
  user_id: string;
  channel: string;
  last_message: string;
  updated_at: string;
  count: number;
}

export interface ApiChatResponse {
  items: ApiChatItem[];
  page: number;
  total: number;
}
