import React, { Component } from 'react';
import { BottomNavigation } from 'react-native-paper';

import checkStorage from '../controllers/checkStorage';

import Information from './Information';
import CarParks from './CarParks';
import Map from './Map';
import History from './History';
import Account from './Account';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    state = {
      index: 2,
      routes: [
        { key: 'info', title: 'Info', icon: 'information', color: '#EB3349', focused:false },
        { key: 'carParks', title: 'Car Parks', icon: 'parking', color: '#EB3349', focused:false },
        { key: 'map', title: 'Map', icon: 'map', color: '#EB3349', focused:true },
        { key: 'history', title: 'History', icon: 'history', color: '#EB3349', focused:false },
        { key: 'account', title: 'Account', icon: 'account-circle', color: '#EB3349', focused:false },
      ],
    };
  }

  handleIndexChange = async (index) => {
    //Check if user has moved to another screen, to update information in API.
    if(this.state.routes[this.state.index].key == "account" && this.state.routes[index].key != "account"){
      checkStorage.checkChange();
    };
    this.setState({ index });
  };

  renderScene = BottomNavigation.SceneMap({
      info: <Information/>,
      carParks: <CarParks/>,
      map: <Map/>,
      history: <History/>,
      account: <Account/>,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this.handleIndexChange}
        renderScene={this.renderScene}
      />
    );
  }
}