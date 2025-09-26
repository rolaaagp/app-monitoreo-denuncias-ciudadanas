import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AlertCircle, ArrowLeft, Calendar, Camera, FileText, MapPin, Plus, Tag } from 'lucide-react-native';
import CustomButton from '@/components/shared/CustomButton';
import { router, Stack } from 'expo-router';
import ConfirmationModal from '@/components/ConfirmationModal';
import CategorySelector from '@/components/CategorySelector';

const ScreenDenuncia = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        categoria: '',
        subcategoria: '',
        ubicacion: '',
        descripcion: '',
        fecha: '',
        hora: ''
    });

    const handleConfirmSubmit = () => {
    setShowModal(false);
        setTimeout(() => {
            Alert.alert(
                'Denuncia Enviada',
                'Su denuncia ha sido registrada exitosamente',
                [
                {
                    text: 'OK',
                    onPress: () => router.push('/map')
                }
                ]
            );
        }, 500);
    };

    const handleSubmit = () => {
        // if (!validateForm()) {
        // return;
        // }
        // // Mostrar modal de confirmación
        setShowModal(true);
    };

    const handleCategorySelect = (category: string, subcategory: string) => {
        setFormData(prev => ({
        ...prev,
        categoria: category,
        subcategoria: subcategory
        }));
        
        // // Limpiar error si existe
        // if (errors.categoria) {
        // setErrors(prev => ({ ...prev, categoria: '' }));
        // }
    };

  return (
    <>
        <Stack.Screen 
                options={{ 
                title: 'Denuncia',
                headerStyle: { backgroundColor: '#F9FAFB' },
                headerTintColor: '#374151'
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
                                Su información personal solo será utilizada para el seguimiento de la incidencia y posibles contactos.
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
                //   value={formData.ubicacion}
                //   onChangeText={(text) => handleInputChange('ubicacion', text)}
                    placeholder="Ingrese dirección o ubicación"
                    className={`
                        bg-gray-100 rounded-lg px-4 py-4 text-base}
                    `}
                />
                <Text className="text-base text-gray-500 mt-1">
                    Ejemplo: Av. Principal 123, Centro, Ciudad
                </Text>
                {/* {errors.ubicacion ? (
                  <Text className="text-red-500 text-sm mt-1">{errors.ubicacion}</Text>
                ) : null} */}
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


              <View className="mb-4">
                <View className="flex-row items-center mb-2">
                  <FileText size={20} color="#6B7280" />
                  <Text className="text-gray-700 font-medium ml-1 text-lg">
                    Descripción / Detalle <Text className="text-red-500">*</Text>
                  </Text>
                </View>
                <TextInput
                //   value={formData.descripcion}
                //   onChangeText={(text) => handleInputChange('descripcion', text)}
                  placeholder="Describa detalladamente los hechos"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  className={`
                    bg-gray-100 rounded-lg px-4 py-3 text-base  h-24
                    '}
                  `}
                />
                <Text className="text-base text-gray-500 mt-1">
                  Incluya todos los detalles relevantes sobre los hechos
                </Text>
                {/* {errors.descripcion ? (
                  <Text className="text-red-500 text-sm mt-1">{errors.descripcion}</Text>
                ) : null} */}
              </View>

              {/* Fecha y Hora Field */}
              <View className="mb-6">
                <View className="flex-row items-center mb-2">
                  <Calendar size={20} color="#6B7280" />
                  <Text className="text-gray-700 font-medium ml-1 text-lg">
                    Fecha / Hora del Incidente <Text className="text-red-500">*</Text>
                  </Text>
                </View>
                
                <TouchableOpacity
                //   onPress={formatDateTime}
                  className={`
                    bg-gray-100 rounded-lg px-4 py-3  flex-row items-center justify-between
                    }
                  `}
                >
                  
                  <Calendar size={20} color="#6B7280" />
                </TouchableOpacity> 
                
                <Text className="text-base text-gray-500 mt-1">
                  Fecha y hora aproximada cuando ocurrieron los hechos
                </Text>
                {/* {errors.fecha ? (
                  <Text className="text-red-500 text-sm mt-1">{errors.fecha}</Text>
                ) : null} */}
              </View>

            </View>
          </View>


          <View className="mx-4 mt-6 mb-6">
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              
              <View className="flex-row items-center mb-2">
                <Camera size={20} color="#374151" />
                <Text className="text-lg font-semibold text-gray-900 ml-2">
                  Evidencia
                </Text>
              </View>
              
              <Text className="text-base text-gray-600 mb-4">
                Adjunta la evidencia, archivos que estimes necesario.
              </Text>

              {/* Add Evidence Button */}
              <TouchableOpacity
                // onPress={handleAddEvidence}
                className="bg-gray-100 rounded-lg p-6 items-center justify-center border-2 border-dashed border-gray-300"
              >
                <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mb-2">
                  <Plus size={24} color="#3B82F6" />
                </View>
                <Text className="text-blue-600 font-medium">Otro</Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* Submit Button */}
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
}

export default ScreenDenuncia