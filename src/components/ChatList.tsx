import React from "react";
import { type ChatProps } from "../interfaces/Chat";
import { formatHora } from "../utils/Formatters";

interface Props {
  chats: ChatProps[];
  chatSeleccionado: ChatProps | null;
  onSelect: (chat: ChatProps) => void;
}

export const ChatList: React.FC<Props> = ({ chats, chatSeleccionado, onSelect }) => (
  <ul className="space-y-3">
    {chats.map((chat) => (
      <li
        key={chat.id}
        className={`p-3 rounded-xl shadow-sm cursor-pointer transition-all border ${
          chatSeleccionado?.id === chat.id
            ? "bg-sky-100 border-sky-300 shadow-md"
            : "bg-slate-100 border-slate-200 hover:shadow-md hover:bg-sky-50"
        }`}
        onClick={() => onSelect(chat)}
      >
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-slate-800">{chat.usuario}</span>
          <span className="text-xs text-slate-500">{formatHora(chat.hora)}</span>
        </div>
        <p className="text-sm text-slate-600 truncate">{chat.ultimoMensaje}</p>
      </li>
    ))}
  </ul>
);
