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
      darkmode: '',
      radius: ''
    };
  }

  componentDidMount() {
    async () => {
      this.setState({ fName: await AsyncStorage.getItem('@fName',) });
      this.setState({ lName: await AsyncStorage.getItem('@lName',) });
      this.setState({ emailAddress: await AsyncStorage.getItem('@emailAddress',) });
      this.setState({ phoneNumber: await AsyncStorage.getItem('@phoneNumber',) });
      this.setState({ darkmode: await AsyncStorage.getItem('@darkmode',) });
      this.setState({ radius: await AsyncStorage.getItem('@radius',) });
    }
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
    const { slidervalue, fName, lName, emailAddress, phoneNumber, radius, darkmode } = this.state;
    return (
      <View style={styles.container}>
        <Title style={styles.title}>Account</Title>
        <ScrollView style={styles.scrollViewPadding}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
                <Text style={styles.name}>{this.state.fName} Fitzgerald </Text>
                <Text style={styles.userInfo}>Martyn2.Fitzgerald@live.uwe.ac.uk </Text>
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
            value={slidervalue}
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
              right={() => <Text>Martyn</Text>}
            />
            <List.Item
              title="Last Name"
              right={() => <Text>Fitzgerald</Text>}
            />
            <List.Item
              title="Email"
              right={() => <Text>martyn2.fitzgerald@live.uwe.ac.uk</Text>}
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