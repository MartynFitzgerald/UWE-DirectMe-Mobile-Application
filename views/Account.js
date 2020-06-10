import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Slider, Linking, Button, TextInput } from 'react-native';
import { List, Appbar, Text, Divider, Switch  } from 'react-native-paper';
import Overlay from 'react-native-modal-overlay';

import Modal from './ChangeValue.js';
import storage from '../models/storage';
import checkStorage from '../controllers/checkStorage';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      selectedValue: '',
      selectedTitle: '',
      selectedExample: '',
      isModalVisible: false,
    };
  }
  componentDidMount() {
    //Retrieve User Data From Local Storage.
    storage.get(`userLocal`)
     .then((user) => {
      this.setState({ user: user[0] });
     });
  };

  componentWillUnmount(){
    //Check if user has moved to another screen, to update information in API.
    checkStorage.checkChange();
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
    const { user, isModalVisible, selectedValue, selectedTitle, selectedExample } = this.state;
    return (
      <View style={styles.container}>
        <Appbar.Header style={styles.Appbar}>
          <Appbar.Content title={this.props.route.tabTitle} style={styles.AppbarTitle}/>
        </Appbar.Header>
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
              onPress={()=> {
                this.toggleModal();
                this.setState({selectedValue: 'fName'});
                this.setState({selectedTitle: 'First Name'});
                this.setState({selectedExample: 'E.g. Martyn'});
                }
            }/>
            <List.Item
              title="Last Name"
              right={() => <Text>{user.lName}</Text>}
              onPress={()=> {
                this.toggleModal();
                this.setState({selectedValue: 'lName'});
                this.setState({selectedTitle: 'Last Name'});
                this.setState({selectedExample: 'E.g. Fitzgerald'});
                }
            }/>
            <List.Item
              title="Email"
              right={() => <Text>{user.email_address}</Text>}
              onPress={()=> {
                this.toggleModal();
                this.setState({selectedValue: 'email_address'});
                this.setState({selectedTitle: 'Email Address'});
                this.setState({selectedExample: 'E.g. martyn2.fitzgerald@live.uwe.ac.uk'});
                }
            }/>
            <List.Item
              title="Phone Number"
              right={() => <Text>{user.phone_number}</Text>}
              onPress={()=> {
                this.toggleModal();
                this.setState({selectedValue: 'phone_number'});
                this.setState({selectedTitle: 'Phone Number'});
                this.setState({selectedExample: 'E.g. 07145234561'});
                }
            }/>
            <List.Item
              title="Profile Picture"
              right={() => <Text>Female 2</Text>}
            />
            <Divider/>
            <List.Subheader>Application Settings</List.Subheader>
            <List.Item 
              titleStyle={styles.signOutText}
              title="Sign Out"
              />
        </List.Section>
        </ScrollView>

        <View style={{flex: 1}}>
          <Overlay visible={isModalVisible} onClose={this.toggleModal} animationDuration={20} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}} childrenWrapperStyle={{borderRadius: 5}} closeOnTouchOutside>
            <Modal user={user} value={selectedValue} title={selectedTitle} example={selectedExample}/>
          </Overlay>
        </View>
      </View>
    );
  }
}
  
const styles = StyleSheet.create({
  Appbar: {
      backgroundColor: '#EB3349',
  },
  AppbarTitle: {
    alignItems: 'center',
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
  signOutText:{
    color:"#ff0000",
  },
  alertBox:{
    backgroundColor: "#ffffff",
    padding:15,
  },
  inputs:{
    padding:10,
    borderBottomWidth: 1,
    color:"#ff0000",
  },
});