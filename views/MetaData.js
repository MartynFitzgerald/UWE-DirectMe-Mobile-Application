import React, { Component } from 'react';
import { View, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { List, Divider } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import Moment from 'moment';

export default class Overlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      carPark: [],
    };
  }

  componentDidMount() {
    this.setState({carPark: JSON.parse(this.props.carPark)});
    //If carPark is set then edit name to remove Bristol from string.
    if (this.carPark != null) {
      this.carPark.name = this.carPark.name.replace("Bristol ", "");
    }
  };

  render() {
    const { colors, styles } = this.props;
    const { carPark } = this.state;
    return (
    <View style={styles.viewOverall}>
      <MapView
        //Either "google" for GoogleMaps, otherwise null or undefined to use the native map framework (MapKit in iOS and GoogleMaps in android).
        provider={"google"}
        //Defining the map type to standard instead of satellite.
        mapType={"standard"}
        //General styling of the map itself.
        style={styles.map}
        //The initial region to be displayed by the map .
        initialRegion={{
            latitude: carPark.latitude || 51.46,
            longitude: carPark.longitude || -2.60,
            latitudeDelta: 0.015*5,
            longitudeDelta: 0.0121*5,
        }}
        //If true the app will ask for the user's location.
        showsUserLocation={true} 
        //If false hide the button to move map to the current user's location.
        showsMyLocationButton={false}
        //Minimum zoom value for the map, must be between 0 and 20.
        minZoomLevel={9}
        //Maximum zoom value for the map, must be between 0 and 20.
        maxZoomLevel={20}
        //If false the user won't be able to adjust the camera’s pitch angle.
        pitchEnabled={false}
        //If false the user won't see traffic information.
        showsTraffic={false}
        //If false the user won't see building when zoomed in.
        showsBuildings={false}
        //If false the user won't see inside of building when zoomed in.
        showsIndoors={false}
        //If false the user won't see the compass at the top right of the map.
        showsCompass={false}
        //This connects the users location to the region of the map.
        followUserLocation={false}
        //Adding custom style sourced from Google if darkmode has been selected.
        customMapStyle={colors.map}
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
            titleStyle={styles.lightGreyText}
            title="Name:"
            right={() => <Text style={[styles.centerVerticalText, styles.lightGreyText]} >{carPark.name}</Text>}
          />
          <Divider/>
          <List.Item
            titleStyle={styles.lightGreyText}
            title="Address:"
            right={() => <Text style={[styles.centerVerticalText, styles.lightGreyText]} >{carPark.address}</Text>}
          />
          <Divider/>
          <List.Item
            titleStyle={styles.lightGreyText}
            title="Latitude:"
            right={() => <Text style={[styles.centerVerticalText, styles.lightGreyText]} >{carPark.latitude}</Text>}
          />
          <Divider/>
          <List.Item
            titleStyle={styles.lightGreyText}
            title="Longitude:"
            right={() => <Text style={[styles.centerVerticalText, styles.lightGreyText]} >{carPark.longitude}</Text>}
          />
          <Divider/>
          <List.Item
            titleStyle={styles.lightGreyText}
            title="Last Updated:"
            right={() => <Text style={[styles.centerVerticalText, styles.lightGreyText]} >{Moment(carPark.last_updated_at).format('MMMM Do YYYY')}</Text>}
          />
          <Divider/>
        </List.Section>

        <TouchableOpacity style={[styles.buttonContainerMetadata]}>
          <Text style={[styles.centerVerticalText, styles.lightGreyText]}>DirectMe</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainerMetadata]}
          onPress={() => {
            this.props.toggleModal();
        }}>
          <Text style={[styles.centerVerticalText, styles.lightGreyText]}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
};