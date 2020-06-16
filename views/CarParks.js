import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { List, Text, Appbar } from 'react-native-paper';
import { SearchBar, Divider } from 'react-native-elements';
import apiMethods from '../models/apiMethods';
import storage from '../models/storage';
import MetaData from './ChangeValue';

const MetaDataComponent = <MetaData/>;

export default class CarParks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleCarParks: [],
      isLoading: true,
      searchText: '',
    };
    this.carParks = [];
  }
  
  fetchCarParks = () => {
    //Fetch Car Parks From API.
    apiMethods.read(`CARPARK`)
      .then((carParks) => {
        storage.set(`carParksTimeStamp`, new Date());
        storage.set(`carParks`, carParks);
        this.setState({ visibleCarParks: carParks });
        this.carParks = carParks;   
      })
  };
  
  componentDidMount() {
    //Check storage if the car parks are stored.
    storage.get(`carParks`)
      .then((localCarParks) => {
        if (localCarParks != undefined || localCarParks != null) {
          storage.get(`carParksTimeStamp`)
          .then((timeStamp) => {
            //Check the data when these car parks were stored.
            if((new Date().getDate() - new Date(timeStamp).getDate() >= 5)) {
              //Fetch Car Parks From API.
              this.fetchCarParks();
            } else {
              //Fetch Car Parks From Local Storage.
              this.setState({ visibleCarParks: localCarParks });
              this.carParks = localCarParks;  
            }
          }); 
        } else {
          //Fetch Car Parks From API.
          this.fetchCarParks();
        }
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  searchFunction = searchText => {  
    this.setState({ searchText });
    const newData = this.carParks.filter(item => {      
      const itemData = `${item.name.toUpperCase()} ${item.address.toUpperCase()}`;
      const textData = searchText.toUpperCase();
      
      // If found return to newData
      return itemData.indexOf(textData) > -1;    
    });
    this.setState({ visibleCarParks: newData });  
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
    const { visibleCarParks, isLoading, searchText } = this.state;
    return (
      //this.props.route.oldProps.navigation.navigate('MetaData')
      <View>
        <Appbar.Header style={styles.Appbar}>
          <Appbar.Content title={this.props.route.tabTitle} style={styles.AppbarTitle}/>
        </Appbar.Header>
          {isLoading ? <ActivityIndicator size="large"/> : (
            <FlatList 
              style={styles.list}
              data={visibleCarParks}
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
                  onPress={() => <MetaDataComponent/>}//this.props.route.oldProps.navigation.navigate('Login')
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
  Appbar: {
      backgroundColor: '#EB3349',
  },
  AppbarTitle: {
    alignItems: 'center',
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
    marginTop: -1,
    height: 55,
  },
});  
