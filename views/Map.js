/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  map.js  
|  Description:  This is the file that holds the class of the map view.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Appbar, List } from 'react-native-paper';
import Overlay from 'react-native-modal-overlay';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import { v1 as uuidv1 } from 'react-native-uuid';
//Import views.
import Directions from './Directions.js';
import Payment from './Payment.js';
import PaymentSuccessful from './PaymentSuccessful.js';
import Review from './Review.js';
//Import functions.
//Import functions.
import apiMethods from '../models/ApiMethods';
import storage from '../models/Storage';
import algorithm from '../controllers/Algorithm';
//Google directions API key.
const GOOGLE_API_KEY = 'AIzaSyCu6_DCGV4g7LT66nIHrWaRu0dteV1lFeY';

export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      minSearchLength: 10,

      user: [],
      userLatitude: 0,
      userLongitude: 0,

      mapRegionLatitude: 51.46,
      mapRegionLongitude: -2.60,

      carParkID: '',
      carParkName: '',
      carParkAddress: '',
      carParkLatitude: 0,
      carParkLongitude: 0,
      carParkRating: 0,
      carParkAmountRating: 0,

      distance: 0,
      duration: 0,

      hours: 1,
      rating: 3,
      review: '',

      isUserCameraLinkedVisible: false,
      isCarParkMapShapesVisible: false,
      isCarParkInfoVisible: false,
      isCarParkPaymentVisible: false,
      isCarParkPaymentSuccessfulVisible: false,
      isCarParkReviewVisible: false,
    };
    this.map = null;
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
        
        //Change map's region to the user's location.
        if (location.coords.latitude != null && location.coords.longitude != null){
          this.map.animateToRegion({latitude: location.coords.latitude || mapRegionLatitude, longitude: location.coords.longitude || mapRegionLongitude, latitudeDelta: 0.2, longitudeDelta: 0.2,}, 3000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  makeRequest = async () => {
    const { search, minSearchLength, user, userLatitude, userLongitude } = this.state;

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
        //Store car park information to be used at a later point.
        this.setState({carParkID: chosenCarPark.car_park_id});
        this.setState({carParkName: chosenCarPark.name});
        this.setState({carParkAddress: chosenCarPark.address});
        this.setState({carParkLatitude: chosenCarPark.latitude});
        this.setState({carParkLongitude: chosenCarPark.longitude});
        this.setState({carParkRating: chosenCarPark.overallRating});
        this.setState({carParkAmountRating: chosenCarPark.overallAmount});
        this.setState({isCarParkMapShapesVisible: true});
        this.setState({isCarParkInfoVisible: true});
        //Find the middle point of the car park's location and user's location to set region.
        midpointLatitude = (chosenCarPark.latitude + userLatitude) / 2;
        midpointLongitude = (chosenCarPark.longitude + userLongitude) / 2;
        //Change map's region to the user's location.
        if (midpointLatitude && midpointLongitude){
          this.map.animateToRegion({latitude: midpointLatitude,longitude: midpointLongitude,latitudeDelta: 0.2,longitudeDelta: 0.2}, 3000);
        }
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
    const { colors } = this.props.route;
    const { userLatitude, userLongitude, isCarParkMapShapesVisible, carParkLatitude, carParkLongitude, carParkName } = this.state;
    if (isCarParkMapShapesVisible) {
      return (
        <View>
          <MapViewDirections 
            mode='DRIVING' 
            origin={{latitude: userLatitude, longitude: userLongitude}}
            destination={{latitude: carParkLatitude, longitude: carParkLongitude}}
            apikey={GOOGLE_API_KEY} 
            strokeWidth={4} 
            strokeColor={colors.orangeSoda}
            timePrecision='now'
            optimizeWaypoints={false} //Cost more to use
            timePrecision='now'
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" to "${params.destination}"`);
            }}
            onReady={(result) => {
              this.setState({distance: result.distance});
              this.setState({duration: result.duration});
            }}
            onError={(error) => {
              console.error('ERROR: ', error);
            }}
          />
          <Marker 
            title={carParkName}
            coordinate={{latitude:carParkLatitude,longitude:carParkLongitude}} 
            tracksViewChanges={false}
          />
        </View>
      );
    }
    return;
  };

  setCameraPosition = () => {
    const { userLatitude, userLongitude } = this.state;
    this.map.animateCamera({
      center: {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      heading: 180,
      altitude: 200,
      zoom: 17,
    });
  }

  checkLocation = () => {
    const { isCarParkPaymentVisible, userLatitude, userLongitude, carParkLatitude, carParkLongitude } = this.state;
    if (isCarParkPaymentVisible == false) {
      let distance = (Math.sqrt(Math.pow(69.1 * (carParkLatitude - userLatitude), 2) + Math.pow(69.1 * (userLongitude - carParkLongitude) * Math.cos(carParkLatitude / 57.3), 2)) * 1609.344);

      if (distance <= 50000){
        this.setState({isCarParkPaymentVisible: true});
      }
      else {
        setTimeout(this.checkLocation, 30000);
      }
    }
  };

  navigate = () => {
    this.setState({isUserCameraLinkedVisible: true});
    this.setState({isCarParkInfoVisible: false});
    this.setCameraPosition();
    this.checkLocation();
  };

  pay = () => {
    this.setState({isCarParkPaymentVisible: false});
    this.setState({isCarParkPaymentSuccessfulVisible: true});
  };

  review = () => {
    this.setState({isCarParkPaymentSuccessfulVisible: false});
    this.setState({isCarParkReviewVisible: true});
  };

  submit = (rating, review) => {
    const { user, carParkID } = this.state;
    //Create data array to submit to API.
    var reviewArray = {
      review_id: uuidv1(),
      description: review,
      rating: rating,
      car_park_id: carParkID,
      user_id: user.user_id,
    };
    //Insert into API.
    apiMethods.insert(`REVIEW`, reviewArray).catch((error) => {console.log(error)});

    this.toggleReviewModal();
  };


  updateSearch = async (search) => {
    this.setState({ search });
  };

  toggleCarparkModal = () => {
    this.setState({isCarParkInfoVisible: !this.state.isCarParkInfoVisible});
    this.setState({isCarParkMapShapesVisible: !this.state.isCarParkMapShapesVisible});
    this.reset();
  };

  togglePaymentModal = () => {
    this.setState({isCarParkPaymentVisible: !this.state.isCarParkPaymentVisible});
    this.reset();
  };

  togglePaymentSuccessfulModal = () => {
    this.setState({isCarParkPaymentSuccessfulVisible: !this.state.isCarParkPaymentSuccessfulVisible});
    this.reset();
  };

  toggleReviewModal = () => {
    this.setState({isCarParkReviewVisible: !this.state.isCarParkReviewVisible});
    this.reset();
  };

  reset = () => {
    const { userLatitude, userLongitude } = this.state;
    this.setState({isUserCameraLinkedVisible: false});
    this.setState({isCarParkMapShapesVisible: !this.state.isCarParkMapShapesVisible});
    this.map.animateToRegion({latitude: userLatitude,longitude: userLongitude,latitudeDelta: 0.2,longitudeDelta: 0.2}, 3000);
  };

  render() {
    const { route } = this.props;
    const { styles, colors } = this.props.route;
    const { search, user, mapRegionLatitude, mapRegionLongitude, isCarParkInfoVisible, carParkID, carParkName, carParkAddress, carParkRating, carParkAmountRating, isUserCameraLinkedVisible, distance, duration, isCarParkPaymentVisible, hours, isCarParkPaymentSuccessfulVisible, isCarParkReviewVisible, review, rating } = this.state;
    return (
      <View style={styles.list}>
        <Appbar.Header style={styles.desire}>
          <Appbar.Content title={route.tabTitle} style={[styles.appBarTitle, colors.desire]} titleStyle={[styles.appBarTitle, styles.whiteText]}/>
        </Appbar.Header>
        <View styles={styles.searchButton} >
        <SearchBar
            placeholder="E.g. Cabot Circus, UK"
            onChangeText={this.updateSearch}
            value={search}
            containerStyle={styles.containerStyleSearchBar} 
            inputContainerStyle={[styles.mapSearchBox, styles.white]} 
            searchIcon={false}
            lightTheme 
        />
        <TouchableOpacity 
          onPress={this.makeRequest}
          style={[styles.searchButton, styles.white]}
        >
          <List.Icon  color={colors.lightGrey} icon="magnify" />
        </TouchableOpacity>
        </View>
        <MapView
        //Reference to the this map which allow changes programmatically from functions above.
        ref={(map) => { this.map = map; }}
        //Either "google" for GoogleMaps, otherwise null or undefined to use the native map framework (MapKit in iOS and GoogleMaps in android).
        provider={"google"}
        //Defining the map type to standard instead of satellite.
        mapType={"standard"}
        //Style of the map itself
        style={{flex: 1}}
        //The initial region to be displayed by the map 
        initialRegion={{
            latitude: mapRegionLatitude,
            longitude: mapRegionLongitude,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
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
        followUserLocation={isUserCameraLinkedVisible}
        //Adding custom style sourced from Google if darkmode has been selected.
        customMapStyle={colors.map}
        //Call these functions ones map has been rendered.
        onMapReady={this.getUserLocation}
        >
        {this.renderDirections()}
        </MapView>
        <Overlay visible={isCarParkInfoVisible} onClose={this.toggleCarparkModal} animationType="zoomIn" animationDuration={500} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0)'}} childrenWrapperStyle={[{borderRadius: 5,bottom: -230}, styles.white]} closeOnTouchOutside>
          <Directions styles={styles} id={carParkID} userID={user.user_id} title={carParkName} address={carParkAddress} rating={carParkRating} amountOfRating={carParkAmountRating} distance={distance} duration={duration} toggleModal={this.toggleCarparkModal} navigate={this.navigate}/>
        </Overlay>
        <Overlay visible={isCarParkPaymentVisible} onClose={this.togglePaymentModal} animationType="zoomIn" animationDuration={500} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}  childrenWrapperStyle={[styles.innerContainerOverlay, styles.white]} >
          <Payment styles={styles} title={carParkName} hours={hours} setHours={(hours) => (this.setState({ hours: hours }))} toggleModal={this.togglePaymentModal} pay={this.pay}/>
        </Overlay>
        <Overlay visible={isCarParkPaymentSuccessfulVisible} onClose={this.togglePaymentSuccessfulModal} animationType="zoomIn" animationDuration={500} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}  childrenWrapperStyle={[styles.innerContainerOverlay, styles.white]} >
          <PaymentSuccessful styles={styles} title={carParkName} hours={hours} toggleModal={this.togglePaymentSuccessfulModal} review={this.review}/>
        </Overlay>
        <Overlay visible={isCarParkReviewVisible} onClose={this.toggleReviewModal} animationType="zoomIn" animationDuration={500} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}  childrenWrapperStyle={[styles.innerContainerOverlay, styles.white]} >
          <Review styles={styles} title={carParkName} hours={hours} review={review} setReview={(review) => (this.setState({ review: review }))} rating={rating} setRating={(rating) => (this.setState({ rating: rating }))} toggleModal={this.toggleReviewModal} submit={this.submit}/>
        </Overlay>
      </View>
    );
  }
};