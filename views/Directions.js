import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Rating } from 'react-native-elements';
import { Title } from 'react-native-paper';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { styles, title, address, distance, duration, rating, toggleModal, navigate } = this.props;
    return (
      <View style={styles.directBox}>
        <Title style={{textAlign: 'center'}}>{title ? title : 'Title Unknown'}</Title>
          <Text style={{textAlign: 'center'}}>{address ? address : 'Address Unknown'}</Text>
          <View style={{flexDirection: 'row', flexDirection: 'row', textAlign: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text>{distance ? `Distance: ${Number(distance).toFixed(1)} km ` : ''}</Text>
            <Text>{duration ? `Duration: ${Number(duration).toFixed(0)} min ` : ''}</Text>
          </View>
          <Rating imageSize={25} startingValue={rating != "NaN" ? parseInt(rating) : 0} readonly/>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.smallButtonContainer]} onPress={toggleModal}>
              <Text>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallButtonContainer]} onPress={navigate}>
              <Text>DirectMe</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
};