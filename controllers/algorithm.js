/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 06/08/2020
|
|    File Name:  algorithm.js  
|  Description:  This is the file that holds all the functionality to find 
|                the best car park location.
|                
*===========================================================================*/
import apiMethods from '../models/apiMethods';

/* 
  This function is to request car parks from the DirectMe 
*/
async function fetchCarParks(latitude, longitude, radius){
    //Fetch Car Parks From DirectMe's API.
    return await apiMethods.read(`CARPARK/LAT/${latitude}/LONG/${longitude}/RADIUS/${radius}`);
}

/* 
  A function that calculates the best location for the user to go to.
*/
exports.findBestLocation = async function(latitude, longitude, radius) {
    var carParks = await fetchCarParks(latitude, longitude, radius);

    //Find a car park with best reviews
    console.log(carParks);

    return carParks[0];
};