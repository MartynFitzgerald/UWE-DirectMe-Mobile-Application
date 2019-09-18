import React from 'react';
import {StyleSheet, View} from 'react-native';

import BottomNav from './components/BottomNavigation';

export default function App() {
  
  return (
    <View style={styles.container}>
      {/* <ProgressBarAndroid /> */}

      <BottomNav onGetBottomNav={this.BottomNav} />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
