"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./Toast.module.css";

export type ToastType = "success" | "error" | "warning" | "info";

export interface ToastItemData {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastItemProps {
  toast: ToastItemData;
  onDismiss: (id: string) => void;
}

const icons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
  warning: "!",
  info: "i",
};

export default function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false);
  const duration = toast.duration ?? 5000;

  const handleDismiss = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => onDismiss(toast.id), 350);
  }, [onDismiss, toast.id]);

  useEffect(() => {
    const timer = setTimeout(handleDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, handleDismiss]);

  const typeClass =
    toast.type === "success"
      ? styles.toastSuccess
      : toast.type === "error"
        ? styles.toastError
        : toast.type === "warning"
          ? styles.toastWarning
          : styles.toastInfo;

  return (
    <div
      className={`${styles.toast} ${typeClass} ${isExiting ? styles.toastExiting : ""}`}
      role="alert"
      aria-live="assertive"
    >
      <div className={styles.toastIcon}>{icons[toast.type]}</div>
      <div className={styles.toastContent}>
        <span className={styles.toastMessage}>{toast.message}</span>
        {toast.action && (
          <button
            className={styles.toastAction}
            onClick={() => {
              toast.action!.onClick();
              handleDismiss();
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        className={styles.toastClose}
        onClick={handleDismiss}
        aria-label="بستن"
      >
        ✕
      </button>
      <div
        className={styles.toastProgress}
        style={{ animationDuration: `${duration}ms` }}
      />
    </div>
  );
}
