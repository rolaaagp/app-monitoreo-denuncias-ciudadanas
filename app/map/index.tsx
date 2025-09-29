import CustomButton from "@/components/shared/CustomButton";
import * as Location from "expo-location";
import { router, Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

interface DenunciaFake {
  id: number;
  ubicacion: string;
  detalle: string;
  fecha_completa: string;
  user_id: number;
  tipo_denuncia: number;
  requerimiento_id: number;
  latitude: number;
  longitude: number;
  categoria: string;
  subcategoria: string;
  clasificacion: "alta" | "media" | "baja";
}

const SAN_BERNARDO_REGION: Region = {
  latitude: -33.604820,
  longitude: -70.709510,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

// Datos falsos para pruebas
const MOCK_DENUNCIAS: DenunciaFake[] = [
  {
    id: 1,
    ubicacion: "Calle Falsa 123, San Bernardo",
    detalle: "Choque múltiple en la vía principal",
    fecha_completa: "2025-09-24T21:00:00.000Z",
    user_id: 1,
    tipo_denuncia: 1,
    requerimiento_id: 1,
    latitude: -33.604820,
    longitude: -70.709510,
    categoria: "Incidentes de tránsito",
    subcategoria: "Accidente de tránsito",
    clasificacion: "alta",
  },
  {
    id: 2,
    ubicacion: "Avenida Siempre Viva 456, San Bernardo",
    detalle: "Vehículo abandonado hace días",
    fecha_completa: "2025-09-24T22:00:00.000Z",
    user_id: 2,
    tipo_denuncia: 2,
    requerimiento_id: 2,
    latitude: -33.607000,
    longitude: -70.710000,
    categoria: "Incidentes de tránsito",
    subcategoria: "Vehículo abandonado",
    clasificacion: "media",
  },
  {
    id: 3,
    ubicacion: "Pasaje Inventado 789, San Bernardo",
    detalle: "Microbasural detectado en sector",
    fecha_completa: "2025-09-24T23:00:00.000Z",
    user_id: 3,
    tipo_denuncia: 3,
    requerimiento_id: 3,
    latitude: -33.601500,
    longitude: -70.707500,
    categoria: "Problemas urbanos / infraestructura",
    subcategoria: "Microbasurales",
    clasificacion: "baja",
  },
];

const clasificacionColor = {
  alta: "red",
  media: "orange",
  baja: "green",
};

const ScreenMap = () => {
  const [region, setRegion] = useState<Region>(SAN_BERNARDO_REGION);
  const [denuncias, setDenuncias] = useState<DenunciaFake[]>([]);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    // Simular carga de denuncias
    setDenuncias(MOCK_DENUNCIAS);

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso denegado", "No se puede acceder a la ubicación");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
    })();
  }, []);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={region}
          minZoomLevel={12}
          maxZoomLevel={18}
          showsUserLocation={true}
        >
          {denuncias.map((denuncia) => (
            <Marker
              key={denuncia.id}
              coordinate={{
                latitude: denuncia.latitude,
                longitude: denuncia.longitude,
              }}
              title={denuncia.categoria}
              description={denuncia.detalle}
              pinColor={clasificacionColor[denuncia.clasificacion]} // ✅ Color dinámico
            />
            
          ))}

          {userLocation && (
            <Marker
              coordinate={userLocation}
              title="Tu ubicación"
              pinColor="blue"
            />
          )}
        </MapView>

        {/* Botones flotantes */}
        <View className="absolute bottom-8 left-5 right-5 items-center">
          <CustomButton
            onPress={() => router.push("./denuncia")}
            variant="reportar"
            size="md"
            className="opacity-80 mb-2"
          >
            Reportar
          </CustomButton>

          {/* <CustomButton
            onPress={() => router.push("./welcome")}
            variant="reportar"
            size="md"
            className="opacity-80"
          >
            Volver
          </CustomButton> */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default ScreenMap;
