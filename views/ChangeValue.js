import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, FlatList, Image, Dimensions } from 'react-native';
import { Title } from 'react-native-paper';

//Import styles.
import { styles } from '../styles/General';
//Import functions.
import storage from '../models/Storage';
import validation from '../controllers/Validation';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      numColumns:2,
    };
  }

  changeUserValues = async (keyText, value) => {
    var tempUser = this.props.user;
    tempUser[keyText] = value;
    await this.setState({user: tempUser});
    await storage.set(`userLocal`, [tempUser]);
  };

  renderItem = ({item, index}) => {
    //If item is empty then send back a simple return to stop lots of touchable slots with no pictures.
    if (item.empty === true) {
      return;
    }
    //Get the dimensions of the application window and divide it by a number of columns predefined.
    var itemDimension = Dimensions.get('window').width / this.state.numColumns;
    //Return each option on the load of the view.
    return (
      <TouchableOpacity style={[styles.item, {height: itemDimension}]} onPress={() => {this.changeUserValues('profile_picture', item.id), this.props.toggleModal()}}>
        <Image style={{height:itemDimension - 2, width:itemDimension - 2}, styles.avatar} source={item.image}/> 
      </TouchableOpacity>
    );
  }
  
  formatRow = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ id: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  }


  render() {
  const { value, numColumns } = this.state;
  switch ( this.props.value ) {
    case 'profile_picture':
      return (
        <View style={styles.alertBox}>
          <Title>Modify {this.props.title}</Title>
            <Text style={{textAlign: 'center'}}>Select you're new {this.props.title.toLowerCase()} below.</Text>
            <FlatList
              style={styles.list}
              data={this.formatRow(this.props.profilePictures, numColumns)}
              keyExtractor= {(item) => {
                return item.id;
              }}
              renderItem={this.renderItem}
              numColumns={numColumns}/>
            <TouchableOpacity style={[styles.buttonContainer]}
              onPress={() => {
                this.props.toggleModal();
            }}>
              <Text>Go Back</Text>
            </TouchableOpacity> 
        </View>
      );
    default:
      return (
        <View style={styles.alertBox}>
          <Title>Modify {this.props.title}</Title>
            <Text style={{textAlign: 'center'}}>Insert you're new {this.props.title.toLowerCase()} below and press submit.</Text>
            <View style={(styles.inputContainerAccount)}>
            <TextInput style={styles.inputs}
              placeholder={this.props.example}
              keyboardType={this.props.type}
              onChangeText={(value) => this.setState({value})}
              underlineColorAndroid='transparent'/>
            </View>
            <TouchableOpacity style={[styles.buttonContainer]} 
              onPress={async () => {
                //Validate User Inputs
                switch ( this.props.value ) {
                  case 'fName': case 'lName':
                    if (!validation.validate_name(value)) {
                      alert(`The ${this.props.title.toLowerCase()} provided is invalid, please try again.`);
                      return;
                    }
                    break;
                  case 'email_address':
                    if (!validation.validate_email(value)) {
                      alert(`The ${this.props.title.toLowerCase()} provided is invalid, please try again.`);
                      return;
                    }
                    break;
                  case 'phone_number':
                    if (!validation.validate_phoneNumber(value)) {
                      alert(`The ${this.props.title.toLowerCase()} provided is invalid, please try again.`);
                      return;
                    }
                    break;
                }
                this.changeUserValues(this.props.value, value);
              }}
            >
              <Text>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer]}
              onPress={() => {
                this.props.toggleModal();
              }}
            >
              <Text>Go Back</Text>
            </TouchableOpacity>
        </View>
      );
    }
  }
};