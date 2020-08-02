/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  CarParks.js  
|  Description:  This is the file that holds the class of the car parks view.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { List, Text, Appbar } from 'react-native-paper';
import { SearchBar, Divider } from 'react-native-elements';
import Overlay from 'react-native-modal-overlay';
//Import views.
import Modal from './MetaData';
//Import functions.
import storage from '../models/Storage';
import apiMethods from '../models/ApiMethods';

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
  };
  
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
    const { styles } = this.props.route;
    return <SearchBar placeholder="Search Here..." value={searchText} onChangeText={this.searchFunction} containerStyle={styles.containerStyleSearchBar} inputContainerStyle={[styles.searchBox, styles.white]} lightTheme  />;
  };

  renderSeparator = () => {
    const { styles } = this.props.route;
    return <Divider style={styles.lightGrey} />; 
  };

  renderEmptyContainer = () => {
    const { styles } = this.props.route;
    return <Text style={styles.emptyResult} >No Result Found</Text>; 
  };
  
  render() {
    const { route } = this.props;
    const { styles, colors } = this.props.route;
    const { visibleCarParks, isLoading, searchText, isModalVisible, carPark } = this.state;
      if (isLoading) {
        return <ActivityIndicator size="large"/>
       } else { 
        return (
        <View>
          <Appbar.Header style={styles.desire}>
            <Appbar.Content title={route.tabTitle} style={[styles.appBarTitle, colors.desire]} titleStyle={[styles.appBarTitle, styles.whiteText]}/>
          </Appbar.Header>
          <FlatList 
            style={[styles.flatList, styles.white]}
            data={visibleCarParks}
            keyExtractor={ item => item.car_park_id.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader(searchText)}
            ListEmptyComponent={this.renderEmptyContainer()}
            renderItem={({ item }) => (
              <List.Item
                titleStyle={styles.lightGreyText}
                descriptionStyle={styles.lightGreyText}
                title={item.name.replace("Bristol ", "")}
                description={item.address}
                left={() => <List.Icon color={"#4285F4"} icon="parking" />}
                right={() => <List.Icon color={colors.lightGrey} icon="chevron-right" />} 
                onPress={()=> {
                  this.setState({carPark: item});
                  this.toggleModal();
                  }
              }/>
          )}/>
          <Overlay visible={isModalVisible} onClose={this.toggleModal} animationDuration={20} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}} childrenWrapperStyle={[styles.innerContainerOverlay, styles.white]} closeOnTouchOutside>
            <Modal colors={colors} styles={styles} carPark={JSON.stringify(carPark)} toggleModal={this.toggleModal}/>
        </Overlay>
        </View>
      )
    }
  }
};