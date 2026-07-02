"use client";

import { useToastContext } from "./ToastProvider";
import ToastItem from "./ToastItem";
import styles from "./Toast.module.css";

export default function ToastContainer() {
  const { toasts, dismiss } = useToastContext();

  return (
    <div className={styles.toastContainer} aria-label="اعلان‌ها">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>
  );
}
