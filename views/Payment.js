import React, { Component } from 'react';
import { View, TouchableOpacity, Slider, TextInput } from 'react-native';
import { Text, Title } from 'react-native-paper';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { styles, title, toggleModal, pay, hours, setHours } = this.props;
    return (
      <View style={styles.alertBox}>
        <Title style={{textAlign: 'center'}}>Pay For Car Space</Title>
        <Text style={{textAlign: 'center'}}>How many hours long would you like to stay parked at {title ? title : 'Title Unknown'}?</Text>
        <Text style={{textAlign: 'center'}}>Hours: {hours}</Text>
        <View style={{width: 300}}>
          <Slider
            step={1}
            minimumValue={1}
            maximumValue={5}
            onValueChange={setHours}
            value={1}
          />
        </View>
        <Text style={{textAlign: 'center'}}>Please insert car registration number.</Text>
        <View style={styles.inputContainerAccount}>
          <TextInput style={styles.inputs}
            placeholder="Car's Registration"
            keyboardType="default"
            //onChangeText={(selectedValue) => this.setState({selectedValue})}
            underlineColorAndroid='transparent'/>
        </View>
        <Text style={{textAlign: 'center'}}>Price: N/A</Text>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={[styles.buttonContainerMetadata]} onPress={pay}>
            <Text>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainerMetadata]} onPress={toggleModal}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};