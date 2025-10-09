import { useEffect, useRef, useState, useCallback } from "react";
import { type WebSocketMessage } from "../interfaces/ChatDetalle";

interface UseWebSocketProps {
  userId?: string;
  isAdmin?: boolean;
  onMessage?: (message: WebSocketMessage) => void;
}

export const useWebSocket = ({ userId, isAdmin = false, onMessage }: UseWebSocketProps) => {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 10;
  
  // Mantener referencia estable de onMessage
  const onMessageRef = useRef(onMessage);
  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  const connect = useCallback(() => {
    // Limpiar timeout de reconexión previo
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Cerrar conexión previa si existe
    if (wsRef.current?.readyState === WebSocket.OPEN || 
        wsRef.current?.readyState === WebSocket.CONNECTING) {
      wsRef.current.close();
    }

    // Construir URL según el tipo de usuario
    const wsUrl = isAdmin
      ? `ws://localhost:8000/ws?is_admin=true`
      : userId
      ? `ws://localhost:8000/ws?user_id=${userId}`
      : null;

    if (!wsUrl) {
      console.warn("⚠️ No se puede conectar: falta userId o isAdmin");
      return;
    }

    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("✅ WebSocket conectado exitosamente");
        setIsConnected(true);
        reconnectAttemptsRef.current = 0; // Reset contador de reconexiones
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          onMessageRef.current?.(message);
        } catch (error) {
          console.error("❌ Error parseando mensaje:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("❌ Error en WebSocket:", error);
      };

      ws.onclose = (event) => {
        console.log("🔌 WebSocket desconectado", event.code, event.reason);
        setIsConnected(false);
        wsRef.current = null;

        // Intentar reconectar si no se excede el límite
        if (reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
          reconnectAttemptsRef.current++;
          
          console.log(`🔄 Reconectando en ${delay/1000}s (intento ${reconnectAttemptsRef.current}/${maxReconnectAttempts})...`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, delay);
        } else {
          console.error("❌ Máximo de intentos de reconexión alcanzado");
        }
      };

      wsRef.current = ws;
    } catch (error) {
      console.error("❌ Error creando WebSocket:", error);
    }
  }, [userId, isAdmin]);

  // Función para enviar mensajes
  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(message));
      return true;
    } else {
      console.warn("⚠️ WebSocket no está conectado. No se puede enviar mensaje.");
      return false;
    }
  }, []);

  // Función para reconectar manualmente
  const reconnect = useCallback(() => {
    reconnectAttemptsRef.current = 0;
    connect();
  }, [connect]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [connect]);

  return { 
    isConnected, 
    sendMessage, 
    reconnect 
  };
};