const API_URL = "http://localhost:8000";

export async function getMessages() {
  const res = await fetch(`${API_URL}/messages`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });

  if (!res.ok) throw new Error("Error al obtener mensajes");

  return await res.json();
}

export async function sendMessage(content: string) {
  const res = await fetch(`${API_URL}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
    },
    body: JSON.stringify({ content }),
  });

  if (!res.ok) throw new Error("Error al enviar mensaje");

  return await res.json();
}

export async function deleteMessage(id: number) {
  const res = await fetch(`${API_URL}/messages/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });

  if (!res.ok) throw new Error("Error al borrar mensaje");

  return await res.json();
}
