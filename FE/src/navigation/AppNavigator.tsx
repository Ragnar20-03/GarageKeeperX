import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServiceScreen";
import ProfileScreen from "../screens/ProfileScreen";
import BookingsScreen from "../screens/BookingScreens"; // New Screen
import PreviousBookingsScreen from "../screens/PreviousBookingScreens"; // New Screen

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Bottom Tab Navigator (for Home, Services, Profile)
const AppTabs = ({ navigation }: any) => (
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
        }

        //@ts-ignore
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      headerTitleAlign: "left", // Align header title to the left
      headerTitle: "GarageKeeper", // Set the title for the header
      tabBarActiveTintColor: "tomato", // Active tab color
      tabBarInactiveTintColor: "gray", // Inactive tab color
      headerLeft: () => (
        <Ionicons
          name="menu" // Hamburger icon
          size={30}
          color="black"
          style={{ marginLeft: 15 }}
          onPress={() => navigation.openDrawer()} // Open the drawer when clicked
        />
      ),
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Services" component={ServicesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

// Drawer Navigator (Sidebar Navigation with Bookings, Previous Bookings)
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false, // Hide the header in the Drawer Navigator
        }}
      >
        <Drawer.Screen name="Home" component={AppTabs} />
        <Drawer.Screen name="Bookings" component={BookingsScreen} />
        <Drawer.Screen
          name="Previous Bookings"
          component={PreviousBookingsScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
