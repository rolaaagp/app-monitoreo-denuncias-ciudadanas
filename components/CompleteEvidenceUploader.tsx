import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import {
  Camera,
  FileText,
  Image as ImageIcon,
  Paperclip,
  Plus,
  Video,
  X,
} from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uri: string;
  isImage?: boolean;
  isVideo?: boolean;
}

export interface EvidenceUploaderProps {
  onFilesChange?: (files: FileAttachment[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

const { width } = Dimensions.get("window");

const ExpoEvidenceUploader: React.FC<EvidenceUploaderProps> = ({
  onFilesChange,
  maxFiles = 10,
  maxSizeMB = 25,
}) => {
  const [attachedFiles, setAttachedFiles] = useState<FileAttachment[]>([]);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const requestCameraPermission = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === "granted";
  };

  const addFile = (file: FileAttachment) => {
    if (attachedFiles.length >= maxFiles) {
      Alert.alert(
        "Límite alcanzado",
        `Solo puedes adjuntar máximo ${maxFiles} archivos`
      );
      return;
    }

    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSizeMB) {
      Alert.alert(
        "Archivo muy grande",
        `El archivo excede el límite de ${maxSizeMB}MB`
      );
      return;
    }

    const updatedFiles = [...attachedFiles, file];
    setAttachedFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = attachedFiles.filter((file) => file.id !== fileId);
    setAttachedFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
  };

  const handleTakePhoto = async () => {
    setShowOptionsModal(false);

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permiso requerido",
        "Necesitas dar permisos de cámara para tomar fotos"
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const file: FileAttachment = {
          id: `photo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: `foto_${Date.now()}.jpg`,
          type: "image/jpeg",
          size: asset.fileSize || 0,
          uri: asset.uri,
          isImage: true,
        };
        addFile(file);
      }
    } catch (error) {
      console.error("Error tomando foto:", error);
      Alert.alert("Error", "No se pudo tomar la foto");
    }
  };

  const handleRecordVideo = async () => {
    setShowOptionsModal(false);

    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permiso requerido",
        "Necesitas dar permisos de cámara para grabar videos"
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: ImagePicker.UIImagePickerControllerQualityType.Medium,
        videoMaxDuration: 120,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const file: FileAttachment = {
          id: `video-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: `video_${Date.now()}.mp4`,
          type: "video/mp4",
          size: asset.fileSize || 0,
          uri: asset.uri,
          isVideo: true,
        };
        addFile(file);
      }
    } catch (error) {
      console.error("Error grabando video:", error);
      Alert.alert("Error", "No se pudo grabar el video");
    }
  };

  const handleSelectFromGallery = async () => {
    setShowOptionsModal(false);

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsMultipleSelection: true,
        quality: 0.8,
        selectionLimit: maxFiles - attachedFiles.length,
      });

      if (!result.canceled && result.assets) {
        result.assets.forEach((asset) => {
          const isImage = asset.type === "image";
          const isVideo = asset.type === "video";

          const file: FileAttachment = {
            id: `gallery-${Date.now()}-${Math.random()
              .toString(36)
              .substr(2, 9)}`,
            name: asset.fileName || `archivo_${Date.now()}`,
            type: isImage
              ? "image/jpeg"
              : isVideo
              ? "video/mp4"
              : "application/octet-stream",
            size: asset.fileSize || 0,
            uri: asset.uri,
            isImage,
            isVideo,
          };
          addFile(file);
        });
      }
    } catch (error) {
      console.error("Error seleccionando de galería:", error);
      Alert.alert("Error", "No se pudieron seleccionar los archivos");
    }
  };

  const handleSelectDocuments = async () => {
    setShowOptionsModal(false);

    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets) {
        result.assets.forEach((asset) => {
          const isImage = asset.mimeType?.startsWith("image/");
          const isVideo = asset.mimeType?.startsWith("video/");

          const file: FileAttachment = {
            id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: asset.name || "documento",
            type: asset.mimeType || "application/octet-stream",
            size: asset.size || 0,
            uri: asset.uri,
            isImage,
            isVideo,
          };
          addFile(file);
        });
      }
    } catch (error) {
      console.error("Error seleccionando documentos:", error);
      Alert.alert("Error", "No se pudieron seleccionar los documentos");
    }
  };

  const getFileIcon = (file: FileAttachment) => {
    if (file.isImage) return <ImageIcon size={16} color="#6B7280" />;
    if (file.isVideo) return <Video size={16} color="#6B7280" />;
    return <FileText size={16} color="#6B7280" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  interface OptionButtonProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onPress: () => void;
    color?: string;
  }

  const OptionButton: React.FC<OptionButtonProps> = ({
    icon,
    title,
    subtitle,
    onPress,
    color = "#3B82F6",
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-4 bg-white rounded-lg border border-gray-200 mb-3"
      activeOpacity={0.7}
    >
      <View
        className="w-12 h-12 rounded-full items-center justify-center mr-4"
        style={{ backgroundColor: `${color}20` }}
      >
        {icon}
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 font-semibold text-base">{title}</Text>
        <Text className="text-gray-600 text-sm">{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View className="mx-4 mt-6 mb-6">
        <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-2">
            <Camera size={20} color="#374151" />
            <Text className="text-lg font-semibold text-gray-900 ml-2">
              Evidencia
            </Text>
            <Text className="text-sm text-gray-500 ml-2">
              ({attachedFiles.length}/{maxFiles})
            </Text>
          </View>

          <Text className="text-base text-gray-600 mb-4">
            Toma fotos, graba o selecciona archivos como evidencia (máx. {maxSizeMB}MB
            c/u)
          </Text>

          {/* Lista de archivos adjuntos */}
          {attachedFiles.length > 0 && (
            <ScrollView className="mb-4 max-h-40">
              {attachedFiles.map((file) => (
                <View
                  key={file.id}
                  className="flex-row items-center bg-gray-50 rounded-lg p-3 mb-2"
                >
                  <View className="mr-3">{getFileIcon(file)}</View>
                  <View className="flex-1">
                    <Text
                      className="text-gray-900 font-medium text-sm"
                      numberOfLines={1}
                    >
                      {file.name}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-gray-500 text-xs mr-2">
                        {formatFileSize(file.size)}
                      </Text>
                      {file.isImage && (
                        <Text className="text-blue-600 text-xs">Imagen</Text>
                      )}
                      {file.isVideo && (
                        <Text className="text-purple-600 text-xs">Video</Text>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeFile(file.id)}
                    className="ml-2 p-1"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <X size={16} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Botón principal */}
          <TouchableOpacity
            onPress={() => setShowOptionsModal(true)}
            disabled={attachedFiles.length >= maxFiles}
            className={`rounded-lg p-6 items-center justify-center border-2 border-dashed ${
              attachedFiles.length >= maxFiles
                ? "bg-gray-50 border-gray-200"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <View
              className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${
                attachedFiles.length >= maxFiles ? "bg-gray-200" : "bg-blue-100"
              }`}
            >
              <Plus
                size={24}
                color={attachedFiles.length >= maxFiles ? "#9CA3AF" : "#3B82F6"}
              />
            </View>
            <Text
              className={`font-medium ${
                attachedFiles.length >= maxFiles
                  ? "text-gray-400"
                  : "text-blue-600"
              }`}
            >
              {attachedFiles.length >= maxFiles
                ? "Límite alcanzado"
                : "Agregar evidencia"}
            </Text>
            {attachedFiles.length === 0 && (
              <Text className="text-xs text-gray-500 mt-1 text-center">
                Fotos, videos, documentos, etc.
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de opciones */}
      <Modal
        visible={showOptionsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowOptionsModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-gray-100 rounded-t-3xl pt-6 pb-8 px-4">
            <View className="w-12 h-1 bg-gray-300 rounded-full self-center mb-6" />

            <Text className="text-xl font-bold text-gray-900 text-center mb-6">
              Seleccionar evidencia
            </Text>

            <OptionButton
              icon={<Camera size={24} color="#10B981" />}
              title="Tomar foto"
              subtitle="Usa la cámara para capturar evidencia"
              onPress={handleTakePhoto}
              color="#10B981"
            />

            <OptionButton
              icon={<Video size={24} color="#8B5CF6" />}
              title="Grabar video"
              subtitle="Graba un video como evidencia"
              onPress={handleRecordVideo}
              color="#8B5CF6"
            />

            <OptionButton
              icon={<ImageIcon size={24} color="#F59E0B" />}
              title="Galería"
              subtitle="Selecciona fotos o videos existentes"
              onPress={handleSelectFromGallery}
              color="#F59E0B"
            />

            <OptionButton
              icon={<Paperclip size={24} color="#3B82F6" />}
              title="Documentos"
              subtitle="Adjunta documentos y otros archivos"
              onPress={handleSelectDocuments}
              color="#3B82F6"
            />

            <TouchableOpacity
              onPress={() => setShowOptionsModal(false)}
              className="mt-4 bg-gray-300 rounded-lg py-4"
            >
              <Text className="text-gray-700 font-semibold text-center text-base">
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ExpoEvidenceUploader;
