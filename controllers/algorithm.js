/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 03/08/2020
|
|    File Name:  algorithm.js  
|  Description:  This is the file that holds all the functionality to find 
|                the best car park location.
|                
*===========================================================================*/
import apiMethods from '../models/ApiMethods';

/* 
  This function is to request car parks from the DirectMe API.
*/
async function fetchCarParks(latitude, longitude, radius){
    //Fetch Car Parks From DirectMe's API.
    return await apiMethods.read(`CARPARK`,`LAT/${latitude}/LONG/${longitude}/RADIUS/${radius}`);
}
/* 
  A function that calculates the best location for the user to go to.
*/
exports.findBestLocation = async function(latitude, longitude, radius) {
    var carParks = await fetchCarParks(latitude, longitude, radius);
    if (!carParks) {
      return;
    } else {
      //Store closest car park currently
      var bestCarPark = carParks[0];
      //Find a car park with best reviews
      for(var i = 0; i < carParks.length; i++){
        //Work out the overall amount and rating of internal and external reviews.
        var overallAmount = Number(carParks[i].external_amount_of_ratings + carParks[i].internal_amount_of_ratings).toFixed(0);
        var overallRating = Number(((carParks[i].external_rating * carParks[i].external_amount_of_ratings) + (carParks[i].internal_rating * carParks[i].internal_amount_of_ratings)) / overallAmount).toFixed(1);
        //Store values inside the array of car park to view in next loop.
        carParks[i].overallAmount = overallAmount;
        carParks[i].overallRating = overallRating;
        //Ignore if on the first loop through.
        if (i > 0) {
          if (overallAmount !== "NaN" && overallRating !== "NaN") {
            //Check if this car park is better than the one stored.
            if ((bestCarPark.overallRating < overallRating) || (bestCarPark.overallRating == overallRating && bestCarPark.overallAmount < overallAmount)) {
              bestCarPark = carParks[i];
            }
          }
        }
      }
      return bestCarPark;
    }
};