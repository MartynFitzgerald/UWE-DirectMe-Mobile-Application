import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Slider, AsyncStorage } from 'react-native';
import { List, Title, Text, Divider, Switch  } from 'react-native-paper';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
      user: []
    };
  }

  _retrieveData = async () => {
    try {
      const user = JSON.parse(await AsyncStorage.getItem('@DirectMe:user'));
      if (user !== null) {
        this.setState({ user: user });
      }
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this._retrieveData();
  }

  change(value) {
    this.setState(() => {
      return {
        value: parseFloat(value),
      };
    });
  }

  render() {
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Account</Title>
        <ScrollView style={styles.scrollViewPadding}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <Text style={styles.name}>{user.fName} {user.lName} </Text>
                <Text style={styles.userInfo}>{user.email_address}</Text>
                <Text style={styles.userInfo}>Bristol, UK </Text>
            </View>
          </View>
          <List.Section style={styles.list}>
            <List.Subheader>General Settings</List.Subheader>
            <List.Item
              title="Dark Mode"
              right={() => <Switch value={user.darkmode} onValueChange={() => { this.setState({ darkmode: !darkmode }); }}/>}
          />
          <List.Item
            title="Radius"
          />
          <Slider
            step={1}
            maximumValue={2500}
            onValueChange={this.change.bind(this)}
            value={user.radius}
          />
          <Divider/>
          <List.Subheader>Privacy</List.Subheader>
          <List.Item
            title="Location Settings"
            right={() => <Text style={styles.paid}>PAID</Text>}
            />
            <Divider/>
            <List.Subheader>User Information</List.Subheader>
            <List.Item
              title="First Name"
              right={() => <Text>{user.fName}</Text>}
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
            <List.Subheader>System</List.Subheader>
            <List.Item 
              style={styles.signoutText} //Not working as expected
              title="Sign Out"
              />
        </List.Section>
        </ScrollView>
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
    borderColor: "#fff",
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
});