import Appwrite from './service'
import AppwriteData from './dataBase'
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'
import { CardModel } from '@intechnity/react-native-kanban-board';


export type UserObj = {
    id: String;
    name: String;
    email: String;
  }

  
type AppContexType = {
    appwrite: Appwrite;
    appwriteData: AppwriteData
    isLoggedIn: boolean;
    type: string,
    user: UserObj | null,
    cards: Array<CardModel>;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setCards: (columns: Array<CardModel>) => void;
    setType: (type: string) => void;
    setUser: (user: UserObj | null) => void
} 

export const AppwriteContext = createContext<AppContexType>({
    appwrite: new Appwrite(),
    appwriteData: new AppwriteData(),
    isLoggedIn: false,
    cards: [],
    user: null,
    type: 'todo',
    setIsLoggedIn: () => {},
    setCards: () => {},
    setType: () => {},
    setUser: () => {}
});

export const AppwriteProvider: FC<PropsWithChildren> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cards, setCards] = useState([]);
    const [user, setUser] = useState([]);
    const [type, setType] = useState('todo');
    const defaultValue = {
        appwrite: new Appwrite(),
        appwriteData: new AppwriteData(),
        cards,
        type,
        user,
        isLoggedIn,
        setIsLoggedIn,
        setCards,
        setType,
        setUser
    };
    return (
        <AppwriteContext.Provider value={defaultValue}>
            {children}
        </AppwriteContext.Provider>
    )
}