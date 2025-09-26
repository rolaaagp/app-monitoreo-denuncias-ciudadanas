export interface ToastConfig {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
  position?: "top" | "bottom";
}

export interface ToastContextType {
  toasts: ToastConfig[];
  showToast: (config: Omit<ToastConfig, "id">) => void;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}
