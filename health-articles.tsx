import { View, Text, StyleSheet } from 'react-native';

export default function HealthArticlesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📰 Health Articles</Text>
      <Text style={styles.article}>1. Heart Health - Tips for a healthy heart.</Text>
      <Text style={styles.article}>2. Skin Care - Daily skincare routine.</Text>
      <Text style={styles.article}>3. Diabetes Diet - What to eat.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f3f',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  article: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
});
