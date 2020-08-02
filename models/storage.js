/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  Storage.js  
|  Description:  This is the file that holds all the functionality to the local
|                storage.
|                
*===========================================================================*/
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
/* 
  A function that removes information stored using the name inputs.
*/
exports.remove = async function(name) {
  await AsyncStorage.removeItem(`@DirectMe:${name}`).catch((error) => console.error(error));
};