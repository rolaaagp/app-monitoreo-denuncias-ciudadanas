import CustomButton from "@/components/shared/CustomButton";
import { useToast } from "@/core/context/toastContext";
import { useUser } from "@/core/context/userContext";
import { useLogin } from "@/core/hooks/useUsers";
import { PermisionsStatus } from "@/core/interfaces/locations";
import PermissionsCheckerProvider from "@/presentation/providers/PermissionsCheckerProvider";
import { usePermissionsStore } from "@/presentation/store/usePermissions";
import { formatearRut, validarRut } from "@/utils/validatorsUtils";
import { router, Stack } from "expo-router";
import { ArrowLeft, Eye, EyeOff, User } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginContent = () => {
  const [run, setRun] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ run?: string; password?: string }>({});
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const loginMutation = useLogin();
  const { login } = useUser();
  const { showToast } = useToast();
  const { checkLocationPermission } = usePermissionsStore();

  useEffect(() => {
    if (isLoginSuccess) {
      checkLocationPermission();
    }
  }, [isLoginSuccess]);

  const handleInputChange = (field: "run" | "password", value: string) => {
    if (field === "run") setRun(formatearRut(value));
    else setPassword(value);

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: { run?: string; password?: string } = {};
    if (!run.trim()) newErrors.run = "El RUN es obligatorio.";
    else if (!validarRut(run)) newErrors.run = "El RUN no es válido.";
    if (!password.trim()) newErrors.password = "La contraseña es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validateForm()) return;
    if (loginMutation.isPending) return;

    loginMutation.mutate(
      { run, password },
      {
        onSuccess: async (res) => {
          if (!res.data) {
            showToast({
              title: "",
              message: "Credenciales incorrectas",
              type: "info",
              duration: 3000,
              position: "top",
            });
            return;
          }
          login(res.data);
          setIsLoginSuccess(true);
          await checkLocationPermission();
        },
        onError: (error: Error) => {
          console.error("Error al iniciar sesión:", error);
          showToast({
            title: "",
            message: error.message,
            type: "warning",
            duration: 3000,
            position: "top",
          });
        },
      }
    );
  };

  const handlePermissionChange = (status: PermisionsStatus) => {
    if (!isLoginSuccess || loginMutation.isPending) return;
    if (isLoginSuccess && status === PermisionsStatus.GRANTED)
      router.push("./map");
    else if (status !== PermisionsStatus.CHECKING) router.push("./permissions");
  };

  const inputClass = (field: "run" | "password") =>
    `rounded-lg px-4 py-4 text-base ${
      errors[field]
        ? "border border-red-500 bg-red-50"
        : "bg-gray-100 border border-gray-200"
    }`;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Login",
          headerStyle: { backgroundColor: "#F9FAFB" },
          headerTintColor: "#374151",
          headerLeft: () => (
              <TouchableOpacity onPress={() => router.push("./welcome")} style={{ paddingHorizontal: 16 }}>
                <ArrowLeft size={24} color="#374151" />
              </TouchableOpacity>
            ),
        }}
      />
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center px-4">
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <View className="items-center mb-6">
              <View className="flex-row items-center mb-2">
                <User size={24} color="#6B7280" />
                <Text className="text-2xl font-semibold text-gray-800 ml-2">
                  Identificación
                </Text>
              </View>
              <Text className="text-gray-600 text-center text-lg">
                Ingrese su información personal
              </Text>
            </View>

            <View className="mb-4">
              <View className="flex-row items-center mb-2">
                <Text className="text-gray-700 font-medium text-lg">RUN</Text>
                <Text className="text-red-500 ml-1">*</Text>
              </View>
              <TextInput
                value={run}
                onChangeText={(text) => handleInputChange("run", text)}
                placeholder="Formato: 12345678-9"
                placeholderTextColor="#9CA3AF"
                className={inputClass("run")}
                autoCapitalize="none"
                keyboardType="default"
                maxLength={12}
              />
              {errors.run && (
                <Text className="text-red-500 mt-1">{errors.run}</Text>
              )}
            </View>

            <View className="mb-6">
              <View className="flex-row items-center mb-2">
                <Text className="text-gray-700 font-medium text-lg">
                  Contraseña
                </Text>
                <Text className="text-red-500 ml-1">*</Text>
              </View>
              <View className="relative">
                <TextInput
                  value={password}
                  onChangeText={(text) => handleInputChange("password", text)}
                  secureTextEntry={!showPassword}
                  placeholder="Ingrese su contraseña"
                  placeholderTextColor="#9CA3AF"
                  className={inputClass("password") + " pr-12"}
                />
                <TouchableOpacity
                  className="absolute right-4 top-4"
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <Eye size={20} color="#6B7280" />
                  ) : (
                    <EyeOff size={20} color="#6B7280" />
                  )}
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500 mt-1">{errors.password}</Text>
              )}
            </View>

            <CustomButton
              onPress={handleLogin}
              variant="primary"
              size="lg"
              fullWidth
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Verificando..." : "Continuar"}
            </CustomButton>
          </View>
        </View>
      </SafeAreaView>

      <PermissionsCheckerProvider
        autoNavigate={false}
        checkOnMount={false}
        onPermissionChange={handlePermissionChange}
      >
        <></>
      </PermissionsCheckerProvider>
    </>
  );
};

const LoginScreen = () => <LoginContent />;

export default LoginScreen;
