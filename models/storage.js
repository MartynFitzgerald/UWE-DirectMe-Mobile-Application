import { AsyncStorage } from 'react-native';
/* 
  A function that stores information using the name and data inputs.
*/
exports.set = async function(name, data) {
  await AsyncStorage.setItem(`@DirectMe:${name}`, JSON.stringify(data)).catch((error) => console.error(error));
};
/* 
  A function that stores information using the name input.
*/
exports.get = async function(name) {
  return await AsyncStorage.getItem(`@DirectMe:${name}`).then((data) => {
    return JSON.parse(data);
  }).catch((error) => console.error(error));
};