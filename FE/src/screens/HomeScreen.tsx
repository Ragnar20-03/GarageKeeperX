import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/background.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to XYZ Garage</Text>
        <Text style={styles.subtitle}>Your trusted service partner</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  backgroundImage: { position: "absolute", width: "100%", height: "100%" },
  overlay: {
    backgroundColor: "rgba(0, 128, 128, 0.7)",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "white" },
});

export default HomeScreen;
