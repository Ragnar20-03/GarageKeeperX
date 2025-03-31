import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        // source={require("../assets/profile.jpg")}
        //@ts-ignore
        source={
          "https://media.istockphoto.com/id/2187191297/photo/car-with-optics-in-foam-at-the-car-wash-in-the-garage-car-care-and-car-wash-in-the-detailing.webp?a=1&b=1&s=612x612&w=0&k=20&c=jSbJcuuNJ0qhykdya9z9TLOpvEnTcTjWtuecCSLCoHE="
        }
        style={styles.profileImage}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
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
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  email: { fontSize: 16, color: "gray", marginBottom: 20 },
  button: {
    backgroundColor: "teal",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16 },
});

export default ProfileScreen;
