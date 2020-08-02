/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  Review.js  
|  Description:  This is the file that holds the class of the review view.
|                
*===========================================================================*/
import React, { Component } from 'react';
import { View, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Rating } from 'react-native-elements';
import { Text, Title } from 'react-native-paper';

export default class Overlay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { styles, toggleModal, submit, title, hours, rating, setRating, review, setReview } = this.props;
    return (
      <View style={styles.alertBox}>
        <Title style={{textAlign: 'center'}}>Give A Review</Title>
        <Text style={{textAlign: 'center'}}>Please give us your feedback on your experience on your {hours} hours at {title}.</Text>
        <Rating style={{paddingVertical: 20}} imageSize={40} onFinishRating={setRating} />
        <View style={styles.inputContainerAccount}>
          <TextInput style={styles.inputs}
            placeholder="Comment"
            keyboardType="default"
            onChangeText={setReview}
            underlineColorAndroid='transparent'/>
        </View>


        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity style={[styles.buttonContainerMetadata]} onPress={() => {
             if (review == undefined || review == null || review == '') {
              //Output alert to aware user of invalid search input.
              Alert.alert(
                "Invalid Input",
                `Unfortunately DirectMe couldn't submit the review, please make sure you insert a correct review comment and try again.`,
                [
                  { text: 'Try Again', onPress: () => console.log('Try Again Pressed') },
                ],
                { cancelable: true }
              );
             } else {
              submit(rating, review);
             }
            }}>
            <Text>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainerMetadata]} onPress={toggleModal}>
            <Text>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};