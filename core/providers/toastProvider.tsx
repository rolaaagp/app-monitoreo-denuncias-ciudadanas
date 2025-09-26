import { ToastContext } from "@core/context/toastContext";
import { ToastConfig } from "@core/interfaces/toast.interface";
import React, { ReactNode, useState } from "react";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  const generateId = () =>
    `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

  const showToast = (config: Omit<ToastConfig, "id">) => {
    const id = generateId();
    const toast: ToastConfig = {
      id,
      duration: 4000,
      position: "top",
      ...config,
    };
    setToasts((prev) => [...prev, toast]);
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => hideToast(id), toast.duration);
    }
  };

  const hideToast = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  const clearAllToasts = () => setToasts([]);

  return (
    <ToastContext.Provider
      value={{ toasts, showToast, hideToast, clearAllToasts }}
    >
      {children}
    </ToastContext.Provider>
  );
};
