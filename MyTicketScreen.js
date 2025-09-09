import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { colors } from './constants';
import { ArrowLeft, MoreVertical, ArrowRight, Bell, Clock, FileText, ChevronRight } from 'lucide-react-native';

export default function MyTicketScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={18} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Ticket</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MoreVertical size={18} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Boarding Pass Title */}
        <Text style={styles.boardingPassTitle}>Boarding Pass</Text>

        {/* Boarding Pass Card */}
        <View style={styles.boardingCard}>
          <View style={styles.flightRoute}>
            <View style={styles.departureInfo}>
              <Text style={styles.cityLabel}>Jakarta</Text>
              <Text style={styles.airport}>CGK</Text>
              <Text style={styles.time}>14:35</Text>
            </View>
            
            <View style={styles.flightPath}>
              <ArrowRight size={20} color="#fff" style={styles.planeIcon} />
              <View style={styles.dottedLine} />
              <Text style={styles.duration}>16h 30m</Text>
              <View style={styles.dottedLine} />
            </View>
            
            <View style={styles.arrivalInfo}>
              <Text style={styles.cityLabel}>Warsaw</Text>
              <Text style={styles.airport}>WAW</Text>
              <Text style={styles.time}>15:45</Text>
            </View>
          </View>

          <View style={styles.flightDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Class</Text>
              <Text style={styles.detailValue}>Economy</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Terminal</Text>
              <Text style={styles.detailValue}>F2</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Gate</Text>
              <Text style={styles.detailValue}>32</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Seat</Text>
              <Text style={styles.detailValue}>8A</Text>
            </View>
          </View>
        </View>

        {/* Ticket Code */}
        <Text style={styles.ticketCodeText}>Ticket Code: C7G2K679H92</Text>

        {/* Barcode */}
        <View style={styles.barcodeContainer}>
          <View style={styles.barcode}>
            <Text style={styles.barcodeLines}>||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||</Text>
          </View>
          <Text style={styles.barcodeSubtext}>Scan this code to retrieve your ticket at the departure</Text>
        </View>

        {/* Download Button */}
        <TouchableOpacity style={styles.downloadButton}>
          <Text style={styles.downloadText}>Download E-Ticket</Text>
        </TouchableOpacity>

        {/* Flight Alerts Section */}
        <TouchableOpacity style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Bell size={18} color="#000" />
            </View>
            <Text style={styles.sectionTitle}>Flight Alerts</Text>
          </View>
          <ChevronRight size={18} color="#ccc" />
        </TouchableOpacity>

        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Gate Change</Text>
          <Text style={styles.alertMessage}>Your departure gate has been changed from F1 to F2</Text>
          <Text style={styles.alertTime}>2 hours ago</Text>
        </View>

        <View style={styles.alertCard}>
          <Text style={styles.alertTitle}>Check-in Available</Text>
          <Text style={styles.alertMessage}>Online check-in is now available for your flight</Text>
          <Text style={styles.alertTime}>6 hours ago</Text>
        </View>

        {/* Timeline Section */}
        <TouchableOpacity style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Clock size={18} color="#000" />
            </View>
            <Text style={styles.sectionTitle}>Timeline</Text>
          </View>
          <ChevronRight size={18} color="#ccc" />
        </TouchableOpacity>

        <View style={styles.timelineCard}>
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Check-in Closes</Text>
              <Text style={styles.timelineTime}>13:35 (1 hour before departure)</Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={[styles.timelineDot, styles.timelineDotActive]} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Boarding Begins</Text>
              <Text style={styles.timelineTime}>14:05 (30 mins before departure)</Text>
            </View>
          </View>
          <View style={styles.timelineItem}>
            <View style={styles.timelineDot} />
            <View style={styles.timelineContent}>
              <Text style={styles.timelineTitle}>Departure</Text>
              <Text style={styles.timelineTime}>14:35</Text>
            </View>
          </View>
        </View>

        {/* Travel Docs Section */}
        <TouchableOpacity style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <FileText size={18} color="#000" />
            </View>
            <Text style={styles.sectionTitle}>Travel Docs</Text>
          </View>
          <ChevronRight size={18} color="#ccc" />
        </TouchableOpacity>

        <View style={styles.docCard}>
          <Text style={styles.docTitle}>Passport Required</Text>
          <Text style={styles.docMessage}>Make sure your passport is valid for at least 6 months</Text>
          <TouchableOpacity style={styles.docButton}>
            <Text style={styles.docButtonText}>View Requirements</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.docCard}>
          <Text style={styles.docTitle}>Visa Information</Text>
          <Text style={styles.docMessage}>No visa required for your destination</Text>
          <TouchableOpacity style={styles.docButton}>
            <Text style={styles.docButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.docCard}>
          <Text style={styles.docTitle}>Travel Insurance</Text>
          <Text style={styles.docMessage}>Consider purchasing travel insurance for your trip</Text>
          <TouchableOpacity style={styles.docButton}>
            <Text style={styles.docButtonText}>Get Quote</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop: 32, // Add extra space below the status bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backArrow: {
    fontSize: 18,
    color: '#000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuDots: {
    fontSize: 18,
    color: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  boardingPassTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  boardingCard: {
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  flightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  departureInfo: {
    alignItems: 'flex-start',
    flex: 1,
  },
  arrivalInfo: {
    alignItems: 'flex-end',
    flex: 1,
  },
  cityLabel: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
    opacity: 0.8,
  },
  airport: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  time: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  flightPath: {
    flex: 2,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  planeIcon: {
    fontSize: 20,
    marginBottom: 8,
    transform: [{ rotate: '45deg' }],
  },
  dottedLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    opacity: 0.5,
    marginVertical: 4,
  },
  duration: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginVertical: 4,
  },
  flightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  ticketCodeText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  barcodeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  barcode: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  barcodeLines: {
    fontSize: 8,
    color: '#000',
    letterSpacing: 0,
    lineHeight: 20,
  },
  barcodeSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  downloadButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  downloadText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    fontSize: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  sectionArrow: {
    fontSize: 18,
    color: '#ccc',
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  alertTime: {
    fontSize: 12,
    color: '#999',
  },
  timelineCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e0e0e0',
    marginRight: 16,
  },
  timelineDotActive: {
    backgroundColor: '#4CAF50',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  timelineTime: {
    fontSize: 12,
    color: '#666',
  },
  docCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  docMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  docButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  docButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
});
