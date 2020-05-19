import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Slider, AsyncStorage, Linking, Button, TextInput } from 'react-native';
import { List, Title, Text, Divider, Switch  } from 'react-native-paper';
import Modal from 'react-native-modal';

import apiMethods from '../models/apiMethods';
import storage from '../models/storage';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      userDefaults: [],
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };
  
  componentDidMount() {
    console.log("Account View Open");
    //Retrieve User Data From Local Storage.
    storage.get(`user`)
     .then((user) => {
      this.setState({ user: user[0] });
      this.setState({ userDefaults: user[0] });
     });
  };
  componentDidUpdate() {
    console.log("Account View Update");
  }
  componentWillUnmount(){
    console.log("Account View Close");
  };
  

  changeUserValues = async (keyText, value) => {
    var tempUser = this.state.user;
    tempUser[keyText] = value;
    await this.setState({user: tempUser});
    await storage.set(`user`, tempUser);
    //TODO: Need to slow the amount of posts sent to the API.
    //apiMethods.update(`USER`, tempUser);
  };

  userSettings = async () => {
    await Linking.openSettings();
  };

  render() {
    console.log(this.props);
    const { user, isModalVisible } = this.state;
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Account</Title>
        <ScrollView style={styles.scrollViewPadding}>
          <View style={styles.header}>
              <Image style={styles.avatar}
                source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
              <Text style={styles.name}>{user.fName} {user.lName} </Text>
              <Text style={styles.userInfo}>{user.email_address}</Text>
              <Text style={styles.userInfo}>Bristol, UK </Text>
          </View>
          <List.Section style={styles.list}>
            <List.Subheader>General Settings</List.Subheader>
            <List.Item
              title="Dark Mode"
              right={() => <Switch value={user.darkmode} onValueChange={this.changeUserValues.bind(this, 'darkmode')}/>}
          />
          <List.Item
            title="Radius"
            right={() => <Text>{user.radius}</Text>}
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
              right={() => <Text>{user.fName}</Text>}
              onPress={this.toggleModal}
            />
            <List.Item
              title="Last Name"
              right={() => <Text>{user.lName}</Text>}
            />
            <List.Item
              title="Email"
              right={() => <Text>{user.email_address}</Text>}
            />
            <List.Item
              title="Phone Number"
              right={() => <Text>{user.phone_number}</Text>}
            />
            <List.Item
              title="Profile Picture"
              right={() => <Text>Female 2</Text>}
            />
            <Divider/>
            <List.Subheader>Application Settings</List.Subheader>
            <List.Item 
              titleStyle={styles.signoutText}
              title="Sign Out"
              />
        </List.Section>
        </ScrollView>

        <View style={{flex: 1}}>
          <Modal 
            isVisible={isModalVisible}
          >
            <View style={styles.alertbox}>
              <Text>Edit First Name</Text>
              <TextInput style={styles.inputs}
                  placeholder="Phone Number"
                  keyboardType="phone-pad"
                  onChangeText={(phoneNumber) => this.setState({phoneNumber})}
                  underlineColorAndroid='transparent'/>
              <Button title="Hide modal" onPress={this.toggleModal} />
            </View>
          </Modal>
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
      backgroundColor: '#EB3349',
      color: '#fff',
  },
  header:{
    backgroundColor: "#4285F4",
    padding:15,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom:10,
  },
  name:{
    textAlign: 'center', 
    fontSize:22,
    color:"#fff",
    fontWeight:'bold',
  },
  userInfo:{
    textAlign: 'center', 
    width:'100%',
    fontSize:14,
    color:"#fff",
  },
  scrollViewPadding:{
    marginBottom:60,
  },
  signoutText:{
    color:"#ff0000",
  },
  alertbox:{
    backgroundColor: "#ffffff",
    padding:15,
  },
  inputs:{
    padding:10,
    borderBottomWidth: 1,
    color:"#ff0000",
  },
});