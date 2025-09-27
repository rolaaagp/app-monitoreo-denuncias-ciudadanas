import { ToastContainer } from "@/components/shared/ToastContainer";
import { UserProvider } from "@/core/context/userContext";
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
          <UserProvider>
          <Stack />
          <ToastContainer />
          </UserProvider>
        </ToastProvider>
      </QueryClientProvider>
      // </PermissionsCheckerProvider>
  );
}