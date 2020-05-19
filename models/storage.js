import { AsyncStorage } from 'react-native';

exports.set = async function(item, data) {
  await AsyncStorage.setItem(`@DirectMe:${item}`, JSON.stringify(data))
  .catch((error) => console.error(error));
};
exports.get = async function(item) {
  return await AsyncStorage.getItem(`@DirectMe:${item}`)
  .then((data) => {
    return JSON.parse(data);
   })
  .catch((error) => console.error(error));
};