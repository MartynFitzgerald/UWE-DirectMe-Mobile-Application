import React from "react";
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import MapView from 'react-native-maps';

const usersMap = props => {
    return (
        <View style={styles.mapContainer}>
            <Title style={styles.title}>Name</Title>
            <MapView
            //ither "google" for GoogleMaps, otherwise null or undefined to use the native map framework (MapKit in iOS and GoogleMaps in android).
            provider={"google"} // remove if not using Google Maps
            //Style of the map itself
            style={styles.map}
            //The initial region to be displayed by the map 
            initialRegion={{
                latitude: 51.46,
                longitude: -2.60,
                latitudeDelta: 0.2,
                longitudeDelta: 0.2,
            }}
            //If true the app will ask for the user's location
            showsUserLocation={true} 
            //If false hide the button to move map to the current user's location.
            showsMyLocationButton={false}
            //Minimum zoom value for the map, must be between 0 and 20
            minZoomLevel={9}
            //Maximum zoom value for the map, must be between 0 and 20
            maxZoomLevel={20}
            //If false the user won't be able to adjust the camera’s pitch angle.
            pitchEnabled={false}
            />
        </View>
    );
};


const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: '100%',
    },
    map: {
        flex: 1,
    },
    title: {
        paddingTop: 40,
        marginTop: 0,
        top: 0,
        textAlign: 'center', 
        fontWeight: 'bold',
        backgroundColor: '#0F9D58',
        color: '#fff',
    },
  });

export default usersMap;