
import type { Mensaje } from "./Mensajes";
import { type ChatProps } from "./Chat";

export interface ChatDetalle extends ChatProps {
  canal: string;
  totalMensajes: number;
  mensajes: Mensaje[];
}
