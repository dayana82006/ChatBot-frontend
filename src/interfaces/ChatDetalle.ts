import type { Mensaje } from "./Mensajes";

export interface ChatDetalle {
  id: number;
  usuario: string;
  channel: string;
  ultimoMensaje: string;
  hora: string;
  totalMensajes: number;
  canal?: string;
  mensajes: Mensaje[];
}

// 🔥 Interface actualizada para soportar ambos formatos
export interface WebSocketMessage {
  type?: "new_message" | "message" | "ping";  // Agregado "ping"
  
  // Formato anidado (con data)
  data?: {
    user_id: string;
    chat_id?: number;
    role: string;
    text?: string;
    content?: string;
    channel: string;
    timestamp?: string;
  };
  
  // Formato plano (propiedades directas)
  user_id?: string;
  chat_id?: number;
  role?: string;
  text?: string;
  content?: string;
  channel?: string;
  timestamp?: string;
}