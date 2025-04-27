import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  Modal,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { db } from "../firebaseConfig";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";

const AdminPanel = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const bookingsRef = collection(db, "bookings");
    const unsubscribe = onSnapshot(bookingsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBookings(data);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (
    id: string,
    status: "approved" | "rejected"
  ) => {
    const bookingRef = doc(db, "bookings", id);
    await updateDoc(bookingRef, { status });
    setModalVisible(false);
  };

  const openBookingDetails = (booking: any) => {
    setSelectedBooking(booking);
    setModalVisible(true);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.card,
        item.status === "approved"
          ? styles.approvedCard
          : item.status === "rejected"
          ? styles.rejectedCard
          : styles.pendingCard,
      ]}
      onPress={() => openBookingDetails(item)}
    >
      <Text style={styles.title}>
        {item.service} - {item.carno}
      </Text>
      <Text style={styles.subtitle}>{item.address}</Text>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.statusText,
            item.status === "approved"
              ? styles.approvedText
              : item.status === "rejected"
              ? styles.rejectedText
              : styles.pendingText,
          ]}
        >
          {item.status ? item.status.toUpperCase() : "PENDING"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <Text style={styles.header}>Admin Panel - Manage Bookings</Text>

      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              {selectedBooking && (
                <>
                  <Text style={styles.modalHeader}>Booking Details</Text>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Service:</Text>
                    <Text style={styles.detailValue}>
                      {selectedBooking.service}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Car Number:</Text>
                    <Text style={styles.detailValue}>
                      {selectedBooking.carno}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Address:</Text>
                    <Text style={styles.detailValue}>
                      {selectedBooking.address}
                    </Text>
                  </View>

                  {selectedBooking.time && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Time:</Text>
                      <Text style={styles.detailValue}>
                        {selectedBooking.time}
                      </Text>
                    </View>
                  )}

                  {selectedBooking.phone && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Phone:</Text>
                      <Text style={styles.detailValue}>
                        {selectedBooking.phone}
                      </Text>
                    </View>
                  )}

                  {selectedBooking.email && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Email:</Text>
                      <Text style={styles.detailValue}>
                        {selectedBooking.email}
                      </Text>
                    </View>
                  )}

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Status:</Text>
                    <Text
                      style={[
                        styles.detailValue,
                        selectedBooking.status === "approved"
                          ? styles.approvedText
                          : selectedBooking.status === "rejected"
                          ? styles.rejectedText
                          : styles.pendingText,
                      ]}
                    >
                      {selectedBooking.status
                        ? selectedBooking.status.toUpperCase()
                        : "PENDING"}
                    </Text>
                  </View>

                  {!selectedBooking.status ||
                  selectedBooking.status === "pending" ? (
                    <View style={styles.modalActions}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.approveButton]}
                        onPress={() =>
                          handleStatusChange(selectedBooking.id, "approved")
                        }
                      >
                        <Text style={styles.actionButtonText}>Approve</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.actionButton, styles.rejectButton]}
                        onPress={() =>
                          handleStatusChange(selectedBooking.id, "rejected")
                        }
                      >
                        <Text style={styles.actionButtonText}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text style={styles.alreadyProcessed}>
                      This booking has already been {selectedBooking.status}
                    </Text>
                  )}
                </>
              )}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#343a40",
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pendingCard: {
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: "#ffc107",
  },
  approvedCard: {
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: "#28a745",
  },
  rejectedCard: {
    backgroundColor: "#fff",
    borderLeftWidth: 4,
    borderLeftColor: "#dc3545",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
  },
  subtitle: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 4,
  },
  statusContainer: {
    marginTop: 8,
    alignItems: "flex-end",
  },
  statusText: {
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
    fontSize: 12,
  },
  pendingText: {
    color: "#ffc107",
  },
  approvedText: {
    color: "#28a745",
  },
  rejectedText: {
    color: "#dc3545",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#212529",
    textAlign: "center",
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    paddingBottom: 8,
  },
  detailLabel: {
    width: "35%",
    fontWeight: "bold",
    color: "#495057",
  },
  detailValue: {
    flex: 1,
    color: "#212529",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 6,
  },
  approveButton: {
    backgroundColor: "#28a745",
  },
  rejectButton: {
    backgroundColor: "#dc3545",
  },
  actionButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#6c757d",
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  alreadyProcessed: {
    textAlign: "center",
    marginTop: 16,
    padding: 12,
    backgroundColor: "#e9ecef",
    borderRadius: 8,
    color: "#495057",
    fontStyle: "italic",
  },
});

export default AdminPanel;
