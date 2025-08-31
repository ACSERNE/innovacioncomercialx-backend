import React from 'react';
import { View, Platform } from 'react-native';

export default function TabBarBackground() {
  const style = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  };

  if (Platform.OS === 'web') {
    Object.assign(style, {
      boxShadow: '0px -2px 4px rgba(0,0,0,0.1)',
    });
  } else {
    Object.assign(style, {
      elevation: 5,
    });
  }

  return <View style={style} />;
}
