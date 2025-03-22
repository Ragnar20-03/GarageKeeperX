import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const App = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Garage Keeper</Text>

      {services.map((service, index) => (
        <View key={index} style={styles.serviceContainer}>
          <Text style={styles.serviceTitle}>{service.name}</Text>
          <TouchableOpacity style={styles.serviceButton}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const services = [
  { name: "Car Washing" },
  { name: "Garage Services" },
  { name: "Wheel Alignment" },
  { name: "Painting" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#fff", // White text
  },
  serviceContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#222", // Darker gray for contrast
    borderRadius: 8,
    shadowColor: "#fff", // Subtle white shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff", // White text
  },
  serviceButton: {
    marginTop: 10,
    paddingVertical: 12,
    backgroundColor: "#fff", // White button
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#000", // Black text for contrast
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default App;
