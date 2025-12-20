
import React, { useState, useRef, createContext, useContext } from 'react';
// Theme definitions
const lightTheme = {
  background: '#f8f9fa',
  card: '#fff',
  text: '#000',
  subtext: '#666',
  accent: '#40C4D4',
  gold: '#FFD700',
  error: '#ff4444',
  credit: '#4CAF50',
  border: '#e0e0e0',
  shadow: '#000',
  walletCard: '#000',
  walletText: '#fff',
  shiny: 'rgba(255,255,255,0.15)',
};
const darkTheme = {
  background: '#000',
  card: '#181818',
  text: '#fff',
  subtext: '#aaa',
  accent: '#4F8CFF',
  gold: '#FFD700',
  error: '#ff4444',
  credit: '#4CAF50',
  border: '#222',
  shadow: '#000',
  walletCard: '#111',
  walletText: '#fff',
  shiny: 'rgba(255,255,255,0.10)',
};

export const ThemeContext = createContext({
  dark: false,
  setDark: () => {},
  theme: lightTheme,
  toggleTheme: () => {},
});
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import MyTicketScreen from './MyTicketScreen';
import BookingScreen from './BookingScreen';
import WalletProfileScreen from './WalletProfileScreen';
import { colors } from './constants';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  const [dark, setDark] = useState(false);
  const toggleTheme = () => setDark((d) => !d);
  const theme = dark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ dark, setDark, theme, toggleTheme }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: theme.accent,
            tabBarInactiveTintColor: theme.subtext,
            tabBarStyle: { backgroundColor: theme.background },
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home';
              else if (route.name === 'My Ticket') iconName = 'ticket';
              else if (route.name === 'Booking') iconName = 'search';
              else if (route.name === 'Wallet') iconName = 'wallet';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="My Ticket" component={MyTicketScreen} />
          <Tab.Screen name="Booking" component={BookingScreen} />
          <Tab.Screen name="Wallet" component={WalletProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
