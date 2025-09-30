import React from "react";
import { type Mensaje } from "../interfaces/Mensajes";
import { formatHora } from "../utils/Formatters";

interface Props {
  msg: Mensaje;
}

export const MessageBubble: React.FC<Props> = ({ msg }) => {
  return (
    <div className={`flex ${msg.remitente === "usuario" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] md:max-w-xs px-4 py-3 rounded-2xl shadow-sm text-sm ${
          msg.remitente === "usuario"
            ? "bg-sky-100 text-slate-800 rounded-br-none border border-sky-200"
            : "bg-slate-200 text-slate-800 rounded-bl-none border border-slate-300"
        }`}
      >
        {msg.texto}
        <div className="text-xs text-slate-500 mt-1">{formatHora(msg.hora)}</div>
      </div>
    </div>
  );
};
