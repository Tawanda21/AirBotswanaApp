
import * as React from 'react';
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
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.lightBlue,
          tabBarInactiveTintColor: colors.darkGray,
          tabBarStyle: { backgroundColor: colors.white },
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
  );
}
