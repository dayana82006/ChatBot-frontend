import type { ChatDetalle } from "../../interfaces/ChatDetalle";
import type { ApiChatResponse } from "../../interfaces/ApiResponse";
import type { Mensaje } from "../../interfaces/Mensajes";

const API_URL = "http://127.0.0.1:8000";

export async function getMessages(): Promise<ApiChatResponse> {
  const res = await fetch(`${API_URL}/admin/chats`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener mensajes");

  return (await res.json()) as ApiChatResponse;
}

export async function getChatDetalle(userId: string, channel = "web", source = "mysql"): Promise<ChatDetalle> {
  const res = await fetch(
    `${API_URL}/admin/chats/${encodeURIComponent(userId)}?channel=${encodeURIComponent(channel)}&source=${source}`,
    {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Error al obtener detalle del chat");

  const payload = await res.json();

  const mensajes: Mensaje[] = (payload.messages || []).map((m: any, index: number) => ({
    id: String(m.id || index), // Usar ID de BD o índice como fallback
    remitente: m.role === "user" ? "usuario" : "asistente",
    texto: m.text ?? "",
    hora: m.timestamp ?? new Date().toISOString(),
  }));

  const detalle: ChatDetalle = {
    id: payload.user_id ?? userId,
    usuario: payload.user_id ?? userId,
    ultimoMensaje: mensajes.length > 0 ? mensajes[mensajes.length - 1].texto : "",
    hora: mensajes.length > 0 ? mensajes[mensajes.length - 1].hora : new Date().toISOString(),
    canal: payload.channel ?? channel,
    totalMensajes: mensajes.length,
    mensajes,
    channel: payload.channel ?? channel
  };

  return detalle;
}

// Nueva función para obtener órdenes del usuario
export async function getUserOrders(userId: string): Promise<any> {
  const res = await fetch(`${API_URL}/admin/chats/${encodeURIComponent(userId)}/orders`, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Error al obtener órdenes del usuario");

  return await res.json();
}

// Función para enviar mensajes por HTTP (si lo necesitas)
export async function sendMessage(userId: string, content: string, channel = "web"): Promise<void> {
  const res = await fetch(`${API_URL}/admin/chats/${encodeURIComponent(userId)}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify({
      content,
      channel,
    }),
  });

  if (!res.ok) throw new Error("Error al enviar mensaje");
}