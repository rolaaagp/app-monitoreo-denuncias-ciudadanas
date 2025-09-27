import CustomButton from '@/components/shared/CustomButton';
import { router, Stack } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = () => {
        const handleAcceder = () => {
        // navigation.navigate('Login');
    };

    const handleUnirse = () => {
        // navigation.navigate('Register');
    };
    
  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <SafeAreaView className="flex-1">

        <View className="flex-1 justify-center items-center px-8 bg-gray-50">
          
          <View className="mb-16">
               <Image 
                source={require('../../assets/images/municipalidad.jpg')} 
                className="w-30 h-30"
                resizeMode="contain"
              /> 
          </View>


          <View className="mb-20 items-center">
            <Text className="text-gray-700 text-2xl font-medium text-center mb-4">
              Bienvenido a la aplicación de{'\n'}denuncias ciudadanas
            </Text>
            <Text className="text-gray-600 text-xl text-center leading-6">
              Aquí podrás reportar hechos de forma{'\n'}
              rápida y segura para contribuir con tu{'\n'}
              comunidad.
            </Text>
          </View>

          <View className="w-full px-2">

            <CustomButton 
                onPress={ () => router.push("./login")}
                variant="primary"
                fullWidth
                size='lg'
            >
                Acceder
            </CustomButton>

            <CustomButton 
                onPress={ () => router.push("./registro")}
                variant="secondary"
                fullWidth
                size='lg'
            >
                Unirse
            </CustomButton>

          </View>

        </View>

    </SafeAreaView>
    </>
  )
}

export default WelcomeScreen