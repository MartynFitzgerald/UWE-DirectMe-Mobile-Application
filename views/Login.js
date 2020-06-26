import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import hash from 'object-hash';

//Import styles.
import { styles } from '../styles/General';
//Import functions.
import storage from '../models/Storage';
import validation from '../controllers/Validation';
import apiMethods from '../models/ApiMethods';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: 'martynfitzzz2014@gmail.com', // TODO: Remove values on launch
      password: 'Password!123' // TODO: Remove values on launch
    };
  }

  componentDidMount() {
    this.locationRequest();
    storage.get(`userLocal`)
    .then((user) => {
      if (user != undefined || user != null) {
        Keyboard.dismiss();
        this.props.navigation.navigate('NavigationBar');
      } 
    });

  }

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
    const { emailAddress, password } = this.state;
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
              );
              return;
            }
            //Get User Data From API.
            var user_data = await apiMethods.read(`USER/${emailAddress}`);
            //Check credential.
            if(user_data[0].email_address == emailAddress && user_data[0].password == hash({password: `D1rectMeSa1t${password}2020`}))
            {
              await storage.set(`userAPI`, user_data);
              await storage.set(`userLocal`, user_data).then(
                Keyboard.dismiss(),
                this.props.navigation.navigate('NavigationBar'),
              );
            } else {
              //Output alert to aware user of invalid password input.
              Alert.alert(
                "Invalid Credentials",
                `Unfortunately the credentials provided are not known , please check the credentials submitted. and try again.`,
                [
                  { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
                ],
              );
            }
            return;
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer]}
          onPress={() => this.props.navigation.navigate('Register')}
        >
            <Text>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainerSocialAccount, styles.facebookColor]}
          onPress={() => {
            alert('You tapped the Facebook button!');
          }}
        >
          <View style={styles.socialButtonContent}>
            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios-glyphs/60/ffffff/facebook.png'}}/>
            <Text style={styles.loginText}>Log in with Facebook</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainerSocialAccount, styles.googleColor]}
          onPress={() => {
            alert('You tapped the Google button!');
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