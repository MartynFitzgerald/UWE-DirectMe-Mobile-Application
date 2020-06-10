import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Linking  } from 'react-native';
import { List, Divider, Text, Paragraph, Appbar } from 'react-native-paper';

export default class History extends Component {
  render() {
    return (
      <View>
        <Appbar.Header style={styles.Appbar}>
          <Appbar.Content title={this.props.route.tabTitle} style={styles.AppbarTitle}/>
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/LogoRed.png')}
            resizeMode="stretch"
          />
          <List.Section style={styles.list}>
            <Divider/>
            <List.Subheader>About Us</List.Subheader>
            <Paragraph style={styles.text}>The focus behind this final year computing project is to make parking easier, and dynamic for the user. The idea works by using the external data that will be displayed in our application programming interface (API) which will be combined with the user’s information that has been specified previously in the application. This information will then be inserted into an algorithm that will determine what is the best location to park their vehicle within a radius of the postcode, geo-location, or street name given.</Paragraph>
            <Divider/>
            <List.Subheader>Hou To Use</List.Subheader>
            <Paragraph style={styles.text}>• Allow DirectMe To Have Location Permissions</Paragraph>
            <Paragraph style={styles.text}>• Select Map Icon In The Bottom Navigation</Paragraph>
            <Paragraph style={styles.text}>• Enter Location In The Search Bar</Paragraph>
            <Paragraph style={styles.text}>• Accept Car Park Displayed</Paragraph>
            <Paragraph style={styles.text}>• Follow Directs Through The Maps, Enjoy Your Journey</Paragraph>
            <Paragraph style={styles.text}>• Select How Long Your Stay Will Be</Paragraph>
            <Paragraph style={styles.text}>• Enter Car Registration</Paragraph>
            <Paragraph style={styles.text}>• Pay For The Stay Car Park</Paragraph>
            <Paragraph style={styles.text}>• Give A Review OF The Car</Paragraph>
            <Paragraph style={styles.text}>• Select The Rating And Add Feedback</Paragraph>
            <Divider/>
            <List.Item
              title="Author:"
              right={() => <Text style={styles.rightText} >Martyn Fitzgerald</Text>}
            />
            <Divider/>
            <List.Item
              title="Contact Email:"
              right={() => <Text style={styles.rightText, styles.EmailText} onPress={() => Linking.openURL('mailto:martyn2.fitzgerald@live.uwe.ac.uk') } >martyn2.fitzgerald@live.uwe.ac.uk</Text>}
            />
            <Divider/>
            <List.Item
              title="Application Version:"
              right={() => <Text style={styles.rightText} >1.0.0</Text>}
            />
            <Divider/>
          </List.Section>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 100
  },
  Appbar: {
      backgroundColor: '#EB3349',
  },
  AppbarTitle: {
    alignItems: 'center',
  },
  list: {
      width: '100%',
      height: '100%',
  },
  text: {
      textAlign: 'justify', 
      margin: 15,
  },
  rightText: {
    textAlignVertical: 'center',
  },
  logo: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    position: 'relative',
    marginTop: 15,
  },
  EmailText: {
    textAlignVertical: 'center',
    color: '#0000EE',
    textDecorationLine: 'underline'
  },
});  
