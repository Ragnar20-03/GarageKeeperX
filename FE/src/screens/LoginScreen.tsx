// src/screens/LoginScreen.tsx
"use client";

import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";

import { allowedEmail, allowedPasswword, logo_png } from "../links";
import { auth } from "../firebaseConfig";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    // Form validation

    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Please enter your password");
      return;
    }

    setLoading(true);

    try {
      // Simulating authentication error for demonstration
      if (email === "error@example.com") {
        throw { code: "auth/user-not-found" };
      }
      if (password === "wrongpassword") {
        throw { code: "auth/wrong-password" };
      }
      const allowedMusicianEmail = allowedEmail;
      const allowedMusicianPassword = allowedPasswword;
      if (
        isAdmin &&
        email === allowedMusicianEmail &&
        password === allowedMusicianPassword
      ) {
        Alert.alert("Access Granted", "You are  authorized as the Admin.", [
          {
            text: "Ok",
            onPress: () => navigation.navigate("Admin"),
          },
        ]);
        return;
      }
      // Uncomment for actual Firebase implementation
      await signInWithEmailAndPassword(auth, email, password);

      console.log("Login successful");
      Alert.alert("Login Successful", "", [
        {
          text: "OK",
          onPress: () => navigation.navigate("User"),
        },
      ]);
    } catch (error: any) {
      console.log(error);

      // Handle specific Firebase auth errors
      if (error.code === "auth/user-not-found") {
        Alert.alert("Login Failed", "No account found with this email address");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Login Failed", "Incorrect password");
      } else if (error.code === "auth/invalid-email") {
        Alert.alert("Login Failed", "Invalid email address");
      } else if (error.code === "auth/user-disabled") {
        Alert.alert("Login Failed", "This account has been disabled");
      } else if (error.code === "auth/too-many-requests") {
        Alert.alert(
          "Login Failed",
          "Too many failed login attempts. Please try again later or reset your password"
        );
      } else {
        console.log("error is : ", error);

        Alert.alert(
          "Login Failed",
          "An error occurred during login. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.logoContainer}>
            <Image source={{ uri: logo_png }} style={styles.logo} />
            <Text style={styles.appTitle}>GarageKepper</Text>
            <Text style={styles.appSubtitle}>Book your Car Service</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.welcomeText}>Welcome Back</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Enter your password"
                editable={!loading}
              />
            </View>

            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>
                {isAdmin ? "Admin Login" : "User Login"}
              </Text>
              <Switch
                value={isAdmin}
                onValueChange={setisAdmin}
                trackColor={{ false: "#e0e0e0", true: "#c9a0dc" }}
                thumbColor={isAdmin ? "#8a2be2" : "#f4f3f4"}
                disabled={loading}
              />
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.disabledButton]}
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>
                {loading ? "Logging in..." : "Login"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPasswordContainer}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                disabled={loading}
              >
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
    color: "#8a2be2",
  },
  appSubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  formContainer: {
    width: "100%",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  switchLabel: {
    fontSize: 16,
    color: "#555",
  },
  loginButton: {
    backgroundColor: "#8a2be2",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  disabledButton: {
    backgroundColor: "#c9a0dc",
    opacity: 0.7,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#8a2be2",
    fontSize: 14,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  registerText: {
    color: "#666",
    fontSize: 16,
  },
  registerLink: {
    color: "#8a2be2",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
