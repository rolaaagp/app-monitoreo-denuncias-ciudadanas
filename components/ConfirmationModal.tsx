import React from 'react';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native';
import { CheckCircle, X } from 'lucide-react-native';
import CustomButton from './shared/CustomButton';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const ConfirmationModal = ({ 
  visible, 
  onClose, 
  onConfirm,
  title = "Enviar denuncia",
  message = "¿Deseas confirmar el envío de la denuncia?"
}: ConfirmationModalProps) => {
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable 
        className="flex-1 bg-black/50 justify-center items-center px-6"
        onPress={onClose}
      >
        {/* Modal Content */}
        <Pressable
          className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg"
          onPress={() => {}} // Evita cerrar al tocar el modal
        >
          
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-4 right-4 z-10"
          >
            <X size={24} color="#6B7280" />
          </TouchableOpacity>

          {/* Header with Icon */}
          <View className="items-center mb-4">
            <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center mb-3">
              <CheckCircle size={28} color="#10B981" />
            </View>
            
            <Text className="text-xl font-semibold text-gray-900 text-center">
              {title}
            </Text>
          </View>

          {/* Message */}
          <Text className="text-base text-gray-600 text-center mb-6 leading-6">
            {message}
          </Text>

          {/* Buttons */}
          <View className="flex-row space-x-3">
            {/* Volver Button */}
            <View className="flex-1">
              <TouchableOpacity
                onPress={onClose}
                className="bg-gray-100 py-3 px-4 rounded-lg"
              >
                <Text className="text-gray-700 text-center font-medium text-base">
                  Volver
                </Text>
              </TouchableOpacity>
            </View>

            {/* Finalizar Button */}
            <View className="flex-1">
              <CustomButton
                onPress={onConfirm}
                variant="success"
                size="md"
              >
                Finalizar
              </CustomButton>
            </View>
          </View>

        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default ConfirmationModal;