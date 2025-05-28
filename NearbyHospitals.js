import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';

const NearbyHospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const GEOAPIFY_API_KEY = '1a60b992890d4afa8ccb5f9a3b3ae756'; // Use your real key here
  const lahoreLat = 31.5204;
  const lahoreLon = 74.3587;

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const url = `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lahoreLon},${lahoreLat},5000&limit=10&apiKey=${GEOAPIFY_API_KEY}`;
        const response = await axios.get(url);
        setHospitals(response.data.features);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#00bfff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nearby Hospitals in Lahore 🏥</Text>
      <FlatList
        data={hospitals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const { name } = item.properties;
          const { street, city, postcode } = item.properties;
          return (
            <View style={styles.card}>
              <Text style={styles.name}>{name || 'Unnamed Hospital'}</Text>
              <Text style={styles.text}>
                {street || 'Street not listed'}, {city}, {postcode}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#001f3f',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#66b2ff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003366',
  },
  text: {
    color: '#003366',
  },
});

export default NearbyHospitals;
