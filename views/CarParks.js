import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { List, Title, Text } from 'react-native-paper';
import { SearchBar, Divider } from 'react-native-elements';
import apiMethods from '../models/apiMethods';

export default class CarParks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      searchText: '',
    };
    this.arrayholder = [];
  }
  
  componentDidMount() {
    apiMethods.read(`CARPARK`)
      .then((json) => {
        this.setState({ data: json });
        this.arrayholder = json;   
      })  
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  searchFunction = searchText => {  
    this.setState({ searchText });
    const newData = this.arrayholder.filter(item => {      
      const itemData = `${item.name.toUpperCase()} ${item.address.toUpperCase()}`;
      const textData = searchText.toUpperCase();
      
      // If found return to newData
      return itemData.indexOf(textData) > -1;    
    });
    this.setState({ data: newData });  
  };

  renderHeader = (searchText) => {
    return <SearchBar placeholder="Search Here..." value={searchText} onChangeText={this.searchFunction} containerStyle={styles.outerBox} inputContainerStyle={styles.searchBox} lightTheme  />;
  };

  renderSeparator = () => {
    return <Divider style={{ backgroundColor: '#CCCCCC' }} />; 
  };

  renderEmptyContainer = () => {
    return <Text style={styles.emptyResult} >No Result Found</Text>; 
  };
  
  render() {
    const { data, isLoading, searchText } = this.state;
    //console.log(this.props);
    return (
      <View>
        <Title style={styles.title}>Car Parks</Title> 
          {isLoading ? <ActivityIndicator size="large"/> : (
            <FlatList 
              style={styles.list}
              data={data}
              keyExtractor={ item => item.car_park_id.toString()}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader(searchText)}
              ListEmptyComponent={this.renderEmptyContainer()}
              renderItem={({ item }) => (
                <List.Item
                  title={item.name}
                  description={item.address}
                  left={() => <List.Icon color="#4285F4" icon="parking" />}
                  right={() => <List.Icon icon="chevron-right" />} 
                  onPress={() => this.props.navigation.navigate('Login')}
                />
              )}
            />
          )}
      </View>
    );
  }
};

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
  emptyResult: {
    padding: 10,
    textAlignVertical: 'center',
    textAlign: 'center', 
  },
  outerBox: {
    padding: 0,
    margin: 0,
  },
  searchBox: {
    width: "100%",
  },
});  
