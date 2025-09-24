import { Text, PressableProps, Pressable } from 'react-native'
import React, { useState } from 'react'

interface Props extends PressableProps {
    children:string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

const CustomButton = ({ children, variant = 'primary', onPress, size, fullWidth, disabled = false,  }: Props) => {
    const [isPressed, setIsPressed] = useState(false);

    const variantStyle = () => {
        switch (variant) {
            case 'primary':
                return isPressed ? 'bg-blue-400' : 'bg-blue-600';
            case 'secondary':
                return isPressed ? 'bg-green-400' : 'bg-green-600';
            case 'success':
                return isPressed ? 'bg-green-400' : 'bg-green-600';
            case 'danger':
                return 'bg-red-500';
            default:
                return 'bg-blue-500';
        }
    };

    const sizeStyles = () => {
        switch (size) {
        case 'sm':
            return 'py-2 px-4';
        case 'md':
            return 'py-3 px-6';
        case 'lg':
            return 'py-4 px-8';
        default:
            return 'py-3 px-6';
        }
    };

    const textSizeStyles = () => {
        switch (size) {
        case 'sm':
            return 'text-sm';
        case 'md':
            return 'text-base';
        case 'lg':
            return 'text-lg';
        default:
            return 'text-base';
        }
    };

  return (
    <Pressable
        className={`
            ${variantStyle()}
            ${sizeStyles()} 
            rounded-lg 
            ${fullWidth ? 'w-full' : ''} 
            ${isPressed ? 'scale-95' : 'scale-100'}
        mb-4` }
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        disabled={disabled}
        onPress={onPress}
    >
      <Text  className={`text-white text-center font-semibold ${textSizeStyles()}`}>{ children }</Text>
    </Pressable>
  )
}

export default CustomButton