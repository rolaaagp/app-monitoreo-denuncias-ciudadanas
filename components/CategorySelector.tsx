import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, ChevronRight, X, Check, ChevronUp } from 'lucide-react-native';

interface Category {
  id: string;
  name: string;
  subcategories: string[];
}

interface CategorySelectorProps {
  onSelect: (category: string, subcategory: string) => void;
  selectedCategory?: string;
  selectedSubcategory?: string;
}

const categories: Category[] = [
  {
    id: 'transito',
    name: 'Incidentes de tránsito',
    subcategories: [
      'Accidente de tránsito',
      'Vehículo abandonado', 
      'Vehículo mal estacionado',
      'Robo de vehículo',
      'Robo de vehículo con violencia',
      'Encargo o hallazgo de vehículo robado',
      'Robo mediante vehículo',
      'Vehículo incendiándose'
    ]
  },
  {
    id: 'delitos',
    name: 'Delitos/robos',
    subcategories: [
      'Intento de robo',
      'Robo al comercio',
      'Robo en lugar habitado',
      'Robo en lugar no habitado',
      'Robo con intimidación y violencia',
      'Robo de artículos dentro de un vehículo',
      'Estafa y/o delitos financieros'
    ]
  },
  {
    id: 'violencia',
    name: 'Violencia / agresiones',
    subcategories: [
      'Violencia intrafamiliar',
      'Amenazas / Amenazas con armas',
      'Riña en vía pública / Riña en recinto privado',
      'Lesiones leves / Lesionado con arma de fuego',
      'Agresión a menor / adulto mayor / funcionario'
    ]
  },
  {
    id: 'convivencia',
    name: 'Incivilidades / convivencia',
    subcategories: [
      'Ruidos molestos',
      'Consumo de alcohol o drogas en vía pública',
      'Conflicto vecinal',
      'Ofensas al pudor',
      'Otras incivilidades',
      'Otros delitos o faltas'
    ]
  },
  {
    id: 'urbanos',
    name: 'Problemas urbanos / infraestructura',
    subcategories: [
      'Semáforo apagado',
      'Poste, semáforo o señalética caída',
      'Luminarias apagadas',
      'Cables caídos o a baja altura',
      'Árbol o rama caída',
      'Daños a bienes de uso público',
      'Inundación, anegamiento, fuga de agua'
    ]
  },
  {
    id: 'salud',
    name: 'Salud / emergencias',
    subcategories: [
      'Emergencia de salud',
      'Muerte y/o hallazgo de cadáver',
      'Persona tirada en la vía pública',
      'Lesionado/s'
    ]
  },
  {
    id: 'animales',
    name: 'Animales / medioambiente',
    subcategories: [
      'Animales sueltos en la vía pública',
      'Incendio en lugar habitado / no habitado',
      'Microbasurales'
    ]
  },
  {
    id: 'extraviados',
    name: 'Personas extraviadas',
    subcategories: [
      'Masculino extraviado',
      'Femenina extraviado',
      'Adulto mayor extraviado'
    ]
  },
  {
    id: 'municipal',
    name: 'Otros / gestión municipal',
    subcategories: [
      'Solicitudes servicios municipales',
      'Fiscalizaciones de tránsito / a local comercial',
      'Comercio ilegal / no autorizado',
      'Usurpación de terreno / propiedad privada',
      'Retiro de ruco',
      'Alarma activada'
    ]
  }
];

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onSelect,
  selectedCategory,
  selectedSubcategory,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <ScrollView className="bg-white p-4 rounded-lg shadow-md">
      {/* Feedback visual: categoría seleccionada */}
      {/* {selectedCategory && selectedSubcategory && (
        <View className="flex-row flex-wrap mb-4">
          <View className="bg-green-100 px-3 py-1 rounded-full flex-row items-center">
            <Text className="text-green-800 font-medium">
              {selectedCategory} - {selectedSubcategory}
            </Text>
          </View>
        </View>
      )} */}

      {/* Lista acordeón */}
      {categories.map((category) => (
        <View key={category.id} className="mb-2">
          {/* Encabezado de categoría */}
          <TouchableOpacity
            onPress={() => toggleCategory(category.id)}
            className="flex-row justify-between items-center p-4 bg-gray-100 rounded-lg"
          >
            <Text className="text-lg font-semibold text-gray-900">{category.name}</Text>
            {expandedCategory === category.id ? (
              <ChevronUp size={20} color="#6B7280" />
            ) : (
              <ChevronDown size={20} color="#6B7280" />
            )}
          </TouchableOpacity>

          {/* Subcategorías */}
          {expandedCategory === category.id && (
            <View className="bg-gray-50 rounded-lg mt-2">
              {category.subcategories.map((subcategory, idx) => (
                <TouchableOpacity
                  key={idx}
                  className="flex-row justify-between items-center p-3 border-b border-gray-200"
                  onPress={() => onSelect(category.name, subcategory)}
                >
                  <Text className="text-base text-gray-800">{subcategory}</Text>
                  {selectedSubcategory === subcategory && (
                    <Check size={20} color="#10B981" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default CategorySelector;