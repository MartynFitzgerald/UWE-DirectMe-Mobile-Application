/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  colourSchemes.js  
|  Description:  This is the file that holds all the colours for each schemes. 
|                the best car park location.
|                
*===========================================================================*/
//Import functions.
import storage from '../models/Storage';

/*
  This function checks what option the user has selected.
*/
exports.colours = async function() {
    //Retrieve user data from local storage.
    var user = await storage.get(`userLocal`)
    if (user){
      if (user[0].scheme == "None"){
        if (!user[0].darkmode) { 
          return normalScheme;
        } else {
          return darkModeScheme;
        }
      } else if (user[0].scheme == "Protanopia") {
        return protanopiaScheme;
      } else if (user[0].scheme == "Deuteranopia") {
        return deuteranopiaScheme;
      } else if (user[0].scheme == "Tritanopia") {
        return tritanopiaScheme;
      } 
    }
    //Return normal scheme if all are undefined.
    return normalScheme; 
}

const normalScheme = {
  desire: '#EB3349',
  orangeSoda: '#F45C43',
  sandstorm: '#F4CB42',
  lightGrey: '#000000',
  white: '#FFFFFF',
  blue: '#4285F4',
  map: [],
  logo: require('../assets/LogoRed.png'),
}

const darkModeScheme = {
  desire: '#EB3349',
  orangeSoda: '#F45C43',
  sandstorm: '#F4CB42',
  lightGrey: '#FFFFFF',
  white: '#3A3A3A',
  blue: '#7a7a7a',
  map: require('../styles/map/Darkmode'),
  logo: require('../assets/Logo.png'),
}

const protanopiaScheme = {
  desire: '#8B8369',
  orangeSoda: '#A1945B',
  sandstorm: '#E9D14C',
  lightGrey: '#CFCBCB',
  white: '#FFFAFA',
  blue: '#4285F4',
  map: [],
  logo: require('../assets/LogoRed.png'),
}

const deuteranopiaScheme = {
  desire: '#A07D46',
  orangeSoda: '#B68D42',
  sandstorm: '#FFC867',
  lightGrey: '#DEC6CD',
  white: '#FFE8EF',
  blue: '#0090f0',
  map: [],
  logo: require('../assets/LogoRed.png'),
}

const tritanopiaScheme = {
  desire: '#EB4042',
  orangeSoda: '#F56166',
  sandstorm: '#FFC1CE',
  lightGrey: '#CECAD9',
  white: '#F4F0FF',
  blue: '#009ba5',
  map: [],
  logo: require('../assets/LogoRed.png'),
}
