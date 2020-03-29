import * as React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function RegisterScreen({ navigation }) {
  return (
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(235,51,73,1)', 'rgba(244,92,67,1)']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.LinearGradient}
        />

        <Image style={styles.logo} source={require('../assets/logo.png')}/>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="First Name"
              keyboardType="default"
              underlineColorAndroid='transparent'/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Second Name"
              keyboardType="default"
              underlineColorAndroid='transparent'/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'/>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'/>
        </View>

        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Re-enter Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'/>
        </View>

        <TouchableOpacity style={[styles.buttonContainer, styles.buttons]}
          onPress={() => {
            alert('Registered!');
          }}
        >
            <Text>Register</Text>
        </TouchableOpacity>
      </View>
    );
}

export default RegisterScreen;

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