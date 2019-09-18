import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Title } from 'react-native-paper';

export default class UsersAccount extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Account</Title>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                <Text style={styles.name}>Martyn Fitzgerald</Text>
                <Text style={styles.userInfo}>Martyn2.Fitzgerald@live.uwe.ac.uk</Text>
                <Text style={styles.userInfo}>Bristol, UK</Text>
            </View>
          </View>
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  title: {
      paddingTop: 40,
      marginTop: 0,
      marginBottom: 0,
      top: 0,
      textAlign: 'center', 
      fontWeight: 'bold',
      backgroundColor: '#DB4437',
      color: '#fff',
  },
  header:{
    backgroundColor: "#4285F4",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    textAlign: 'center', 
    fontSize:22,
    color:"#fff",
    fontWeight:'600',
  },
  userInfo:{
    textAlign: 'center', 
    fontSize:14,
    color:"#fff",
    fontWeight:'600',
  },
});