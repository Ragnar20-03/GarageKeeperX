import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BookingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Bookings Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 20,
    color: "#34495e",
  },
});

export default BookingsScreen;
