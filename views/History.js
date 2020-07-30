import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { List, Appbar, Text } from 'react-native-paper';
import { SearchBar, Divider } from 'react-native-elements';

//Import functions.
import storage from '../models/Storage';
import apiMethods from '../models/ApiMethods';
// http://directme-api.eu-west-2.elasticbeanstalk.com/API/a92c0620-ac2a-11ea-bc8d-67c1927ee7f3/HISTORY/a92c0620-ac2a-11ea-bc8d-67c1927ee7f2
export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      visibleHistory: [],
      searchText: '',
      isLoading: true,
    };
    this.history = [];
  }
  
  componentDidMount() {
    //Retrieve user data from local storage.
    storage.get(`userLocal`)
    .then((user) => {
      this.setState({ user: user[0] });

      //Check storage if the car parks are stored.
      storage.get(`history`)
      .then((localHistory) => {
        if (localHistory != undefined || localHistory != null) {
          storage.get(`historyTimeStamp`)
          .then((timeStamp) => {
            //Check the data when these car parks were stored.
            if((new Date().getDate() - new Date(timeStamp).getDate() >= 1)) {
              //Fetch Car Parks From API.
              this.fetchHistory(user);
            } else {
              //Fetch Car Parks From Local Storage.
              this.setState({ visibleHistory: localHistory });
              this.history = localHistory;  
            }
          }); 
        } else {
          //Fetch Car Parks From API.
          this.fetchHistory(user);
        }
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
    });
  };
  
  fetchHistory = (user) => {
    //Fetch Car Parks From API.
    apiMethods.read(`HISTORY`, user.id)
    .then((history) => {
      var userHistory = [];
      for(var i = 0; i < history.length; i++){
        apiMethods.read(`CARPARK`, history[i].car_park_id)
        .then((carPark) => {
          userHistory.push(carPark[0]);
          if (i <= history.length){
            storage.set(`historyTimeStamp`, new Date());
            storage.set(`history`, userHistory);
            this.setState({ visibleHistory: userHistory });
            this.history = userHistory; 
          }
        }); 
      }
    });
  };

  searchFunction = searchText => {  
    this.setState({ searchText });
    const newData = this.history.filter(item => {      
      const itemData = `${item.name.toUpperCase()} ${item.address.toUpperCase()}`;
      const textData = searchText.toUpperCase();
      // If found return to newData
      return itemData.indexOf(textData) > -1;    
    });
    this.setState({ visibleHistory: newData });  
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
    const { visibleHistory, isLoading, searchText } = this.state;
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
            data={visibleHistory}
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
                left={() => <List.Icon color={colors.lightGrey} icon="history" />}
              />
          )}/>
        </View>
      )
    }
  }
};