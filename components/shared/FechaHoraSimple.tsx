import { Calendar, X } from "lucide-react-native";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type FechaHoraSimpleProps = {
  value: Date | null;
  onChange: (date: Date) => void;
};

const FechaHoraSimple: React.FC<FechaHoraSimpleProps> = ({
  value,
  onChange,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);

  const getChileNow = () => {
    const now = new Date();
    const chileOffset = -3;
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + chileOffset * 3600000);
  };

  const displayDate = value ?? getChileNow();
  const currentYear = getChileNow().getFullYear();

  const formatDateTime = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  const handleOpenModal = () => {
    setTempDate(value || getChileNow());
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (tempDate) {
      onChange(tempDate);
    }
    setShowModal(false);
  };

  const handleCancel = () => {
    setShowModal(false);
    setTempDate(null);
  };

  const updateDate = (field: "month" | "day", value: number) => {
    const newDate = new Date(tempDate || getChileNow());
    newDate.setFullYear(currentYear);
    if (field === "month") newDate.setMonth(value);
    if (field === "day") newDate.setDate(value);
    setTempDate(newDate);
  };

  const updateTime = (field: "hour" | "minute", value: number) => {
    const newDate = new Date(tempDate || getChileNow());
    newDate.setFullYear(currentYear);
    if (field === "hour") newDate.setHours(value);
    if (field === "minute") newDate.setMinutes(value);
    setTempDate(newDate);
  };

  const renderPicker = (
    items: number[],
    selected: number,
    onSelect: (value: number) => void
  ) => {
    return (
      <View className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 80 }}
        >
          {items.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => onSelect(item)}
              className="py-3"
            >
              <Text
                className={`text-center text-lg ${
                  item === selected
                    ? "text-blue-600 font-bold text-2xl"
                    : "text-gray-400"
                }`}
              >
                {String(item).padStart(2, "0")}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

  const months = Array.from({ length: 12 }, (_, i) => i);
  const days = Array.from(
    {
      length: new Date(
        currentYear,
        (tempDate?.getMonth() || getChileNow().getMonth()) + 1,
        0
      ).getDate(),
    },
    (_, i) => i + 1
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  const monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const currentDate = tempDate || getChileNow();

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
        onPress={handleOpenModal}
      >
        <Text>{formatDateTime(displayDate)}</Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl">
            <View className="flex-row justify-between items-center px-5 py-4 border-b border-gray-200">
              <TouchableOpacity onPress={handleCancel}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
              <Text className="text-lg font-semibold">Seleccionar Fecha y Hora</Text>
              <TouchableOpacity onPress={handleConfirm}>
                <Text className="text-blue-600 font-semibold text-base">OK</Text>
              </TouchableOpacity>
            </View>

            <View className="px-5 py-4">
              <Text className="text-sm font-semibold text-gray-500 mb-2">FECHA</Text>
              <View className="flex-row h-48 border border-gray-200 rounded-lg overflow-hidden">
                {renderPicker(days, currentDate.getDate(), (v) =>
                  updateDate("day", v)
                )}
                <View className="w-px bg-gray-200" />
                <View className="flex-1">
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 80 }}
                  >
                    {months.map((month) => (
                      <TouchableOpacity
                        key={month}
                        onPress={() => updateDate("month", month)}
                        className="py-3"
                      >
                        <Text
                          className={`text-center text-lg ${
                            month === currentDate.getMonth()
                              ? "text-blue-600 font-bold text-2xl"
                              : "text-gray-400"
                          }`}
                        >
                          {monthNames[month]}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                <View className="w-px bg-gray-200" />
                <View className="flex-1 justify-center items-center">
                  <Text className="text-blue-600 font-bold text-2xl">
                    {currentYear}
                  </Text>
                </View>
              </View>
            </View>

            <View className="px-5 pb-6">
              <Text className="text-sm font-semibold text-gray-500 mb-2">HORA</Text>
              <View className="flex-row h-48 border border-gray-200 rounded-lg overflow-hidden">
                {renderPicker(
                  hours,
                  currentDate.getHours(),
                  (v) => updateTime("hour", v)
                )}
                <View className="w-px bg-gray-200" />
                {renderPicker(
                  minutes,
                  currentDate.getMinutes(),
                  (v) => updateTime("minute", v)
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FechaHoraSimple;