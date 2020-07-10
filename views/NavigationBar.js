import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { BottomNavigation } from 'react-native-paper';

//Import styles.
import style from '../styles/General';
import schemes from '../styles/ColourSchemes';
//Import functions.
import checkStorage from '../controllers/CheckStorage';

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
    this.state = {
      colors: {},
      styles: {},
      index: 2,
      routes: [],
      isLoading: true,
    };
  }
  
  componentDidMount() {
    this.setStyle();
  };

  setStyle = async () => {
    try {
      var scheme = await schemes.colours();
      this.setState({ colors: scheme }, function () {
        this.setState({styles: style.fetchStyle(scheme.desire, scheme.orangeSoda, scheme.sandstorm, scheme.lightGrey, scheme.white, scheme.blue)}, function () {
          const { colors, styles } = this.state;
          this.setState({ routes: [
            { key: 'info', title: 'Info', tabTitle: 'Information', icon: 'information', color: colors.desire, focused:false, oldProps: this.props, styles:styles, colors:colors },
            { key: 'carParks', title: 'Car Parks', tabTitle: 'Car Parks', icon: 'parking', color: colors.desire, focused:false, oldProps: this.props, styles:styles, colors:colors },
            { key: 'map', title: 'Map', tabTitle: 'DirectMe', icon: 'map', color: colors.desire, focused:true, oldProps: this.props, styles:styles, colors:colors},
            { key: 'history', title: 'History', tabTitle: 'History', icon: 'history', color: colors.desire, focused:false, oldProps: this.props, styles:styles, colors:colors },
            { key: 'account', title: 'Account', tabTitle: 'Account', icon: 'account-circle', color: colors.desire, focused:false, oldProps: this.props, styles:styles, colors:colors, setStyle: this.setStyle },
          ]}, function () {
            this.setState({ isLoading: false });
          });
        });
      });
    } catch (error) {
      console.error(error);
    }
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
    const { isLoading } = this.state;
    if (isLoading) {
      return <ActivityIndicator size="large"/>
    } else { 
      return (
        <BottomNavigation
          navigationState={this.state}
          onIndexChange={this.handleIndexChange}
          renderScene={this.renderScene}
        />
      );
    }
  }
};