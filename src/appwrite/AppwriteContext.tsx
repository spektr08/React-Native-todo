import { View, Text, StyleSheet } from 'react-native'
import Appwrite from './service'
import AppwriteData from './dataBase'
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'

type AppContexType = {
    appwrite: Appwrite;
    appwriteData: AppwriteData
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void
} 

export const AppwriteContext = createContext<AppContexType>({
    appwrite: new Appwrite(),
    appwriteData: new AppwriteData(),
    isLoggedIn: false,
    setIsLoggedIn: () => {}
});

export const AppwriteProvider: FC<PropsWithChildren> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const defaultValue = {
        appwrite: new Appwrite(),
        appwriteData: new AppwriteData(),
        isLoggedIn,
        setIsLoggedIn
    };
    return (
        <AppwriteContext.Provider value={defaultValue}>
            {children}
        </AppwriteContext.Provider>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
//export default AppwriteContext