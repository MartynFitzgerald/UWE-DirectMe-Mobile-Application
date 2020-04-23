import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import validation from '../controllers/validation';
import query from '../models/query';
import storage from '../models/storage';
import * as Location from 'expo-location';


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailAddress: 'martynfitzzz2014@gmail.com', // TODO: Remove values on launch
      password: 'Password123!' // TODO: Remove values on launch
    };
    
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
  }

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
            <Text>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.buttons]}    
          onPress={async () => {
            if (!validation.validate_email(emailAddress)) {
              alert(`The email provided is invalid, please try again.`);
              return;
            }
            if (!validation.validate_password(password)) {
              alert(`The password provided needs to contain one uppercase, three lowercase, one number, and 8-12 characters overall. Please try again.`);
              return;
            }
            var user_data = await query.check_credential(emailAddress, password);
            
            //Check credential
            if(user_data) {
              await storage.setStorage(user_data).then(
                Keyboard.dismiss(),
                this.props.navigation.navigate('Home'),
              );
            } else {
              alert(`Failed to log in! Please check the credentials submitted.`);
            }
            return;
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainer, styles.buttons]}
          onPress={() => this.props.navigation.navigate('Register')}
        >
            <Text>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainerSocialAccount, styles.facebookButton]}
          onPress={() => {
            alert('You tapped the Facebook button!');
          }}
        >
          <View style={styles.socialButtonContent}>
            <Image style={styles.icon} source={{uri: 'https://img.icons8.com/ios-glyphs/60/ffffff/facebook.png'}}/>
            <Text style={styles.loginText}>Log in with Facebook</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonContainerSocialAccount, styles.googleButton]}
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
  }
});