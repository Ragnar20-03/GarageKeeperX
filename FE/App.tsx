import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = new Animated.Value(1); // Initial opacity = 1 (fully visible)

  useEffect(() => {
    // Simulate a loading process or delay before transitioning
    const timer = setTimeout(() => {
      // Start the fade-out animation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000, // 1 second
        useNativeDriver: true,
      }).start(() => {
        setIsLoading(false); // Set isLoading to false once animation completes
      });
    }, 2000); // 2 seconds delay before fade-out starts

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  if (isLoading) {
    return (
      <Animated.View style={[styles.splashContainer, { opacity: fadeAnim }]}>
        <Text style={styles.splashText}>Welcome to Garage Kepper 🚀</Text>
      </Animated.View>
    );
  }

  return <AppNavigator />;
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000", // Black background
  },
  splashText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // White text
  },
});

export default App;
