/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  Information.js  
|  Description:  This is the file that holds the class of the information view.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { View, ScrollView, Image, Linking  } from 'react-native';
import { List, Divider, Text, Paragraph, Appbar } from 'react-native-paper';


export default class History extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { route } = this.props;
    const { styles, colors } = this.props.route;
    return (
      <View>
        <Appbar.Header style={styles.desire}>
            <Appbar.Content title={route.tabTitle} style={styles.appBarTitle} titleStyle={[styles.appBarTitle, styles.whiteText]}/>
        </Appbar.Header>
        <ScrollView contentContainerStyle={[styles.scrollView, styles.white]}>
          <Image
            style={styles.logoInformation}
            source={colors.logo}
            resizeMode="stretch"
          />
          <List.Section style={styles.list}>
            <Divider style={styles.lightGrey}/>
            <List.Subheader style={styles.lightGreyText} >About Us</List.Subheader>
            <Paragraph style={[styles.informationText, styles.lightGreyText]}>The focus behind this final year computing project is to make parking easier, and dynamic for the user. The idea works by using the external data that will be displayed in our application programming interface (API) which will be combined with the user’s information that has been specified previously in the application. This information will then be inserted into an algorithm that will determine what is the best location to park their vehicle within a radius of the postcode, geo-location, or street name given.</Paragraph>
            <Divider style={[styles.lightGrey, {marginTop: 20}]}/>
            <List.Subheader style={styles.lightGreyText} >Hou To Use</List.Subheader>
            <Paragraph style={[styles.informationText, styles.lightGreyText]}>• Allow DirectMe To Have Location Permissions</Paragraph>
            <Paragraph style={[styles.informationText, styles.lightGreyText]}>• Select Map Icon In The Bottom Navigation</Paragraph>
            <Paragraph style={[styles.informationText, styles.lightGreyText]}>• Enter Location In The Search Bar</Paragraph>
            <Paragraph style={[styles.informationText, styles.lightGreyText]}>• Accept Car Park Displayed</Paragraph>
            <Paragraph style={[styles.informationText, styles.lightGreyText]}>• Follow Directs Through The Maps, Enjoy Your Journey</Paragraph>
            <Paragraph style={[styles.informationText, styles.lightGreyText]}>• Select How Long Your Stay Will Be</Paragraph>
            <Paragraph style={[styles.informationText, styles.lightGreyText]}>• Enter Car Registration</Paragraph>
            <Paragraph style={[styles.informationText, styles.lightGreyText]}>• Pay For The Stay Car Park</Paragraph>
            <Paragraph style={[styles.informationText, styles.lightGreyText]}>• Give A Review OF The Car</Paragraph>
            <Paragraph style={[styles.informationText, styles.lightGreyText]}>• Select The Rating And Add Feedback</Paragraph>
            <Divider style={[styles.lightGrey, {marginTop: 20}]}/>
            <List.Item
              titleStyle={styles.lightGreyText}
              title="Author:"
              right={() => <Text style={[styles.centerVerticalText, styles.lightGreyText]} >Martyn Fitzgerald</Text>}
            />
            <Divider style={styles.lightGrey}/>
            <List.Item
              titleStyle={styles.lightGreyText}
              title="Contact Email:"
              right={() => <Text style={[styles.centerVerticalText, styles.emailText, styles.lightGreyText]} onPress={() => Linking.openURL('mailto:martyn2.fitzgerald@live.uwe.ac.uk') } >martyn2.fitzgerald@live.uwe.ac.uk</Text>}
            />
            <Divider style={styles.lightGrey}/>
            <List.Item
              titleStyle={styles.lightGreyText}
              title="Application Version:"
              right={() => <Text style={[styles.centerVerticalText, styles.lightGreyText]} >1.0.0</Text>}
            />
            <Divider style={styles.lightGrey}/>
          </List.Section>
        </ScrollView>
      </View>
    );
  }
}