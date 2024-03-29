import React, { useState, useEffect } from "react";
import { View, Image, Text, Alert, Button } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import colors from "../../utils/colors";
import * as Location from "expo-location";
import MapPreview from "../map-preview";

const LocationSelector = ({ onLocationPicker }) => {
    const [pickedLocation, setPickedLocation] = useState(null);
    const navigation = useNavigation();
    const route = useRoute();

    const mapLocation = route?.params?.mapLocation;
    const verifyPermissions = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if(status !== "granted") {
            Alert.alert(
                "Permisos insuficientes",
                "Necesitas dar permisos para acceder a la ubicación",
                [{ text: "Ok" }]
            );
            return false;
        }
        return true;
    };

    const onHandleGetLocation = async () => {
        const isLocationPermission = await verifyPermissions();
        if(!isLocationPermission) return;

        const location = await Location.getCurrentPositionAsync({
            timeout: 5000,
        });

        const { latitude, longitude } = location.coords;

        setPickedLocation({ lat: latitude, lng: longitude });

        onLocationPicker({ lat: latitude, lng: longitude });
    };

    const onHandleMapLocation = async () => {
        const isLocationPermission = await verifyPermissions();
        if(!isLocationPermission) return;
        navigation.navigate("Maps");
    };

    useEffect(() => {
        if(mapLocation) {
            setPickedLocation(mapLocation);
            onLocationPicker(mapLocation);
        }
    },[mapLocation]);
    
    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                <MapPreview location={pickedLocation} style={styles.mapPreview}>
                    <Text style={styles.text}>Localización en proceso...</Text>
                </MapPreview>
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    title="Obtener Ubicación"
                    color={colors.primary}
                    onPress={ onHandleGetLocation }
                />
                <Button
                    title="Selección en Mapa"
                    color={colors.primary}
                    onPress={ onHandleMapLocation }
                />
            </View>
        </View>
    );
};

export default LocationSelector;