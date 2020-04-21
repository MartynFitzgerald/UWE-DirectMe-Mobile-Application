import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import validation from '../controllers/validation';
import query from '../models/query';

export default class RegisterScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fName: '',
      lName: '',
      emailAddress: '',
      phoneNumber: '',
      password: '',
      repassword: ''
    };
  }
  
  render() {
    const { fName, lName, emailAddress, phoneNumber, password, repassword } = this.state;
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
                onChangeText={(fName) =>  this.setState({fName})}
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
                onChangeText={(repassword) => this.setState({repassword})}
                underlineColorAndroid='transparent'/>
          </View>

          <TouchableOpacity style={[styles.buttonContainer, styles.buttons]}
            onPress={async () => {
              //Validate User Inputs
              if (!validation.validate_name(fName)) {
                alert(`The first name provided is invalid, please try again.`);
                return;
              }
              if (!validation.validate_name(lName)) {
                alert(`The last name provided is invalid, please try again.`);
                return;
              }
              if (!validation.validate_email(emailAddress)) {
                alert(`The email provided is invalid, please try again.`);
                return;
              }
              if (!validation.validate_phonenumber(phoneNumber)) {
                alert(`The phone number provided is invalid, please try again.`);
                return;
              }
              if (!validation.validate_password(password)) {
                alert(`The password provided needs to contain one uppercase, three lowercase, one number, and 8-12 characters overall. Please try again.`);
                return;
              }
              if (!validation.validate_password(repassword)) {
                alert(`The re-enter password provided needs to contain one uppercase, three lowercase, one number, and 8-12 characters overall. Please try again.`);
                return;
              }
              if (password != repassword) {
                alert(`The password and re-enter password provided are not the same. Please try again.`);
                return;
              }

              //Check email is not already registered.
              if(await query.user_exists(emailAddress)) {
                alert(`The email address is already registered! Please try to login.`);
                this.props.navigation.navigate('Login');
                return;
              } else {
                //Submit To API
                query.insert_user(fName, lName, emailAddress, password, phoneNumber);
                alert(`You've registered to DirectMe! Please try to login.`);
                this.props.navigation.navigate('Login');
              }
            }}
          >
            <Text>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.buttonContainer, styles.buttons]}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  LinearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    width:300,
    height:50,
    marginBottom:15,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputs:{
    height:45,
    borderBottomColor: '#FFFFFF',
    textAlign: 'center',
    flex:1
  },
  icon:{
    width:30,
    height:30
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
    marginBottom:20,
    width:250,
    borderRadius:30
  },
  buttonContainerSocialAccount: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250
  },
  buttons: {
    backgroundColor: '#FFFFFF'
  },
  facebookButton: {
    backgroundColor: "#3b5998"
  },
  googleButton: {
    backgroundColor: "#FFFFFF"
  },
  loginText: {
    marginLeft: 5,
    color: 'white'
  },
  googleText: {
    marginLeft: 5,
    color: '#B2B2B2'
  },
  restoreButtonContainer:{
    width:250,
    marginLeft:30,
    marginBottom:15,
    alignItems: 'flex-end'
  },
  socialButtonContent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo:{
    margin:50,
    width:369,
    height:82
  },
});