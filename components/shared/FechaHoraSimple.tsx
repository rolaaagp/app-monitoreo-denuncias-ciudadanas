import DateTimePicker from "@react-native-community/datetimepicker";
import { Calendar } from "lucide-react-native";
import React, { useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

type FechaHoraSimpleProps = {
  value: Date | null;
  onChange: (date: Date) => void;
};

const FechaHoraSimple: React.FC<FechaHoraSimpleProps> = ({
  value,
  onChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");

  const getChileNow = () => {
    const now = new Date();
    const chileOffset = -3; // Chile continental UTC-3
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + chileOffset * 3600000);
  };

  const displayDate = value ?? getChileNow();

  const handleChange = (event: any, selectedDate?: Date) => {
    const { type } = event;

    if (type === "dismissed") {
      setShowPicker(false);
      return;
    }

    if (selectedDate) {
      const newDate = value ? new Date(value) : getChileNow();
      if (pickerMode === "date") {
        newDate.setFullYear(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate()
        );
        onChange(newDate);
        if (Platform.OS === "android") setPickerMode("time");
      } else {
        newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
        onChange(newDate);
      }
    }

    if (Platform.OS === "android" && pickerMode === "time") {
      setShowPicker(false);
    }
  };

  const openPicker = () => {
    setPickerMode("date");
    setShowPicker(true);
  };

  const formatDateTime = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  return (
    <View className="mb-6">
      <View className="flex-row items-center mb-2">
        <Calendar size={20} color="#6B7280" />
        <Text className="text-gray-700 font-medium ml-1 text-lg">
          Fecha / Hora del Incidente <Text className="text-red-500">*</Text>
        </Text>
      </View>
      <TouchableOpacity
        className="bg-gray-100 rounded-lg px-4 py-3"
        onPress={openPicker}
      >
        <Text>{formatDateTime(displayDate)}</Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={displayDate}
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
