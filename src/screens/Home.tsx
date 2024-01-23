import React, { useContext, useState, useEffect } from 'react';
import {SafeAreaView, View, Text, StyleSheet, Image } from 'react-native';
import { FAB } from '@rneui/themed';
import { KanbanBoard, ColumnModel, CardModel } from '@intechnity/react-native-kanban-board';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppwriteContext } from '../appwrite/AppwriteContext';
import { AppStackParamList } from '../routes/AppStack';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles';
import { LinearGradient } from 'expo-linear-gradient';
import { UserObj } from '../appwrite/AppwriteContext';

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
  const { appwrite, appwriteData, setIsLoggedIn, cards, setCards, setUser, user } = useContext(AppwriteContext);

  const handleLogout = async () => {
    await appwrite.logout();
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const fetchCards = async () => {
      const response = await appwrite.getCurrentUser();
      if (response) {
        const currentUser : UserObj = {
          id: response.$id,
          name: response.name,
          email: response.email
        }
        setUser(currentUser);
        const groupedCards = await appwriteData.getTodosGroupedByColumn(currentUser.id);
        setCards(groupedCards);
      }
    };
    fetchCards();
  },[]);

  useEffect(() => {
    setCards(cards);
  }, [cards]);

  const addNewCard = () => {
    navigation.navigate('AddCard');
  }

  const onCardDragEnd = (srcColumn, destColumn, item, targetIdx) => {
    appwriteData.updateTodoInDB(item.id, destColumn.id);
  };
  const renderCard =  (model) => {
    // console.log(model.title,model.columnId, model.description);
    return (
      <React.Fragment>
        <View style={stylesBoard.cardHeaderContainer}>
          <View style={stylesBoard.cardTitleContainer}>
            <Text style={[stylesBoard.cardTitleText]}>{model.title}</Text>
          </View>
          <Text style={[stylesBoard.cardSubtitleText]}>{model.subtitle}</Text>
        </View>
        {model.description != '' && ( 
            <View style={stylesBoard.imageContainer}> 
                <Image source={{ uri: model.description }} 
                    style={stylesBoard.image} /> 
            </View> 
        )} 
       
      </React.Fragment>
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
        renderCardContent={renderCard}
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

const stylesBoard = StyleSheet.create({
  container: {
    borderColor: '#E3E3E3',
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    elevation: 3
  },
  cardHeaderContainer: {
    marginBottom: 16
  },
  cardTitleContainer: {
    marginBottom: 8
  },
  cardTitleText: {
    fontWeight: 'bold',
  },
  cardSubtitleText: {
  },
  cardContentContainer: {
    marginBottom: 16
  },
  cardContentText: {
    fontWeight: 'bold'
  },
  image: { 
    alignSelf: 'center',
    width: 200, 
    height: 200, 
    borderRadius: 8, 
  }, 
  imageContainer: { 
    marginTop: 10,
    borderRadius: 8, 
    marginBottom: 16, 
    shadowColor: "#000000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.4, 
    shadowRadius: 4, 
    elevation: 5, 
  }, 
});
export default Home;