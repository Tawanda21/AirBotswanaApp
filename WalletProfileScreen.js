import React, { useRef, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { colors } from './constants';
import { MoreVertical, ChevronRight } from 'lucide-react-native';
import { ThemeContext } from './App';

export default function WalletProfileScreen() {
  const lastTap = useRef(null);
  const { theme, toggleTheme } = useContext(require('./App').ThemeContext);

  // Double-tap handler for theme toggle
  const handleBackgroundTap = (e) => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      toggleTheme();
      lastTap.current = null;
    } else {
      lastTap.current = now;
    }
  };

  // Helper for shiny effect
  const shinyStyle = theme.background === '#000' ? { backgroundColor: theme.card, borderWidth: 1, borderColor: '#333', shadowColor: '#fff', shadowOpacity: 0.15, shadowRadius: 12, elevation: 4, overflow: 'hidden' } : { backgroundColor: theme.card };
  const shinyButton = theme.background === '#000' ? { backgroundColor: theme.card, borderWidth: 1, borderColor: '#333', shadowColor: '#fff', shadowOpacity: 0.18, shadowRadius: 8, elevation: 2 } : { backgroundColor: theme.card };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}> 
      <TouchableWithoutFeedback onPress={handleBackgroundTap}>
        <View style={{ flex: 1 }}>
          <ScrollView style={[styles.container, { backgroundColor: theme.background }]} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={[styles.header]} pointerEvents="box-none">
              <Text style={[styles.title, { color: theme.text }]}>Wallet & Profile</Text>
              <TouchableOpacity style={styles.settingsIcon} activeOpacity={0.7}>
                <MoreVertical size={18} color={theme.text} />
              </TouchableOpacity>
            </View>

            {/* Profile Section */}
            <View style={[styles.profileSection, shinyStyle, { shadowColor: theme.shadow }]} pointerEvents="box-none">
              <View style={styles.profileHeader}>
                <View style={[styles.avatar, { backgroundColor: theme.accent }]}>
                  <Text style={[styles.avatarText, { color: theme.walletText }]}>CS</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={[styles.profileName, { color: theme.text }]}>Charlie Stanton</Text>
                  <Text style={[styles.profileEmail, { color: theme.subtext }]}>charlie.stanton@email.com</Text>
                  <Text style={[styles.membershipLevel, { color: theme.gold }]}>Gold Member</Text>
                </View>
              </View>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: theme.text }]}>12</Text>
                  <Text style={[styles.statLabel, { color: theme.subtext }]}>Flights</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: theme.text }]}>47,832</Text>
                  <Text style={[styles.statLabel, { color: theme.subtext }]}>Miles</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={[styles.statValue, { color: theme.text }]}>8</Text>
                  <Text style={[styles.statLabel, { color: theme.subtext }]}>Countries</Text>
                </View>
              </View>
            </View>

            {/* Wallet Balance */}
            <View style={[styles.walletCard, { backgroundColor: theme.walletCard, shadowColor: theme.shadow, borderWidth: theme.background === '#000' ? 1 : 0, borderColor: theme.background === '#000' ? '#222' : 'transparent', shadowOpacity: theme.background === '#000' ? 0.18 : 0.08, elevation: 4 }]} pointerEvents="box-none">
              <Text style={[styles.walletTitle, { color: theme.walletText, opacity: 0.8 }]}>Wallet Balance</Text>
              <Text style={[styles.walletAmount, { color: theme.walletText }]}>$2,487.50</Text>
              <Text style={[styles.walletSubtext, { color: theme.walletText, opacity: 0.7 }]}>Available for bookings</Text>
              <View style={styles.walletActions}>
                <TouchableOpacity style={[styles.walletButton, shinyButton]} activeOpacity={0.7}>
                  <Text style={[styles.walletButtonText, { color: theme.text }]}>Add Funds</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.walletButton, styles.walletButtonSecondary, { borderColor: theme.walletText, ...shinyButton }]} activeOpacity={0.7}>
                  <Text style={[styles.walletButtonText, styles.walletButtonTextSecondary, { color: theme.walletText }]}>Transfer</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Payment Methods */}
            <View style={styles.section} pointerEvents="box-none">
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Payment Methods</Text>
              <View style={[styles.paymentCard, shinyStyle, { shadowColor: theme.shadow }]}> 
                <View style={styles.paymentInfo}>
                  <Text style={[styles.cardNumber, { color: theme.text }]}>•••• •••• •••• 4532</Text>
                  <Text style={[styles.cardType, { color: theme.subtext }]}>Visa</Text>
                </View>
                <Text style={[styles.cardExpiry, { color: theme.subtext }]}>12/27</Text>
              </View>
              <View style={[styles.paymentCard, shinyStyle, { shadowColor: theme.shadow }]}> 
                <View style={styles.paymentInfo}>
                  <Text style={[styles.cardNumber, { color: theme.text }]}>•••• •••• •••• 8901</Text>
                  <Text style={[styles.cardType, { color: theme.subtext }]}>Mastercard</Text>
                </View>
                <Text style={[styles.cardExpiry, { color: theme.subtext }]}>08/26</Text>
              </View>
              <TouchableOpacity style={[styles.addPaymentButton, shinyButton, { borderColor: theme.border }]} activeOpacity={0.7}>
                <Text style={[styles.addPaymentText, { color: theme.accent }]}>+ Add Payment Method</Text>
              </TouchableOpacity>
            </View>

            {/* Recent Transactions */}
            <View style={styles.section} pointerEvents="box-none">
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Recent Transactions</Text>
              <View style={[styles.transactionItem, shinyStyle, { shadowColor: theme.shadow }]}> 
                <View style={styles.transactionInfo}>
                  <Text style={[styles.transactionTitle, { color: theme.text }]}>Flight to Warsaw</Text>
                  <Text style={[styles.transactionDate, { color: theme.subtext }]}>Sep 16, 2024</Text>
                </View>
                <Text style={[styles.transactionAmount, { color: theme.error }]}>-$456.00</Text>
              </View>
              <View style={[styles.transactionItem, shinyStyle, { shadowColor: theme.shadow }]}> 
                <View style={styles.transactionInfo}>
                  <Text style={[styles.transactionTitle, { color: theme.text }]}>Lounge Access</Text>
                  <Text style={[styles.transactionDate, { color: theme.subtext }]}>Sep 15, 2024</Text>
                </View>
                <Text style={[styles.transactionAmount, { color: theme.error }]}>-$45.00</Text>
              </View>
              <View style={[styles.transactionItem, shinyStyle, { shadowColor: theme.shadow }]}> 
                <View style={styles.transactionInfo}>
                  <Text style={[styles.transactionTitle, { color: theme.text }]}>Wallet Top-up</Text>
                  <Text style={[styles.transactionDate, { color: theme.subtext }]}>Sep 10, 2024</Text>
                </View>
                <Text style={[styles.transactionAmount, styles.transactionCredit, { color: theme.credit }]}>+$500.00</Text>
              </View>
            </View>

            {/* Profile Settings */}
            <View style={styles.section} pointerEvents="box-none">
              <Text style={[styles.sectionTitle, { color: theme.text }]}>Account Settings</Text>
              <TouchableOpacity style={[styles.settingItem, shinyStyle, { shadowColor: theme.shadow }]} activeOpacity={0.7}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Personal Information</Text>
                <ChevronRight size={20} color={theme.subtext} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.settingItem, shinyStyle, { shadowColor: theme.shadow }]} activeOpacity={0.7}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Travel Preferences</Text>
                <ChevronRight size={20} color={theme.subtext} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.settingItem, shinyStyle, { shadowColor: theme.shadow }]} activeOpacity={0.7}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Notifications</Text>
                <ChevronRight size={20} color={theme.subtext} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.settingItem, shinyStyle, { shadowColor: theme.shadow }]} activeOpacity={0.7}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Privacy & Security</Text>
                <ChevronRight size={20} color={theme.subtext} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.settingItem, shinyStyle, { shadowColor: theme.shadow }]} activeOpacity={0.7}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>Help & Support</Text>
                <ChevronRight size={20} color={theme.subtext} />
              </TouchableOpacity>
            </View>

            {/* Logout */}
            <TouchableOpacity style={[styles.logoutButton, { backgroundColor: theme.error, shadowColor: theme.shadow, shadowOpacity: theme.background === '#000' ? 0.18 : 0.08, elevation: 2 }]} activeOpacity={0.7}>
              <Text style={[styles.logoutText, { color: theme.walletText }]}>Sign Out</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
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
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
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
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
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
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginHorizontal: 6,
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
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
    fontSize: 14,
    color: '#666',
  },
  cardExpiry: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  addPaymentButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  addPaymentText: {
    color: '#007AFF',
    fontWeight: '600',
    fontSize: 16,
  },
  transactionItem: {
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
    elevation: 1,
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
  },
  settingItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
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
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

