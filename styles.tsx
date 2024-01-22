import {StyleSheet} from 'react-native'

export  const  styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    formContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      height: '100%',
    },
    appName: {
      color: '#f02e65',
      fontSize: 40,
      fontWeight: 'bold',
      alignSelf: 'center',
      marginBottom: 20,
    },
    input: {
      backgroundColor: '#fef8fa',
      padding: 10,
      height: 40,
      alignSelf: 'center',
      borderRadius: 5,
  
      width: '80%',
      color: '#000000',
  
      marginTop: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 1,
    },
    errorText: {
      color: 'red',
      alignSelf: 'center',
      marginTop: 10,
    },
    btn: {
      backgroundColor: '#ffffff',
      padding: 10,
      height: 45,
  
      alignSelf: 'center',
      borderRadius: 5,
      width: '80%',
      marginTop: 20,
  
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
  
      elevation: 3,
    },
    btnText: {
      color: '#484848',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 18,
    },
    signUpContainer: {
      marginTop: 80,
    },
    noAccountLabel: {
      color: '#484848',
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 15,
    },
    signUpLabel: {
      color: '#1d9bf0',
    },
    background: {
      flex: 1
    }
  });