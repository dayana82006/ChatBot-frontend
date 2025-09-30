import React, { useEffect, useState } from "react";
import { getMessages } from "../../api/mensajes/mensajesApi";
import { type ChatListItem } from "../../interfaces/ChatList";
import { type ChatDetalle } from "../../interfaces/ChatDetalle";
import { ChatList } from "../../components/ChatList";
import { ChatWindow } from "../../components/ChatWindow";
import { Scroll } from "../../components/Scroll";

export const Dashboard: React.FC = () => {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [chatSeleccionado, setChatSeleccionado] = useState<ChatDetalle | null>(null);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMessages()
      .then((data) => {
        const chatsAdaptados: ChatListItem[] = data.items.map((chat, index) => ({
          id: chat.user_id ?? String(index),
          usuario: chat.user_id ?? "Usuario desconocido",
          ultimoMensaje: chat.last_message ?? "",
          hora: chat.updated_at ?? new Date().toISOString(),
        }));
        setChats(chatsAdaptados);
      })
      .catch((err) => console.error("Error cargando chats:", err))
      .finally(() => setLoading(false));
  }, []);

  const chatsFiltrados = chats.filter(
    (chat) =>
      chat.usuario?.toLowerCase().includes(filtro.toLowerCase()) ||
      chat.ultimoMensaje?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col md:flex-row font-sans bg-slate-100 p-2 md:p-6 gap-2 md:gap-6">
      <div
        className={`${
          chatSeleccionado ? "hidden md:flex" : "flex"
        } w-full md:w-1/3 bg-slate-50 rounded-2xl shadow-xl border border-slate-200 flex-col`}
      >
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

        <Scroll className="flex-1 px-4 pb-4">
          {loading ? (
            <div className="text-center text-slate-500">Cargando chats...</div>
          ) : chatsFiltrados.length > 0 ? (
            <ChatList
              chats={chatsFiltrados}
              chatSeleccionado={chatSeleccionado}
              onSelect={(chat) =>
                setChatSeleccionado({
                  ...chat,
                  canal: chat.canal ?? "general", 
                  totalMensajes: chat.totalMensajes ?? 0,
                  mensajes: [],
                })
              }
            />
          ) : (
            <div className="text-center text-slate-400">No hay chats</div>
          )}
        </Scroll>
      </div>

      <div
        className={`${
          chatSeleccionado ? "flex" : "hidden md:flex"
        } w-full md:w-2/3 bg-slate-50 rounded-2xl shadow-xl border border-slate-200 flex-col`}
      >
        <ChatWindow chat={chatSeleccionado} onBack={() => setChatSeleccionado(null)} />
      </div>
    </div>
  );
};
