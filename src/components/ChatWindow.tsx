import React, { useEffect, useRef } from "react";
import { type ChatDetalle } from "../interfaces/ChatDetalle";

type Props = {
  chat: ChatDetalle | null;
  onBack: () => void;
};

export const ChatWindow: React.FC<Props> = ({ chat, onBack }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat?.mensajes]);

  if (!chat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Selecciona un chat
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b flex items-center justify-between bg-white shadow-sm">
        <button
          className="md:hidden text-sky-600 font-semibold hover:text-sky-700 transition-colors"
          onClick={onBack}
        >
          ← Volver
        </button>
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-gray-700">{chat.usuario}</h2>
          <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded">
            {chat.channel}
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {chat.mensajes.map((m) => (
        <div
          key={`${m.texto}-${m.hora}-${Math.random()}`}
          className={`flex ${m.remitente === "usuario" ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
              m.remitente === "usuario"
                ? "bg-[#161717] text-white"
                : "bg-[#144D37] text-white"
            }`}
          >
            <p className="whitespace-pre-wrap">{m.texto}</p>
            <span className="block text-xs text-gray-200 mt-1 text-right">
              {m.hora}
            </span>
          </div>
        </div>
      ))}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
