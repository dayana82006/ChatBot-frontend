import type { ChatProps } from "../../interfaces/Chat";
import React, { useState } from "react";

const datosFalsos: ChatProps[] = [
  {
    id: "1",
    usuario: "Juan Perez",
    ultimoMensaje: "Perfecto, me interesa el plan anual",
    hora: "2025-09-15 16:10",
    mensajes: [
      { id: "m1", remitente: "usuario", texto: "Hola, quiero más info", hora: "2025-09-15 14:23" },
      { id: "m2", remitente: "asistente", texto: "¡Hola Juan! Claro que sí, ¿sobre qué producto?", hora: "2025-09-15 14:25" },
      { id: "m3", remitente: "usuario", texto: "Sobre la suscripción premium", hora: "2025-09-15 14:30" },
      { id: "m4", remitente: "asistente", texto: "Perfecto, la suscripción premium incluye soporte 24/7.", hora: "2025-09-15 14:35" },
      { id: "m5", remitente: "usuario", texto: "¿Tienen descuento?", hora: "2025-09-15 14:45" },
      { id: "m6", remitente: "asistente", texto: "Sí, tenemos 10% si pagas el plan anual.", hora: "2025-09-15 14:50" },
      { id: "m7", remitente: "usuario", texto: "¿Y cómo puedo pagarlo?", hora: "2025-09-15 14:55" },
      { id: "m8", remitente: "asistente", texto: "Puedes pagar con tarjeta de crédito, débito o transferencia.", hora: "2025-09-15 14:58" },
      { id: "m9", remitente: "usuario", texto: "¿Aceptan PayPal?", hora: "2025-09-15 15:00" },
      { id: "m10", remitente: "asistente", texto: "De momento no, solo medios locales.", hora: "2025-09-15 15:05" },
      { id: "m11", remitente: "usuario", texto: "Entiendo, ¿y si compro hoy cuándo empieza?", hora: "2025-09-15 15:10" },
      { id: "m12", remitente: "asistente", texto: "Empieza inmediatamente después del pago.", hora: "2025-09-15 15:15" },
      { id: "m13", remitente: "usuario", texto: "Genial, ¿puedo cancelar en cualquier momento?", hora: "2025-09-15 15:20" },
      { id: "m14", remitente: "asistente", texto: "Sí, puedes cancelar cuando quieras y se prorratea el servicio.", hora: "2025-09-15 15:25" },
      { id: "m15", remitente: "usuario", texto: "Ok, ¿me envías el link de pago?", hora: "2025-09-15 15:30" },
      { id: "m16", remitente: "asistente", texto: "Claro, aquí lo tienes: https://pago.ejemplo.com", hora: "2025-09-15 15:35" },
      { id: "m17", remitente: "usuario", texto: "Listo, ya pagué.", hora: "2025-09-15 15:50" },
      { id: "m18", remitente: "asistente", texto: "Excelente 🎉, tu plan premium está activo.", hora: "2025-09-15 15:55" },
      { id: "m19", remitente: "usuario", texto: "Perfecto, me interesa el plan anual", hora: "2025-09-15 16:10" },
    ],
  },
  {
    id: "2",
    usuario: "Maria Lopez",
    ultimoMensaje: "Gracias por tu ayuda",
    hora: "2025-09-16 09:12",
    mensajes: [
      { id: "m1", remitente: "usuario", texto: "Buenos días, necesito ayuda con mi pedido", hora: "2025-09-16 09:00" },
      { id: "m2", remitente: "asistente", texto: "¡Hola María! Claro, ¿me das tu número de orden?", hora: "2025-09-16 09:05" },
      { id: "m3", remitente: "usuario", texto: "Es el #12345", hora: "2025-09-16 09:07" },
      { id: "m4", remitente: "asistente", texto: "Ya lo reviso… Listo, está en camino y llega hoy en la tarde.", hora: "2025-09-16 09:10" },
      { id: "m5", remitente: "usuario", texto: "Gracias por tu ayuda", hora: "2025-09-16 09:12" },
    ],
  },
];

export const Dashboard: React.FC = () => {
  const [chatSeleccionado, setChatSeleccionado] = useState<ChatProps | null>(null);
  const [filtro, setFiltro] = useState<string>("");

  const chatsFiltrados = datosFalsos.filter(chat =>
    chat.usuario.toLowerCase().includes(filtro.toLowerCase()) ||
    chat.ultimoMensaje.toLowerCase().includes(filtro.toLowerCase())
  );
  return (
    <div className="h-screen flex">
      <div className="w-1/3 border-r border-gray-300 bg-white flex flex-col">
        <div className="p-4 border-b font-bold bg-gray-100">Chats</div>

        <div className="flex-1 overflow-y-auto">
          <input 
              type="text" 
              className="border" 
              placeholder="Buscar chats" 
              value={filtro} 
              onChange={(e) => setFiltro(e.target.value)}
          />
          <ul className="divide-y">
            {chatsFiltrados.map((chat) => (
              <li
                key={chat.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setChatSeleccionado(chat)}
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{chat.usuario}</span>
                  <span className="text-xs text-gray-400">{chat.hora}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {chat.ultimoMensaje}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-2/3 flex flex-col bg-gray-50">
        {chatSeleccionado ? (
          <>
            <div className="p-4 border-b bg-white font-bold">
              {chatSeleccionado.usuario}
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              <div>
                {chatSeleccionado.mensajes.map((msg) => (
                  <div key={msg.id} className={`mb-2 ${msg.remitente === "usuario" ? "text-right" : "text-left"}`}>
                    <div className={`inline-block p-2 rounded-lg ${msg.remitente === "usuario" ? "bg-blue-100" : "bg-gray-200"}`}>
                      {msg.texto}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{msg.hora}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Selecciona un chat para verlo
          </div>
        )}
      </div>
    </div>
  );
};
