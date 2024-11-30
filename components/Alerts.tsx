import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Navbar from './Navbar';

// Define the structure of an alert object
interface Alert {
  _id: string;
  title: string;
  description: string;
  category: string;
  radius: number;
  waitTime: string;
  region: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  createdAt: string;
}

const Alerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://10.0.2.2:5000/api/requests/get'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Alert[] = await response.json();
        setAlerts(data);
      } catch (err) {
        console.error('Error fetching alerts:', err);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#ff7d5a', '#ffb649']} style={styles.header}>
        <Text style={styles.headerText}>Alerts</Text>
      </LinearGradient>

      {/* Alerts */}
      <ScrollView style={styles.scrollView}>
        {alerts.map((alert) => (
          <TouchableOpacity key={alert._id} style={styles.card}>
            <Text style={styles.cardTitle}>{alert.title}</Text>
            <Text style={styles.cardText}>Description: {alert.description}</Text>
            <Text style={styles.cardText}>Category: {alert.category}</Text>
            <Text style={styles.cardText}>Radius: {alert.radius} meters</Text>
            <Text style={styles.cardText}>Wait Time: {alert.waitTime}</Text>
            <Text style={styles.cardText}>
              Region: Lat {alert.region.latitude}, Lng {alert.region.longitude}
            </Text>
            <Text style={styles.cardText}>
              Created At: {new Date(alert.createdAt).toLocaleString()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f1f8',
    paddingTop: 50,
  },
  header: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 3,
  },
});

export default Alerts;
