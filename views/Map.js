import React, { Component } from 'react';
import {View, TouchableOpacity, Alert} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Appbar, List } from 'react-native-paper';
import Overlay from 'react-native-modal-overlay';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

//Import styles.
import { styles } from '../styles/General';
//Import views.
import Directions from './Directions.js';
//Import functions.
import storage from '../models/Storage';
import algorithm from '../controllers/Algorithm';
//Google directions API key.
//const GOOGLE_API_KEY = '';
const GOOGLE_API_KEY = 'AIzaSyCu6_DCGV4g7LT66nIHrWaRu0dteV1lFeY';

export default class Map extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        search: '',
        minSearchLength: 10,

        userLatitude: 0,
        userLongitude: 0,

        mapRegionLatitude: 51.46,
        mapRegionLongitude: -2.60,

        carParkName: '',
        carParkAddress: '',
        carParkLatitude: 0,
        carParkLongitude: 0,
        carParkRating: 0,
        carParkAmountRating: 0,
        carPark: false,

        user: [],
        isModalVisible: false,
      };
    }

    componentDidMount() {
      //Retrieve user data from local storage.
      storage.get(`userLocal`)
       .then((user) => {
        this.setState({ user: user[0] });
       });
       //Fetch user's location from GPS.
      this.getUserLocation();
    };

    getUserLocation = async () => {
      const { mapRegionLatitude, mapRegionLongitude } = this.state;
      try {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        } else {
          //Get user's location
          let location = await Location.getCurrentPositionAsync({});
          //Store users location
          await this.setState({userLatitude: location.coords.latitude});
          await this.setState({userLongitude: location.coords.longitude});
  
          if (mapRegionLatitude == 51.46 && mapRegionLongitude == -2.60)
          {
            await this.setState({mapRegionLatitude: location.coords.latitude});
            await this.setState({mapRegionLongitude: location.coords.longitude});
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    updateSearch = async (search) => {
      this.setState({ search });
    };

    makeRequest = async () => {
      const { search, minSearchLength, user, geoLatitude, geoLongitude } = this.state;
    
      if (search.length < minSearchLength) {
        //Output alert to aware user of invalid search input.
        Alert.alert(
          "Invalid Input",
          `Unfortunately DirectMe couldn't search that location, please make sure you insert a correct address and try again.`,
          [
            { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
          ],
          { cancelable: true }
        );
        //Return since user hasn't finished inputting their search.
        return;
      } else {
        //Get search location.
        let geoLocation = await Location.geocodeAsync(search);
        //Sending car parks to the algorithm which will produce the best location for the user.
        var chosenCarPark = await algorithm.findBestLocation(geoLocation[0].latitude, geoLocation[0].longitude, user.radius);
        //Double check if there is any car parks returned.
        if (chosenCarPark){
          //Store car park information.
          this.setState({carParkName: chosenCarPark.name});
          this.setState({carParkAddress: chosenCarPark.address});
          this.setState({carParkLatitude: chosenCarPark.latitude});
          this.setState({carParkLongitude: chosenCarPark.longitude});
          this.setState({carParkRating: chosenCarPark.overallRating});
          this.setState({carParkAmountRating: chosenCarPark.overallAmount});
          this.setState({carPark: true});
          this.setState({isModalVisible: true});
        } else {
          //Output alert to aware user of no car parks available.
          Alert.alert(
            "Couldn't Find Car Parks",
            `Unfortunately DirectMe couldn't find any car parks, please try again.`,
            [
              { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
            ],
            { cancelable: true }
          );
        }
      }
    };

    renderDirections() {
      const { userLatitude, userLongitude, carPark, carParkLatitude, carParkLongitude } = this.state;
      if (carPark) {
        return (
          <View>
            <MapViewDirections 
              mode="DRIVING" 
              origin={{latitude: userLatitude, longitude: userLongitude}}
              destination={{latitude: carParkLatitude, longitude: carParkLongitude}}
              apikey={GOOGLE_API_KEY} 
              strokeWidth={3} 
              strokeColor="#EB3349" 
              timePrecision="now"
            />
            <Marker coordinate={{latitude:carParkLatitude,longitude:carParkLongitude}}/>
          </View>
        );
      }
      return;
    };

    toggleModal = () => {
      this.setState({isModalVisible: !this.state.isModalVisible});
    };

    render() {
      const { search, mapRegionLatitude, mapRegionLongitude, isModalVisible, carParkName, carParkAddress, carParkRating, carParkAmountRating } = this.state;
      return (
          <View style={styles.list}>
            <Appbar.Header style={styles.appBar}>
              <Appbar.Content title={this.props.route.tabTitle} style={styles.appBarTitle} titleStyle={styles.appBarTitle}/>
            </Appbar.Header>
            <View styles={styles.searchButton} >
            <SearchBar
                placeholder="E.g. Cabot Circus, UK"
                onChangeText={this.updateSearch}
                value={search}
                containerStyle={styles.outerBox} 
                inputContainerStyle={styles.mapSearchBox} 
                searchIcon={false}
                lightTheme 
            />
            <TouchableOpacity 
              onPress={this.makeRequest}
              style={styles.searchButton}
            >
              <List.Icon  style="searchButtonText" icon="magnify" />
            </TouchableOpacity>
           </View>
            <MapView
            //Either "google" for GoogleMaps, otherwise null or undefined to use the native map framework (MapKit in iOS and GoogleMaps in android).
            provider={"google"} // remove if not using Google Maps
            //Style of the map itself
            style={{flex: 1}}
            //The initial region to be displayed by the map 
            initialRegion={{
                latitude: mapRegionLatitude,
                longitude: mapRegionLongitude,
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
            >
            {this.renderDirections()}
            </MapView>
            <View>
              <Overlay visible={isModalVisible} onClose={this.toggleModal} animationType="zoomIn" animationDuration={500} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0)', }} childrenWrapperStyle={{borderRadius: 5,bottom: -230}}>
                <Directions title={carParkName} address={carParkAddress} rating={carParkRating} amountOfRating={carParkAmountRating} toggleModal={this.toggleModal}/>
              </Overlay>
            </View>
          </View>
        );
    }
}