import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ServicesScreen from "../screens/ServiceScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { View, Text } from "react-native";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Services" component={ServicesScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name="Dashboard" component={TabNavigator} />
    <Drawer.Screen
      name="Previous Bookings"
      component={() => (
        <View>
          <Text>Bookings</Text>
        </View>
      )}
    />
    <Drawer.Screen
      name="Payments"
      component={() => (
        <View>
          <Text>Payments</Text>
        </View>
      )}
    />
    <Drawer.Screen
      name="Support"
      component={() => (
        <View>
          <Text>Support</Text>
        </View>
      )}
    />
    <Drawer.Screen
      name="Settings"
      component={() => (
        <View>
          <Text>Settings</Text>
        </View>
      )}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;
