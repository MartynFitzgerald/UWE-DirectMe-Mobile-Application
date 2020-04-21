exports.validate_name = function(name) {
  var re = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
  return re.test(name);
}

exports.validate_email = function(emailAddress) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(emailAddress);
}

exports.validate_phonenumber = function(phoneNumber) {
  var re = /[\+]?\d{0,3}([(]?\d{3}[)]?[-.]?\d{3}[-.]?\d{2}[-.]?\d{2})/;
  return re.test(phoneNumber);
}

exports.validate_password = function(password) {
  // 8-120 chars && No spaces && One a-z char && One A-Z char && One digit && One of the folowing chars: !@#$%^&*()-=¡£_+`~.,<>/?;:'"|[]{}
  var re = /^.*(?=.{8,120})(?!.*\s)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\!\@\#\$\%\^\&\*\(\)\-\=\¡\£\_\+\`\~\.\,\<\>\/\?\;\:\'\"\\\|\[\]\{\}]).*$/;
  return re.test(password);
}