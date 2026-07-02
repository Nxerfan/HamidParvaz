"use client";

import { useToastContext } from "../../components/Toast/ToastProvider";

interface ToastOptions {
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useToast() {
  const { addToast } = useToastContext();

  return {
    success: (message: string, options?: ToastOptions) =>
      addToast("success", message, options),
    error: (message: string, options?: ToastOptions) =>
      addToast("error", message, options),
    warning: (message: string, options?: ToastOptions) =>
      addToast("warning", message, options),
    info: (message: string, options?: ToastOptions) =>
      addToast("info", message, options),
  };
}
