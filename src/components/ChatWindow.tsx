import React from "react";
import { type ChatDetalle } from "../interfaces/ChatDetalle";

type Props = {
  chat: ChatDetalle | null;
  onBack: () => void;
};

export const ChatWindow: React.FC<Props> = ({ chat, onBack }) => {
  if (!chat) return <div className="flex items-center justify-center h-full text-gray-500">Selecciona un chat</div>;

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b flex items-center justify-between">
        <button
          className="md:hidden text-sky-600 font-semibold"
          onClick={onBack}
        >
          ← Volver
        </button>
        <h2 className="font-semibold text-gray-700">{chat.usuario}</h2>
      </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {chat.mensajes.length === 0 ? (
            <p className="text-center text-gray-400 text-sm">No hay mensajes todavía</p>
        ) : (
            chat.mensajes.map((m) => (
            <div
                key={m.id}
                className={`max-w-[70%] p-2 rounded-lg ${
                m.remitente === "usuario"
                    ? "bg-[#161717] text-white self-start"
                    : "bg-[#FF0000] text-gray-700 self-end ml-auto"
                }`}
            >
                <p>{m.texto}</p>
                <span className="block text-xs text-black text-right">
                {m.hora}
                </span>
            </div>
            ))
        )}
        </div>
    </div>
  );
};
