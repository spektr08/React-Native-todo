import React, { useContext, useState, useEffect } from 'react';
import {SafeAreaView, View, ViewStyle } from 'react-native';
import { FAB } from '@rneui/themed';
import { KanbanBoard, ColumnModel, CardModel } from '@intechnity/react-native-kanban-board';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppwriteContext } from '../appwrite/AppwriteContext';
import { AppStackParamList } from '../routes/AppStack';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';

type UserObj = {
  name: string;
  email: string;
};

const columns = [
  new ColumnModel('todo', 'To Do', 1),
  new ColumnModel('inprogress', 'In Progress', 2),
  new ColumnModel('done', 'Done', 3),
];

export type NavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  "Home"
>;

const Home = () => {
  const navigation = useNavigation<NavigationProp>();
  const [userData, setUserData] = useState<UserObj>();
  const [cards, setCards] = useState<CardModel[]>([]);
  const { appwrite, appwriteData, setIsLoggedIn } = useContext(AppwriteContext);

  const handleLogout = async () => {
    await appwrite.logout();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await appwrite.getCurrentUser();
      if (response) {
        setUserData({
          name: response.name,
          email: response.email,
        });
      }
    };

    const fetchCards = async () => {
      const groupedCards = await appwriteData.getTodosGroupedByColumn();
      setCards(groupedCards);
    };
    

    fetchUserData();
    fetchCards();
  }, [appwrite, appwriteData]);

  const addNewCard = () => {
    navigation.navigate('AddCard');
  }

  const onCardDragEnd = (srcColumn, destColumn, item, targetIdx) => {
    // Handle card drag and drop
  };
  const renderCard = (model) => {
    return (
      <View>

      </View>
    )
  };
  const onCardPress = (item) => {
  };

  return (
    <LinearGradient
    colors={['#80b5ff', 'transparent']}
    style={styles.background}
    >
    <SafeAreaView style={styles.container}>
      <View >
          <FAB 
          color="#656565"
          onPress={addNewCard} 
          title='Add new card' />
        </View>
      <KanbanBoard
        columns={columns}
        cards={cards}
        onDragEnd={onCardDragEnd}
        onCardPress={onCardPress}
        //renderCardContent={renderCard}
      />
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{ name: 'logout', color: '#FFFFFF' }}
        onPress={handleLogout}
      />
    </SafeAreaView>
    </LinearGradient>
  );
};
export default Home;