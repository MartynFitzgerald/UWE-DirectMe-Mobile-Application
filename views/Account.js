import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Slider, AsyncStorage } from 'react-native';
import { List, Title, Text, Divider, Switch  } from 'react-native-paper';

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 50,
      fName: '',
      lName: '',
      emailAddress: '',
      phoneNumber: '',
      darkmode: 0,
      radius: 0
    };
  }

  _retrieveData = async () => {
    try {
      const fName = await AsyncStorage.getItem('@fName');
      const lName = await AsyncStorage.getItem('@lName');
      const emailAddress = await AsyncStorage.getItem('@emailAddress');
      const phoneNumber = await AsyncStorage.getItem('@phoneNumber');
      const darkmode = parseInt(await AsyncStorage.getItem('@darkmode'));
      const radius = parseFloat(await AsyncStorage.getItem('@radius'));

      if (fName !== null || lName !== null || emailAddress !== null || phoneNumber !== null || darkmode !== null || radius !== null) {
        // We have data!!
        this.setState({ fName: fName });
        this.setState({ lName: lName });
        this.setState({ emailAddress: emailAddress });
        this.setState({ phoneNumber: phoneNumber });
        this.setState({ darkmode: darkmode });
        this.setState({ radius: radius });
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
  state = {
    isSwitchOn: false,
  };

  render() {
    const { fName, lName, emailAddress, phoneNumber, radius, darkmode } = this.state;
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Account</Title>
        <ScrollView style={styles.scrollViewPadding}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <Text style={styles.name}>{fName} {lName} </Text>
                <Text style={styles.userInfo}>{emailAddress}</Text>
                <Text style={styles.userInfo}>Bristol, UK </Text>
            </View>
          </View>
          <List.Section style={styles.list}>
            <List.Subheader>General Settings</List.Subheader>
            <List.Item
              title="Dark Mode"
              right={() => <Switch value={darkmode} onValueChange={() => { this.setState({ darkmode: !darkmode }); }}/>}
          />
          <List.Item
            title="Radius"
          />
          <Slider
            step={1}
            maximumValue={2500}
            onValueChange={this.change.bind(this)}
            value={radius}
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
              right={() => <Text>{fName}</Text>}
            />
            <List.Item
              title="Last Name"
              right={() => <Text>{lName}</Text>}
            />
            <List.Item
              title="Email"
              right={() => <Text>{emailAddress}</Text>}
            />
            <List.Item
              title="Phone Number"
              right={() => <Text>{phoneNumber}</Text>}
            />
            <List.Item
              title="Profile Picture"
              right={() => <Text>Female 2</Text>}
            />
            <Divider/>
            <List.Subheader>System</List.Subheader>
            <List.Item
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
    width:'100%',
    fontSize:14,
    color:"#fff",
  },
  scrollViewPadding:{
    marginBottom:60,
  },
});