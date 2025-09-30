export interface ChatProps {
  id: string;            
  usuario: string;       
  ultimoMensaje: string;  
  hora: string;          
  canal?: string;          
  totalMensajes?: number;  
}