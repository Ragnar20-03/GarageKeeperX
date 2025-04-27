import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import AdminHomeScreen from "./AdminHomeScreen";
import PreviousBookingsScreen from "./PreviousBookingsScreen";

const Tab = createBottomTabNavigator();

// Custom tab bar icon component
const TabIcon = ({ focused, name }: { focused: boolean; name: string }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 10,
    }}
  >
    <Text
      style={{
        color: focused ? "#e74c3c" : "#95a5a6",
        fontSize: 12,
        fontWeight: focused ? "bold" : "normal",
      }}
    >
      {name}
    </Text>
  </View>
);

const AdminNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#2c3e50",
            borderTopWidth: 0,
            elevation: 10,
            height: 60,
            paddingBottom: 10,
          },
          tabBarActiveTintColor: "#e74c3c",
          tabBarInactiveTintColor: "#95a5a6",
          headerStyle: {
            backgroundColor: "#2c3e50",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: "#ffffff",
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
        }}
      >
        <Tab.Screen
          name="Current Bookings"
          component={AdminHomeScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="Current" />
            ),
          }}
        />
        <Tab.Screen
          name="Previous Bookings"
          component={PreviousBookingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="Previous" />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AdminNavigator;
