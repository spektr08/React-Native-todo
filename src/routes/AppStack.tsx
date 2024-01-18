import { StyleSheet, Text, View } from 'react-native'
import Home from '../screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export  type AppStackParamList = {
    Home: undefined,
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
    </Stack.Navigator>
  )
}