import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CustomButton from '@/components/shared/CustomButton'
import { router, Stack } from 'expo-router'
import MapView from 'react-native-maps';

const ScreenMap = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.container}>
        {/* Mapa que ocupa toda la pantalla */}
        <MapView 
          style={styles.map} 
          initialRegion={{
            latitude: -33.592543,
            longitude: -70.703770,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          // showsPointsOfInterest={false}
        />

        {/* Botón flotante en la parte inferior */}
        <View className="absolute bottom-8 left-5 right-5 items-center">
          <CustomButton 
            onPress={() => router.push("./denuncia")}
            variant="reportar"
            size='md'
            className="opacity-80"
          >
            Reportar
          </CustomButton>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default ScreenMap