import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Modal, TouchableOpacity } from 'react-native';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwt-decode
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the custom type for the decoded token
interface DecodedToken {
  user: {
    name: string;
    email: string;
  };
  exp?: number; // Optional since it may be undefined
}

const Login = () => {
  const [formType, setFormType] = useState<'SignUp' | 'Login' | null>(null);
  const [isModalVisible, setModalVisible] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSubmit = async () => {
    // Form validation
    if (formType === 'SignUp' && password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      const endpoint = formType === 'SignUp' ? '/api/auth/register' : '/api/auth/signin';
      const response = await fetch(`https://requesto.in:8443${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formType === 'SignUp' ? name : undefined,
          email,
          password,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert(`${formType} successful!`);
        // Handle successful login/sign up
        if (formType === 'Login') {
          await AsyncStorage.setItem("token", result.token);
          const decodedToken = jwtDecode<DecodedToken>(result.token);
          await AsyncStorage.setItem("name", decodedToken.user.name);
          await AsyncStorage.setItem("email", decodedToken.user.email);
          setIsAuthenticated(true);
          // Navigate to homepage or perform further actions
        }
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        Alert.alert(result.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An error occurred');
    }
  };

  const handleFormSelect = (type: 'SignUp' | 'Login') => {
    setFormType(type);
    setModalVisible(false);
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token"); // Await the promise
      if (token) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token); // Use the custom type
          const currentTime = Date.now() / 1000;

          // Check if exp is defined
          if (decodedToken.exp && decodedToken.exp > currentTime) {
            setIsAuthenticated(true);
            // Navigate to homepage or perform further actions
          } else {
            // Handle token expiration (e.g., clear token)
            await AsyncStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Token decoding error", error);
          await AsyncStorage.removeItem("token");
        }
      }
    };

    checkToken(); // Call the function to check the token
  }, []);

  return (
    <View style={styles.container}>
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose an Option</Text>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleFormSelect('SignUp')}>
              <Text style={styles.optionText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={() => handleFormSelect('Login')}>
              <Text style={styles.optionText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {formType && (
        <>
          <Text style={styles.modalTitle}>{formType === 'SignUp' ? 'Sign Up' : 'Log In'}</Text>
          {formType === 'SignUp' && (
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          )}
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {formType === 'SignUp' && (
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          )}
          <Button title="Submit" onPress={handleSubmit} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionButton: {
    width: '100%',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    alignItems: 'center',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default Login;
