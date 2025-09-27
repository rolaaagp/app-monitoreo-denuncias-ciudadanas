import { ToastContainer } from "@/components/shared/ToastContainer";
import { ToastProvider } from "@/core/providers/toastProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import "./global.css";
// import PermissionsCheckerProvider from "@/presentation/providers/PermissionsCheckerProvider";
const queryClient = new QueryClient();
export default function RootLayout() {
  return (
    // <PermissionsCheckerProvider>
      <QueryClientProvider client={queryClient}>
        <ToastProvider>
          <Stack />
          <ToastContainer />
        </ToastProvider>
      </QueryClientProvider>
      // </PermissionsCheckerProvider>
  );
}
