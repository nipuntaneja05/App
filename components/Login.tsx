import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }: { navigation: any }) => {
  const [formType, setFormType] = useState<'SignUp' | 'Login'>('SignUp');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (formType === 'SignUp' && password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    try {
      if (formType === 'SignUp') {
        // Save user data locally (sign-up)
        await AsyncStorage.setItem('userName', name);
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userPassword', password);

        Alert.alert('Sign-Up successful! Please log in.');
        setFormType('Login'); // Switch to login form
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else if (formType === 'Login') {
        // Check if user data exists in AsyncStorage (login)
        const storedEmail = await AsyncStorage.getItem('userEmail');
        const storedPassword = await AsyncStorage.getItem('userPassword');

        if (storedEmail === email && storedPassword === password) {
          Alert.alert('Login successful!');
          navigation.navigate('Homepage'); // Replace 'HomePage' with your app's home screen
        } else {
          Alert.alert('Invalid email or password');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.modalTitle}>
        {formType === 'SignUp' ? 'Sign Up' : 'Log In'}
      </Text>
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
      <Button
        title={formType === 'SignUp' ? 'Already have an account? Login' : 'Need an account? Sign Up'}
        onPress={() => setFormType(formType === 'SignUp' ? 'Login' : 'SignUp')}
      />
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
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
