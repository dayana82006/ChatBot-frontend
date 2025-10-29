import React, { useEffect, useState } from "react";
import { getChatDetalle, getMessages, getUserOrders } from "../../api/mensajes/mensajesApi";
import { type ChatListItem } from "../../interfaces/ChatList";
import { type ChatDetalle, type WebSocketMessage } from "../../interfaces/ChatDetalle";
import { type Mensaje } from "../../interfaces/Mensajes";
import { ChatList } from "../../components/ChatList";
import { ChatWindow } from "../../components/ChatWindow";
import { Scroll } from "../../components/Scroll";
import { useWebSocket } from "../../hooks/useWebsockets";

export const Dashboard: React.FC = () => {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const [chatSeleccionado, setChatSeleccionado] = useState<ChatDetalle | null>(null);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"mysql" | "redis">("mysql");
  const [userOrders, setUserOrders] = useState<any[]>([]);

  // 🔥 INTEGRACIÓN DEL WEBSOCKET PARA ADMIN
  const { isConnected, sendMessage: sendWsMessage } = useWebSocket({
    isAdmin: true,
    onMessage: (wsMessage: WebSocketMessage) => {
      handleWebSocketMessage(wsMessage);
    },
  });

  // 🎯 Función que procesa los mensajes del WebSocket
  const handleWebSocketMessage = (wsMessage: WebSocketMessage) => {
    // Ignorar pings del servidor
    if (wsMessage.type === "ping") {
      return;
    }

    // Extraer datos del mensaje
    const messageData = wsMessage.data || wsMessage;
    const userId = messageData.user_id;
    const texto = messageData.text || messageData.content || "";
    const role = messageData.role || "user";
    const timestamp = messageData.timestamp || new Date().toISOString();

    // Crear el nuevo mensaje en el formato correcto
    const nuevoMensaje: Mensaje = {
      id: String(Date.now()),
      remitente: role === "user" ? "usuario" : "asistente",
      texto: texto,
      hora: timestamp,
    };

    // 1️⃣ Si el chat está abierto, agregar el mensaje automáticamente
    if (chatSeleccionado && userId === chatSeleccionado.usuario) {
      setChatSeleccionado((prev) => {
        if (!prev) return prev;
        
        // 🔥 EVITAR DUPLICADOS: Verificar si el mensaje ya existe
        const mensajeExiste = prev.mensajes.some(
          (m) => m.texto === nuevoMensaje.texto && 
                 m.remitente === nuevoMensaje.remitente &&
                 Math.abs(new Date(m.hora).getTime() - new Date(nuevoMensaje.hora).getTime()) < 2000
        );
        
        if (mensajeExiste) {
          return prev;
        }
        
        return {
          ...prev,
          mensajes: [...prev.mensajes, nuevoMensaje],
          ultimoMensaje: nuevoMensaje.texto,
          hora: nuevoMensaje.hora,
          totalMensajes: prev.totalMensajes + 1,
        };
      });
    }

    // 2️⃣ Actualizar la lista de chats
    setChats((prevChats) => {
      const chatIndex = prevChats.findIndex((c) => c.usuario === userId);

      if (chatIndex !== -1) {
        // El chat ya existe, actualizarlo
        const updatedChats = [...prevChats];
        updatedChats[chatIndex] = {
          ...updatedChats[chatIndex],
          ultimoMensaje: nuevoMensaje.texto,
          hora: nuevoMensaje.hora,
        };

        // Mover el chat actualizado al inicio
        const [movedChat] = updatedChats.splice(chatIndex, 1);
        return [movedChat, ...updatedChats];
      } else {
        // Es un chat nuevo, agregarlo al inicio
        const newChat: ChatListItem = {
          id: userId ?? "Usuario desconocido",
          usuario: userId ?? "Usuario desconocido",
          ultimoMensaje: nuevoMensaje.texto,
          hora: nuevoMensaje.hora,
          canal: messageData.channel || "web",
        };
        return [newChat, ...prevChats];
      }
    });
  };

  // Cargar chats iniciales
  useEffect(() => {
    getMessages()
      .then((data) => {
        console.log("📋 Chats cargados:", data);
        const chatsAdaptados: ChatListItem[] = data.items.map((chat, index) => ({
          id: chat.user_id ?? String(index),
          usuario: chat.user_id ?? "Usuario desconocido",
          ultimoMensaje: chat.last_message ?? "",
          hora: chat.updated_at ?? new Date().toISOString(),
          canal: chat.channel ?? "general",
        }));
        setChats(chatsAdaptados);
      })
      .catch((err) => console.error("❌ Error cargando chats:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleSelectChat = async (chat: ChatListItem) => {
    try {
      // Siempre cargar desde MySQL para tener el historial completo persistente
      const detalle = await getChatDetalle(chat.usuario, chat.canal ?? "web", "mysql");
      console.log("✅ Detalle cargado desde MySQL:", detalle);
      setChatSeleccionado(detalle);
      
      // Cargar órdenes del usuario
      try {
        const orders = await getUserOrders(chat.usuario);
        setUserOrders(orders.orders || []);
      } catch (orderErr) {
        console.error("❌ Error cargando órdenes:", orderErr);
        setUserOrders([]);
      }
    } catch (err) {
      console.error("❌ Error cargando detalle del chat:", err);
      // Fallback a Redis si MySQL falla
      try {
        const detalleRedis = await getChatDetalle(chat.usuario, chat.canal ?? "web", "redis");
        console.log("✅ Detalle cargado desde Redis (fallback):", detalleRedis);
        setChatSeleccionado(detalleRedis);
      } catch (redisErr) {
        console.error("❌ Error cargando desde Redis también:", redisErr);
      }
    }
  };

  const chatsFiltrados = chats.filter(
    (chat) =>
      chat.usuario?.toLowerCase().includes(filtro.toLowerCase()) ||
      chat.ultimoMensaje?.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col md:flex-row font-sans bg-[#161717] p-2 md:p-6 gap-2 md:gap-6">
      <div
        className={`${
          chatSeleccionado ? "hidden md:flex" : "flex"
        } w-full md:w-1/3 bg-slate-50 rounded-2xl shadow-xl border border-slate-200 flex-col`}
      >
        <div className="p-4 border-b border-slate-200 font-semibold text-slate-700 rounded-t-2xl bg-[#144D37] text-white shadow-sm">
          <div className="flex items-center justify-between">
            <span>Chats</span>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-green-400" : "bg-red-400"
                }`}
                title={isConnected ? "Conectado" : "Desconectado"}
              />
              <span className="text-xs">
                {isConnected ? "En línea" : "Desconectado"}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex gap-4 mb-3">
            <input
              type="text"
              className="flex-1 px-4 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-400 text-sm"
              placeholder="Buscar chats..."
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
          </div>
        </div>

        <Scroll className="flex-1 px-4 pb-4">
          {loading ? (
            <div className="text-center text-slate-500">Cargando chats...</div>
          ) : chatsFiltrados.length > 0 ? (
            <ChatList
              chats={chatsFiltrados}
              chatSeleccionado={
                chatSeleccionado
                  ? {
                      id: String(chatSeleccionado.id),
                      usuario: chatSeleccionado.usuario,
                      ultimoMensaje: chatSeleccionado.ultimoMensaje,
                      hora: chatSeleccionado.hora,
                      canal: chatSeleccionado.canal,
                    }
                  : null
              }
              onSelect={handleSelectChat}
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
        <ChatWindow 
          chat={chatSeleccionado} 
          orders={userOrders}
          onBack={() => {
            setChatSeleccionado(null);
            setUserOrders([]);
          }} 
        />
      </div>
    </div>
  );
};