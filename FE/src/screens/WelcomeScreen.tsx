import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/background.jpg")}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Welcome to XYZ Garage</Text>
        <TouchableOpacity
          style={styles.button}
          // @ts-ignore
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          // @ts-ignore
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.guestButton}
          // @ts-ignore
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>
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
  logo: { width: 100, height: 100, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "white", marginBottom: 20 },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "teal", fontSize: 16 },
  guestButton: { padding: 10, borderRadius: 5, marginTop: 10 },
  guestButtonText: { color: "white", fontSize: 16 },
});

export default WelcomeScreen;
