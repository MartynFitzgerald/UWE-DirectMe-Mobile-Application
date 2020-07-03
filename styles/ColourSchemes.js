/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 06/08/2020
|
|    File Name:  colourSchemes.js  
|  Description:  This is the file that holds all the colours for each schemes. 
|                the best car park location.
|                
*===========================================================================*/
//Import functions.
import storage from '../models/Storage';

exports.colours = async function() {
    //Retrieve user data from local storage.
    var user = await storage.get(`userLocal`)
    if (user){
      if (user.scheme == "Normal"){
        if (!user.darkmode) { 
          return normalScheme;
        } else {
          return darkModeScheme;
        }
      } else if (user.scheme == "Protanopia") {
        return protanopiaScheme;
      } else if (user.scheme == "Deuteranopia") {
        return deuteranopiaScheme;
      } else if (user.scheme == "Tritanopia") {
        return tritanopiaScheme;
      } 
    }
    return normalScheme; //Return normal scheme if all are undefined.
}

const normalScheme = {
  desire: '#EB3349',
  orangeSoda: '#F45C43',
  sandstorm: '#F4CB42',
  lightGrey: '#CCCCCC',
  white: '#FFFFFF',
}

const darkModeScheme = {
  desire: '#121212',
  orangeSoda: '#121212',
  sandstorm: '#121212',
  lightGrey: '#EB3349',
  white: '#121212',
}

const protanopiaScheme = {
  desire: '#8B8369',
  orangeSoda: '#A1945B',
  sandstorm: '#E9D14C',
  lightGrey: '#CFCBCB',
  white: '#FFFAFA',
}

const deuteranopiaScheme = {
  desire: '#A07D46',
  orangeSoda: '#B68D42',
  sandstorm: '#FFC867',
  lightGrey: '#DEC6CD',
  white: '#FFE8EF',
}

const tritanopiaScheme = {
  desire: '#EB4042',
  orangeSoda: '#F56166',
  sandstorm: '#FFC1CE',
  lightGrey: '#CECAD9',
  white: '#F4F0FF',
}
