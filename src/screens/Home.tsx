import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { FAB } from '@rneui/themed';
import { KanbanBoard, ColumnModel, CardModel } from '@intechnity/react-native-kanban-board';

import { AppwriteContext } from '../appwrite/AppwriteContext';

type UserObj = {
  name: string;
  email: string;
};

const columns = [
  new ColumnModel('todo', 'To Do', 1),
  new ColumnModel('inprogress', 'In Progress', 2),
  new ColumnModel('done', 'Done', 3),
];

const Home = () => {
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

  const onCardDragEnd = (srcColumn, destColumn, item, targetIdx) => {
    // Handle card drag and drop
  };

  const onCardPress = (item) => {
    // Handle card press
  };

  return (
    <SafeAreaView style={styles.container}>
      <KanbanBoard
        columns={columns}
        cards={cards}
        onDragEnd={onCardDragEnd}
        onCardPress={onCardPress}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;