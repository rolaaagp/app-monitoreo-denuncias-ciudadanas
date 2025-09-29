// import { GOOGLE_MAPS_API_KEY } from "@env";
import React from "react";
import { StyleSheet, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

interface UbicacionInputProps {
  ubicacion: string;
  onChange: (ubicacion: string, latitude: number, longitude: number) => void;
}

const UbicacionInput: React.FC<UbicacionInputProps> = ({
  ubicacion,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Ingrese dirección"
        fetchDetails={true}
        textInputProps={{
          value: ubicacion,
          onChangeText: (text) => onChange(text, 0, 0), // cambia solo texto
        }}
        onPress={(data, details = null) => {
          if (details?.geometry?.location) {
            const lat = details.geometry.location.lat;
            const lng = details.geometry.location.lng;
            onChange(data.description, lat, lng);
          }
        }}
        query={{
        //   key: GOOGLE_MAPS_API_KEY,
          language: "es",
          types: "address",
        }}
        styles={{
          textInputContainer: styles.inputContainer,
          textInput: styles.textInput,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    backgroundColor: "#f9f9f9",
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  textInput: {
    height: 44,
    color: "#5d5d5d",
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
});

export default UbicacionInput;
