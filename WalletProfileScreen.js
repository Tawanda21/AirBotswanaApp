// javascript
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Animated } from 'react-native';
import { colors } from './constants';
import { MoreVertical, ChevronRight } from 'lucide-react-native';

export default function WalletProfileScreen() {
  const [transactionsOpen, setTransactionsOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  
  // Animation values
  const accountRotation = useRef(new Animated.Value(0)).current;
  const accountHeight = useRef(new Animated.Value(0)).current;
  const accountOpacity = useRef(new Animated.Value(0)).current;
  
  const transactionsRotation = useRef(new Animated.Value(0)).current;
  const transactionsHeight = useRef(new Animated.Value(0)).current;
  const transactionsOpacity = useRef(new Animated.Value(0)).current;

  // Auto-close timers
  const accountTimerRef = useRef(null);
  const transactionsTimerRef = useRef(null);

  // Auto-close account dropdown after 5 seconds
  useEffect(() => {
    if (accountOpen) {
      accountTimerRef.current = setTimeout(() => {
        setAccountOpen(false);
      }, 5000);
    }
    return () => {
      if (accountTimerRef.current) {
        clearTimeout(accountTimerRef.current);
      }
    };
  }, [accountOpen]);

  // Auto-close transactions dropdown after 5 seconds
  useEffect(() => {
    if (transactionsOpen) {
      transactionsTimerRef.current = setTimeout(() => {
        setTransactionsOpen(false);
      }, 5000);
    }
    return () => {
      if (transactionsTimerRef.current) {
        clearTimeout(transactionsTimerRef.current);
      }
    };
  }, [transactionsOpen]);

  // Animate account settings dropdown
  useEffect(() => {
    Animated.parallel([
      Animated.timing(accountRotation, {
        toValue: accountOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(accountHeight, {
        toValue: accountOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(accountOpacity, {
        toValue: accountOpen ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [accountOpen]);

  // Animate transactions dropdown
  useEffect(() => {
    Animated.parallel([
      Animated.timing(transactionsRotation, {
        toValue: transactionsOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(transactionsHeight, {
        toValue: transactionsOpen ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(transactionsOpacity, {
        toValue: transactionsOpen ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }),
    ]).start();
  }, [transactionsOpen]);

  const accountRotate = accountRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const transactionsRotate = transactionsRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Wallet & Profile</Text>
              <TouchableOpacity style={styles.settingsIcon} activeOpacity={0.7}>
                <MoreVertical size={18} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Profile Section (tappable to reveal Account Settings inline) */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setAccountOpen(prev => !prev)}
              style={styles.profileSection}
            >
              <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>CS</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>Tawanda Mudonhi</Text>
                  <Text style={styles.profileEmail}>tawandamudonhi@gmail.com</Text>
                  <Text style={styles.membershipLevel}>Gold Member</Text>
                </View>
                <Animated.View style={{ marginLeft: 8, transform: [{ rotate: accountRotate }] }}>
                  <ChevronRight size={20} color="#666" />
                </Animated.View>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>Flights</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>47,832</Text>
                  <Text style={styles.statLabel}>Miles</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statValue}>8</Text>
                  <Text style={styles.statLabel}>Countries</Text>
                </View>
              </View>

              {/* Inline Account Settings shown when profile is expanded */}
              <Animated.View style={{
                maxHeight: accountHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 500],
                }),
                opacity: accountOpacity,
                overflow: 'hidden',
              }}>
                <View style={{ marginTop: 16 }}>
                  <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>Account Settings</Text>
                  <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                    <Text style={styles.settingLabel}>Personal Information</Text>
                    <ChevronRight size={20} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                    <Text style={styles.settingLabel}>Travel Preferences</Text>
                    <ChevronRight size={20} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                    <Text style={styles.settingLabel}>Notifications</Text>
                    <ChevronRight size={20} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                    <Text style={styles.settingLabel}>Privacy & Security</Text>
                    <ChevronRight size={20} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.settingItem} activeOpacity={0.7}>
                    <Text style={styles.settingLabel}>Help & Support</Text>
                    <ChevronRight size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </TouchableOpacity>

            {/* Wallet Balance */}
            <View style={styles.walletCard}>
              <Text style={styles.walletTitle}>Wallet Balance</Text>
              <Text style={styles.walletAmount}>BWP-2,487.50</Text>
              <Text style={styles.walletSubtext}>Available for bookings</Text>
              <View style={styles.walletActions}>
                <TouchableOpacity style={styles.walletButton} activeOpacity={0.7}>
                  <Text style={styles.walletButtonText}>Add Funds</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.walletButton, styles.walletButtonSecondary]} activeOpacity={0.7}>
                  <Text style={[styles.walletButtonText, styles.walletButtonTextSecondary]}>Transfer</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Payment Methods */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Payment Methods</Text>
              <View style={styles.paymentCard}>
                <View style={styles.paymentInfo}>
                  <Text style={styles.cardNumber}>•••• •••• •••• 4532</Text>
                  <Text style={styles.cardType}>Visa</Text>
                </View>
                <Text style={styles.cardExpiry}>12/27</Text>
              </View>
              <View style={styles.paymentCard}>
                <View style={styles.paymentInfo}>
                  <Text style={styles.cardNumber}>•••• •••• •••• 8901</Text>
                  <Text style={styles.cardType}>Mastercard</Text>
                </View>
                <Text style={styles.cardExpiry}>08/26</Text>
              </View>
              <TouchableOpacity style={styles.addPaymentButton} activeOpacity={0.7}>
                <Text style={styles.addPaymentText}>+ Add Payment Method</Text>
              </TouchableOpacity>
            </View>

            {/* Recent Transactions (collapsible) */}
            <View style={styles.section}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setTransactionsOpen(v => !v)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Text style={[styles.sectionTitle, { marginBottom: 0 }]}>Recent Transactions</Text>
                <Animated.View style={{ transform: [{ rotate: transactionsRotate }] }}>
                  <ChevronRight size={20} color="#666" />
                </Animated.View>
              </TouchableOpacity>

              <Animated.View style={{
                maxHeight: transactionsHeight.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 400],
                }),
                opacity: transactionsOpacity,
                overflow: 'hidden',
              }}>
                <View style={styles.transactionItem}>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionTitle}>Flight to Warsaw</Text>
                    <Text style={styles.transactionDate}>Sep 16, 2024</Text>
                  </View>
                  <Text style={styles.transactionAmount}>-$456.00</Text>
                </View>
                <View style={styles.transactionItem}>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionTitle}>Lounge Access</Text>
                    <Text style={styles.transactionDate}>Sep 15, 2024</Text>
                  </View>
                  <Text style={styles.transactionAmount}>-$45.00</Text>
                </View>
                <View style={styles.transactionItem}>
                  <View style={styles.transactionInfo}>
                    <Text style={styles.transactionTitle}>Wallet Top-up</Text>
                    <Text style={styles.transactionDate}>Sep 10, 2024</Text>
                  </View>
                  <Text style={[styles.transactionAmount, styles.transactionCredit]}>+$500.00</Text>
                </View>
              </Animated.View>

              {!transactionsOpen && (
                <View style={{ paddingVertical: 8 }}>
                  <Text style={{ color: '#666' }}>Tap to view recent transactions</Text>
                </View>
              )}
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutButton} activeOpacity={0.7}>
              <Text style={styles.logoutText}>Sign Out</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 52,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  settingsIcon: {
    padding: 8,
    borderRadius: 20,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  membershipLevel: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  walletCard: {
    backgroundColor: '#000',
    borderRadius: 18,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
    alignItems: 'center',
  },
  walletTitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 4,
  },
  walletAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  walletSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    marginBottom: 16,
  },
  walletActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  walletButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  walletButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 15,
  },
  walletButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  walletButtonTextSecondary: {
    color: '#fff',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  paymentCard: {
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
  paymentInfo: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  cardType: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '600',
  },
  cardExpiry: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  addPaymentButton: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e8e8e8',
    borderStyle: 'dashed',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  addPaymentText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
  transactionItem: {
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
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff4444',
  },
  transactionCredit: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  settingItem: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  settingArrow: {
    fontSize: 20,
    color: '#ccc',
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});