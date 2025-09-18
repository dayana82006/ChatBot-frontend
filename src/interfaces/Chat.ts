import type { Mensaje } from "./Mensajes";

export interface ChatProps {
    id: string;
    usuario: string;
    ultimoMensaje: string;
    hora: string;
    mensajes: Mensaje[];
}