import type { ChatDetalle } from "../../interfaces/ChatDetalle";
import type { ApiChatResponse } from "../../interfaces/ApiResponse";
import type { Mensaje } from "../../interfaces/Mensajes";

const API_URL = "http://localhost:8000";

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

export async function getChatDetalle(userId: string, channel = "web"): Promise<ChatDetalle> {
  const res = await fetch(
    `${API_URL}/admin/chats/${encodeURIComponent(userId)}?channel=${encodeURIComponent(channel)}`,
    {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Error al obtener detalle del chat");

  const payload = await res.json();

  const mensajes: Mensaje[] = (payload.messages || []).map((m: any) => ({
    id: String(m.id),
    remitente: m.role === "user" || m.role === "usuario" ? "usuario" : "asistente",
    texto: m.text ?? "",
    hora: m.timestamp ?? new Date().toISOString(),
  }));

  const detalle: ChatDetalle = {
    id: payload.user_id ?? userId,
    usuario: payload.user_id ?? userId,
    ultimoMensaje: payload.last_message ?? "",
    hora: payload.updated_at ?? new Date().toISOString(),
    canal: payload.channel ?? channel,
    totalMensajes: mensajes.length,
    mensajes,
  };

  return detalle;
}
