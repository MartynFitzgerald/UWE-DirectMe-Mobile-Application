import React, { Component } from 'react';
import { View, TouchableOpacity, Text, TextInput, FlatList, Image, Dimensions, Picker } from 'react-native';
import { Title } from 'react-native-paper';

import validation from '../controllers/Validation';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedValue: '',
      numColumns:2,
    };
  }

  renderItem = ({item, index}) => {
    const { styles } = this.props;
    //If item is empty then send back a simple return to stop lots of touchable slots with no pictures.
    if (item.empty === true) {
      return;
    }
    //Get the dimensions of the application window and divide it by a number of columns predefined.
    var itemDimension = Dimensions.get('window').width / this.state.numColumns;
    //Return each option on the load of the view.
    return (
      <TouchableOpacity style={[styles.item, {height: itemDimension}]} onPress={() => {this.props.changeUserValues('profile_picture', item.id), this.props.toggleModal()}}>
        <Image style={{height:itemDimension - 2, width:itemDimension - 2}, styles.avatar} source={item.image}/> 
      </TouchableOpacity>
    );
  };
  
  formatRow = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ id: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  };

  render() {
  const { styles, user, profilePictures, example, type, title, changeUserValues, toggleModal } = this.props;
  const { selectedValue, numColumns } = this.state;
  switch ( this.props.value ) {
    case 'scheme':
      return (
        <View style={styles.alertBox}>
          <Title style={[styles.centerVerticalText, styles.lightGreyText]} >Modify {title}</Title>
            <Text style={[styles.centerVerticalText, styles.lightGreyText]} >Change you're {title.toLowerCase()} below.</Text>
            <Picker
              selectedValue={user.scheme}
              style={[ styles.lightGreyText, { height: 75, width: 250 }]}
              onValueChange ={(selectedValue) => {
                changeUserValues(this.props.value, selectedValue);
                toggleModal();
            }}>
              <Picker.Item label="None" value="None" />
              <Picker.Item label="Protanopia" value="Protanopia" />
              <Picker.Item label="Deuteranopia" value="Deuteranopia" />
              <Picker.Item label="Tritanopia" value="Tritanopia" />
            </Picker>
            <TouchableOpacity style={[styles.buttonContainer]}
              onPress={() => {
                this.props.toggleModal();
            }}>
              <Text style={[styles.centerVerticalText, styles.lightGreyText]}>Go Back</Text>
            </TouchableOpacity> 
        </View>
      );
    case 'profile_picture':
      return (
        <View style={styles.alertBox}>
          <Title style={[styles.centerVerticalText, styles.lightGreyText]}>Modify {title}</Title>
            <Text style={[styles.centerVerticalText, styles.lightGreyText]}>Select you're new {title.toLowerCase()} below.</Text>
            <FlatList
              style={styles.list}
              data={this.formatRow(profilePictures, numColumns)}
              keyExtractor= {(item) => {
                return item.id;
              }}
              renderItem={this.renderItem}
              numColumns={numColumns}/>
            <TouchableOpacity style={[styles.buttonContainer]}
              onPress={() => {
                toggleModal();
            }}>
              <Text style={[styles.centerVerticalText, styles.lightGreyText]}>Go Back</Text>
            </TouchableOpacity> 
        </View>
      );
    default:
      return (
        <View style={styles.alertBox}>
          <Title style={[styles.centerVerticalText, styles.lightGreyText]} >Modify {title}</Title>
            <Text style={[styles.centerVerticalText, styles.lightGreyText]} >Insert you're new {title.toLowerCase()} below and press submit.</Text>
            <View style={styles.inputContainerAccount}>
            <TextInput style={styles.inputs}
              placeholder={example}
              keyboardType={type}
              onChangeText={(selectedValue) => this.setState({selectedValue})}
              underlineColorAndroid='transparent'/>
            </View>
            <TouchableOpacity style={[styles.buttonContainer]} 
              onPress={async () => {
                //Validate User Inputs
                switch ( this.props.value ) {
                  case 'fName': case 'lName':
                    if (!validation.validate_name(selectedValue)) {
                      alert(`The ${title.toLowerCase()} provided is invalid, please try again.`);
                      return;
                    }
                    break;
                  case 'email_address':
                    if (!validation.validate_email(selectedValue)) {
                      alert(`The ${title.toLowerCase()} provided is invalid, please try again.`);
                      return;
                    }
                    break;
                  case 'phone_number':
                    if (!validation.validate_phoneNumber(selectedValue)) {
                      alert(`The ${title.toLowerCase()} provided is invalid, please try again.`);
                      return;
                    }
                    break;
                }
                changeUserValues(this.props.value, selectedValue);
              }}
            >
              <Text style={[styles.centerVerticalText, styles.lightGreyText]}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonContainer]}
              onPress={() => {
                toggleModal();
              }}
            >
              <Text style={[styles.centerVerticalText, styles.lightGreyText]}>Go Back</Text>
            </TouchableOpacity>
        </View>
      );
    }
  }
};