import { StyleSheet, Text, View } from 'react-native'
import Home from '../screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddCard from '../screens/AddCard';

export  type AppStackParamList = {
    Home: undefined,
    AddCard: undefined
}

const Stack = createNativeStackNavigator<AppStackParamList>();

export  function AppStack() {
  return (
    <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
    >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen  options={{
          presentation: "modal"
        }} name="AddCard" component={AddCard} />
    </Stack.Navigator>
  )
}