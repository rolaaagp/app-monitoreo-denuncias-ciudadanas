import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '@/components/shared/CustomButton'
import { router } from 'expo-router'

const ScreenMap = () => {
  return (
    <>

        <CustomButton 
                onPress={ () => router.push("./denuncia")}
                variant="reportar"
                
                size='md'
            >
                Reportar
        </CustomButton>
    
    </>

  )
}

export default ScreenMap