import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomNavigation, Text, TextInput  } from 'react-native-paper';

import UsersHistory from './UsersHistory';
import UsersAccount from './UsersAccount';
import UsersMap from './UsersMap';
import UsersFloatingActionButton from './UsersFloatingActionButton';

const HomeRoute = () => <Text>Information</Text>;

const carParksRoute = () => <Text>Car Parks</Text>;

const MapRoute = () => 
  <View>
    <UsersMap onGetLocation={this.usersMap}/>
    <UsersFloatingActionButton onGetFloatingActionButton={this.UsersFloatingActionButton}/>
  </View>;

const HistoryRoute = () => <UsersHistory onGetList={this.usersHistory}/>;

const AccountRoute = () => <UsersAccount onGetList={this.UsersAccount}/>;

class Navigation extends React.Component {
    state = {
      index: 2,
      routes: [
        { key: 'home', title: 'Home', icon: 'queue-music', color: '#7C26CB', focused:false   },
        { key: 'carParks', title: 'Car Parks', icon: 'queue-music', color: '#4285F4', focused:false   },
        { key: 'map', title: 'Map', icon: 'map', color: '#0F9D58', focused:true  },
        { key: 'history', title: 'History', icon: 'history', color: '#F4B400', focused:false   },
        { key: 'account', title: 'Account', icon: 'account-circle', color: '#DB4437', focused:false   },
      ],
    };

    _handleIndexChange = index => this.setState({ index });
  
    _renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        carParks: carParksRoute,
        map: MapRoute,
        history: HistoryRoute,
        account: AccountRoute,
    });

    render() {
      return (
      <BottomNavigation style={styles.nav}
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
  
export default Navigation;