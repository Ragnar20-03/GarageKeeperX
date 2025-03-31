import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const services = [
  { id: "1", name: "Car Wash", image: require("../assets/carwash.jpg") },
  { id: "2", name: "Garage Repair", image: require("../assets/garage.jpg") },
  { id: "3", name: "Painting", image: require("../assets/painting.jpg") },
  { id: "4", name: "Wheel Alignment", image: require("../assets/wheel.jpg") },
];
// const services = [
//   { id: "1", name: "Car Wash" },
//   { id: "2", name: "Garage Repair" },
//   { id: "3", name: "Painting" },
//   { id: "4", name: "Wheel Alignment" },
// ];
const ServicesScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              //@ts-ignore
              source={
                "https://media.istockphoto.com/id/2187191297/photo/car-with-optics-in-foam-at-the-car-wash-in-the-garage-car-care-and-car-wash-in-the-detailing.webp?a=1&b=1&s=612x612&w=0&k=20&c=jSbJcuuNJ0qhykdya9z9TLOpvEnTcTjWtuecCSLCoHE="
              }
              style={styles.image}
            />
            <Text style={styles.text}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "white" },
  card: {
    backgroundColor: "teal",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  image: { width: 100, height: 100, borderRadius: 8, marginBottom: 10 },
  text: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default ServicesScreen;
