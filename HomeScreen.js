
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Animated, Dimensions } from 'react-native';
import { colors } from './constants';
import * as Animatable from 'react-native-animatable';
import { ArrowRight, Calendar, User } from 'lucide-react-native';

export default function BookingScreen() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const tabTranslate = useRef(new Animated.Value(0)).current;
  const tabWidth = (Dimensions.get('window').width - 40 - 8) / 2; // paddingHorizontal: 20, tabContainer padding: 4

  useEffect(() => {
    Animated.spring(tabTranslate, {
      toValue: activeTab === 'Upcoming' ? 0 : tabWidth,
      useNativeDriver: true,
    }).start();
  }, [activeTab, tabWidth]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {activeTab === 'Upcoming' ? 'Your Upcoming Flights' : 'Your Past Flights'}
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <Animated.View
            style={[
              styles.animatedPill,
              {
                width: tabWidth,
                transform: [{ translateX: tabTranslate }],
              },
            ]}
          />
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('Upcoming')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'Upcoming' && styles.activeTabText]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('Past')}
            activeOpacity={0.8}
          >
            <Text style={[styles.tabText, activeTab === 'Past' && styles.activeTabText]}>Past</Text>
          </TouchableOpacity>
        </View>
        {activeTab === 'Upcoming' ? (
          <View>
            {/* Current Flight Card with animated loading bar */}
            <Animatable.View animation="fadeInUp" delay={100} duration={500} style={styles.flightCardWrapper}>
              <View style={styles.flightCardRow}>
                {/* Animated green progress bar */}
                <Animatable.View
                  animation={{
                    from: { height: '0%' },
                    to: { height: '100%' }
                  }}
                  duration={4000}
                  iterationCount={1}
                  useNativeDriver={false}
                  style={styles.loadingBarContainer}
                >
                  <View style={styles.loadingBar} />
                </Animatable.View>
                {/* Flight card content */}
                <View style={styles.flightCard}>
                  <View style={styles.flightHeader}>
                    <Text style={styles.date}>Sep 16, 2024</Text>
                    <Text style={styles.duration}>16h 24m</Text>
                  </View>
                  <View style={styles.routeContainer}>
                    <View style={styles.airportContainer}>
                      <Text style={styles.cityLabel}>Jakarta</Text>
                      <Text style={styles.airport}>CGK</Text>
                      <Text style={styles.time}>14:35</Text>
                    </View>
                    <View style={styles.flightPath}>
                      <ArrowRight size={20} color="#000" style={styles.planeIcon} />
                    </View>
                    <View style={styles.airportContainer}>
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
                      <Text style={styles.detailValue}>7A</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Animatable.View>
            {/* Check-in Card */}
            <Animatable.View animation="fadeInUp" delay={200} duration={500} style={styles.checkinCard}>
              <View style={styles.checkinContent}>
                <Text style={styles.checkinLabel}>Check-in</Text>
                <Text style={styles.checkinTime}>Ends at 1:30</Text>
              </View>
              <Text style={styles.checkinCountdown}>4h 15m</Text>
            </Animatable.View>
            {/* Your Next Flight */}
            <Animatable.View animation="fadeInUp" delay={300} duration={500} style={styles.nextFlightSection}>
              <Text style={styles.sectionTitle}>Your Next Flight</Text>
              <View style={styles.nextFlightCard}>
                <View style={styles.nextFlightRoute}>
                  <Text style={styles.nextFlightAirport}>WAW</Text>
                  <Text style={styles.nextFlightTime}>19:40</Text>
                  <ArrowRight size={16} color="#000" style={styles.nextFlightArrow} />
                  <Text style={styles.nextFlightTime}>20:55</Text>
                  <Text style={styles.nextFlightAirport}>CGK</Text>
                </View>
                <View style={styles.nextFlightDetails}>
                  <Text style={styles.nextFlightDetail}>Economy</Text>
                  <Text style={styles.nextFlightDetail}>B4</Text>
                  <Text style={styles.nextFlightDetail}>24</Text>
                  <Text style={styles.nextFlightDetail}>7C</Text>
                </View>
              </View>
            </Animatable.View>
            {/* Recommendations Section */}
            <Animatable.View animation="fadeInUp" delay={400} duration={500} style={styles.section}>
              <Text style={styles.sectionTitle}>Recommendations</Text>
              <View style={styles.recommendationCard}>
                <View style={styles.recommendationInfo}>
                  <Text style={styles.recommendationTitle}>Airport Lounge Access</Text>
                  <Text style={styles.recommendationSubtitle}>Relax before your flight</Text>
                </View>
                <Text style={styles.recommendationPrice}>$45</Text>
              </View>
              <View style={styles.recommendationCard}>
                <View style={styles.recommendationInfo}>
                  <Text style={styles.recommendationTitle}>Premium Seat Upgrade</Text>
                  <Text style={styles.recommendationSubtitle}>Extra legroom and comfort</Text>
                </View>
                <Text style={styles.recommendationPrice}>$89</Text>
              </View>
            </Animatable.View>
            {/* Best Prices Section */}
            <Animatable.View animation="fadeInUp" delay={500} duration={500} style={styles.section}>
              <Text style={styles.sectionTitle}>Best Prices</Text>
              <View style={styles.priceCard}>
                <Text style={styles.priceRoute}>CGK → SIN</Text>
                <Text style={styles.priceAmount}>$156</Text>
                <Text style={styles.priceDate}>Next week</Text>
              </View>
              <View style={styles.priceCard}>
                <Text style={styles.priceRoute}>WAW → LHR</Text>
                <Text style={styles.priceAmount}>$234</Text>
                <Text style={styles.priceDate}>This month</Text>
              </View>
            </Animatable.View>
          </View>
        ) : (
          <View>
            {/* Past Flight Cards */}
            <Animatable.View animation="fadeInUp" delay={100} duration={500} style={[styles.pastFlightCard, styles.completedPastFlightCard]}>
              <View style={styles.pastFlightHeader}>
                <Text style={styles.completedBadge}>Completed</Text>
                <Text style={styles.pastDate}>Aug 22, 2024</Text>
              </View>
              <View style={styles.routeContainer}>
                <View style={styles.airportContainer}>
                  <Text style={styles.cityLabel}>Jakarta</Text>
                  <Text style={styles.airport}>CGK</Text>
                  <Text style={styles.time}>09:15</Text>
                </View>
                <View style={styles.flightPath}>
                  <ArrowRight size={20} color="#000" style={styles.planeIcon} />
                </View>
                <View style={styles.airportContainer}>
                  <Text style={styles.cityLabel}>Singapore</Text>
                  <Text style={styles.airport}>SIN</Text>
                  <Text style={styles.time}>12:30</Text>
                </View>
              </View>
              <View style={styles.flightDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Class</Text>
                  <Text style={styles.detailValue}>Economy</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Terminal</Text>
                  <Text style={styles.detailValue}>T3</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Gate</Text>
                  <Text style={styles.detailValue}>A12</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Seat</Text>
                  <Text style={styles.detailValue}>14F</Text>
                </View>
              </View>
            </Animatable.View>
            <Animatable.View animation="fadeInUp" delay={200} duration={500} style={[styles.pastFlightCard, styles.completedPastFlightCard]}>
              <View style={styles.pastFlightHeader}>
                <Text style={styles.completedBadge}>Completed</Text>
                <Text style={styles.pastDate}>Jul 10, 2024</Text>
              </View>
              <View style={styles.routeContainer}>
                <View style={styles.airportContainer}>
                  <Text style={styles.cityLabel}>Singapore</Text>
                  <Text style={styles.airport}>SIN</Text>
                  <Text style={styles.time}>16:20</Text>
                </View>
                <View style={styles.flightPath}>
                  <ArrowRight size={20} color="#000" style={styles.planeIcon} />
                </View>
                <View style={styles.airportContainer}>
                  <Text style={styles.cityLabel}>London</Text>
                  <Text style={styles.airport}>LHR</Text>
                  <Text style={styles.time}>23:45</Text>
                </View>
              </View>
              <View style={styles.flightDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Class</Text>
                  <Text style={styles.detailValue}>Business</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Terminal</Text>
                  <Text style={styles.detailValue}>T5</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Gate</Text>
                  <Text style={styles.detailValue}>B7</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Seat</Text>
                  <Text style={styles.detailValue}>3A</Text>
                </View>
              </View>
            </Animatable.View>
            <Animatable.View animation="fadeInUp" delay={300} duration={500} style={[styles.pastFlightCard, styles.completedPastFlightCard]}>
              <View style={styles.pastFlightHeader}>
                <Text style={styles.completedBadge}>Completed</Text>
                <Text style={styles.pastDate}>Jun 15, 2024</Text>
              </View>
              <View style={styles.routeContainer}>
                <View style={styles.airportContainer}>
                  <Text style={styles.cityLabel}>London</Text>
                  <Text style={styles.airport}>LHR</Text>
                  <Text style={styles.time}>11:30</Text>
                </View>
                <View style={styles.flightPath}>
                  <ArrowRight size={20} color="#000" style={styles.planeIcon} />
                </View>
                <View style={styles.airportContainer}>
                  <Text style={styles.cityLabel}>Jakarta</Text>
                  <Text style={styles.airport}>CGK</Text>
                  <Text style={styles.time}>06:15</Text>
                </View>
              </View>
              <View style={styles.flightDetails}>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Class</Text>
                  <Text style={styles.detailValue}>Economy</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Terminal</Text>
                  <Text style={styles.detailValue}>F1</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Gate</Text>
                  <Text style={styles.detailValue}>C18</Text>
                </View>
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Seat</Text>
                  <Text style={styles.detailValue}>22B</Text>
                </View>
              </View>
            </Animatable.View>
            {/* Past Trip Summary */}
            <Animatable.View animation="fadeInUp" delay={400} duration={500} style={styles.section}>
              <View>
                <Text style={styles.sectionTitle}>Trip Statistics</Text>
                <View style={styles.statsCard}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Total Flights</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>47,832</Text>
                    <Text style={styles.statLabel}>Miles Flown</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>8</Text>
                    <Text style={styles.statLabel}>Countries</Text>
                  </View>
                </View>
              </View>
            </Animatable.View>
            {/* Frequent Destinations */}
            <Animatable.View animation="fadeInUp" delay={500} duration={500} style={styles.section}>
              <View>
                <Text style={styles.sectionTitle}>Frequent Destinations</Text>
                <View style={styles.destinationStatsCard}>
                  <Text style={styles.destinationName}>Singapore (SIN)</Text>
                  <Text style={styles.destinationCount}>5 visits</Text>
                </View>
                <View style={styles.destinationStatsCard}>
                  <Text style={styles.destinationName}>London (LHR)</Text>
                  <Text style={styles.destinationCount}>3 visits</Text>
                </View>
                <View style={styles.destinationStatsCard}>
                  <Text style={styles.destinationName}>Tokyo (NRT)</Text>
                  <Text style={styles.destinationCount}>2 visits</Text>
                </View>
              </View>
            </Animatable.View>
          </View>
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
  flightCardWrapper: {
    marginBottom: 16,
  },
  flightCardRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  loadingBarContainer: {
    width: 8,
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#e8e8e8',
    marginRight: -8,
    height: '100%',
    alignSelf: 'stretch',
  },
  loadingBar: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
  },
  flightCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  flightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  airportContainer: {
    flex: 1,
    alignItems: 'center',
  },
  cityLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  airport: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  flightPath: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  planeIcon: {
    fontSize: 16,
    color: '#000',
  },
  flightDetails: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  checkinCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  checkinContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkinLabel: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  checkinTime: {
    fontSize: 12,
    color: '#666',
  },
  checkinCountdown: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  nextFlightSection: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  nextFlightCard: {
    backgroundColor: '#f0f8ff',
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  nextFlightRoute: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextFlightAirport: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginRight: 4,
  },
  nextFlightTime: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginHorizontal: 4,
  },
  nextFlightArrow: {
    fontSize: 16,
    color: '#000',
    marginHorizontal: 4,
  },
  nextFlightDetails: {
    alignItems: 'flex-end',
  },
  nextFlightDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
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
  recommendationCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  recommendationInfo: {
    flex: 1,
  },
  recommendationTitle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
    marginBottom: 4,
  },
  recommendationSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  recommendationPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  priceCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  priceRoute: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  priceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  priceDate: {
    fontSize: 12,
    color: '#666',
  },
  pastFlightCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  completedPastFlightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  pastFlightHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  completedBadge: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pastDate: {
    fontSize: 14,
    color: '#666',
  },
  destinationStatsCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  destinationName: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  destinationCount: {
    fontSize: 12,
    color: '#666',
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
});
