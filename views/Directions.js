import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Rating } from 'react-native-elements';
import { Title } from 'react-native-paper';

//Import styles.
import { styles } from '../styles/General';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.directBox}>
        <Title style={{textAlign: 'center'}}>{this.props.title ? this.props.title : 'Title Unknown'}</Title>
          <Text style={{textAlign: 'center'}}>{this.props.address ? this.props.address : 'Address Unknown'}</Text>
          <Rating imageSize={25} startingValue={this.props.rating} readonly/>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={[styles.smallButtonContainer]} onPress={this.props.toggleModal}>
              <Text>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.smallButtonContainer]} onPress={this.props.navigate}>
              <Text>DirectMe</Text>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
};