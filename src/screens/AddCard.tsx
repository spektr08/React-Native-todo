import { StyleSheet, Text, TouchableOpacity, View, TextInput, Pressable, Image } from 'react-native'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../routes/AppStack';
import { styles } from '../../styles';
import { useState } from 'react';
import RadioGroup from '../components/RadioGroup';
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker"; 

export type NavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  "AddCard"
>;

const AddCard = () => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string>('');
    const navigation = useNavigation<NavigationProp>();
    const [file, setFile] = useState(null); 

    const handleLogin = () => {
       
       
    }

    const pickImage = async () => { 
        const { status } = await ImagePicker. 
            requestMediaLibraryPermissionsAsync(); 
  
        if (status !== "granted") { 
            
        } else { 
            const result: ImagePicker.ImagePickerResult = 
                await ImagePicker.launchImageLibraryAsync(); 
            if (!result.canceled) { 
                setFile(result.assets[0].uri); 
                setError(null); 
            } 
        } 
    }; 

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.appName}>Add Todo</Text>
        <TextInput
          value={title}
          onChangeText={text => setTitle(title)}
          placeholderTextColor={'#AEAEAE'}
          placeholder="Title"
          style={styles.input}
        />
        <RadioGroup />

        {file ? ( 
            <View style={stylesComponent.imageContainer}> 
                <Image source={{ uri: file }} 
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
          onPress={handleLogin}
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