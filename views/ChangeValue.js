import React, { Component } from 'react';
import { StyleSheet, View, Button, TextInput } from 'react-native';
import { Title } from 'react-native-paper';

export default class MetaData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      title: '',
    };

    switch(props.value) {
      case 'fname':
        console.log(`fname`);
        this.setState({ value: 'fname' });
        this.setState({ title: 'First Name' });
    }
  }

  render() {
    const { title } = this.state;
    console.log(title);
    return (
      <View style={styles.alertBox}>
        <Title>Modify {this.props.value}</Title>
        <Title>Modify {this.title}</Title>
        <TextInput style={styles.inputs}
            placeholder="Phone Number"
            keyboardType="phone-pad"
            onChangeText={(phoneNumber) => this.setState({phoneNumber})}
            underlineColorAndroid='transparent'/>
      </View>
    );
  }
}
//<Button title="Hide modal" onPress={console.log(this.props)} />
const styles = StyleSheet.create({
  alertBox:{
    backgroundColor: "#ffffff",
    padding:15,
  },
  inputs:{
    padding:10,
    color:"#ff0000",
  },
});