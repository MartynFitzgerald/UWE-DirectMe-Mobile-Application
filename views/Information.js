import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Image, Linking, Button  } from 'react-native';
import { List, Title, Divider,Text, Paragraph  } from 'react-native-paper';

export default class History extends Component {
  render() {
    return (
      <View>
        <Title style={styles.title}>Information</Title>
        <ScrollView>
          <Image
            style={styles.logo}
            source={require('../assets/LogoRed.png')}
            resizeMode="stretch"
          />
          <List.Section style={styles.list}>
            <Divider/>
            <List.Subheader>About Us</List.Subheader>
            <Paragraph style={styles.text}>You also lose the ability to set up a default font for an entire subtree. Meanwhile, fontFamily only accepts a single font name, which is different from font-family in CSS. The recommended way to use consistent fonts and sizes across your application is to create a component MyAppText that includes them and use this component across your app. You can also use this component to make more specific components like MyAppHeaderText for other kinds of text</Paragraph>
            <Divider/>
            <List.Item
              title="Author:"
              right={() => <Text>Martyn Fitzgerald</Text>}
            />
            <Divider/>
            <List.Item
              title="Contact Email:"
              right={() => <Text style={styles.EmailText} onPress={() => Linking.openURL('mailto:martyn2.fitzgerald@live.uwe.ac.uk') } >martyn2.fitzgerald@live.uwe.ac.uk</Text>}
       
            />
            <List.Item
              title="Application Version:"
              right={() => <Text>1.0.0</Text>}
            />
          <Divider/>
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
  list: {
      width: '100%',
      height: '100%',
  },
  text: {
      textAlign: 'justify', 
      margin: 15,
  },
  logo: {
    width: '100%',
    height: 100,
    alignSelf: 'center',
    position: 'relative',
    marginTop: 15,
  },
  EmailText: {
    color: '#0000EE',
    textDecorationLine: 'underline'
  },
});  
