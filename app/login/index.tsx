import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { User, Eye, EyeOff } from 'lucide-react-native';
import CustomButton from '@/components/shared/CustomButton';
import { router, Stack } from 'expo-router';
import { usePermissionsStore } from '@/presentation/store/usePermissions';
import { PermisionsStatus } from '@/core/interfaces/locations';
import PermissionsCheckerProvider from '@/presentation/providers/PermissionsCheckerProvider';

const LoginContent = () => {
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);
  const { checkLocationPermission } = usePermissionsStore();

  const handleLogin = async () => {
    // Aquí va tu lógica de login real
    const success = true; // simula login exitoso

    if (success) {
      setIsLoginSuccess(true);
      // Disparar verificación de permisos después del login exitoso
      await checkLocationPermission();
    }
  };

  const handlePermissionChange = (status: PermisionsStatus) => {
    // Solo navegar si el login fue exitoso
    if (isLoginSuccess) {
      if (status === PermisionsStatus.GRANTED) {
        router.push('./map');
      } else if (status !== PermisionsStatus.CHECKING) {
        router.push('./permissions');
      }
    }
  };

  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Login',
          headerStyle: { backgroundColor: '#F9FAFB' },
          headerTintColor: '#374151'
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
              <Text className="text-gray-700 font-medium mb-2 text-lg">RUN</Text>
              <View className="relative">
                <TextInput
                  placeholder="Formato: 12.345.678-9"
                  placeholderTextColor="#9CA3AF"
                  className="bg-gray-100 rounded-lg px-4 py-4 text-base"
                  keyboardType="default"
                  autoCapitalize="none"
                  maxLength={12}
                />
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-medium mb-2 text-lg">
                Contraseña <Text className="text-red-500">*</Text>
              </Text>
              <View className="relative">
                <TextInput
                  className="bg-gray-100 rounded-lg px-4 py-4 pr-12 text-base"
                  secureTextEntry
                />
                <TouchableOpacity className="absolute right-4 top-4">
                  <EyeOff size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            <CustomButton
              onPress={handleLogin}
              variant="primary"
              size="lg"
              fullWidth
              disabled={isLoginSuccess}
            >
              {isLoginSuccess ? 'Verificando permisos...' : 'Continuar'}
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

const LoginScreen = () => {
  return <LoginContent />;
};

export default LoginScreen