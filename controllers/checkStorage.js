import storage from '../models/storage';
import apiMethods from '../models/apiMethods';

exports.checkChange = async function() {
  //Retrieve User Data From Local Storage.
  var userLocal = await storage.get(`userLocal`);
  var userAPI = await storage.get(`userAPI`);
  //Check if it isn't the same to the API version.
  if(JSON.stringify(userLocal[0]) !== JSON.stringify(userAPI[0])) {
    //Update the user information on the API.
    await apiMethods.update(`USER`, userLocal[0]);
    //Update the user information on the local storage of the API version.
    await storage.set(`userAPI`, userLocal);
  }
};