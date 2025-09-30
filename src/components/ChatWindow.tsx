import React from "react";
import { type ChatProps } from "../interfaces/Chat";
import { formatFecha } from "../utils/Formatters";
import { MessageBubble } from "./Mensaje";
import { Scroll } from "./Scroll";

interface Props {
  chat: ChatProps | null;
  onBack: () => void;
}

export const ChatWindow: React.FC<Props> = ({ chat, onBack }) => {
  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-500 italic">
        Selecciona un chat para verlo
      </div>
    );
  }

  let fechaActual = "";

  return (
    <>
      <div className="flex items-center justify-between p-4 border-b border-slate-200 font-semibold text-slate-700 rounded-t-2xl bg-sky-600 text-white shadow-sm">
        <button
          className="md:hidden text-white text-sm px-3 py-1 bg-sky-500 rounded-lg shadow"
          onClick={onBack}
        >
          ← Volver
        </button>
        <span>{chat.usuario}</span>
        <div className="w-12 md:w-0" />
      </div>

      <Scroll className="flex-1 p-3 md:p-6 space-y-4">
        {chat.mensajes.map((msg) => {
          const fechaMsg = formatFecha(msg.hora);
          const mostrarFecha = fechaMsg !== fechaActual;
          fechaActual = fechaMsg;

          return (
            <React.Fragment key={msg.id}>
              {mostrarFecha && (
                <div className="text-center text-xs text-slate-500 my-2">
                  {fechaMsg}
                </div>
              )}
              <MessageBubble msg={msg} />
            </React.Fragment>
          );
        })}
      </Scroll>
    </>
  );
};
