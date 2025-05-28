// components/ui/Article.tsx
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToSaved } from '../../redux/savedSlice';

type ArticleProps = {
  item: {
    title: string;
    description: string;
    // Add other fields as needed
  };
};

export default function Article({ item }: ArticleProps) {
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text>{item.description}</Text>
      <Button
        title=" Save for Later"
        onPress={() => dispatch(addToSaved(item))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#d0e7ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
