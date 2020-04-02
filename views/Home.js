import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomNavigation, Text, TextInput  } from 'react-native-paper';

import Information from './Information';
import CarParks from './CarParks';
import Map from './Map';
import FloatingActionButton from './FloatingActionButton';
import History from './History';
import Account from './Account';

const InformationRoute = () => <Information onGetList={this.Information}/>;

const CarParksRoute = () => <CarParks onGetList={this.CarParks}/>;

const MapRoute = () => 
  <View>
    <Map onGetLocation={this.Map}/>
    <FloatingActionButton onGetFloatingActionButton={this.FloatingActionButton}/>
  </View>;

const HistoryRoute = () => <History onGetList={this.History}/>;

const AccountRoute = () => <Account onGetList={this.Account}/>;

export default class HomeScreen extends React.Component {
    state = {
      index: 2,
      routes: [
        { key: 'info', title: 'Info', icon: 'home', color: '#7C26CB', focused:false   },
        { key: 'carParks', title: 'Car Parks', icon: 'parking', color: '#4285F4', focused:false   },
        { key: 'map', title: 'Map', icon: 'map', color: '#0F9D58', focused:true  },
        { key: 'history', title: 'History', icon: 'history', color: '#F4B400', focused:false   },
        { key: 'account', title: 'Account', icon: 'account-circle', color: '#DB4437', focused:false   },
      ],
    };

    _handleIndexChange = index => this.setState({ index });
  
    _renderScene = BottomNavigation.SceneMap({
        info: InformationRoute,
        carParks: CarParksRoute,
        map: MapRoute,
        history: HistoryRoute,
        account: AccountRoute,
    });

    render() {
      return (
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this._handleIndexChange}
          renderScene={this._renderScene}
        />
      );
    }
  }
  const styles = StyleSheet.create({
      nav: {
          width: '100%',
          height: '100%',
      },
    });  