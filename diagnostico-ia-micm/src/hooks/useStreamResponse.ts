"use client";

import { useState, useCallback } from "react";

interface UseStreamResponseReturn {
  content: string;
  isStreaming: boolean;
  error: string | null;
  startStream: (url: string) => Promise<void>;
}

export function useStreamResponse(): UseStreamResponseReturn {
  const [content, setContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startStream = useCallback(async (url: string) => {
    setContent("");
    setIsStreaming(true);
    setError(null);

    try {
      const response = await fetch(url, { method: "POST" });

      // If it's JSON (cached roadmap), handle directly
      const contentType = response.headers.get("content-type");
      if (contentType?.includes("application/json")) {
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setContent(data.content);
        setIsStreaming(false);
        return;
      }

      if (!response.ok) {
        throw new Error("Error al generar la hoja de ruta");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No se pudo leer la respuesta");

      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setContent(accumulated);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error desconocido"
      );
    } finally {
      setIsStreaming(false);
    }
  }, []);

  return { content, isStreaming, error, startStream };
}
