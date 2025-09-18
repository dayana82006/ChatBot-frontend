export interface Mensaje {
    id: string;
    remitente: "usuario" | "asistente";
    texto: string;
    hora: string;
}