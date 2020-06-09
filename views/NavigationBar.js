import React, { Component } from 'react';
import { BottomNavigation } from 'react-native-paper';

import checkStorage from '../controllers/checkStorage';

import Information from './Information';
import CarParks from './CarParks';
import Map from './Map';
import History from './History';
import Account from './Account';

const InformationComponent = (props) => (<Information {...props} />);
const CarParksComponent = (props) => (<CarParks {...props} />);
const MapComponent = (props) => (<Map {...props} />);
const HistoryComponent = (props) => (<History {...props} />);
const AccountComponent = (props) => (<Account {...props} />);

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  state = {
    index: 2,
    routes: [
      { key: 'info', title: 'Info', tabTitle: 'Information', icon: 'information', color: '#EB3349', focused:false, oldProps: this.props },
      { key: 'carParks', title: 'Car Parks', tabTitle: 'Car Parks', icon: 'parking', color: '#EB3349', focused:false, oldProps: this.props  },
      { key: 'map', title: 'Map', tabTitle: 'DirectMe', icon: 'map', color: '#EB3349', focused:true, oldProps: this.props  },
      { key: 'history', title: 'History', tabTitle: 'History', icon: 'history', color: '#EB3349', focused:false, oldProps: this.props  },
      { key: 'account', title: 'Account', tabTitle: 'Account', icon: 'account-circle', color: '#EB3349', focused:false, oldProps: this.props  },
    ],
  };

  handleIndexChange = async (index) => {
    //Check if user has moved to another screen, to update information in API.
    if(this.state.routes[this.state.index].key == "account" && this.state.routes[index].key != "account"){
      checkStorage.checkChange();
    };
    this.setState({ index });
  };

  renderScene = BottomNavigation.SceneMap({
      info: InformationComponent,
      carParks: CarParksComponent,
      map: MapComponent,
      history: HistoryComponent,
      account: AccountComponent,
  });

  render() {
    //console.log(this.props);
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this.handleIndexChange}
        renderScene={this.renderScene}
      />
    );
  }
}