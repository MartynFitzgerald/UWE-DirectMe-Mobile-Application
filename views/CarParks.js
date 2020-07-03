import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import { List, Text, Appbar } from 'react-native-paper';
import { SearchBar, Divider } from 'react-native-elements';
import Overlay from 'react-native-modal-overlay';

//Import styles.
import style from '../styles/General';
import schemes from '../styles/ColourSchemes';
//Import views.
import Modal from './MetaData';
//Import functions.
import storage from '../models/Storage';
import apiMethods from '../models/ApiMethods';


export default class CarParks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      styles: {},
      visibleCarParks: [],
      isLoading: true,
      searchText: '',
      isModalVisible: false,
      carPark: [],
    };
    this.carParks = [];
  }
  
  componentDidMount() {
    this.setStyle();
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

  setStyle = async () => {
    try {
      var scheme = await schemes.colours();
      this.setState({styles: style.fetchStyle(scheme.desire, scheme.orangeSoda, scheme.sandstorm, scheme.lightGrey, scheme.white)});
     } catch (error) {
      console.error(error);
    }
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
    const { styles } = this.state;
    return <SearchBar placeholder="Search Here..." value={searchText} onChangeText={this.searchFunction} containerStyle={styles.outerBox} inputContainerStyle={styles.searchBox} lightTheme  />;
  };

  renderSeparator = () => {
    const { styles } = this.state;
    return <Divider style={{ backgroundColor: '#CCCCCC' }} />; 
  };

  renderEmptyContainer = () => {
    const { styles } = this.state;
    return <Text style={styles.emptyResult} >No Result Found</Text>; 
  };
  
  render() {
    const { styles, visibleCarParks, isLoading, searchText, isModalVisible, carPark} = this.state;
    return (
      <View>
        <Appbar.Header style={styles.appBar}>
          <Appbar.Content title={this.props.route.tabTitle} style={styles.appBarTitle} titleStyle={styles.appBarTitle}/>
        </Appbar.Header>
        {isLoading ? <ActivityIndicator size="large"/> : (
          <FlatList 
            style={{ height: '89%' }}
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
        <Overlay visible={isModalVisible} onClose={this.toggleModal} animationDuration={20} containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}} childrenWrapperStyle={{borderRadius: 5}} closeOnTouchOutside>
          <Modal carPark={JSON.stringify(carPark)} toggleModal={this.toggleModal}/>
        </Overlay>
      </View>
    );
  }
};