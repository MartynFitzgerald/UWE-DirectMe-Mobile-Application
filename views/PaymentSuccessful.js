import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text, Title } from 'react-native-paper';
import Moment from 'moment';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { styles, toggleModal, review, hours } = this.props;
    const date = new Date();
    return (
      <View style={styles.alertBox}>
        <View style={{paddingBottom: 20}}>
          <Title style={{textAlign: 'center'}}>Payment Successful</Title>
          <Text style={{textAlign: 'center'}}>You have {hours} hours left before you have to either pay for extra time or move the vehicle.</Text>
        </View>
        <Text style={{textAlign: 'center', paddingBottom: 20}}>Start Time: {Moment(date).format('MMMM Do YYYY, H:mm')}</Text>
        <Text style={{textAlign: 'center', paddingBottom: 20}}>End Time: {Moment(date.setHours(date.getHours() + hours)).format('MMMM Do YYYY, H:mm')}</Text>
        
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={[styles.buttonContainerMetadata]} onPress={review}>
            <Text>Review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainerMetadata]} onPress={toggleModal}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};