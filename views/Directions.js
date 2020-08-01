import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Rating } from 'react-native-elements';
import { Title } from 'react-native-paper';

//Import functions.
import apiMethods from '../models/ApiMethods';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  insertHistory = () => {
    //Create data array to submit to API.
    var historyArray = {
      user_id: this.props.userID,
      car_park_id: this.props.id,
    };
    //Insert into API.
    apiMethods.insert(`HISTORY`, historyArray).catch((error) => {console.log(error)});
  };

  render() {
    const { styles, title, address, distance, duration, rating, toggleModal, navigate } = this.props;
    return (
      <View style={styles.directionBox}>
        <Title style={{textAlign: 'center'}}>{title ? title : 'Title Unknown'}</Title>
          <Text style={{textAlign: 'center'}}>{address ? address : 'Address Unknown'}</Text>
          <View style={{flexDirection: 'row', flexDirection: 'row', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text>{distance ? `Distance: ${Number(distance).toFixed(1)} km ` : ''}</Text>
            <Text>{duration ? `Duration: ${Number(duration).toFixed(0)} min` : ''}</Text>
          </View>
          <Rating type='custom' ratingBackgroundColor='#c8c7c8' imageSize={25} startingValue={rating != "NaN" ? parseInt(rating) : 0} readonly/>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.smallButtonContainer]} onPress={toggleModal}>
              <Text>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallButtonContainer]} onPress={() => {
              navigate();
              this.insertHistory();
            }}>
              <Text>DirectMe</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
};