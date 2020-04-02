import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, Title, Text, Button } from 'react-native-paper';

export default class History extends Component {
  render() {
    return (
      <View>
        <Title style={styles.title}>Car Parks</Title>
        <ScrollView>
          <List.Section style={styles.list}>
            <List.Item
              title="Trenchard Street Car Park"
              description="BS34 9AR"
              left={() => <List.Icon color="#4285F4" icon="parking" />}
              right={() => <List.Icon color="#4285F4" icon="chevron-right" />}
              //onPress={(e) => navigation.navigate('Register')}
            />
              <List.Item
                title="NCP Car Park Bristol Broadmead"
                description="BS34 9AR"
                left={() => <List.Icon color="#4285F4" icon="parking" />}
                right={() => <List.Icon color="#4285F4" icon="chevron-right" />}
                //onPress={(e) => navigation.navigate('Register')}
            />
        </List.Section>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
      width: '100%',
      height: '100%',
  },
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
  paid: {
    textAlignVertical: 'center',
    textAlign: 'center', 
    paddingHorizontal: 10,
    borderRadius:10,
    maxHeight:30, 
    top:12.5,
    backgroundColor: '#2FD63C',
    fontWeight: 'bold',
  },
  unpaid: {
    textAlignVertical: 'center',
    textAlign: 'center', 
    paddingHorizontal: 10,
    borderRadius:10,
    maxHeight:30, 
    top:12.5,
    backgroundColor: '#E71212',
    fontWeight: 'bold',
  },
});  
