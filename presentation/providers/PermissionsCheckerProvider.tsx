import React, { PropsWithChildren, useEffect } from 'react'
import { usePermissionsStore } from '../store/usePermissions'
import { PermisionsStatus } from '@/core/interfaces/locations';
import { router } from 'expo-router';
import { AppState } from 'react-native';

interface PermissionsCheckerProviderProps extends PropsWithChildren {
  autoNavigate?: boolean;
  onPermissionChange?: (status: PermisionsStatus) => void;
  checkOnMount?: boolean;
}

const PermissionsCheckerProvider = ({ 
  children, 
  autoNavigate = true,
  onPermissionChange,
  checkOnMount = true 
}: PermissionsCheckerProviderProps) => {

  const { locationStatus, checkLocationPermission } = usePermissionsStore();

  // Auto navegación (comportamiento original)
  useEffect(() => {
    if (autoNavigate) {
      const timeout = setTimeout(() => {
        if (locationStatus === PermisionsStatus.GRANTED) {
          router.replace('./map')
        } else if (locationStatus !== PermisionsStatus.CHECKING) {
          router.replace('./permissions')
        }
      }, 0)
        
      return () => clearTimeout(timeout)
    }
  }, [locationStatus, autoNavigate])

  // Callback personalizado para manejar cambios
  useEffect(() => {
    if (onPermissionChange) {
      onPermissionChange(locationStatus);
    }
  }, [locationStatus, onPermissionChange]);

  // Verificar permisos al montar
  useEffect(() => {
    if (checkOnMount) {
      checkLocationPermission();
    }
  }, [checkOnMount])

  // Verificar permisos cuando la app vuelve a estar activa
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkLocationPermission();
      } 
    })

    return () => {
      subscription.remove()
    }
  }, [])

  return <>{children}</>
}

export default PermissionsCheckerProvider