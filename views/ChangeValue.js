import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, TextInput, FlatList, Image, Dimensions } from 'react-native';
import { Title } from 'react-native-paper';

import validation from '../controllers/validation';
import storage from '../models/storage';

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
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    var itemDimension = Dimensions.get('window').width / this.state.numColumns;

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
            <Text style={{textAlign: 'center'}}>Select you're new {this.props.title.toLowerCase()} below and press submit.</Text>
            <FlatList
              style={styles.list}
              data={this.formatRow(this.props.profilePictures, numColumns)}
              keyExtractor= {(item) => {
                return item.id;
              }}
              renderItem={this.renderItem}
              numColumns={numColumns}/>
            <TouchableOpacity style={[styles.buttonContainer, styles.buttons]}
              onPress={() => {
                this.props.toggleModal();
              }}
            >
              <Text>Go Back</Text>
            </TouchableOpacity> 
        </View>
      );
    default:
      return (
        <View style={styles.alertBox}>
          <Title>Modify {this.props.title}</Title>
            <Text style={{textAlign: 'center'}}>Insert you're new {this.props.title.toLowerCase()} below and press submit.</Text>
            <View style={(styles.inputContainer)}>
            <TextInput style={styles.inputs}
              placeholder={this.props.example}
              keyboardType={this.props.type}
              onChangeText={(value) => this.setState({value})}
              underlineColorAndroid='transparent'/>
            </View>
            <TouchableOpacity style={[styles.buttonContainer, styles.buttons]} 
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
            <TouchableOpacity style={[styles.buttonContainer, styles.buttons]}
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
}

const styles = StyleSheet.create({
  list: {
      width: '100%',
      height: '100%',
      paddingRight: 10,
      paddingLeft: 10,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom:10,
  },
  alertBox:{
    backgroundColor: "#ffffff",
    padding:10,
    alignItems: 'center',
  },
  inputContainer: {
    borderColor: '#CCCCCC',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    width:300,
    height:50,
    marginTop:15,
    marginBottom:15,
    flexDirection: 'row',
  },
  inputs:{
    height:45,
    borderBottomColor: '#FFFFFF',
    textAlign: 'center',
    flex:1,
  },
  buttonContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#000000',
    borderWidth: .5,
    height:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
    marginBottom:10,
    width:250,
    borderRadius:30,
  },
  buttons: {
    backgroundColor: '#FFFFFF',
  },
});