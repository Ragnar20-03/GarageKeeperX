import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Email" style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry style={styles.input} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Main")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* @ts-ignore */}
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.link}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: 250,
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "teal",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16 },
  link: { color: "teal", marginTop: 10 },
});

export default LoginScreen;
