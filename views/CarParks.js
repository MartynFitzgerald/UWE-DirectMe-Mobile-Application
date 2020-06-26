import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { List, Text, Appbar } from 'react-native-paper';
import { SearchBar, Divider } from 'react-native-elements';
import Overlay from 'react-native-modal-overlay';

import apiMethods from '../models/apiMethods';
import storage from '../models/storage';
import Modal from './MetaData.js';

export default class CarParks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleCarParks: [],
      isLoading: true,
      searchText: '',
      isModalVisible: false,
      carPark: [],
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
      });
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

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

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
    const { visibleCarParks, isLoading, searchText, isModalVisible, carPark} = this.state;
    return (
      <View>
        <Appbar.Header style={styles.Appbar}>
          <Appbar.Content title={this.props.route.tabTitle} style={styles.AppbarTitle} titleStyle={styles.AppbarTitle}/>
        </Appbar.Header>
        {isLoading ? <ActivityIndicator size="large"/> : (
          <FlatList 
            style={styles.contentContainer}
            data={visibleCarParks}
            keyExtractor={ item => item.car_park_id.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader(searchText)}
            ListEmptyComponent={this.renderEmptyContainer()}
            renderItem={({ item }) => (
              <List.Item
                title={item.name.replace("Bristol ", "")}
                description={item.address}
                left={() => <List.Icon color="#4285F4" icon="parking" />}
                right={() => <List.Icon icon="chevron-right" />} 
                onPress={()=> {
                  this.setState({carPark: item});
                  this.toggleModal();
                  }
              }/>
            )}
          />
        )}
        <View style={{flex: 1}}>
          <Overlay visible={isModalVisible} onClose={this.toggleModal} animationDuration={20} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}} childrenWrapperStyle={{borderRadius: 5}} closeOnTouchOutside>
            <Modal carPark={JSON.stringify(carPark)} toggleModal={this.toggleModal}/>
          </Overlay>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  contentContainer: {
      width: '100%',
      height: '89%',
  },
  Appbar: {
      backgroundColor: '#EB3349',
  },
  AppbarTitle: {
    alignItems: 'center',
    fontFamily: 'Pacifico',
    fontSize: 30,
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
    borderRadius: 0,
  },
});  
