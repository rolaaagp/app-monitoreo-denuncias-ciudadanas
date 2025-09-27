import { create } from 'zustand'
import { PermisionsStatus } from '@/core/interfaces/locations'
import { checkLocationPermission, requestLocationPermission } from '@/core/actions/permissions/location';

interface PermissionsState {
    locationStatus: PermisionsStatus;

    requestLocationPermission: () => Promise<PermisionsStatus>;
    checkLocationPermission: () => Promise<PermisionsStatus>;
}

export const usePermissionsStore = create<PermissionsState>()( (set) => ({
    locationStatus: PermisionsStatus.CHECKING,

    requestLocationPermission: async() => {
        const status = await requestLocationPermission();
        set({ locationStatus: status })
        return status;
    },

    checkLocationPermission: async() => {
        const status = await checkLocationPermission();
        set({ locationStatus: status })
        return status;
    }
}) )