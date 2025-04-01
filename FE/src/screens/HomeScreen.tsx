"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

// Sample services data
const services = [
  {
    id: 1,
    title: "Car Wash",
    description: "Premium cleaning services",
    icon: "🚿",
  },
  {
    id: 2,
    title: "Maintenance",
    description: "Regular vehicle checkups",
    icon: "🔧",
  },
  {
    id: 3,
    title: "Repairs",
    description: "Fix any vehicle issues",
    icon: "🛠️",
  },
  {
    id: 4,
    title: "Painting",
    description: "Professional auto painting",
    icon: "🎨",
  },
];

// Sample testimonials data
const testimonials = [
  {
    id: 1,
    name: "John Smith",
    rating: 5,
    comment:
      "Excellent service! My car looks brand new after their premium wash.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 5,
    comment: "The team was professional and fixed my car's issues quickly.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Michael Brown",
    rating: 4,
    comment: "Great maintenance service. Will definitely come back!",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
];

const TypewriterText = ({
  text,
  speed = 50,
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

  return <Text style={styles.heroSubtitle}>{displayedText}</Text>;
};

// Star Rating Component
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Text key={star} style={styles.star}>
          {star <= rating ? "★" : "☆"}
        </Text>
      ))}
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const heroTagline = "Your one-stop solution for all automotive needs";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a2a3a" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Hero Section */}
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          }}
          style={styles.heroBackground}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "rgba(0,0,0,0.5)"]}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Auto Excellence</Text>
              <TypewriterText text={heroTagline} />
              <TouchableOpacity
                style={styles.heroButton}
                // @ts-ignore
                onPress={() => navigation.navigate("Services")}
              >
                <Text style={styles.heroButtonText}>Explore Services</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>

        {/* What We Offer Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>What We Offer</Text>
          <View style={styles.servicesGrid}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.id}
                style={styles.serviceCard}
                // @ts-ignore
                onPress={() =>
                  navigation.navigate("ServiceDetail", { service })
                }
              >
                <Text style={styles.serviceIcon}>{service.icon}</Text>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.viewAllButton}
            // @ts-ignore
            onPress={() => navigation.navigate("Services")}
          >
            <Text style={styles.viewAllButtonText}>View All Services</Text>
          </TouchableOpacity>
        </View>

        {/* Why Choose Us Section */}
        <View style={styles.whyChooseUsSection}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>⏱️</Text>
              </View>
              <Text style={styles.featureTitle}>Fast Service</Text>
              <Text style={styles.featureDescription}>
                Quick turnaround on all services
              </Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>💰</Text>
              </View>
              <Text style={styles.featureTitle}>Best Prices</Text>
              <Text style={styles.featureDescription}>
                Competitive rates in the market
              </Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Text style={styles.featureIcon}>🏆</Text>
              </View>
              <Text style={styles.featureTitle}>Expert Team</Text>
              <Text style={styles.featureDescription}>
                Certified professionals
              </Text>
            </View>
          </View>
        </View>

        {/* Testimonials Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>What Our Clients Say</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.testimonialContainer}
          >
            {testimonials.map((testimonial) => (
              <View key={testimonial.id} style={styles.testimonialCard}>
                <Image
                  source={{ uri: testimonial.avatar }}
                  style={styles.testimonialAvatar}
                />
                <Text style={styles.testimonialName}>{testimonial.name}</Text>
                <StarRating rating={testimonial.rating} />
                <Text style={styles.testimonialComment}>
                  "{testimonial.comment}"
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaTitle}>Ready to get started?</Text>
          <Text style={styles.ctaSubtitle}>
            Book an appointment or contact us today
          </Text>
          <TouchableOpacity
            style={styles.ctaButton}
            // @ts-ignore
            onPress={() => navigation.navigate("Booking")}
          >
            <Text style={styles.ctaButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.footerButton}
          // @ts-ignore
          onPress={() => navigation.navigate("Contact")}
        >
          <Text style={styles.footerButtonText}>Contact Us</Text>
        </TouchableOpacity>
        <Text style={styles.copyright}>
          © 2023 Auto Excellence. All rights reserved.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 70, // Space for footer
  },
  // Hero Section
  heroBackground: {
    height: 300,
    width: "100%",
  },
  heroGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heroContent: {
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#f0f0f0",
    textAlign: "center",
    marginBottom: 25,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  heroButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  heroButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Section Styling
  sectionContainer: {
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 20,
    textAlign: "center",
  },
  // Services Grid
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    width: width / 2 - 30,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
    textAlign: "center",
  },
  serviceDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
  },
  viewAllButton: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: 10,
  },
  viewAllButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  // Why Choose Us Section
  whyChooseUsSection: {
    padding: 20,
    backgroundColor: "#ecf0f1",
    marginBottom: 20,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featureItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 12,
    color: "#7f8c8d",
    textAlign: "center",
  },
  // Testimonials
  testimonialContainer: {
    paddingBottom: 10,
  },
  testimonialCard: {
    width: width * 0.8,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  testimonialAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  testimonialName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  star: {
    fontSize: 18,
    color: "#f39c12",
    marginHorizontal: 2,
  },
  testimonialComment: {
    fontSize: 14,
    color: "#7f8c8d",
    textAlign: "center",
    fontStyle: "italic",
  },
  // Call to Action
  ctaContainer: {
    backgroundColor: "#2c3e50",
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: 16,
    color: "#ecf0f1",
    marginBottom: 20,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  ctaButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 0,
    width: width,
    backgroundColor: "#1a2a3a",
    padding: 15,
    alignItems: "center",
  },
  footerButton: {
    marginBottom: 5,
  },
  footerButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "500",
  },
  copyright: {
    color: "#95a5a6",
    fontSize: 12,
  },
});

export default HomeScreen;
