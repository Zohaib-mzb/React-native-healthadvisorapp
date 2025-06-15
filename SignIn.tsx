import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'expo-router';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export default function SignInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;

      if (!user.emailVerified) {
        Alert.alert('Verify Email', 'Please verify your email before signing in.');
        return;
      }

      // ✅ Get user role from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (role === 'admin') {
          router.replace('/auth/admin-splash');
        } else if (role === 'student') {
          router.replace('/auth/student-splash');
        } else {
          Alert.alert('Error', 'Unknown role.');
        }
      } else {
        Alert.alert('Error', 'User data not found.');
      }

    } catch (err: any) {
      Alert.alert('Sign In Failed', err.message);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Enter Email', 'Please enter your email to receive a reset link.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password Reset', 'A reset link has been sent to your email.');
    } catch (err: any) {
      Alert.alert('Reset Failed', err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HEALTH ADVISOR APP</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePasswordReset}>
          <Text style={styles.linkText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={styles.switchText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/auth/SignUp')}>
          <Text style={styles.linkText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F3A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1C3C63',
    padding: 20,
    borderRadius: 12,
    width: '100%',
  },
  input: {
    backgroundColor: '#0B1F3A',
    color: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#4FA9FF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
  },
  linkText: {
    color: '#4FA9FF',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
  },
});
