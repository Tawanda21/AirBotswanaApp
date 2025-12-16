
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { ArrowLeft, MoreVertical, Calendar, ChevronRight } from 'lucide-react-native';
import { ThemeContext } from './App';

export default function BookingScreen() {
  const { theme } = useContext(require('./App').ThemeContext);

  // Helper for shiny effect
  const shinyStyle = theme.background === '#000' ? { backgroundColor: theme.card, borderWidth: 1, borderColor: '#222', shadowColor: '#fff', shadowOpacity: 0.15, shadowRadius: 12, elevation: 4, overflow: 'hidden' } : { backgroundColor: theme.card };
  const shinyButton = theme.background === '#000' ? { backgroundColor: theme.card, borderWidth: 1, borderColor: '#222', shadowColor: '#fff', shadowOpacity: 0.18, shadowRadius: 8, elevation: 2 } : { backgroundColor: theme.card };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}> 
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.background }] }>
        <TouchableOpacity style={[styles.backButton, shinyButton]}>
          <ArrowLeft size={18} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Booking</Text>
        <TouchableOpacity style={[styles.menuButton, shinyButton]}>
          <MoreVertical size={18} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
        {/* Booking Form Title */}
        <Text style={[styles.formTitle, { color: theme.text }]}>Book Your Flight</Text>

        {/* Booking Card */}
        <View style={[styles.bookingCard, shinyStyle]}>
          <View style={styles.inputRow}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>From</Text>
            <Text style={[styles.inputValue, { color: theme.subtext }]}>Gaborone</Text>
          </View>
          <View style={styles.inputRow}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>To</Text>
            <Text style={[styles.inputValue, { color: theme.subtext }]}>Maun</Text>
          </View>
          <View style={styles.inputRow}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Date</Text>
            <View style={styles.datePicker}>
              <Calendar size={16} color={theme.text} />
              <Text style={[styles.dateText, { color: theme.subtext }]}>2024-07-15</Text>
            </View>
          </View>
        </View>

        {/* Search Button */}
        <TouchableOpacity style={[styles.searchButton, { backgroundColor: theme.accent }]}>
          <Text style={[styles.searchText, { color: theme.walletText }]}>Search Flights</Text>
        </TouchableOpacity>

        {/* Recent Bookings Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Bookings</Text>
        <View style={[styles.recentCard, shinyStyle]}>
          <Text style={[styles.recentLabel, { color: theme.text }]}>Gaborone → Maun</Text>
          <Text style={[styles.recentDate, { color: theme.subtext }]}>2024-07-10</Text>
          <ChevronRight size={18} color={theme.border} />
        </View>
        <View style={[styles.recentCard, shinyStyle]}>
          <Text style={[styles.recentLabel, { color: theme.text }]}>Francistown → Kasane</Text>
          <Text style={[styles.recentDate, { color: theme.subtext }]}>2024-07-08</Text>
          <ChevronRight size={18} color={theme.border} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
  

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    marginTop: 32, // Add extra space below the status bar
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#e8e8e8',
    borderRadius: 25,
    padding: 4,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  animatedPill: {
    position: 'absolute',
    top: 4,
    left: 4,
    bottom: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
    zIndex: 1,
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
    fontWeight: '600',
  },
  passengerSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  passengerIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  passengerText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#666',
  },
  locationContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  locationSection: {
    marginBottom: 20,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  locationCity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  swapButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ translateY: -20 }],
  },
  swapIcon: {
    fontSize: 16,
    color: '#fff',
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  dateSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  dateIcon: {
    fontSize: 16,
  },
  classSelector: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  classLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  classRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  searchButton: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historySection: {
    marginBottom: 32,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  historyRoute: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  historyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  destinationCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  destinationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  destinationPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  offerCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    backgroundColor: '#f0f8f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  preferenceItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  preferenceLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    flex: 1,
  },
  preferenceValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  preferenceArrow: {
    fontSize: 16,
    color: '#ccc',
  },
  hotelLocationContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});
}
