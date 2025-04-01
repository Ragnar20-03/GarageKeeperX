import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView } from "react-native";
import axios from "axios";

const PreviousBookingsScreen = () => {
  const [bookings, setBookings] = useState<any[]>([]); // Assuming bookings is an array

  useEffect(() => {
    // Make sure to update the URL with your correct API endpoint if needed
    axios
      .get("http://192.168.29.29:5100/api/v1/admin/get-bookings")
      .then((res) => {
        console.log("response is : ", res.data.bookings);
        setBookings(res.data.bookings); // Assuming the response has an array of bookings
      })
      .catch((error) => {
        console.error("Error fetching bookings", error);
      });
  }, []);

  // Render each booking
  const renderBookingItem = ({ item }: { item: any }) => (
    <View style={styles.bookingCard}>
      <Text style={styles.bookingTitle}>
        Roshan
        {item.cname} ({item.carno})
      </Text>
      <Text style={styles.bookingDetail}>Service: {item.service}</Text>
      <Text style={styles.bookingDetail}>Address: {item.address}</Text>
      <Text style={styles.bookingDetail}>Time: {item.time}</Text>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Previous Bookings</Text>

      {/* Using FlatList for better performance when rendering a list */}
      <FlatList
        data={bookings} // Passing the bookings array to the FlatList
        renderItem={renderBookingItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#34495e",
  },
  bookingCard: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  bookingDetail: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 5,
  },
});

export default PreviousBookingsScreen;
