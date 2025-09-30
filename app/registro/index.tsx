import CustomButton from "@/components/shared/CustomButton";
import { PROFILES } from "@/constants";
import { useToast } from "@/core/context/toastContext";
import { useUser } from "@/core/context/userContext";
import { useCreateUser } from "@/core/hooks/useUsers";
import { PayloadCreateUser } from "@/core/interfaces";
import { formatearRut } from "@/utils/validatorsUtils";
import { router, Stack } from "expo-router";
import { ArrowLeft, EyeOff, User } from "lucide-react-native";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegistroScreen = () => {
  const { showToast } = useToast();
  const createUserMutation = useCreateUser();
  const { login } = useUser();

  const [formData, setFormData] = useState<PayloadCreateUser>({
    run: "",
    fullname: "",
    telefono: "",
    password: "",
    perfiles_id: PROFILES.CIUDADANO_ID,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.run.trim()) newErrors.run = "El RUN es obligatorio.";
    if (!formData.fullname.trim())
      newErrors.fullname = "El nombre completo es obligatorio.";
    if (!formData.telefono.trim())
      newErrors.telefono = "El celular es obligatorio.";
    if (!formData.password.trim())
      newErrors.password = "La contraseña es obligatoria.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (createUserMutation.isPending) return;

    createUserMutation.mutate(formData, {
      onSuccess: (res) => {
        const { user, user_exists } = res.data;

        if (user_exists) {
          setErrors((prev) => ({
            ...prev,
            run: "El RUN ya se encuentra registrado.",
          }));
          showToast({
            title: "",
            message: "El RUN ya se encuentra registrado",
            type: "info",
            duration: 3000,
            position: "top",
          });
          return;
        }

        if (user) {
          login(user);
          setTimeout(() => router.push("./map"), 1000);

          showToast({
            title: "Registro exitoso",
            message: "Tu cuenta ha sido creada correctamente",
            type: "success",
            duration: 3000,
            position: "top",
          });
        }
      },
      onError: (error) => {
        console.error("Error creando usuario:", error);
        showToast({
          title: "Error",
          message: "No se pudo registrar el usuario. Intenta de nuevo",
          type: "warning",
          duration: 3000,
          position: "top",
        });
      },
    });
  };

  const inputClass = (field: string) =>
    `rounded-lg px-4 py-4 text-base ${
      errors[field]
        ? "border border-red-500 bg-red-50"
        : "bg-gray-100 border border-gray-200"
    }`;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Registro",
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
                Todos los campos son obligatorios
              </Text>
            </View>

            <View className="mb-4">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{ color: "#374151", fontSize: 18, fontWeight: "500" }}
                >
                  RUN
                </Text>
                <Text style={{ color: "#EF4444", marginLeft: 4 }}>*</Text>
              </View>
              <TextInput
                value={formData.run}
                onChangeText={(text) => {
                  const formatted = formatearRut(text);
                  handleInputChange("run", formatted);
                }}
                placeholder="Formato: 12.345.678-9"
                placeholderTextColor="#9CA3AF"
                className={inputClass("run")}
                autoCapitalize="none"
                maxLength={10}
              />
              {errors.run && (
                <Text className="text-red-500 mt-1">{errors.run}</Text>
              )}
            </View>

            <View className="mb-4">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{ color: "#374151", fontSize: 18, fontWeight: "500" }}
                >
                  Nombre Completo
                </Text>
                <Text style={{ color: "#EF4444", marginLeft: 4 }}>*</Text>
              </View>
              <TextInput
                value={formData.fullname}
                onChangeText={(text) => handleInputChange("fullname", text)}
                placeholder="Ingrese su nombre completo"
                placeholderTextColor="#9CA3AF"
                className={inputClass("fullname")}
                autoCapitalize="words"
              />
              {errors.fullname && (
                <Text className="text-red-500 mt-1">{errors.fullname}</Text>
              )}
            </View>

            <View className="mb-4">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{ color: "#374151", fontSize: 18, fontWeight: "500" }}
                >
                  Celular
                </Text>
                <Text style={{ color: "#EF4444", marginLeft: 4 }}>*</Text>
              </View>
              <TextInput
                value={formData.telefono}
                onChangeText={(text) => handleInputChange("telefono", text)}
                placeholder="Ingrese número de celular"
                placeholderTextColor="#9CA3AF"
                className={inputClass("telefono")}
                keyboardType="phone-pad"
                maxLength={15}
              />
              {errors.telefono && (
                <Text className="text-red-500 mt-1">{errors.telefono}</Text>
              )}
            </View>

            <View className="mb-6">
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{ color: "#374151", fontSize: 18, fontWeight: "500" }}
                >
                  Contraseña
                </Text>
                <Text style={{ color: "#EF4444", marginLeft: 4 }}>*</Text>
              </View>
              <View className="relative">
                <TextInput
                  value={formData.password}
                  onChangeText={(text) => handleInputChange("password", text)}
                  secureTextEntry={!showPassword}
                  placeholder="Crea una contraseña"
                  placeholderTextColor="#9CA3AF"
                  className={inputClass("password") + " pr-12"}
                />
                <TouchableOpacity
                  className="absolute right-4 top-4"
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  <EyeOff size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text className="text-red-500 mt-1">{errors.password}</Text>
              )}
            </View>

            <CustomButton
              onPress={handleSubmit}
              variant="primary"
              size="lg"
              fullWidth
              disabled={createUserMutation.isPending}
            >
              {createUserMutation.isPending ? "Creando..." : "Continuar"}
            </CustomButton>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default RegistroScreen;
