import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { MoreVertical, ArrowRight, Bell, Clock, FileText, ChevronRight } from 'lucide-react-native';
import { ThemeContext } from './App';

export default function MyTicketScreen() {
  const { theme } = useContext(ThemeContext);
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [docsOpen, setDocsOpen] = useState(false);
  const [timelineOpen, setTimelineOpen] = useState(false);

  // Helper for shiny effect
  const shinyStyle = theme.background === '#000' ? { backgroundColor: theme.card, borderWidth: 1, borderColor: '#222', shadowColor: '#fff', shadowOpacity: 0.15, shadowRadius: 12, elevation: 4, overflow: 'hidden' } : { backgroundColor: theme.card };
  const shinyButton = theme.background === '#000' ? { backgroundColor: theme.card, borderWidth: 1, borderColor: '#222', shadowColor: '#fff', shadowOpacity: 0.18, shadowRadius: 8, elevation: 2 } : { backgroundColor: theme.card };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}> 
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }] }>
        <View style={styles.headerSpacer} />
        <Text style={[styles.headerTitle, { color: theme.text }]}>My Ticket</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MoreVertical size={18} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
        {/* Boarding Pass Title */}
        <Text style={[styles.boardingPassTitle, { color: theme.text }]}>Boarding Pass</Text>

        {/* Boarding Pass Card */}
        <View style={[styles.boardingCard, { backgroundColor: theme.walletCard, shadowColor: theme.shadow }] }>
          <View style={styles.flightRoute}>
            <View style={styles.departureInfo}>
              <Text style={[styles.cityLabel, { color: theme.walletText }]}>Jakarta</Text>
              <Text style={[styles.airport, { color: theme.walletText }]}>CGK</Text>
              <Text style={[styles.time, { color: theme.walletText }]}>14:35</Text>
            </View>
            <View style={styles.flightPath}>
              <ArrowRight size={20} color={theme.walletText} style={styles.planeIcon} />
              <View style={[styles.dottedLine, { backgroundColor: theme.walletText }]} />
              <Text style={[styles.duration, { color: theme.credit }]}>16h 30m</Text>
              <View style={[styles.dottedLine, { backgroundColor: theme.walletText }]} />
            </View>
            <View style={styles.arrivalInfo}>
              <Text style={[styles.cityLabel, { color: theme.walletText }]}>Warsaw</Text>
              <Text style={[styles.airport, { color: theme.walletText }]}>WAW</Text>
              <Text style={[styles.time, { color: theme.walletText }]}>15:45</Text>
            </View>
          </View>
          <View style={[styles.flightDetails, { borderTopColor: theme.border }] }>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: theme.walletText }]}>Class</Text>
              <Text style={[styles.detailValue, { color: theme.walletText }]}>Economy</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: theme.walletText }]}>Terminal</Text>
              <Text style={[styles.detailValue, { color: theme.walletText }]}>F2</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: theme.walletText }]}>Gate</Text>
              <Text style={[styles.detailValue, { color: theme.walletText }]}>32</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={[styles.detailLabel, { color: theme.walletText }]}>Seat</Text>
              <Text style={[styles.detailValue, { color: theme.walletText }]}>8A</Text>
            </View>
          </View>
        </View>

        {/* Ticket Code */}
        <Text style={[styles.ticketCodeText, { color: theme.subtext }]}>Ticket Code: C7G2K679H92</Text>

        {/* Barcode */}
        <View style={styles.barcodeContainer}>
          <View style={[styles.barcode, shinyStyle]}>
            <Text style={[styles.barcodeLines, { color: theme.text }]}>||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||</Text>
          </View>
          <Text style={[styles.barcodeSubtext, { color: theme.subtext }]}>Scan this code to retrieve your ticket at the departure</Text>
        </View>

        {/* Download Button */}
        <TouchableOpacity style={[styles.downloadButton, { backgroundColor: theme.accent }]}>
          <Text style={[styles.downloadText, { color: theme.walletText }]}>Download E-Ticket</Text>
        </TouchableOpacity>

        {/* Flight Alerts Section */}
        <TouchableOpacity style={[styles.sectionCard, shinyStyle]} activeOpacity={0.8} onPress={() => setAlertsOpen(v => !v)}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: theme.background === '#000' ? '#222' : '#f0f0f0' }]}>
              <Bell size={18} color={theme.text} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Flight Alerts</Text>
          </View>
          <ChevronRight size={18} color={theme.border} style={{ transform: [{ rotate: alertsOpen ? '90deg' : '0deg' }] }} />
        </TouchableOpacity>

        {alertsOpen && (
          <>
            <View style={[styles.alertCard, shinyStyle]}>
              <Text style={[styles.alertTitle, { color: theme.text }]}>Gate Change</Text>
              <Text style={[styles.alertMessage, { color: theme.subtext }]}>Your departure gate has been changed from F1 to F2</Text>
              <Text style={[styles.alertTime, { color: theme.subtext }]}>2 hours ago</Text>
            </View>

            <View style={[styles.alertCard, shinyStyle]}>
              <Text style={[styles.alertTitle, { color: theme.text }]}>Check-in Available</Text>
              <Text style={[styles.alertMessage, { color: theme.subtext }]}>Online check-in is now available for your flight</Text>
              <Text style={[styles.alertTime, { color: theme.subtext }]}>6 hours ago</Text>
            </View>
          </>
        )}

        {/* Timeline Section */}
        <TouchableOpacity style={[styles.sectionCard, shinyStyle]} activeOpacity={0.8} onPress={() => setTimelineOpen(v => !v)}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: theme.background === '#000' ? '#222' : '#f0f0f0' }]}>
              <Clock size={18} color={theme.text} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Timeline</Text>
          </View>
          <ChevronRight size={18} color={theme.border} style={{ transform: [{ rotate: timelineOpen ? '90deg' : '0deg' }] }} />
        </TouchableOpacity>

        {timelineOpen && (
          <View style={[styles.timelineCard, shinyStyle]}>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: theme.border }]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, { color: theme.text }]}>Check-in Closes</Text>
                <Text style={[styles.timelineTime, { color: theme.subtext }]}>13:35 (1 hour before departure)</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, styles.timelineDotActive, { backgroundColor: theme.credit }]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, { color: theme.text }]}>Boarding Begins</Text>
                <Text style={[styles.timelineTime, { color: theme.subtext }]}>14:05 (30 mins before departure)</Text>
              </View>
            </View>
            <View style={styles.timelineItem}>
              <View style={[styles.timelineDot, { backgroundColor: theme.border }]} />
              <View style={styles.timelineContent}>
                <Text style={[styles.timelineTitle, { color: theme.text }]}>Departure</Text>
                <Text style={[styles.timelineTime, { color: theme.subtext }]}>14:35</Text>
              </View>
            </View>
          </View>
        )}

        {/* Travel Docs Section */}
        <TouchableOpacity style={[styles.sectionCard, shinyStyle]} activeOpacity={0.8} onPress={() => setDocsOpen(v => !v)}>
          <View style={styles.sectionHeader}>
            <View style={[styles.sectionIcon, { backgroundColor: theme.background === '#000' ? '#222' : '#f0f0f0' }]}>
              <FileText size={18} color={theme.text} />
            </View>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Travel Docs</Text>
          </View>
          <ChevronRight size={18} color={theme.border} style={{ transform: [{ rotate: docsOpen ? '90deg' : '0deg' }] }} />
        </TouchableOpacity>

        {docsOpen && (
          <>
            <View style={[styles.docCard, shinyStyle]}>
              <Text style={[styles.docTitle, { color: theme.text }]}>Passport Required</Text>
              <Text style={[styles.docMessage, { color: theme.subtext }]}>Make sure your passport is valid for at least 6 months</Text>
              <TouchableOpacity style={[styles.docButton, { backgroundColor: theme.accent }]}>
                <Text style={[styles.docButtonText, { color: theme.walletText }]}>View Requirements</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.docCard, shinyStyle]}>
              <Text style={[styles.docTitle, { color: theme.text }]}>Visa Information</Text>
              <Text style={[styles.docMessage, { color: theme.subtext }]}>No visa required for your destination</Text>
              <TouchableOpacity style={[styles.docButton, { backgroundColor: theme.accent }]}>
                <Text style={[styles.docButtonText, { color: theme.walletText }]}>Learn More</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.docCard, shinyStyle]}>
              <Text style={[styles.docTitle, { color: theme.text }]}>Travel Insurance</Text>
              <Text style={[styles.docMessage, { color: theme.subtext }]}>Consider purchasing travel insurance for your trip</Text>
              <TouchableOpacity style={[styles.docButton, { backgroundColor: theme.accent }]}>
                <Text style={[styles.docButtonText, { color: theme.walletText }]}>Get Quote</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    marginTop: 32,
    marginBottom: 24,
  },
  headerSpacer: {
    width: 32,
    height: 32,
  },
  backButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 18,
    color: '#000',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  menuButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: '#40C4D4',
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
