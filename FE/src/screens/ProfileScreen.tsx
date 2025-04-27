import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Switch,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Feather, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [name, setName] = useState("Guest");
  const [userData, setUserdata] = useState<any>({});
  // Mock user data - replace with actual user data from your auth system
  const user = {
    name: "Roshan Patil",
    email: "roshanpp20@gmail.com",
    phone: "+1 (123) 456-7890",
    joinDate: "January 2023",
    profileImage: "",
    bookings: 8,
    favorites: 3,
    reviews: 5,
  };
  useEffect(() => {
    const fetchBookings = () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const bookingsRef = collection(db, "users");
      const bookingsQuery = query(
        bookingsRef,
        where("userId", "==", currentUser?.uid) // Fetch bookings of this user only
      );

      const unsubscribe = onSnapshot(bookingsQuery, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        //@ts-ignore
        setUserdata(data[0]);
        console.log(" uid is ; ", auth.currentUser?.uid);

        console.log("userdata is : ", userData);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchBookings();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const toggleDarkMode = () => setDarkMode((previousState) => !previousState);
  const toggleNotifications = () =>
    setNotifications((previousState) => !previousState);

  const menuItems = [
    {
      icon: <Feather name="user" size={22} color="#3498db" />,
      title: "Personal Information",
      subtitle: "Update your personal details",
      action: () => console.log("Navigate to Personal Info"),
    },
    {
      icon: <Feather name="clock" size={22} color="#3498db" />,
      title: "Booking History",
      subtitle: "View your previous bookings",
      action: () => console.log("Navigate to Booking History"),
    },
    {
      icon: <Feather name="credit-card" size={22} color="#3498db" />,
      title: "Payment Methods",
      subtitle: "Manage your payment options",
      action: () => console.log("Navigate to Payment Methods"),
    },
    {
      icon: <Feather name="help-circle" size={22} color="#3498db" />,
      title: "Help & Support",
      subtitle: "Get assistance and FAQs",
      action: () => console.log("Navigate to Help & Support"),
    },
    {
      icon: <Feather name="info" size={22} color="#3498db" />,
      title: "About GarageKepperX",
      subtitle: "Learn more about our services",
      action: () => console.log("Navigate to About"),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header with profile info */}
        <View style={styles.header}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: user.profileImage }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Feather name="camera" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            {/* @ts-ignore */}
            <Text style={styles.userName}>{userData.fullName}</Text>
            {/* @ts-ignore */}

            <Text style={styles.userEmail}>{userData.email}</Text>
            <Text style={styles.memberSince}>Member since {user.joinDate}</Text>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user.bookings}</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user.favorites}</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{user.reviews}</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        {/* Settings section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="moon-outline"
                size={22}
                color="#3498db"
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#bde0fe" }}
              thumbColor={darkMode ? "#3498db" : "#f4f3f4"}
              ios_backgroundColor="#e0e0e0"
              onValueChange={toggleDarkMode}
              value={darkMode}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#3498db"
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: "#e0e0e0", true: "#bde0fe" }}
              thumbColor={notifications ? "#3498db" : "#f4f3f4"}
              ios_backgroundColor="#e0e0e0"
              onValueChange={toggleNotifications}
              value={notifications}
            />
          </View>
        </View>

        {/* Menu items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 ? styles.lastMenuItem : null,
              ]}
              onPress={item.action}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconContainer}>{item.icon}</View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuItemTitle}>{item.title}</Text>
                  <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#bbb" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout button */}
        <TouchableOpacity
          style={styles.logoutButton}
          // onPress={() => navigation.naviagte("Login")}
        >
          <Feather
            name="log-out"
            size={18}
            color="#e74c3c"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#ffffff",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#3498db",
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#3498db",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  profileInfo: {
    alignItems: "center",
    marginBottom: 15,
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  memberSince: {
    fontSize: 12,
    color: "#95a5a6",
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
  },
  editProfileText: {
    color: "#2c3e50",
    fontWeight: "500",
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: "80%",
    backgroundColor: "#f0f0f0",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#7f8c8d",
  },
  section: {
    backgroundColor: "#ffffff",
    marginTop: 20,
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f8ff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: 3,
  },
  menuItemSubtitle: {
    fontSize: 12,
    color: "#95a5a6",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff8f8",
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ffebeb",
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    color: "#e74c3c",
    fontWeight: "600",
    fontSize: 16,
  },
  versionText: {
    textAlign: "center",
    fontSize: 12,
    color: "#95a5a6",
    marginBottom: 30,
  },
});

export default ProfileScreen;
