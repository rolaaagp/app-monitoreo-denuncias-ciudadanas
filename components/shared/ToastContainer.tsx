import { useToast } from "@core/context/toastContext";
import React, { useEffect, useState } from "react";
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export const ToastContainer = () => {
  const { toasts, hideToast } = useToast();
  const [fadeAnims] = useState<Record<string, Animated.Value>>({});

  useEffect(() => {
    toasts.forEach((toast) => {
      if (!fadeAnims[toast.id]) {
        fadeAnims[toast.id] = new Animated.Value(0);
        Animated.timing(fadeAnims[toast.id], {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    });
  }, [toasts]);

  const handleClose = (id: string) => {
    Animated.timing(fadeAnims[id], {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => hideToast(id));
  };

  return (
    <View style={styles.container}>
      {toasts.map((toast) => (
        <Animated.View
          key={toast.id}
          style={[
            styles.toast,
            toast.type === "success" && styles.success,
            toast.type === "error" && styles.error,
            toast.type === "warning" && styles.warning,
            toast.type === "info" && styles.info,
            { opacity: fadeAnims[toast.id] || 1 },
          ]}
        >
          <Text style={styles.title}>{toast.title}</Text>
          {toast.message && <Text style={styles.message}>{toast.message}</Text>}
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => handleClose(toast.id)}
          >
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 1000,
    width: "auto",
  },
  toast: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    minWidth: 250,
    maxWidth: 350,
    backgroundColor: "#333",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    position: "relative",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 2,
  },
  message: {
    color: "#fff",
  },
  closeBtn: {
    position: "absolute",
    top: 4,
    right: 6,
    padding: 4,
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  success: { backgroundColor: "#22c55e" },
  error: { backgroundColor: "#ef4444" },
  warning: { backgroundColor: "#facc15" },
  info: { backgroundColor: "#3B82F6" },
});
