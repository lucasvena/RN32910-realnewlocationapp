import { useState } from "react";
import { View, Text, ScrollView, TextInput, Button } from "react-native";
import { useDispatch } from "react-redux";
import { ImageSelector, LocationSelector } from "../../components";
import { savePlace } from "../../store/place.slice";
import colors from "../../utils/colors";
import { styles } from "./styles";

const NewPlace = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [coords, setCoords] = useState(null);
  const dispatch = useDispatch(); 

  const onHandleSubmit = () => {
    dispatch(savePlace({ title, image, coords }));
    navigation.navigate("Places");
  }

  const onHandleChange = (text) => {
    setTitle(text);
  }

  const onImagePicker = (uri) => {
    setImage(uri); 
  };

  const onLocationPicker = (location) => {
    console.warn(location);
    setCoords(location);
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Título</Text>
        <TextInput onChangeText={onHandleChange} style={styles.input} placeholder='Escribe el lugar' />
        <ImageSelector onImagePicker={onImagePicker}/>
        <LocationSelector onLocationPicker={onLocationPicker}/>
        <Button color={colors.primary} title='Guardar dirección' onPress={onHandleSubmit} />
      </View>
    </ScrollView>
  );
};

export default NewPlace;
