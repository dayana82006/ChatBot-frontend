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
    <div className="h-screen flex font-sans bg-slate-100 p-6 gap-6">
  {/* Sidebar */}
  <div className="w-1/3 bg-slate-50 rounded-2xl shadow-xl border border-slate-200 flex flex-col">
    <div className="p-4 border-b border-slate-200 font-semibold text-slate-700 rounded-t-2xl bg-sky-600 text-white shadow-sm">
      Chats
    </div>

    <div className="p-4">
      <input
        type="text"
        className="w-full px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
        placeholder="Buscar chats..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
    </div>

    <div className="flex-1 overflow-y-auto px-4 pb-4">
      <ul className="space-y-3">
        {chatsFiltrados.map((chat) => (
          <li
            key={chat.id}
            className="p-3 bg-slate-100 rounded-xl shadow-sm hover:shadow-md hover:bg-sky-50 cursor-pointer transition-all border border-slate-200"
            onClick={() => setChatSeleccionado(chat)}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-slate-800">{chat.usuario}</span>
              <span className="text-xs text-slate-500">{chat.hora}</span>
            </div>
            <p className="text-sm text-slate-600 truncate">
              {chat.ultimoMensaje}
            </p>
          </li>
        ))}
      </ul>
    </div>
  </div>

  {/* Conversación */}
  <div className="w-2/3 bg-slate-50 rounded-2xl shadow-xl border border-slate-200 flex flex-col">
    {chatSeleccionado ? (
      <>
        <div className="p-4 border-b border-slate-200 font-semibold text-slate-700 rounded-t-2xl bg-sky-600 text-white shadow-sm">
          {chatSeleccionado.usuario}
        </div>

        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {chatSeleccionado.mensajes.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.remitente === "usuario" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm text-sm ${
                  msg.remitente === "usuario"
                    ? "bg-sky-100 text-slate-800 rounded-br-none border border-sky-200"
                    : "bg-slate-200 text-slate-800 rounded-bl-none border border-slate-300"
                }`}
              >
                {msg.texto}
                <div className="text-xs text-slate-500 mt-1">{msg.hora}</div>
              </div>
            </div>
          ))}
        </div>
      </>
    ) : (
      <div className="flex-1 flex items-center justify-center text-slate-500 italic">
        Selecciona un chat para verlo
      </div>
    )}
  </div>
</div>

  );
};