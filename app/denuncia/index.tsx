import CompleteEvidenceUploader, {
  FileAttachment,
} from "@/components/CompleteEvidenceUploader";
import ConfirmationModal from "@/components/ConfirmationModal";
import CustomButton from "@/components/shared/CustomButton";
import FechaHoraSimple from "@/components/shared/FechaHoraSimple";
import { useToast } from "@/core/context/toastContext";
import { useCreateDenuncia } from "@/core/hooks/useDenuncias";
import { PayloadCreateDenuncia } from "@/core/interfaces";
import { processEvidenceFiles } from "@/utils/filesUtils";
import { router, Stack } from "expo-router";
import { AlertCircle, FileText, MapPin } from "lucide-react-native";
import React, { useState } from "react";
import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenDenuncia = () => {
  const [showModal, setShowModal] = useState(false);
  const [fechaHora, setFechaHora] = useState<Date | null>(null);
  const [evidenceFiles, setEvidenceFiles] = useState<FileAttachment[]>([]);
  const [formData, setFormData] = useState({
    categoria: "",
    subcategoria: "",
    ubicacion: "",
    descripcion: "",
  });

  const createMutation = useCreateDenuncia();

  const { showToast } = useToast();

  const validateForm = () => {
    if (!formData.ubicacion.trim()) {
      Alert.alert("Error", "La ubicación es obligatoria.");
      return false;
    }
    if (!formData.descripcion.trim()) {
      Alert.alert("Error", "La descripción es obligatoria.");
      return false;
    }
    if (!fechaHora) {
      Alert.alert("Error", "La fecha y hora del incidente es obligatoria.");
      return false;
    }
    return true;
  };

  const handleConfirmSubmit = async () => {
    setShowModal(false);

    const evidencias = await processEvidenceFiles(evidenceFiles);

    const payload: PayloadCreateDenuncia = {
      ubicacion: formData.ubicacion,
      detalle: formData.descripcion,
      fecha_completa: fechaHora?.toISOString() || new Date().toISOString(),
      user_id: 1,
      tipo_denuncia: 1,
      requerimiento_id: 1,
      evidencias,
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        showToast({
          title: "Denuncia Enviada",
          message: "Su denuncia ha sido registrada exitosamente",
          position: "top",
          type: "success",
          duration: 3000,
        });

        setTimeout(() => {
          router.push("/map");
        }, 1000);

        // Alert.alert(
        //   "Denuncia Enviada",
        //   "Su denuncia ha sido registrada exitosamente",
        //   [
        //     {
        //       text: "OK",
        //       onPress: () => router.push("/map"),
        //     },
        //   ]
        // );
      },
      onError: (error:any) => {
        showToast({
          title: "¡Ups! Algo salió mal",
          message: "No te preocupes, puedes intentarlo de nuevo en un momento",
          position: "top",
          type: "warning",
          duration: 3000,
        });
        console.error("Error creando denuncia:", error);
        Alert.alert(
          "Error",
          "No se pudo registrar la denuncia. Intente nuevamente."
        );
      },
    });
  };

  const handleSubmit = () => {
    if (!validateForm()) {
        return;
    }
    if (createMutation.isPending) {
      return;
    }
    setShowModal(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Denuncia",
          headerStyle: { backgroundColor: "#F9FAFB" },
          headerTintColor: "#374151",
        }}
      />

      <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Info Section */}
          <View className="mx-4 mt-6 mb-6">
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <View className="flex-row items-start mb-4 ">
                <View className="w-6 h-6 rounded-full  items-center justify-center mr-3 mt-1">
                  <AlertCircle size={25} color="#38BDF8" />
                </View>
                <View className="flex-1">
                  <Text className="text-xl font-semibold text-gray-900 mb-1">
                    Denuncias
                  </Text>
                  <Text className="text-lg text-gray-600 leading-5">
                    Su información personal solo será utilizada para el
                    seguimiento de la incidencia y posibles contactos.
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className="mx-4">
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <View className="flex-row items-center mb-4">
                <FileText size={22} color="#374151" />
                <Text className="text-xl font-semibold text-gray-900 ml-2">
                  Información de la denuncia
                </Text>
              </View>

              <Text className="text-lg text-gray-600 mb-6">
                Todos los campos son obligatorios
              </Text>

              <View className="mb-4">
                <View className="flex-row items-center mb-2">
                  <MapPin size={20} color="#6B7280" />
                  <Text className="text-gray-700 font-medium ml-1 text-lg">
                    Ubicación <Text className="text-red-500">*</Text>
                  </Text>
                </View>
                <TextInput
                  value={formData.ubicacion}
                  onChangeText={(text) => handleInputChange("ubicacion", text)}
                  placeholder="Ingrese dirección o ubicación"
                  className="bg-gray-100 rounded-lg px-4 py-4 text-base"
                />
                <Text className="text-base text-gray-500 mt-1">
                  Ejemplo: Av. Principal 123, Centro, Ciudad
                </Text>
              </View>

              <View className="mb-4">
                <View className="flex-row items-center mb-2">
                  <FileText size={20} color="#6B7280" />
                  <Text className="text-gray-700 font-medium ml-1 text-lg">
                    Descripción / Detalle{" "}
                    <Text className="text-red-500">*</Text>
                  </Text>
                </View>
                <TextInput
                  value={formData.descripcion}
                  onChangeText={(text) =>
                    handleInputChange("descripcion", text)
                  }
                  placeholder="Describa detalladamente los hechos"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className="bg-gray-100 rounded-lg px-4 py-3 text-base h-24"
                />
                <Text className="text-base text-gray-500 mt-1">
                  Incluya todos los detalles relevantes sobre los hechos
                </Text>
              </View>

              <FechaHoraSimple value={fechaHora} onChange={setFechaHora} />
            </View>
          </View>

          {/* <View className="mb-4">
                <View className="flex-row items-center mb-2">
                    <Tag size={20} color="#6B7280" />
                    <Text className="text-gray-700 font-medium ml-1 text-lg">
                    Tipo de denuncia <Text className="text-red-500">*</Text>
                    </Text>
                </View>

                <CategorySelector
                    onSelect={(cat, subcat) => {
                    console.log("Seleccionaste:", cat, subcat);
                    }}
                    selectedCategory={"Incidentes de tránsito"} // Ejemplo
                    selectedSubcategory={"Accidente de tránsito"} // Ejemplo
                />
            </View> */}

          <CompleteEvidenceUploader
            onFilesChange={(files) => {
              setEvidenceFiles(files);
              setFormData((prev) => ({ ...prev, evidencias: files }));
            }}
            maxFiles={10}
            maxSizeMB={25}
          />

          <View className="mx-4 mb-6">
            <CustomButton
              onPress={handleSubmit}
              variant="primary"
              size="lg"
              fullWidth
            >
              Continuar
            </CustomButton>
          </View>
        </ScrollView>

        <ConfirmationModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmSubmit}
          title="Enviar denuncia"
          message="¿Deseas confirmar el envío de la denuncia?"
        />
      </SafeAreaView>
    </>
  );
};

export default ScreenDenuncia;
