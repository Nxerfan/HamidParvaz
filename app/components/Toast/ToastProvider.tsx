"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import ToastContainer from "./ToastContainer";

export interface ToastItemData {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toasts: ToastItemData[];
  dismiss: (id: string) => void;
  addToast: (
    type: ToastItemData["type"],
    message: string,
    options?: ToastOptions,
  ) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToastContext must be used within ToastProvider");
  return ctx;
}

let toastId = 0;

export default function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItemData[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (type: ToastItemData["type"], message: string, options?: ToastOptions) => {
      const id = `toast_${++toastId}_${Date.now()}`;
      setToasts((prev) => [...prev, { id, type, message, ...options }]);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toasts, dismiss, addToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}
