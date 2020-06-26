import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { v1 as uuidv1 } from 'react-native-uuid';
import hash from 'object-hash';

//Import styles.
import { styles } from '../styles/General';
//Import functions.
import validation from '../controllers/Validation';
import apiMethods from '../models/ApiMethods';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fName: '',
      lName: '',
      emailAddress: '',
      phoneNumber: '',
      password: '',
      reEnterPassword: ''
    };
  }
  
  render() {
    const { fName, lName, emailAddress, phoneNumber, password, reEnterPassword } = this.state;
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
                placeholder="First Name"
                keyboardType="default"
                onChangeText={(fName) => this.setState({fName})}
                underlineColorAndroid='transparent'/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Last Name"
                keyboardType="default"
                onChangeText={(lName) => this.setState({lName})}
                underlineColorAndroid='transparent'/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(emailAddress) => this.setState({emailAddress})}
                underlineColorAndroid='transparent'/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                underlineColorAndroid='transparent'/>
          </View>
          
          <View style={(styles.inputContainer)}>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                underlineColorAndroid='transparent'/>
          </View>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
                placeholder="Re-enter Password"
                secureTextEntry={true}
                onChangeText={(reEnterPassword) => this.setState({reEnterPassword})}
                underlineColorAndroid='transparent'/>
          </View>

          <TouchableOpacity style={[styles.buttonContainer]}
            onPress={async () => {
              //Validate User Inputs
              if (!validation.validate_name(fName)) {
                //Output alert to aware user of invalid first name input.
                Alert.alert(
                  "Invalid Input",
                  `Unfortunately the first name provided is invalid, please make sure you insert a correct name and try again.`,
                  [
                    { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
                  ],
                );
                return;
              }
              if (!validation.validate_name(lName)) {
                //Output alert to aware user of invalid last name input.
                Alert.alert(
                  "Invalid Input",
                  `Unfortunately the last name provided is invalid, please make sure you insert a correct name and try again.`,
                  [
                    { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
                  ],
                );
                return;
              }
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
              if (!validation.validate_phoneNumber(phoneNumber)) {
                //Output alert to aware user of invalid phone number input.
                Alert.alert(
                  "Invalid Input",
                  `Unfortunately the phone number provided is invalid, please make sure you insert a correct phone number and try again.`,
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
              if (password != reEnterPassword) {
                //Output alert to aware user of invalid re-enter input.
                Alert.alert(
                  "Invalid Input",
                  `Unfortunately the re-enter password provided is invalid, please make sure you insert the same password previously provided and try again.`,
                  [
                    { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
                  ],
                );
                return;
              }
              
              //Check email is not already registered.
              if(await apiMethods.read(`USER/${emailAddress}`)[0]) {
                //Output alert to aware user of invalid re-enter input.
                Alert.alert(
                  "Email Already Registered",
                  `Unfortunately this email address is already registered, please make sure you insert a unique email address and try again.`,
                  [
                    { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
                  ],
                );
                this.props.navigation.navigate('Login');
                return;
              } else {
                //Create data array to submit to API.
                var userArray = {
                  user_id: uuidv1(),
                  fName: fName,
                  lName: lName,
                  email_address: emailAddress,
                  password: hash({password: `D1rectMeSa1t${password}2020`}), // Using Encryption To Store Password
                  phone_number: phoneNumber,
                  profile_picture: 'male1',
                };
                //Insert into API.
                apiMethods.insert(`USER`, userArray).catch((error) => {console.log(error)});
                //Output alert to aware user of their registration.
                Alert.alert(
                  "Congratulations You've Registered",
                  `You've registered to DirectMe, Please try to login.`,
                  [
                    { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
                  ],
                );
                this.props.navigation.navigate('Login');
              }
            }}
          >
            <Text>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonContainer]}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
    );
  }
};