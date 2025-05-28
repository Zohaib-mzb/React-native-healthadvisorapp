import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Header from '@/components/ui/Header';
import Article from '@/components/ui/Article';
import NearbyHospitals from '@/components/NearbyHospitals';

const articles = [
  { id: '1', title: 'Heart Health', description: 'Tips for a healthy heart.' },
  { id: '2', title: 'Skin Care', description: 'Daily skincare routine.' },
  { id: '3', title: 'Diabetes Diet', description: 'What to eat.' },
];

export default function ExploreScreen() {
  const [advisors, setAdvisors] = useState([
    { id: '1', name: 'Dr. Sarah Khan', specialty: 'Skin', rating: '4.8' },
    { id: '2', name: 'Dr. Imran Qureshi', specialty: 'Diabetes', rating: '4.6' },
    { id: '3', name: 'Dr. Maria Iqbal', specialty: 'Heart', rating: 4.9 },
    { id: '4', name: 'Dr. Usman Ali', specialty: 'Skin', rating: 4.4 },
    { id: '5', name: 'Dr. Ayesha Noor', specialty: 'Diabetes', rating: 4.7 },
  ]);

  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [rating, setRating] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = () => {
    if (!name || !specialty || !rating) return;

    if (editingId) {
      setAdvisors((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, name, specialty, rating } : item
        )
      );
      setEditingId(null);
    } else {
      const newAdvisor = {
        id: Math.random().toString(),
        name,
        specialty,
        rating,
      };
      setAdvisors((prev) => [...prev, newAdvisor]);
    }

    setName('');
    setSpecialty('');
    setRating('');
  };

  const handleDelete = (id: string) => {
    setAdvisors((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEdit = (advisor: any) => {
    setName(advisor.name);
    setSpecialty(advisor.specialty);
    setRating(advisor.rating);
    setEditingId(advisor.id);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Header />
    
      <View style={styles.container}>
        <Text style={styles.heading}>🩺 Health Advisors </Text>

        <TextInput
          placeholder="Name"
          placeholderTextColor="#ccc"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Specialty"
          placeholderTextColor="#ccc"
          value={specialty}
          onChangeText={setSpecialty}
          style={styles.input}
        />
        <TextInput
          placeholder="Rating"
          placeholderTextColor="#ccc"
          value={rating}
          onChangeText={setRating}
          keyboardType="numeric"
          style={styles.input}
        />

        <TouchableOpacity onPress={handleSave} style={styles.saveBtn}>
          <Text style={styles.btnText}>{editingId ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>

        {advisors.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.text}>Specialty: {item.specialty}</Text>
            <Text style={styles.text}>Rating: ⭐ {item.rating}</Text>

            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editBtn}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <Text style={styles.heading}>🏥 Nearby Hospitals</Text>
        <NearbyHospitals />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#001f3f',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginVertical: 16,
  },
  input: {
    backgroundColor: '#003366',
    color: '#ffffff',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: '#00bfff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#66b2ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001f3f',
  },
  text: {
    fontSize: 15,
    color: '#003366',
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  editBtn: {
    backgroundColor: '#005f73',
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: '#d00000',
    padding: 8,
    borderRadius: 6,
  },
  actionText: {
    color: '#fff',
  },
});
