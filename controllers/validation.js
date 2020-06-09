/*=============================================================================
|      Editors:  Martyn Fitzgerald - 16025948
|
|  Module Code:  UFCFR4-45-3
| Module Title:  Computing Project
|
|   Instructor:  Paul Raynor
|     Due Date:  23/04/2020 Extended Till 06/08/2020
|
|    File Name:  validation.js  
|  Description:  This is the file that holds all the functionality to validate 
|                any forms that are inputted from users.
|                
*===========================================================================*/
/* 
  A function that checks if the input is a valid name.
*/
exports.validate_name = function(name) {
  var re = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  return re.test(name);
}
/* 
  A function that checks if the input is a valid emailAddress.
*/
exports.validate_email = function(emailAddress) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(emailAddress);
}
/* 
  A function that checks if the input is a valid phoneNumber.
*/
exports.validate_phoneNumber = function(phoneNumber) {
  var re = /[\+]?\d{0,3}([(]?\d{3}[)]?[-.]?\d{3}[-.]?\d{2}[-.]?\d{2})/;
  return re.test(phoneNumber);
}
/* 
  A function that checks if the input is a valid password. Non valid password doesn't follow these rules, 8-120 chars, 
  No spaces, One a-z char, One A-Z char, One digit, and One of the following chars: !@#$%^&*()-=¡£_+`~.,<>/?;:'"|[]{}
*/
exports.validate_password = function(password) {
  var re = /^.*(?=.{8,120})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;
  return re.test(password);
}