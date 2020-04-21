import hash from 'object-hash';

exports.user_exists  = async function(emailAddress) {
  try {
    const response = await fetch(`http://parkingapplicationapi-env.fwmaq3pfqz.us-east-1.elasticbeanstalk.com/API/GET/USER/${emailAddress}`);
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
      fName: fName,
      lName: lName,
      email_address: email_address,
      password: hash({password: `D1rectMeSa1t${password}2020`}), // Using Encryption To Store Password
      phone_number: phone_number
    })
  }

  try {
    const response = await fetch(`http://parkingapplicationapi-env.fwmaq3pfqz.us-east-1.elasticbeanstalk.com/API/INSERT/USER/`, data);
    const json = await response.json();
    return json.result.length;
  }
  catch (error) {
    return console.error(error);
  }
}

exports.check_credential  = async function(emailAddress, password) {
  return fetch(`http://parkingapplicationapi-env.fwmaq3pfqz.us-east-1.elasticbeanstalk.com/API/GET/USER/${emailAddress}`)
   .then((response) => response.json())
   .then((json) => {
     if(json.result[0].email_address == emailAddress && json.result[0].password ==  hash({password: `D1rectMeSa1t${password}2020`}))
     {
       this.setState({ user: json.result[0] });
       return json.result.length;
     }
   })
   .catch((error) => console.error(error));
}