import SignUp from '../screens/Signup'
import Login from '../screens/Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

export  type AuthStackParamList = {
    SignUp: undefined,
    Login: undefined
}

const Stack = createNativeStackNavigator<AuthStackParamList>();

export  function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
            headerShown: false
        }}
        initialRouteName="Login"
    >
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}