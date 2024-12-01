import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const GoogleSignInButton = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '775307568343-1a9541h2rtidq0jtllcfntl3q07867p3.apps.googleusercontent.com', // Replace with your actual webClientId
      offlineAccess: true, // Access Google APIs on behalf of the user from your server
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices(); // Ensures Google Play services are available
      const userInfo = await GoogleSignin.signIn(); // Get the sign-in response
      console.log('Google Sign-In Success:', userInfo); // Logs the entire user info object
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error during Google Sign-In:', error.message);
      } else if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
        console.error('User cancelled the sign-in process');
      } else if ((error as any).code === statusCodes.IN_PROGRESS) {
        console.error('Sign-in is already in progress');
      } else {
        console.error('Unknown error occurred during sign-in');
      }
    }
  };

  return (
    <View>
      <TouchableOpacity style={styles.signInButton} onPress={signIn}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signInButton: {
    width: 250,
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  buttonText: {
    color: '#4285F4',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GoogleSignInButton;
