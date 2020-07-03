import React, { Component } from 'react';
import { View, Image, ScrollView, Slider, Linking } from 'react-native';
import { List, Appbar, Text, Divider, Switch  } from 'react-native-paper';
import Overlay from 'react-native-modal-overlay';
import * as Location from 'expo-location';

//Import styles.
import style from '../styles/General';
import schemes from '../styles/ColourSchemes';
//Import views.
import ChangeValue from './ChangeValue.js';
//Import functions.
import storage from '../models/Storage';
import checkStorage from '../controllers/CheckStorage';

export default class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: {},
      user: [],
      selectedValue: '',
      selectedTitle: '',
      selectedExample: '',
      selectedType: '',
      isModalVisible: false,
      profilePictures: [
        {id:'avatar1.png', name:'Avatar 1', image: require('../assets/profilePictures/avatar1.png')}, 
        {id:'avatar2.png', name:'Avatar 2', image: require('../assets/profilePictures/avatar2.png')}, 
        {id:'avatar3.png', name:'Avatar 3', image: require('../assets/profilePictures/avatar3.png')}, 
        {id:'avatar4.png', name:'Avatar 4', image: require('../assets/profilePictures/avatar4.png')}, 
        {id:'avatar5.png', name:'Avatar 5',  image: require('../assets/profilePictures/avatar5.png')}, 
        {id:'avatar6.png', name:'Avatar 6',  image: require('../assets/profilePictures/avatar6.png')}, 
        {id:'avatar7.png', name:'Avatar 7', image: require('../assets/profilePictures/avatar7.png')}, 
        {id:'avatar8.png', name:'Avatar 8',  image: require('../assets/profilePictures/avatar8.png')}, 
        {id:'avatar9.png', name:'Avatar 9',  image: require('../assets/profilePictures/avatar9.png')},  
      ],
      country: '',
    };
  }
  componentDidMount() {
    this.setStyle();
    //Retrieve user data from local storage.
    storage.get(`userLocal`)
    .then((user) => {
      this.setState({ user: user[0] });
    });
    //Fetch user's location from GPS.
    this.getUserLocation();
  };

  setStyle = async () => {
    try {
      var scheme = await schemes.colours();
      this.setState({styles: style.fetchStyle(scheme.desire, scheme.orangeSoda, scheme.sandstorm, scheme.lightGrey, scheme.white)});
     } catch (error) {
      console.error(error);
    }
  };

  componentWillUnmount(){
    //Check if user has moved to another screen, to update information in API.
    checkStorage.checkChange();
  };
  
  getUserLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      } else {
        //Get user's location
        let location = await Location.getCurrentPositionAsync({});
        //Get user's string location e.g. UK.
        let usersTextLocation = await Location.reverseGeocodeAsync({latitude: location.coords.latitude, longitude: location.coords.longitude});
        //Store users current country.
        await this.setState({country: usersTextLocation[0].country});
      }

    } catch (error) {
      console.error(error);
    }
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  changeUserValues = async (keyText, value) => {
    var tempUser = this.state.user;
    tempUser[keyText] = value;
    await this.setState({user: tempUser});
    await storage.set(`userLocal`, [tempUser]);
  };

  userSettings = async () => {
    await Linking.openSettings();
  };

  render() {
    const { styles, user, isModalVisible, selectedValue, selectedTitle, selectedExample, selectedType, profilePictures, country } = this.state;
    
    //Getting the profile picture from storage or setting a default.
    var profileID = (user.profile_picture <= 0 ||  user.profile_picture == undefined) ? `avatar1.png` : `${user.profile_picture}`;
    var profilePicture = require(`../assets/profilePictures/avatar1.png`);
    var pictureName = `Avatar 1`;
    //Loop through profilePictures array of profile pictures.
    for(var i = 0; i <= profilePictures.length; i++){
      if(profilePictures[i].id == profileID){
        profilePicture = profilePictures[i].image;
        pictureName = profilePictures[i].name;
        break;
      }
    }

    return (
      <View>
        <Appbar.Header style={styles.appBar}>
          <Appbar.Content title={this.props.route.tabTitle} style={styles.appBarTitle} titleStyle={styles.appBarTitle}/>
        </Appbar.Header>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <View style={styles.header}>
              <Image style={styles.avatar} source={profilePicture}/>
              <Text style={styles.name}>{user.fName} {user.lName} </Text>
              <Text style={styles.userInfo}>{user.email_address}</Text>
              <Text style={styles.userInfo}>{country}</Text>
          </View>
          <List.Section style={styles.list}>
            <List.Subheader>General Settings</List.Subheader>
            <List.Item
              title="Dark Mode"
              right={() => <Switch value={user.darkmode} onValueChange={this.changeUserValues.bind(this, 'darkmode')}/>}
          />
          <List.Item
            title="Radius"
            right={() => <Text style={styles.centerVerticalText} >{user.radius}</Text>}
          />
          <Slider
            step={1}
            maximumValue={2500}
            onValueChange={this.changeUserValues.bind(this, 'radius')}
            value={user.radius}
          />
          <Divider/>
          <List.Subheader>Privacy</List.Subheader>
          <List.Item
            title="Location Permissions"
            right={() => <List.Icon icon="chevron-right" />} 
            onPress={() => {this.userSettings()}}
            />
            <Divider/>
            <List.Subheader>User Information</List.Subheader>
            <List.Item
              title="First Name"
              right={() => <Text style={styles.centerVerticalText} >{user.fName}</Text>}
              onPress={()=> {
                this.setState({selectedValue: 'fName'});
                this.setState({selectedTitle: 'First Name'});
                this.setState({selectedExample: 'E.g. Martyn'});
                this.setState({selectedType: 'default'});
                this.toggleModal();
                }
            }/>
            <List.Item
              title="Last Name"
              right={() => <Text style={styles.centerVerticalText} >{user.lName}</Text>}
              onPress={()=> {
                this.setState({selectedValue: 'lName'});
                this.setState({selectedTitle: 'Last Name'});
                this.setState({selectedExample: 'E.g. Fitzgerald'});
                this.setState({selectedType: 'default'});
                this.toggleModal();
                }
            }/>
            <List.Item
              title="Email"
              right={() => <Text style={styles.centerVerticalText} >{user.email_address}</Text>}
              onPress={()=> {
                this.setState({selectedValue: 'email_address'});
                this.setState({selectedTitle: 'Email Address'});
                this.setState({selectedExample: 'E.g. martyn2.fitzgerald@live.uwe.ac.uk'});
                this.setState({selectedType: 'email-address'});
                this.toggleModal();
                }
            }/>
            <List.Item
              title="Phone Number"
              right={() => <Text style={styles.centerVerticalText} >{user.phone_number}</Text>}
              onPress={()=> {
                this.setState({selectedValue: 'phone_number'});
                this.setState({selectedTitle: 'Phone Number'});
                this.setState({selectedExample: 'E.g. 07145234561'});
                this.setState({selectedType: 'phone-pad'});
                this.toggleModal();
                }
            }/>
            <List.Item
              title="Profile Picture"
              right={() => <Text style={styles.centerVerticalText} >{pictureName}</Text>}
              onPress={()=> {
                this.setState({selectedValue: 'profile_picture'});
                this.setState({selectedTitle: 'Profile Picture'});
                this.setState({selectedExample: ''});
                this.setState({selectedType: ''});
                this.toggleModal();
                }
            }/>
            <List.Item
              title="Colour Accessibility"
              right={() => <Text style={styles.centerVerticalText} >{user.schema}</Text>}
              onPress={()=> {
                this.setState({selectedValue: 'schema'});
                this.setState({selectedTitle: 'Colour Scheme'});
                this.setState({selectedExample: 'E.g. 07145234561'});
                this.setState({selectedType: 'phone-pad'});
                this.toggleModal();
                }
            }/>
            <Divider/>
            <List.Subheader>Account Settings</List.Subheader>
            <List.Item 
              titleStyle={styles.redText}
              title="Sign Out"
              onPress={()=> {
                storage.remove('userLocal');
                storage.remove('userAPI');
                this.props.route.oldProps.navigation.navigate('Login');
                }
            }/>
            <List.Item 
              titleStyle={styles.redText}
              title="Remove Account"
              onPress={()=> {
                //TODO: Remove data from database
                storage.remove('userLocal');
                storage.remove('userAPI');
                this.props.route.oldProps.navigation.navigate('Login');
                }
            }/>
          </List.Section>
        </ScrollView>
        <Overlay visible={isModalVisible} onClose={this.toggleModal} animationDuration={20} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}} childrenWrapperStyle={{borderRadius: 5}} closeOnTouchOutside>
          <ChangeValue user={user} value={selectedValue} title={selectedTitle} example={selectedExample} type={selectedType} toggleModal={this.toggleModal} profilePictures={profilePictures}/>
        </Overlay>
      </View>
    );
  }
};