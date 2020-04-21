import { AsyncStorage } from 'react-native';

exports.setStorage  = async function(user) {
  await AsyncStorage.setItem('@DirectMe:user', JSON.stringify(user));
}