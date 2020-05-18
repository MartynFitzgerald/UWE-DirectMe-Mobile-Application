//import 'react-native-get-random-values';
import { v1 as uuidv1 } from 'react-native-uuid';
import hash from 'object-hash';
const endpointAWS = `http://directme-api.eu-west-2.elasticbeanstalk.com/`;

exports.user_exists  = async function(emailAddress) {
  try {
    const response = await fetch(`${endpointAWS}API/GET/USER/${emailAddress}`);
    const json = await response.json();
    return json.result.length;
  }
  catch (error) {
    return console.error(error);
  }
}

exports.insert_user  = async function(fName, lName, email_address, password, phone_number) {
  let data = {
    method: 'POST',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: uuidv1(),
      fName: fName,
      lName: lName,
      email_address: email_address,
      password: hash({password: `D1rectMeSa1t${password}2020`}), // Using Encryption To Store Password
      phone_number: phone_number
    })
  }

  try {
    const response = await fetch(`${endpointAWS}API/INSERT/USER/`, data);
    const json = await response.json();
    return json.result.length;
  }
  catch (error) {
    return console.error(error);
  }
}

exports.update_user  = async function(user) {
  let data = {
    method: 'PUT',
    headers: {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: user.user_id,
      fName: user.fName,
      lName: user.lName,
      email_address: user.email_address,
      password: user.password,
      phone_number: user.phone_number,
      darkmode: user.darkmode,
      radius: user.radius
    })
  }
  try {
    const response = await fetch(`${endpointAWS}API/UPDATE/USER/`, data);
    const json = await response.json();
    return json.result.length;
  }
  catch (error) {
    return console.error(error);
  }
}

exports.check_credential  = async function(emailAddress, password) {
  return fetch(`${endpointAWS}API/GET/USER/${emailAddress}`)
   .then((response) => response.json())
   .then((json) => {
     if (json.result.length)
     {
      if(json.result[0].email_address == emailAddress && json.result[0].password ==  hash({password: `D1rectMeSa1t${password}2020`}))
      {
        return json.result[0];
      }
      else
      {
        return undefined;
      }
     }
     else
     {
      return undefined;
     }
   })
   .catch((error) => console.error(error));
}