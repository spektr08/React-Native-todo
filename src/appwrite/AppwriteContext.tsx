import Appwrite from './service'
import AppwriteData from './dataBase'
import { FC, PropsWithChildren, createContext, useContext, useState } from 'react'
import { CardModel } from '@intechnity/react-native-kanban-board';

type AppContexType = {
    appwrite: Appwrite;
    appwriteData: AppwriteData
    isLoggedIn: boolean;
    type: string,
    cards: Array<CardModel>;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    setCards: (columns: Array<CardModel>) => void;
    setType: (type: string) => void
} 

export const AppwriteContext = createContext<AppContexType>({
    appwrite: new Appwrite(),
    appwriteData: new AppwriteData(),
    isLoggedIn: false,
    cards: [],
    type: 'todo',
    setIsLoggedIn: () => {},
    setCards: () => {},
    setType: () => {}
});

export const AppwriteProvider: FC<PropsWithChildren> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cards, setCards] = useState([]);
    const [type, setType] = useState('todo');
    const defaultValue = {
        appwrite: new Appwrite(),
        appwriteData: new AppwriteData(),
        cards,
        type,
        isLoggedIn,
        setIsLoggedIn,
        setCards,
        setType
    };
    return (
        <AppwriteContext.Provider value={defaultValue}>
            {children}
        </AppwriteContext.Provider>
    )
}
//export default AppwriteContext