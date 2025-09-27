import * as Location from 'expo-location'
import { PermisionsStatus } from '@/core/interfaces/locations'
import { Alert, Linking } from 'react-native';

export const requestLocationPermission =  async():Promise<PermisionsStatus> => {
    const{status} = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
            if(status === 'denied'){
                manualLocationPermission();
            }
        
        return PermisionsStatus.DENIED;
    }

    return PermisionsStatus.GRANTED
}

export const checkLocationPermission =  async() => {

    const {status} = await Location.getForegroundPermissionsAsync();

    switch (status) {
        case 'granted':
            return PermisionsStatus.GRANTED;
        case 'denied':
            return PermisionsStatus.DENIED;
        default:
            return PermisionsStatus.UNDETERMINED;
    }

}

const manualLocationPermission =  async() => {
    Alert.alert(
        'Permiso de ubicacion necesario',
        'para continiuar debe habilitar el permiso de location en los ajustos',
        [
            {   
                text: 'abrir ajustas',
                onPress: () => {
                    Linking.openSettings();
                }
            },

            {
                text: 'Cancel',
                style: 'destructive'
            }
        ]
    )

}
