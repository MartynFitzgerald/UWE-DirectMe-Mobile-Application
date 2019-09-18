import React from "react";
import { StyleSheet, View, ScrollView } from 'react-native';
import { List, Title, Text, Divider } from 'react-native-paper';


const usersAccount = props => {
    return (
      <View>
        <Title style={styles.title}>Account</Title>
        <ScrollView>
          
        </ScrollView>
      </View>
    );
};

const styles = StyleSheet.create({
  title: {
      paddingTop: 40,
      marginTop: 0,
      top: 0,
      textAlign: 'center', 
      fontWeight: 'bold',
      backgroundColor: '#DB4437',
      color: '#fff',
  },
});  

export default usersAccount;