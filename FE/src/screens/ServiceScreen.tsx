"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from "react-native";

// Get screen dimensions for responsive design
const { width, height } = Dimensions.get("window");

// GarageKepperX Services Data
const servicesData = [
  {
    title: "Car Wash",
    description: "Premium car wash services for a spotless ride.",
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2FyJTIwd2FzaHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    title: "Garage Services",
    description: "Complete car maintenance and repair solutions.",
    image:
      "https://plus.unsplash.com/premium_photo-1682146865378-788d61feb4fd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z2FyYWdlfGVufDB8fDB8fHww",
  },
  {
    title: "Painting",
    description: "Professional car painting and detailing.",
    image:
      "https://media.istockphoto.com/id/1203343517/photo/car-painting.webp?a=1&b=1&s=612x612&w=0&k=20&c=87FbqCvQMOG1559Zf4v7-VpSBdYHkU96wUSQC5oha9Q=",
  },
  {
    title: "Wheel Alignment",
    description: "Precision wheel alignment for a smoother drive.",
    image:
      "https://plus.unsplash.com/premium_photo-1694518728867-cb2471ee3b21?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdoZWVsJTIwYWxpZ25tZW50fGVufDB8fDB8fHww",
  },
];

// TypewriterText component for the about section
const TypewriterText = ({
  text,
  speed = 100,
}: {
  text: string;
  speed?: number;
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return <Text style={styles.aboutText}>{displayedText}</Text>;
};

const ServiceScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [carPlate, setCarPlate] = useState("");
  const [address, setAddress] = useState("");
  const [time, setTime] = useState("");

  const aboutUsText =
    "GaageKepperX is your trusted partner for all automotive maintenance and repair needs. With years of experience and a team of certified professionals, we ensure your vehicle receives the best care possible.";

  const handleBooking = () => {
    // Validate form fields
    if (!customerName || !phoneNumber || !email || !carPlate || !time) {
      alert("Please fill in all required fields");
      return;
    }

    // Reset form and close modal
    alert("Booking confirmed! We'll contact you shortly.");
    setCustomerName("");
    setPhoneNumber("");
    setEmail("");
    setCarPlate("");
    setAddress("");
    setTime("");
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}

        {/* Services Section */}
        <Text style={styles.servicesHeader}>Our Services</Text>
        <View style={styles.servicesContainer}>
          {servicesData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.serviceCard}
              activeOpacity={0.8}
              onPress={() => {
                setSelectedService(item.title);
                setIsModalVisible(true);
              }}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => {
                    setSelectedService(item.title);
                    setIsModalVisible(true);
                  }}
                >
                  <Text style={styles.viewButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Contact Us</Text>
          <Text style={styles.footerText}>Email: info@gaagekepperx.com</Text>
          <Text style={styles.footerText}>Phone: (123) 456-7890</Text>
          <Text style={styles.footerText}>
            Address: 123 Auto Lane, Car City
          </Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Send Message</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Booking Modal */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book {selectedService}</Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer}>
              <Text style={styles.inputLabel}>Full Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={customerName}
                onChangeText={setCustomerName}
              />

              <Text style={styles.inputLabel}>Phone Number *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />

              <Text style={styles.inputLabel}>Email *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <Text style={styles.inputLabel}>Car Number Plate *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your car plate number"
                value={carPlate}
                onChangeText={setCarPlate}
              />

              <Text style={styles.inputLabel}>Address</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Enter your address"
                value={address}
                onChangeText={setAddress}
                multiline={true}
                numberOfLines={3}
              />

              <Text style={styles.inputLabel}>Preferred Time *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Monday, 10:00 AM"
                value={time}
                onChangeText={setTime}
              />

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={handleBooking}
                >
                  <Text style={styles.bookButtonText}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
    paddingBottom: 30,
  },
  headerSection: {
    alignItems: "center",
    backgroundColor: "#2c3e50",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  brandName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: 1.5,
  },
  tagline: {
    fontSize: 16,
    color: "#ecf0f1",
    marginTop: 8,
    textAlign: "center",
    fontStyle: "italic",
  },
  aboutSection: {
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#34495e",
  },
  servicesHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  servicesContainer: {
    paddingHorizontal: 20,
  },
  serviceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
  cardContent: {
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 15,
  },
  viewButton: {
    backgroundColor: "#3498db",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 14,
  },
  footer: {
    backgroundColor: "#2c3e50",
    padding: 25,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  footerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 15,
  },
  footerText: {
    fontSize: 14,
    color: "#ecf0f1",
    marginBottom: 8,
  },
  contactButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 15,
  },
  contactButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: width * 0.9,
    maxHeight: height * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    color: "#7f8c8d",
    fontWeight: "bold",
  },
  formContainer: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#e0e0e0",
    paddingVertical: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#2c3e50",
    fontWeight: "600",
    fontSize: 16,
  },
  bookButton: {
    flex: 1,
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: "center",
  },
  bookButtonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ServiceScreen;
