import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppwriteProvider } from './appwrite/AppwriteContext';
import { Router } from './routes/Router';

function App() {
  return (
    <AppwriteProvider>
        <Router/>
    </AppwriteProvider>
  );
}


registerRootComponent(App);
