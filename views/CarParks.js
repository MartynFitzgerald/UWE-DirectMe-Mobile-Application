import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { List, Title, Text, Button } from 'react-native-paper';

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('http://parkingapplicationapi-env.fwmaq3pfqz.us-east-1.elasticbeanstalk.com/API/GET/CARPARKS/')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ data: json.result });
        //console.log(json.result)
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <View>
        <Title style={styles.title}>Car Parks</Title>
          {isLoading ? <ActivityIndicator/> : (
            <FlatList 
              style={styles.list}
              data={data}
              keyExtractor={ item => item.car_park_id.toString()}
              renderItem={({ item }) => (
                <List.Item
                  title={item.name}
                  description={item.address}
                  left={() => <List.Icon color="#4285F4" icon="parking" />}
                  right={() => <List.Icon icon="chevron-right" />}
                  //onPress={(e) => navigation.navigate('Register')}
                />
              )}
            />
          )}
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
