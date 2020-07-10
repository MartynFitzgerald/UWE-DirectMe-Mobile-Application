import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Keyboard, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import hash from 'object-hash';

//Import styles.
import style from '../styles/General';
import schemes from '../styles/ColourSchemes';
//Import functions.
import storage from '../models/Storage';
import validation from '../controllers/Validation';
import apiMethods from '../models/ApiMethods';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      colors: {},
      styles: {},
      emailAddress: 'martynfitzzz2014@gmail.com', // TODO: Remove values on launch
      password: 'Password!123' // TODO: Remove values on launch
    };
  }

  setStyle = async () => {
    try {
      var scheme = await schemes.colours();
      this.setState({ colors: scheme });
      this.setState({ styles: style.fetchStyle(scheme.desire, scheme.orangeSoda, scheme.sandstorm, scheme.lightGrey, scheme.white, scheme.blue) });
     } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.setStyle();
    this.locationRequest();
    storage.get(`userLocal`)
    .then((user) => {
      if (user != undefined || user != null) {
        Keyboard.dismiss();
        this.props.navigation.navigate('NavigationBar', {setStyle: () => this.setStyle, styles: this.state.styles, colors: this.state.colors});
      } 
    });
  };

  locationRequest = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      //Get Location
      //let location = await Location.getCurrentPositionAsync({});
      //console.log(location);
    } catch (error) {
      console.error(error);
    }
  };


  render() {
    const { styles, colors, emailAddress, password } = this.state;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(235,51,73,1)', 'rgba(244,92,67,1)']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.LinearGradient}
        />

        <Image style={styles.logo} source={require('../assets/Logo.png')}/>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(emailAddress) => this.setState({emailAddress})}
              underlineColorAndroid='transparent'/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              underlineColorAndroid='transparent'/>
        </View>
    
        <TouchableOpacity style={styles.restoreButtonContainer}>
            <Text style={{fontFamily: 'Pacifico'}}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer]}    
          onPress={async () => {
            if (!validation.validate_email(emailAddress)) {
              //Output alert to aware user of invalid email address input.
              Alert.alert(
                "Invalid Input",
                `Unfortunately the email address provided is invalid, please make sure you insert a correct email address and try again.`,
                [
                  { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
                ],
                { cancelable: true }
              );
              return;
            }
            if (!validation.validate_password(password)) {
              //Output alert to aware user of invalid password input.
              Alert.alert(
                "Invalid Input",
                `Unfortunately the password provided is invalid, please make sure you insert a password that contain one uppercase, three lowercase, one number, and 8-12 characters and try again.`,
                [
                  { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
                ],
                { cancelable: true }
              );
              return;
            }
            //Get User Data From API.
            var user_data = await apiMethods.read(`USER/${emailAddress}`);
            //Check if any result has been returned.
            if (!user_data[0]) {
              //Output alert to aware user of account not registered.
              Alert.alert(
                "Invalid Credentials",
                `Unfortunately the credentials provided are not known, please check the credentials submitted. and try again.`,
                [
                  { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
                ],
                { cancelable: true }
              );
              return;
            }
            //Check credential.
            if(user_data[0].email_address == emailAddress && user_data[0].password == hash({password: `D1rectMeSa1t${password}2020`}))
            {
              await storage.set(`userAPI`, user_data);
              await storage.set(`userLocal`, user_data).then(
                Keyboard.dismiss(),
                this.props.navigation.navigate('NavigationBar', {styles: this.state.styles, colors: this.state.colors}),
              );
            } else {
              //Output alert to aware user of invalid password input.
              Alert.alert(
                "Invalid Credentials",
                `Unfortunately the credentials provided are not known, please check the credentials submitted. and try again.`,
                [
                  { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
                ],
                { cancelable: true }
              );
            }
            return;
          }}
        >
          <Text style={[styles.centerVerticalText, styles.lightGreyText]}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer]}
          onPress={() => this.props.navigation.navigate('Register', {styles: this.state.styles, colors: this.state.colors})}
        >
            <Text style={[styles.centerVerticalText, styles.lightGreyText]}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainerSocialAccount, styles.facebookColor]}
          onPress={() => {
            //Output alert to aware user that this function is soon to be implemented.
            Alert.alert(
              "Facebook Login is Unavailable",
              `Unfortunately this feature is temporary disabled, please check again at a later point.`,
              [
                { text: 'Go Back', onPress: () => console.log('Go Back Pressed') },
              ],
              { cancelable: true }
            );
          }}
        >
          <View style={styles.socialButtonContent}>
            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios-glyphs/60/ffffff/facebook.png'}}/>
            <Text style={styles.loginText}>Log in with Facebook</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainerSocialAccount, styles.googleColor]}
          onPress={() => {
            //Output alert to aware user that this function is soon to be implemented.
            Alert.alert(
              "Google Login is Unavailable",
              `Unfortunately this feature is temporary disabled, please check again at a later point.`,
              [
                { text: 'Go Back', onPress: () => console.log('Go Back Pressed') },
              ],
              { cancelable: true }
            );
          }}
        >
          <View style={styles.socialButtonContent}>
            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/48/000000/google-logo.png'}}/>
            <Text style={styles.googleText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}