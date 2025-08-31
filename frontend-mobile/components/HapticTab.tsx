import React from 'react';
import { Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

export function HapticTab({ children, onPress, ...props }: any) {
  return (
    <Pressable
      {...props}
      onPress={(event) => {
        Haptics.selectionAsync();
        if (onPress) onPress(event);
      }}
    >
      {children}
    </Pressable>
  );
}
