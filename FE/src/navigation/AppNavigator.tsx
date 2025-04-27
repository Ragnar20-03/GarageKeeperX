import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServiceScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BookingsScreen from "../screens/BookingScreens"; // New Screen
import RegisterScreen from "../screens/RegisterScreen"; // Register Screen
import LoginScreen from "../screens/LoginScreen"; // Login Screen
import AdminPanel from "../screens/Admin"; // Admin Panel Screen
import PreviousBookingsScreen from "../screens/PreviousBookingScreens";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Stack Navigator for Authentication flow

// Bottom Tab Navigator (for Home, Services, Profile)
const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;

        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Services") {
          iconName = "briefcase";
        } else if (route.name === "Profile") {
          iconName = "person";
        } else if (route.name === "PreviousBookings") {
          iconName = "card";
        }

        //@ts-ignore
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerTitleAlign: "left", // Align header title to the left
      headerTitle: "", // Set the title for the header
      tabBarActiveTintColor: "tomato", // Active tab color
      tabBarInactiveTintColor: "gray", // Inactive tab color
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Services" component={ServicesScreen} />
    <Tab.Screen name="PreviousBookings" component={PreviousBookingsScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Stack Navigator for Authentication (Login, Register)
const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login" // Set initial route to Login
      screenOptions={{ headerShown: false }} // Optionally hide the header
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

// Main App Navigator (with Authentication and App Flow)
const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* Authentication Flow */}
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={AuthStack} />

        {/* After successful login, show the main app */}
        <Stack.Screen name="User" component={AppTabs} />
        <Stack.Screen name="Admin" component={AdminPanel} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
