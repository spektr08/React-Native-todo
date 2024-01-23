import { StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable, Image } from 'react-native'
import { Ionicons} from '@expo/vector-icons'; 
import { AppwriteContext } from '../appwrite/AppwriteContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../routes/AppStack';
import { styles } from '../../styles';
import { useContext, useEffect, useState } from 'react';
import RadioGroup from '../components/RadioGroup';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker"; 
import { CardModel } from '@intechnity/react-native-kanban-board';
import uploadImage from '../appwrite/uploadImage';

export type NavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  "AddCard"
>;
export interface ImageLoad {
  bucketId: string;
  fileId: string;
}

const AddCard = () => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigation = useNavigation<NavigationProp>();
    const [image, setImage] = useState(null); 
    const { cards, appwriteData, setCards, type, user } = useContext(AppwriteContext);

    const handleAdd = async () => {
      let file: ImageLoad | undefined;
      if(title == '') {
        return true;
      }
      if(image) {
        const fileUploaded = await uploadImage(image);
        if(fileUploaded) {
          file = {
            bucketId: fileUploaded.bucketId,
            fileId: fileUploaded.$id
          };
        }
      }

      const newCard = await  appwriteData.addTask(title, type, user.id, file);
      let newArr = [...cards]; // copying the old datas array
      newArr.push(newCard);
      setCards(newArr);
      navigation.goBack();
    }

    const pickImage = async () => { 
        const { status } = await ImagePicker. 
            requestMediaLibraryPermissionsAsync(); 
  
        if (status !== "granted") { 
            
        } else { 
            const result: ImagePicker.ImagePickerResult = 
                await ImagePicker.launchImageLibraryAsync(); 
            if (!result.canceled) { 
                setImage(result.assets[0]); 
                setError(''); 
            } 
        } 
    }; 

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Add Todo</Text>
        <TextInput
          value={title}
          onChangeText={text => setTitle(text)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Title"
          style={styles.input}
        />
        <RadioGroup />

        {image ? ( 
            <View style={stylesComponent.imageContainer}> 
                <Image source={{ uri: image.uri }} 
                    style={stylesComponent.image} /> 
            </View> 
        ) : ( 
            <Text style={styles.errorText}>{error}</Text> 
        )} 

        <TouchableOpacity style={styles.btn} 
                onPress={pickImage}> 
            <View style={{
                paddingHorizontal: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                
                <Text style={styles.btnText}> 
                    Choose Image 
                </Text> 
                <Entypo name="image" size={24} color="black" />
            </View>    
        </TouchableOpacity> 
        <Pressable
          onPress={handleAdd}
          style={[styles.btn, {marginTop: error ? 10 : 20}]}>
          <Text style={styles.btnText}>Add</Text>
        </Pressable>
      </View>
      <TouchableOpacity onPress={navigation.goBack} style={stylesComponent.topRightContainer}>
        <Ionicons name="md-close-circle-sharp" size={32} color="black" />
      </TouchableOpacity>
    </View>
  )
}
export default AddCard
const stylesComponent = StyleSheet.create({
    topRightContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 5,
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
    image: { 
        alignSelf: 'center',
        width: 200, 
        height: 200, 
        borderRadius: 8, 
    }, 
});