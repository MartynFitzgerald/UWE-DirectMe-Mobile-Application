import React, { Component } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Title } from 'react-native-paper';
import MapView from 'react-native-maps';
import { SearchBar } from 'react-native-elements';

export default class Map extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        search: '',
      };
    }
    
    updateSearch = search => {
      this.setState({ search });
    };

    render() {
        const { search } = this.state;
        return (
            <View style={styles.mapContainer}>
            <Title style={styles.title}>{this.props.route.tabTitle}</Title>
            <SearchBar
                placeholder="Search Here..."
                onChangeText={this.updateSearch}
                value={search}
                containerStyle={styles.outerBox} 
                inputContainerStyle={styles.searchBox} 
                lightTheme 
            />
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
    }
}


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
        marginBottom: 0,
        top: 0,
        textAlign: 'center', 
        fontWeight: 'bold',
        backgroundColor: '#EB3349',
        color: '#fff',
    },
    outerBox: {
      padding: 0,
      margin: 0,
    },
    searchBox: {
      width: "100%",
    },
  });