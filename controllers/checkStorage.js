/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  checkStorage.js  
|  Description:  This is the file that holds all the functionality to check 
|                if there is any changes.
|                
*===========================================================================*/
import storage from '../models/Storage';
import apiMethods from '../models/ApiMethods';
/* 
  A function that checks if the user locally stored has been modified.
*/
exports.checkChange = async function() {
  //Retrieve User Data From Local Storage.
  var userLocal = await storage.get(`userLocal`);
  var userAPI = await storage.get(`userAPI`);
  //Check if it isn't the same to the API version.
  if (JSON.stringify(userLocal[0]) !== JSON.stringify(userAPI[0])) {
    //Update the user information on the API.
    await apiMethods.update(`USER`, userLocal[0]);
    //Update the user information on the local storage of the API version.
    await storage.set(`userAPI`, userLocal);
  }
};