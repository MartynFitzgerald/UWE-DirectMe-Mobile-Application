import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Moment from 'moment';

//Import styles.
import style from '../styles/General';
import schemes from '../styles/ColourSchemes';

export default class Overlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: {},
    };
    this.carPark = JSON.parse(this.props.carPark);
  }


  componentDidMount() {
    this.setStyle();
  };

  setStyle = async () => {
    try {
      var scheme = await schemes.colours();
      this.setState({styles: style.fetchStyle(scheme.desire, scheme.orangeSoda, scheme.sandstorm, scheme.lightGrey, scheme.white)});
     } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { carPark} = this;
    const { styles } = this.state;
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
          <List.Section style={{width: '100%'}}>
            <List.Item
              title="Name:"
              right={() => <Text style={styles.centerVerticalText} >{carPark.name.replace("Bristol ", "")}</Text>}
            />
            <Divider/>
            <List.Item
              title="Address:"
              right={() => <Text style={styles.centerVerticalText} >{carPark.address}</Text>}
            />
            <Divider/>
            <List.Item
              title="Latitude:"
              right={() => <Text style={styles.centerVerticalText} >{carPark.latitude}</Text>}
            />
            <Divider/>
            <List.Item
              title="Longitude:"
              right={() => <Text style={styles.centerVerticalText} >{carPark.longitude}</Text>}
            />
            <Divider/>
            <List.Item
              title="Last Updated:"
              right={() => <Text style={styles.centerVerticalText} >{Moment(carPark.last_updated_at).format('MMMM Do YYYY')}</Text>}
            />
            <Divider/>
          </List.Section>

          <TouchableOpacity style={[styles.buttonContainerMetadata]}>
            <Text>DirectMe</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonContainerMetadata]}
            onPress={() => {
              this.props.toggleModal();
          }}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};