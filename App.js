import React from 'react';
import {StyleSheet, View} from 'react-native';
import Login from './views/Login';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <ProgressBarAndroid /> */}

      <Login onGetLogin={this.Login} />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
