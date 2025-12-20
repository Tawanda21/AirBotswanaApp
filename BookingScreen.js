
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';
import { ArrowLeft, MoreVertical, Calendar, ChevronRight } from 'lucide-react-native';
import { ThemeContext } from './App';

export default function BookingScreen() {
  const { theme } = useContext(ThemeContext);

  const cities = [
    'Gaborone',
    'Maun',
    'Kasane',
    'Francistown',
    'Johannesburg',
    'Cape Town',
    'Durban',
    'Windhoek',
    'Lusaka',
    'Maputo',
    'Bulawayo',
    'Victoria Falls',
  ];

  const baseFlights = [
    { from: 'Gaborone', to: 'Maun', price: 'BWP 1,050', time: '09:45' },
    { from: 'Gaborone', to: 'Cape Town', price: 'BWP 2,100', time: '13:20' },
    { from: 'Maun', to: 'Johannesburg', price: 'BWP 1,480', time: '11:05' },
    { from: 'Francistown', to: 'Harare', price: 'BWP 1,260', time: '08:15' },
    { from: 'Gaborone', to: 'Windhoek', price: 'BWP 1,350', time: '15:10' },
    { from: 'Kasane', to: 'Victoria Falls', price: 'BWP 980', time: '10:30' },
    { from: 'Johannesburg', to: 'Maputo', price: 'BWP 1,620', time: '07:40' },
  ];

  const popularPlaces = [
    { title: 'Cape Town, South Africa', blurb: 'Table Mountain sunsets & V&A waterfront', price: 'From BWP 2,100' },
    { title: 'Victoria Falls, Zimbabwe', blurb: 'Iconic falls and sunset cruises', price: 'From BWP 1,750' },
    { title: 'Maun, Botswana', blurb: 'Gateway to the Okavango Delta', price: 'From BWP 1,050' },
  ];

  const festivalPlaces = [
    { title: 'Harare, Zimbabwe', blurb: 'HIFA & summer arts festivals', price: 'From BWP 1,420' },
    { title: 'Maputo, Mozambique', blurb: 'Beach concerts & New Year fireworks', price: 'From BWP 1,980' },
    { title: 'Johannesburg, South Africa', blurb: 'Festive markets & music season', price: 'From BWP 1,260' },
  ];
  const travelDates = ['2024-07-15', '2024-07-20', '2024-08-02', '2024-08-18'];

  const [fromIndex, setFromIndex] = useState(0);
  const [toIndex, setToIndex] = useState(1);
  const [dateIndex, setDateIndex] = useState(0);
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);
  const [showFlights, setShowFlights] = useState(false);
  const [flightOptions, setFlightOptions] = useState([]);
  const [selectedRoundTrip, setSelectedRoundTrip] = useState(null);
  const [returnDateIndex, setReturnDateIndex] = useState(0);
  const [pickingReturn, setPickingReturn] = useState(false);
  const [expandedFlightIndex, setExpandedFlightIndex] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date(2024, 6, 15)); // July 2024

  // Initialize flights on first load
  React.useEffect(() => {
    const initialFlights = generateFlights(travelDates[dateIndex], fromIndex, toIndex);
    if (initialFlights.length > 0) {
      setFlightOptions(initialFlights);
    } else {
      const result = findNextFlightDate(fromIndex, toIndex);
      if (result) {
        setFlightOptions(result.flights);
        const idx = travelDates.indexOf(result.date);
        if (idx >= 0) setDateIndex(idx);
      }
    }
  }, []);

  const generateFlights = (targetDate, fromCityIndex, toCityIndex) => {
    const fromCity = cities[fromCityIndex];
    const toCity = cities[toCityIndex];
    
    // Filter flights for the selected route
    const routeFlights = baseFlights.filter(
      flight => flight.from === fromCity && flight.to === toCity
    );
    
    if (routeFlights.length === 0) {
      return [];
    }
    
    // Shuffle and return flights for the selected date
    const shuffled = [...routeFlights].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4).map(flight => ({
      ...flight,
      date: targetDate,
    }));
  };

  const findNextFlightDate = (fromCityIndex, toCityIndex) => {
    for (const date of travelDates) {
      const flights = generateFlights(date, fromCityIndex, toCityIndex);
      if (flights.length > 0) {
        return { date, flights };
      }
    }
    return null;
  };

  const handleFromPress = () => {
    setFromOpen(prev => !prev);
    setToOpen(false);
  };

  const handleToPress = () => {
    setToOpen(prev => !prev);
    setFromOpen(false);
  };

  const handleDatePress = () => {
    setShowCalendar(!showCalendar);
  };

  const handleCalendarDateSelect = (day) => {
    const selected = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
    const dateStr = selected.toISOString().split('T')[0];
    
    // Find first available date >= selected date
    let targetDate = null;
    let targetIdx = -1;
    
    for (let i = 0; i < travelDates.length; i++) {
      if (travelDates[i] >= dateStr) {
        targetDate = travelDates[i];
        targetIdx = i;
        break;
      }
    }
    
    // No available date >= selected, so don't show anything
    if (!targetDate) {
      setFlightOptions([]);
      setShowFlights(false);
      setShowCalendar(false);
      return;
    }
    
    // Get flights for this date
    const flights = generateFlights(targetDate, fromIndex, toIndex);
    setDateIndex(targetIdx);
    setFlightOptions(flights);
    setShowFlights(true);
    setShowCalendar(false);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handleSelectFlight = (index) => {
    setExpandedFlightIndex(expandedFlightIndex === index ? null : index);
  };

  const handleOneWay = (flight) => {
    setShowFlights(false);
    setExpandedFlightIndex(null);
  };

  const handleRoundTrip = (flight) => {
    setSelectedRoundTrip(flight);
    setPickingReturn(true);
    setExpandedFlightIndex(null);
  };

  const selectFromCity = (index) => {
    if (index === toIndex) return;
    setFromIndex(index);
    setFromOpen(false);
    const flights = generateFlights(travelDates[dateIndex], index, toIndex);
    if (flights.length > 0) {
      setFlightOptions(flights);
    } else {
      const result = findNextFlightDate(index, toIndex);
      setFlightOptions(result ? result.flights : []);
    }
  };

  const selectToCity = (index) => {
    if (index === fromIndex) return;
    setToIndex(index);
    setToOpen(false);
    const flights = generateFlights(travelDates[dateIndex], fromIndex, index);
    if (flights.length > 0) {
      setFlightOptions(flights);
    } else {
      const result = findNextFlightDate(fromIndex, index);
      setFlightOptions(result ? result.flights : []);
    }
  };

  // Helper for shiny effect
  const shinyButton = theme.background === '#000' ? { backgroundColor: theme.card, borderWidth: 1, borderColor: '#222', shadowColor: '#fff', shadowOpacity: 0.18, shadowRadius: 8, elevation: 2 } : { backgroundColor: theme.card };

  const cardShadow = {
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  };

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
        <View style={[styles.bookingCard, { backgroundColor: theme.card }, cardShadow]}>
          <TouchableOpacity style={styles.inputRow} activeOpacity={0.8} onPress={handleFromPress}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>From</Text>
            <Text style={[styles.inputValue, { color: theme.subtext }]}>{cities[fromIndex]}</Text>
          </TouchableOpacity>
          {fromOpen && (
            <View style={[styles.dropdownContainer, { borderColor: theme.border, backgroundColor: theme.card }]}> 
              {cities.map((city, index) => (
                <TouchableOpacity
                  key={city}
                  style={[styles.dropdownOption, index === cities.length - 1 && styles.dropdownLast]}
                  activeOpacity={0.8}
                  onPress={() => selectFromCity(index)}
                >
                  <Text style={[styles.dropdownText, { color: theme.text }]}>{city}</Text>
                  {index === fromIndex && <Text style={[styles.dropdownBadge, { color: theme.accent }]}>Selected</Text>}
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.inputRow} activeOpacity={0.8} onPress={handleToPress}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>To</Text>
            <Text style={[styles.inputValue, { color: theme.subtext }]}>{cities[toIndex]}</Text>
          </TouchableOpacity>
          {toOpen && (
            <View style={[styles.dropdownContainer, { borderColor: theme.border, backgroundColor: theme.card }]}> 
              {cities.map((city, index) => (
                <TouchableOpacity
                  key={city}
                  style={[styles.dropdownOption, index === cities.length - 1 && styles.dropdownLast]}
                  activeOpacity={0.8}
                  onPress={() => selectToCity(index)}
                >
                  <Text style={[styles.dropdownText, { color: theme.text }]}>{city}</Text>
                  {index === toIndex && <Text style={[styles.dropdownBadge, { color: theme.accent }]}>Selected</Text>}
                </TouchableOpacity>
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.inputRow} activeOpacity={0.8} onPress={handleDatePress}>
            <Text style={[styles.inputLabel, { color: theme.text }]}>Date</Text>
            <View style={styles.datePicker}>
              <Calendar size={16} color={theme.text} />
              <Text style={[styles.dateText, { color: theme.subtext }]}>{travelDates[dateIndex]}</Text>
            </View>
          </TouchableOpacity>
          {showCalendar && (
            <View style={[styles.calendarContainer, { backgroundColor: theme.background, borderColor: theme.border }]}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity onPress={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1))}>
                  <Text style={[styles.calendarArrow, { color: theme.text }]}>‹</Text>
                </TouchableOpacity>
                <Text style={[styles.calendarTitle, { color: theme.text }]}>
                  {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </Text>
                <TouchableOpacity onPress={() => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1))}>
                  <Text style={[styles.calendarArrow, { color: theme.text }]}>›</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.weekdaysRow}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <Text key={day} style={[styles.weekday, { color: theme.subtext }]}>
                    {day}
                  </Text>
                ))}
              </View>
              <View style={styles.daysGrid}>
                {[...Array(getFirstDayOfMonth(calendarMonth))].map((_, i) => (
                  <View key={`empty-${i}`} style={styles.dayCell} />
                ))}
                {[...Array(getDaysInMonth(calendarMonth))].map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${calendarMonth.getFullYear()}-${String(calendarMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const isSelected = travelDates[dateIndex] === dateStr;
                  return (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dayCell,
                        isSelected && [styles.dayCellSelected, { backgroundColor: theme.accent }]
                      ]}
                      onPress={() => handleCalendarDateSelect(day)}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          isSelected ? { color: theme.walletText, fontWeight: '700' } : { color: theme.text }
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>

        {/* Search Button */}
        <TouchableOpacity style={[styles.searchButton, { backgroundColor: theme.accent }, cardShadow]}>
          <Text style={[styles.searchButtonText, { color: theme.walletText }]}>Search Flights</Text>
        </TouchableOpacity>

        {/* Recent Bookings Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Bookings</Text>
        <View style={[styles.recentCard, { backgroundColor: theme.card }, cardShadow]}>
          <Text style={[styles.recentLabel, { color: theme.text }]}>Gaborone → Maun</Text>
          <Text style={[styles.recentDate, { color: theme.subtext }]}>2024-07-10</Text>
          <ChevronRight size={18} color={theme.border} />
        </View>
        <View style={[styles.recentCard, { backgroundColor: theme.card }, cardShadow]}>
          <Text style={[styles.recentLabel, { color: theme.text }]}>Francistown → Kasane</Text>
          <Text style={[styles.recentDate, { color: theme.subtext }]}>2024-07-08</Text>
          <ChevronRight size={18} color={theme.border} />
        </View>

        {/* Popular Places Section */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Popular Places</Text>
        {popularPlaces.map((item) => (
          <View key={item.title} style={[styles.curationCard, { backgroundColor: theme.card }, cardShadow]}>
            <View>
              <Text style={[styles.curationTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.curationBlurb, { color: theme.subtext }]}>{item.blurb}</Text>
            </View>
            <Text style={[styles.curationPrice, { color: theme.accent }]}>{item.price}</Text>
          </View>
        ))}

        {/* Festival & Holiday Picks */}
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Festival & Holiday Picks</Text>
        {festivalPlaces.map((item) => (
          <View key={item.title} style={[styles.curationCard, { backgroundColor: theme.card }, cardShadow]}>
            <View>
              <Text style={[styles.curationTitle, { color: theme.text }]}>{item.title}</Text>
              <Text style={[styles.curationBlurb, { color: theme.subtext }]}>{item.blurb}</Text>
            </View>
            <Text style={[styles.curationPrice, { color: theme.accent }]}>{item.price}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Flights modal */}
      <Modal
        visible={showFlights}
        animationType="fade"
        transparent
        onRequestClose={() => setShowFlights(false)}
      >
        <View style={styles.modalBackdrop}>
          <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={() => setShowFlights(false)} />
          <View style={[styles.modalCard, { backgroundColor: theme.card }]}>
            {!pickingReturn ? (
              <>
                <Text style={[styles.modalTitle, { color: theme.text }]}>Available Flights</Text>
                <Text style={[styles.modalSubtitle, { color: theme.subtext }]}>Select outbound flight</Text>
                {flightOptions.map((flight, idx) => (
                  <View key={`${flight.from}-${flight.to}-${flight.time}`}>
                    <View style={[styles.flightOptionRow, cardShadow]}> 
                      <View style={styles.flightContent}>
                        <Text style={[styles.flightRoute, { color: theme.text }]}>{flight.from} → {flight.to}</Text>
                        <Text style={[styles.flightMeta, { color: theme.subtext }]}>Date: {flight.date} · {flight.time}</Text>
                      </View>
                      <View style={styles.flightRightSection}>
                        <Text style={[styles.flightPrice, { color: theme.accent }]}>{flight.price}</Text>
                        <TouchableOpacity
                          style={[styles.selectButton, { backgroundColor: theme.accent }]}
                          onPress={() => handleSelectFlight(idx)}
                        >
                          <Text style={[styles.selectButtonText, { color: theme.walletText }]}>Select</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {expandedFlightIndex === idx && (
                      <View style={[styles.tripTypeContainer, cardShadow]}>
                        <TouchableOpacity
                          style={[styles.tripTypeButton, styles.oneWayButton, { borderColor: theme.accent }]}
                          onPress={() => handleOneWay(flight)}
                        >
                          <Text style={[styles.tripTypeButtonText, { color: theme.accent }]}>One Way</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.tripTypeButton, { backgroundColor: theme.accent }]}
                          onPress={() => handleRoundTrip(flight)}
                        >
                          <Text style={[styles.tripTypeButtonText, { color: theme.walletText }]}>Round Trip</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ))}
                <TouchableOpacity style={[styles.closeButton, { backgroundColor: theme.accent }]} onPress={() => setShowFlights(false)}>
                  <Text style={[styles.closeButtonText, { color: theme.walletText }]}>Cancel</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={[styles.modalTitle, { color: theme.text }]}>Return Flight</Text>
                <View style={[styles.selectedFlightCard, { backgroundColor: theme.background }]}>
                  <Text style={[styles.selectedFlightLabel, { color: theme.subtext }]}>Outbound</Text>
                  <Text style={[styles.selectedFlightText, { color: theme.text }]}>{selectedRoundTrip.from} → {selectedRoundTrip.to}</Text>
                  <Text style={[styles.selectedFlightMeta, { color: theme.subtext }]}>{selectedRoundTrip.date} · {selectedRoundTrip.time}</Text>
                </View>
                <Text style={[styles.returnDateLabel, { color: theme.text }]}>Select return date</Text>
                <ScrollView style={styles.dateOptionsScroll} showsVerticalScrollIndicator={false}>
                  {travelDates.map((date, idx) => (
                    <TouchableOpacity
                      key={date}
                      style={[
                        styles.dateOption,
                        returnDateIndex === idx && [styles.dateOptionSelected, { backgroundColor: theme.accent }]
                      ]}
                      onPress={() => setReturnDateIndex(idx)}
                    >
                      <Text
                        style={[
                          styles.dateOptionText,
                          returnDateIndex === idx
                            ? { color: theme.walletText, fontWeight: '700' }
                            : { color: theme.text }
                        ]}
                      >
                        {date}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                <TouchableOpacity
                  style={[styles.confirmButton, { backgroundColor: theme.accent }]}
                  onPress={() => {
                    setShowFlights(false);
                    setSelectedRoundTrip(null);
                    setPickingReturn(false);
                  }}
                >
                  <Text style={[styles.confirmButtonText, { color: theme.walletText }]}>Confirm Round Trip</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.backButton, { borderColor: theme.border }]}
                  onPress={() => setPickingReturn(false)}
                >
                  <Text style={[styles.backButtonText, { color: theme.text }]}>Back</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
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
    marginTop: 52,
    marginBottom: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
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
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  inputLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  inputValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 4,
    marginTop: -6,
    marginBottom: 10,
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownLast: {
    borderBottomWidth: 0,
  },
  dropdownText: {
    fontSize: 15,
    fontWeight: '600',
  },
  dropdownBadge: {
    fontSize: 12,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalCard: {
    width: '100%',
    borderRadius: 18,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    marginBottom: 16,
  },
  flightOption: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  flightOptionRow: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flightContent: {
    flex: 1,
  },
  flightRightSection: {
    marginLeft: 12,
    alignItems: 'flex-end',
  },
  selectButton: {
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  selectButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
  tripTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
    marginBottom: 12,
  },
  tripTypeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  oneWayButton: {
    backgroundColor: 'transparent',
  },
  tripTypeButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  calendarContainer: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginTop: 8,
    marginBottom: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  calendarTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  calendarArrow: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 8,
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.285%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    borderRadius: 10,
  },
  dayCellSelected: {
    borderRadius: 10,
  },
  dayText: {
    fontSize: 14,
    fontWeight: '600',
  },
  selectedFlightCard: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  selectedFlightLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  selectedFlightText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  selectedFlightMeta: {
    fontSize: 13,
  },
  returnDateLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  dateOptionsScroll: {
    marginBottom: 12,
    maxHeight: 200,
  },
  dateOption: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateOptionSelected: {
    borderWidth: 0,
  },
  dateOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  confirmButton: {
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  confirmButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  backButton: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  passengerSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
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
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
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
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
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
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
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
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
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
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
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
  recentCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recentLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  recentDate: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  curationCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  curationTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  curationBlurb: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  curationPrice: {
    fontSize: 13,
    fontWeight: '700',
  },
  destinationCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
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
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
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
    borderRadius: 18,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
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
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
});
