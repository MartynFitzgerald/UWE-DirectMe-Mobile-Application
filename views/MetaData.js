import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Moment from 'moment';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.carPark = JSON.parse(this.props.carPark);
  }


  render() {
    const { carPark} = this;
    return (
      <View style={styles.viewOverall}>
        <MapView
          //Either "google" for GoogleMaps, otherwise null or undefined to use the native map framework (MapKit in iOS and GoogleMaps in android).
          provider={"google"} // remove if not using Google Maps
          //Style of the map itself
          style={styles.map}
          //The initial region to be displayed by the map 
          initialRegion={{
              latitude: carPark.latitude,
              longitude: carPark.longitude,
              latitudeDelta: 0.015*5,
              longitudeDelta: 0.0121*5,
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
        >
          <Marker
            key={carPark.car_park_id}
            coordinate={{ latitude: carPark.latitude, longitude: carPark.longitude }}
            title={carPark.name}
            description={carPark.address}
          />
        </MapView>
        <View style={styles.viewOverallText}>
          <List.Section style={styles.list}>
            <List.Item
              title="Name:"
              right={() => <Text style={styles.rightText} >{carPark.name.replace("Bristol ", "")}</Text>}
            />
            <Divider/>
            <List.Item
              title="Address:"
              right={() => <Text style={styles.rightText} >{carPark.address}</Text>}
            />
            <Divider/>
            <List.Item
              title="Latitude:"
              right={() => <Text style={styles.rightText} >{carPark.latitude}</Text>}
            />
            <Divider/>
            <List.Item
              title="Longitude:"
              right={() => <Text style={styles.rightText} >{carPark.longitude}</Text>}
            />
            <Divider/>
            <List.Item
              title="Last Updated:"
              right={() => <Text style={styles.rightText} >{Moment(carPark.last_updated_at).format('MMMM Do YYYY')}</Text>}
            />
            <Divider/>
          </List.Section>

          <TouchableOpacity style={[styles.buttonContainer, styles.buttons]}>
            <Text>DirectMe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonContainer, styles.buttons]}
            onPress={() => {
              this.props.toggleModal();
          }}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewOverall:{
    minHeight:700,
    maxHeight:700,
  },
  viewOverallText:{
    alignItems: 'center',
  },
  map: {
      flex: 1,
      marginTop: -15,
      minWidth:372,
      maxWidth:372,
      minHeight:300,
      maxHeight:300,
  },
  list: {
      width: '100%',
  },
  rightText: {
    textAlignVertical: 'center',
  },
  buttonContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#000000',
    borderWidth: .5,
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    marginBottom:10,
    width:250,
    borderRadius:30,
  },
  buttons: {
    backgroundColor: '#FFFFFF',
  },
});