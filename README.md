# AirBotswanaApp

A React Native mobile application for flight booking and ticket management, built with Expo and featuring a modern, responsive design with dark mode support.

## Overview

AirBotswanaApp is a comprehensive mobile application that enables users to browse flights, book tickets, manage their bookings, and maintain a digital wallet. The app features a clean, intuitive interface with seamless navigation and theme customization.

## Features

- **Home Screen**: Browse and explore flight options
- **Booking Screen**: Search and book flights with an easy-to-use booking interface
- **My Tickets Screen**: View and manage your booked tickets in one place
- **Wallet & Profile Screen**: Manage your wallet, credits, and user profile settings
- **Dark Mode Support**: Toggle between light and dark themes for comfortable viewing in any environment
- **Bottom Tab Navigation**: Easy navigation between all major app sections
- **Responsive Design**: Optimized for various screen sizes

## Tech Stack

- **Framework**: React Native 0.79.5 with Expo 53.0.22
- **Navigation**: React Navigation 7.1.17 with Bottom Tab Navigator
- **Animations**: React Native Reanimated 4.1.0 & React Native Animatable
- **Icons**: Expo Vector Icons & Lucide React Native
- **Language**: JavaScript (React 19.0.0)
- **Styling**: Native React Native components with custom theme system

## Project Structure

```
AirBotswanaApp/
├── App.js                    # Main app component with theme context and navigation setup
├── HomeScreen.js            # Home screen displaying flights and featured content
├── BookingScreen.js         # Booking interface for reserving flights
├── MyTicketScreen.js        # User's booked tickets and bookings
├── WalletProfileScreen.js   # Wallet management and user profile
├── constants.js             # Color constants and app configuration
├── index.js                 # App entry point
├── app.json                 # Expo app configuration
├── package.json             # Project dependencies and scripts
└── README.md               # This file
```

## Installation

### Prerequisites
- Node.js (14 or higher)
- npm or yarn
- Expo CLI installed globally (`npm install -g expo-cli`)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/AirBotswanaApp.git
   cd AirBotswanaApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

## Running the App

### Start the Development Server
```bash
npm start
```

### Run on Specific Platform

**Android**
```bash
npm run android
```

**iOS**
```bash
npm run ios
```

**Web**
```bash
npm run web
```

The development server will start and display a QR code. You can scan this with your device using the Expo app to preview the application.

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react-native | 0.79.5 | Core React Native framework |
| expo | ~53.0.22 | Expo managed service |
| @react-navigation/native | 7.1.17 | Navigation framework |
| @react-navigation/bottom-tabs | 7.4.7 | Bottom tab navigation |
| react-native-reanimated | 4.1.0 | Advanced animations |
| lucide-react-native | 0.542.0 | Icon library |
| @expo/vector-icons | 14.1.0 | Icon components |

## Theme System

The app includes a built-in theme context that supports both light and dark modes. The theme includes:

- Background colors
- Card styling
- Text colors (primary and secondary)
- Accent colors (Botswana blue)
- Gold highlights
- Error and success states
- Shadow effects

Users can toggle between themes within the app for their preferred viewing experience.

## Navigation Structure

The app uses React Navigation's Bottom Tab Navigator with the following tabs:

1. **Home** - Main flight browsing interface
2. **Booking** - Flight search and booking functionality
3. **My Tickets** - User's ticket history and active bookings
4. **Wallet & Profile** - User account, wallet, and preferences

## Development

### Project Scripts

- `npm start` - Start Expo development server
- `npm run android` - Launch on Android emulator/device
- `npm run ios` - Launch on iOS simulator/device
- `npm run web` - Launch web version

### File Descriptions

- **App.js**: Contains the main application component, theme context definition, and navigation structure
- **HomeScreen.js**: Displays the home feed with featured flights and options
- **BookingScreen.js**: Interface for searching and booking flights
- **MyTicketScreen.js**: Shows user's booked tickets and reservation details
- **WalletProfileScreen.js**: Manages user profile, wallet balance, and payment methods
- **constants.js**: Centralized color definitions following Botswana flag color scheme

## Color Scheme

The app uses a carefully curated color palette inspired by the Botswana flag:

- **Light Blue**: #4CB7E9 (Primary accent)
- **Black**: #000000
- **White**: #FFFFFF
- **Gray**: #F5F5F5 (Light backgrounds)
- **Dark Gray**: #222222 (Dark elements)

## Future Enhancements

- Real-time flight updates and notifications
- Payment gateway integration
- In-app messaging and customer support
- Advanced filtering and search options
- Booking history and analytics
- Loyalty program integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

## License

This project is private and intended for internal use.

## Support

For issues, questions, or feature requests, please open an issue on the project repository.

---

**Version**: 1.0.0  
**Last Updated**: December 2025
