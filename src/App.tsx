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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


registerRootComponent(App);
