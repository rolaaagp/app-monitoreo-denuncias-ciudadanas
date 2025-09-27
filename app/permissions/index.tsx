import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { usePermissionsStore } from '@/presentation/store/usePermissions'

const ScreenPermissions = () => {

    const {locationStatus, requestLocationPermission} = usePermissionsStore();

  return (
    <View>
      <Pressable onPress={requestLocationPermission}>
        <Text>Habilitar ubicacion</Text>
      </Pressable>

      <Text>Estado actual: {locationStatus}</Text>
    </View>
  )
}

export default ScreenPermissions