import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RequestTemplate = () => {
  const [isPreferencesView, setIsPreferencesView] = useState(false); // Toggle between views
  const [radius, setRadius] = useState(200); // Radius in meters
  const [waitTime, setWaitTime] = useState("15 mins");
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const handleNextPress = () => {
    setIsPreferencesView(true); // Switch to Preferences view
  };

  const handleBackPress = () => {
    if (isPreferencesView) {
      setIsPreferencesView(false); // Go back to form view
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable onPress={handleBackPress} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="black" />
      </Pressable>

      {/* Conditional rendering based on view */}
      {isPreferencesView ? (
        // Pooling Preferences View
        <>
          <View style={styles.mapContainer}>
            <MapView
              style={StyleSheet.absoluteFillObject}
              region={region}
              onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
            >
              <Marker coordinate={region} />
              <Circle
                center={region}
                radius={radius}
                strokeColor="rgba(255, 165, 0, 0.8)"
                fillColor="rgba(255, 165, 0, 0.3)"
              />
            </MapView>
          </View>

          <Text style={styles.title}>Set your Preferences</Text>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceBox}>
              <Text style={styles.preferenceLabel}>Radius</Text>
              <Text style={styles.preferenceValue}>{radius} mts</Text>
            </View>
            <View style={styles.preferenceBox}>
              <Text style={styles.preferenceLabel}>Wait Time</Text>
              <Text style={styles.preferenceValue}>{waitTime}</Text>
            </View>
          </View>

          <Text style={styles.poolingText}>Pooling with 0 users</Text>

          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Pooling</Text>
          </TouchableOpacity>
        </>
      ) : (
        // Request Form View
        <>
          <Text style={styles.title}>Request Vicinity</Text>
          <Text style={styles.subtitle}>
            Connect with people in your vicinity to pool anything and everything!
          </Text>

          <TouchableOpacity style={styles.pictureButton}>
            <Icon name="photo-camera" size={24} color="white" />
            <Text style={styles.pictureButtonText}>Click a picture (Optional)</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Enter Request Title"
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Describe your Request"
            placeholderTextColor="#999"
            multiline
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            placeholderTextColor="#999"
            value="Others"
          />

          <TouchableOpacity style={styles.nextButton} onPress={handleNextPress}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  pictureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6600',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  pictureButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF6600',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: 'black',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#D3D3D3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 18,
    color: 'white',
  },
  mapContainer: {
    height: 300,
    backgroundColor: '#f0f0f0', // Placeholder color for the map area
    borderRadius: 8,
    marginBottom: 20,
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  preferenceBox: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#FF6600',
    borderRadius: 8,
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  preferenceValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  poolingText: {
    fontSize: 16,
    color: '#FF6600',
    textAlign: 'center',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#FF6600',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default RequestTemplate;
