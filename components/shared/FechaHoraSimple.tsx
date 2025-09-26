import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

type FechaHoraSimpleProps = {
  value: Date | null;
  onChange: (date: Date) => void;
};

const FechaHoraSimple: React.FC<FechaHoraSimpleProps> = ({ value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  const handleChange = (event: any, selectedDate?: Date) => {
    const { type } = event;
    
    if (type === "dismissed") {
      setShowPicker(false);
      return;
    }

    if (selectedDate) {
      if (pickerMode === "date") {
        const newDate = value ? new Date(value) : new Date();
        newDate.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        onChange(newDate);
        
        if (Platform.OS === "android") {
          setPickerMode("time");
        } else {
          setShowPicker(false);
        }
      } else {
        const newDate = value ? new Date(value) : new Date();
        newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
        onChange(newDate);
        setShowPicker(false);
      }
    }

    if (Platform.OS === "android" && pickerMode === "date") {
      return;
    }
    
    if (Platform.OS === "android") {
      setShowPicker(false);
    }
  };

  const openPicker = () => {
    setPickerMode("date");
    setShowPicker(true);
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-2">
        <Calendar size={20} color="#6B7280" />
        <Text className="text-gray-700 font-medium ml-1 text-lg">
          Fecha / Hora del Incidente <Text className="text-red-500">*</Text>
        </Text>
      </View>
      <TouchableOpacity className="bg-gray-100 rounded-lg px-4 py-3" onPress={openPicker}>
        <Text>
          {value
            ? `${value.toISOString().split("T")[0]} ${value.toTimeString().slice(0, 5)}`
            : "Seleccionar fecha y hora"}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value ?? new Date()}
          mode={pickerMode}
          is24Hour={true}
          display={Platform.OS === "ios" ? "default" : "spinner"}
          onChange={handleChange}
        />
      )}
    </View>
  );
};

export default FechaHoraSimple;