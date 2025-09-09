import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { colors } from './constants';
import { MoreVertical, ChevronRight } from 'lucide-react-native';

export default function WalletProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Wallet & Profile</Text>
          <TouchableOpacity style={styles.settingsIcon}>
            <MoreVertical size={18} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>CS</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Charlie Stanton</Text>
              <Text style={styles.profileEmail}>charlie.stanton@email.com</Text>
              <Text style={styles.membershipLevel}>Gold Member</Text>
            </View>
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
        </View>

        {/* Wallet Balance */}
        <View style={styles.walletCard}>
          <Text style={styles.walletTitle}>Wallet Balance</Text>
          <Text style={styles.walletAmount}>$2,487.50</Text>
          <Text style={styles.walletSubtext}>Available for bookings</Text>
          
          <View style={styles.walletActions}>
            <TouchableOpacity style={styles.walletButton}>
              <Text style={styles.walletButtonText}>Add Funds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.walletButton, styles.walletButtonSecondary]}>
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
          
          <TouchableOpacity style={styles.addPaymentButton}>
            <Text style={styles.addPaymentText}>+ Add Payment Method</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          
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
        </View>

        {/* Profile Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Personal Information</Text>
            <ChevronRight size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Travel Preferences</Text>
            <ChevronRight size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <ChevronRight size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Privacy & Security</Text>
            <ChevronRight size={20} color="#ccc" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Help & Support</Text>
            <ChevronRight size={20} color="#ccc" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton}>
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
    backgroundColor: '#f8f9fa',
    padding: 20,
    marginTop: 32, // Add extra space below the status bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  settingsIcon: {
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
  settingsText: {
    fontSize: 18,
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  membershipLevel: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  walletCard: {
    backgroundColor: '#000',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  walletTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    opacity: 0.8,
  },
  walletAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  walletSubtext: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 20,
  },
  walletActions: {
    flexDirection: 'row',
    gap: 12,
  },
  walletButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  walletButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
  },
  walletButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
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
