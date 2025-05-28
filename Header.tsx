// components/ui/Header.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function Header() {
  const count = useSelector((state: any) => state.saved.items.length);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>💾 Saved: {count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#007acc',
    borderRadius: 10,
    padding: 8,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
