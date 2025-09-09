import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { colors } from './constants';
import { User, Users, Calendar, ChevronDown, ArrowRight, ArrowUpDown } from 'lucide-react-native';

export default function BookingScreen() {
  const [activeTab, setActiveTab] = useState('Flights');
  const [from, setFrom] = useState('Jakarta');
  const [to, setTo] = useState('Warsawa');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(1);
  const [departDate, setDepartDate] = useState('Sep 14, 2024');
  const [returnDate, setReturnDate] = useState('Sep 17, 2024');
  const [classType, setClassType] = useState('Economy');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {activeTab === 'Flights' ? 'Booking Your Flight' : 'Book Your Hotel'}
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Flights' && styles.activeTab]}
            onPress={() => setActiveTab('Flights')}
          >
            <Text style={[styles.tabText, activeTab === 'Flights' && styles.activeTabText]}>Flights</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'Hotels' && styles.activeTab]}
            onPress={() => setActiveTab('Hotels')}
          >
            <Text style={[styles.tabText, activeTab === 'Hotels' && styles.activeTabText]}>Hotels</Text>
          </TouchableOpacity>
        </View>

        {/* Passengers */}
        <TouchableOpacity style={styles.passengerSelector}>
          <User size={20} color="#000" style={styles.passengerIcon} />
          <Text style={styles.passengerText}>
            {activeTab === 'Flights' ? '1 Adult - 1 Child' : '2 Guests - 1 Room'}
          </Text>
          <ChevronDown size={16} color="#666" style={styles.dropdownArrow} />
        </TouchableOpacity>

        {activeTab === 'Flights' ? (
          <>
            {/* From/To Section */}
            <View style={styles.locationContainer}>
              <View style={styles.locationSection}>
                <Text style={styles.locationLabel}>From</Text>
                <Text style={styles.locationCity}>Jakarta</Text>
              </View>

              <TouchableOpacity style={styles.swapButton}>
                <ArrowUpDown size={16} color="#fff" style={styles.swapIcon} />
              </TouchableOpacity>

              <View style={styles.locationSection}>
                <Text style={styles.locationLabel}>To</Text>
                <Text style={styles.locationCity}>Warsawa</Text>
              </View>
            </View>

            {/* Date Selection */}
            <View style={styles.dateContainer}>
              <View style={styles.dateSection}>
                <Text style={styles.dateLabel}>Departure Date</Text>
                <View style={styles.dateRow}>
                  <Text style={styles.dateText}>Sep 14, 2024</Text>
                  <Calendar size={16} color="#666" style={styles.dateIcon} />
                </View>
              </View>

              <View style={styles.dateSection}>
                <Text style={styles.dateLabel}>Return Date</Text>
                <View style={styles.dateRow}>
                  <Text style={styles.dateText}>Sep 17, 2024</Text>
                  <Text style={styles.dateIcon}>▢</Text>
                </View>
              </View>
            </View>

            {/* Class Selection */}
            <TouchableOpacity style={styles.classSelector}>
              <Text style={styles.classLabel}>Class</Text>
              <View style={styles.classRow}>
                <Text style={styles.classText}>Economy</Text>
                <ChevronDown size={16} color="#666" style={styles.dropdownArrow} />
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Hotel Location */}
            <View style={styles.hotelLocationContainer}>
              <View style={styles.locationSection}>
                <Text style={styles.locationLabel}>Destination</Text>
                <Text style={styles.locationCity}>Warsawa, Poland</Text>
              </View>
            </View>

            {/* Hotel Date Selection */}
            <View style={styles.dateContainer}>
              <View style={styles.dateSection}>
                <Text style={styles.dateLabel}>Check-in Date</Text>
                <View style={styles.dateRow}>
                  <Text style={styles.dateText}>Sep 14, 2024</Text>
                  <Calendar size={16} color="#666" style={styles.dateIcon} />
                </View>
              </View>

              <View style={styles.dateSection}>
                <Text style={styles.dateLabel}>Check-out Date</Text>
                <View style={styles.dateRow}>
                  <Text style={styles.dateText}>Sep 17, 2024</Text>
                  <Calendar size={16} color="#666" style={styles.dateIcon} />
                </View>
              </View>
            </View>

            {/* Room Type Selection */}
            <TouchableOpacity style={styles.classSelector}>
              <Text style={styles.classLabel}>Room Type</Text>
              <View style={styles.classRow}>
                <Text style={styles.classText}>Standard Room</Text>
                <ChevronDown size={16} color="#666" style={styles.dropdownArrow} />
              </View>
            </TouchableOpacity>
          </>
        )}

        {/* Search Button */}
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>
            {activeTab === 'Flights' ? 'Search Flights' : 'Search Hotels'}
          </Text>
        </TouchableOpacity>

        {activeTab === 'Flights' ? (
          <>
            {/* History Section */}
            <View style={styles.historySection}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>Flight History</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.historyCard}>
                <Text style={styles.historyRoute}>Warsawa <ArrowRight size={14} color="#000" /> Jakarta</Text>
                <Text style={styles.historyDate}>Sep 14 - Sep 17, 2024</Text>
                <Text style={styles.historyPrice}>$456</Text>
              </View>

              <View style={styles.historyCard}>
                <Text style={styles.historyRoute}>Jakarta <ArrowRight size={14} color="#000" /> Singapore</Text>
                <Text style={styles.historyDate}>Aug 22 - Aug 25, 2024</Text>
                <Text style={styles.historyPrice}>$234</Text>
              </View>

              <View style={styles.historyCard}>
                <Text style={styles.historyRoute}>Singapore <ArrowRight size={14} color="#000" /> London</Text>
                <Text style={styles.historyDate}>Jul 10 - Jul 20, 2024</Text>
                <Text style={styles.historyPrice}>$789</Text>
              </View>
            </View>

            {/* Popular Destinations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Destinations</Text>
              
              <View style={styles.destinationCard}>
                <Text style={styles.destinationName}>Singapore</Text>
                <Text style={styles.destinationDescription}>Garden City of Asia</Text>
                <Text style={styles.destinationPrice}>From $234</Text>
              </View>

              <View style={styles.destinationCard}>
                <Text style={styles.destinationName}>London</Text>
                <Text style={styles.destinationDescription}>Historic European Capital</Text>
                <Text style={styles.destinationPrice}>From $789</Text>
              </View>

              <View style={styles.destinationCard}>
                <Text style={styles.destinationName}>Tokyo</Text>
                <Text style={styles.destinationDescription}>Modern Japanese Metropolis</Text>
                <Text style={styles.destinationPrice}>From $567</Text>
              </View>
            </View>

            {/* Special Offers */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Special Offers</Text>
              
              <View style={styles.offerCard}>
                <Text style={styles.offerTitle}>Early Bird Discount</Text>
                <Text style={styles.offerDescription}>Book 30 days in advance and save up to 25%</Text>
                <Text style={styles.offerCode}>Code: EARLY25</Text>
              </View>

              <View style={styles.offerCard}>
                <Text style={styles.offerTitle}>Weekend Getaway</Text>
                <Text style={styles.offerDescription}>Special rates for weekend flights</Text>
                <Text style={styles.offerCode}>Code: WEEKEND15</Text>
              </View>
            </View>

            {/* Flight Preferences */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Flight Preferences</Text>
              
              <TouchableOpacity style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Preferred Airlines</Text>
                <Text style={styles.preferenceValue}>Air Botswana, Emirates</Text>
                <Text style={styles.preferenceArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Seat Preference</Text>
                <Text style={styles.preferenceValue}>Window</Text>
                <Text style={styles.preferenceArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Meal Preference</Text>
                <Text style={styles.preferenceValue}>Vegetarian</Text>
                <Text style={styles.preferenceArrow}>›</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {/* Hotel History Section */}
            <View style={styles.historySection}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyTitle}>Hotel History</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.historyCard}>
                <Text style={styles.historyRoute}>Grand Hotel Warsaw</Text>
                <Text style={styles.historyDate}>Sep 14 - Sep 17, 2024</Text>
                <Text style={styles.historyPrice}>$320/night</Text>
              </View>

              <View style={styles.historyCard}>
                <Text style={styles.historyRoute}>Marina Bay Sands</Text>
                <Text style={styles.historyDate}>Aug 22 - Aug 25, 2024</Text>
                <Text style={styles.historyPrice}>$450/night</Text>
              </View>

              <View style={styles.historyCard}>
                <Text style={styles.historyRoute}>The Ritz London</Text>
                <Text style={styles.historyDate}>Jul 10 - Jul 20, 2024</Text>
                <Text style={styles.historyPrice}>$680/night</Text>
              </View>
            </View>

            {/* Popular Hotels */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Hotels</Text>
              
              <View style={styles.destinationCard}>
                <Text style={styles.destinationName}>Grand Hotel Warsaw</Text>
                <Text style={styles.destinationDescription}>5-star luxury in city center</Text>
                <Text style={styles.destinationPrice}>From $320/night</Text>
              </View>

              <View style={styles.destinationCard}>
                <Text style={styles.destinationName}>Hotel Bristol Warsaw</Text>
                <Text style={styles.destinationDescription}>Historic boutique hotel</Text>
                <Text style={styles.destinationPrice}>From $280/night</Text>
              </View>

              <View style={styles.destinationCard}>
                <Text style={styles.destinationName}>Raffles Europejski</Text>
                <Text style={styles.destinationDescription}>Elegant European charm</Text>
                <Text style={styles.destinationPrice}>From $400/night</Text>
              </View>
            </View>

            {/* Hotel Deals */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hotel Deals</Text>
              
              <View style={styles.offerCard}>
                <Text style={styles.offerTitle}>Stay 3 Nights, Pay for 2</Text>
                <Text style={styles.offerDescription}>Book 3+ nights and get the 3rd night free</Text>
                <Text style={styles.offerCode}>Code: STAY3PAY2</Text>
              </View>

              <View style={styles.offerCard}>
                <Text style={styles.offerTitle}>Free Breakfast Package</Text>
                <Text style={styles.offerDescription}>Complimentary breakfast with weekend stays</Text>
                <Text style={styles.offerCode}>Code: BREAKFAST</Text>
              </View>
            </View>

            {/* Hotel Preferences */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Hotel Preferences</Text>
              
              <TouchableOpacity style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Star Rating</Text>
                <Text style={styles.preferenceValue}>4+ Stars</Text>
                <Text style={styles.preferenceArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Amenities</Text>
                <Text style={styles.preferenceValue}>WiFi, Pool, Gym</Text>
                <Text style={styles.preferenceArrow}>›</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.preferenceItem}>
                <Text style={styles.preferenceLabel}>Location</Text>
                <Text style={styles.preferenceValue}>City Center</Text>
                <Text style={styles.preferenceArrow}>›</Text>
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
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
