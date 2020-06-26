import React, { Component } from 'react';
import { View, ScrollView, Image, Linking  } from 'react-native';
import { List, Divider, Text, Paragraph, Appbar } from 'react-native-paper';

//Import styles.
import { styles } from '../styles/General';

export default class History extends Component {
  render() {
    return (
      <View>
        <Appbar.Header style={styles.appBar}>
            <Appbar.Content title={this.props.route.tabTitle} style={styles.appBarTitle} titleStyle={styles.appBarTitle}/>
        </Appbar.Header>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <Image
            style={styles.logoInformation}
            source={require('../assets/LogoRed.png')}
            resizeMode="stretch"
          />
          <List.Section style={styles.list}>
            <Divider/>
            <List.Subheader>About Us</List.Subheader>
            <Paragraph style={styles.informationText}>The focus behind this final year computing project is to make parking easier, and dynamic for the user. The idea works by using the external data that will be displayed in our application programming interface (API) which will be combined with the user’s information that has been specified previously in the application. This information will then be inserted into an algorithm that will determine what is the best location to park their vehicle within a radius of the postcode, geo-location, or street name given.</Paragraph>
            <Divider/>
            <List.Subheader>Hou To Use</List.Subheader>
            <Paragraph style={styles.informationText}>• Allow DirectMe To Have Location Permissions</Paragraph>
            <Paragraph style={styles.informationText}>• Select Map Icon In The Bottom Navigation</Paragraph>
            <Paragraph style={styles.informationText}>• Enter Location In The Search Bar</Paragraph>
            <Paragraph style={styles.informationText}>• Accept Car Park Displayed</Paragraph>
            <Paragraph style={styles.informationText}>• Follow Directs Through The Maps, Enjoy Your Journey</Paragraph>
            <Paragraph style={styles.informationText}>• Select How Long Your Stay Will Be</Paragraph>
            <Paragraph style={styles.informationText}>• Enter Car Registration</Paragraph>
            <Paragraph style={styles.informationText}>• Pay For The Stay Car Park</Paragraph>
            <Paragraph style={styles.informationText}>• Give A Review OF The Car</Paragraph>
            <Paragraph style={styles.informationText}>• Select The Rating And Add Feedback</Paragraph>
            <Divider/>
            <List.Item
              title="Author:"
              right={() => <Text style={styles.centerVerticalText} >Martyn Fitzgerald</Text>}
            />
            <Divider/>
            <List.Item
              title="Contact Email:"
              right={() => <Text style={styles.centerVerticalText, styles.emailText} onPress={() => Linking.openURL('mailto:martyn2.fitzgerald@live.uwe.ac.uk') } >martyn2.fitzgerald@live.uwe.ac.uk</Text>}
            />
            <Divider/>
            <List.Item
              title="Application Version:"
              right={() => <Text style={styles.centerVerticalText} >1.0.0</Text>}
            />
            <Divider/>
          </List.Section>
        </ScrollView>
      </View>
    );
  }
}