// Tracking Solution class
window.g_ts = { 
  emailCSSSelector: "[type=email]",
  phoneCSSSelector: "[type=tel]",
  country_code: '55',
  sendButtonCSSSelector: '[type="submit"]',

  // Helper variables
  isValidemail: false,
  isValidphone_number: false,
};
window.g_ts_pii={
//   "email": "email",
//   "phone_number": yourPhoneVariable,
//   "address": {
//     "first_name": yourFirstNameVariable,
//     "last_name": yourLastNameVariable,
//     "street": yourStreetAddressVariable,
//     "city":yourCityVariable,
//     "region": yourRegionVariable,
//     "postal_code": yourPostalCodeVariable,
//     "country": yourCountryVariable
// }
};

// checks if it has the + sign and if it is has 2 and 15 numbers
window.g_ts.validatePhone = function(tel){return /^\+[1-9]\d{1,14}$/.test(tel);}
// verifies if the email is valid.
window.g_ts.validateMail = function(email){return /\S+@\S+\.\S+/.test(email);}
// filters the first valid email from text;
window.g_ts.filterEmail = function(text) {return text.match(/[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+/gi)[0];}
// filters phone number, removing all custom characters
window.g_ts.filterPhone = function(tel) {
  var country_code = window.g_ts.country_code;
  tel = tel.replace(/\D/g, '');
  if (!tel.startsWith(country_code)){ tel = country_code+ tel}
  return '+'+tel;
}

// function mais genérica:
window.g_ts.saveToVar = function(input, filterVar, validateVar, varName){
 var temp_var = input.value;
 temp_var = filterVar(temp_var);
 if ( !validateVar(temp_var)){
  console.log(`TS Error saveToVar: ${varName} inválido`);return;
 }
 window.g_ts[`isValid${varName}`] =  true;
 window.g_ts_pii[varName] = temp_var;
}

// Ouvir Inputs
document.addEventListener( 'input', function(e){  
  var input = e.target,
   isEmail = window.g_ts.emailCSSSelector? input.matches(window.g_ts.emailCSSSelector):false,
   isPhone = window.g_ts.phoneCSSSelector? input.matches(window.g_ts.phoneCSSSelector):false;

   if ( !isPhone && !isEmail ) return;
  if (isEmail){
    window.g_ts.saveToVar(input, window.g_ts.filterEmail, window.g_ts.validateMail, 'email' );
    return;
  } 
  if (isPhone){window.g_ts.saveToVar(input, window.g_ts.filterPhone, window.g_ts.validatePhone, 'phone_number' );return;} 
});

// Submit
document.addEventListener( 'click', function(e){  
  var button = e.target;
  //check if it is the submit button:
  if ( !button.matches(window.g_ts.sendButtonCSSSelector) && !button.closest(window.g_ts.sendButtonCSSSelector)) return;
  console.log('TS: botão enviar clicado');
  // find the eclosest Form;
  var  form= e.target.closest('form'),
   errors = [];
  if (!form){console.log('TS Error: Não é um form'); return;}
  if (!form.checkValidity()) return; 
  console.log('TS: form válidado pelo HTML');

  if (window.g_ts_pii.email  && window.g_ts.isValidEmail){
    errors.push('TS Error:Erro de validação no email');
  };
  
  if (window.g_ts_pii.phone_number && window.g_ts.isValidPhone ) {
    errors.push('TS Error:Erro de validação no phone number');
  };

  if (errors.length >0){
    console.log(errors);
    return;
  };

  window.dataLayer = window.dataLayer || [];
  console.log('TS: DataLayer UPD event, variável g_ts_pii na janela');

  window.g_ts_pii.address = {};
  window.g_ts_pii.address.first_name = document.querySelector('[name="First_name"]').value.toLowerCase();
  window.g_ts_pii.address.last_name = document.querySelector('[name="Last_name"]').value.toLowerCase();
  window.g_ts_pii.address.street = document.querySelector('[name="Street_Address"]').value.toLowerCase();
  window.g_ts_pii.address.city = document.querySelector('[name="City"]').value.toLowerCase();
  window.g_ts_pii.address.region = document.querySelector('[name="Region"]').value.toLowerCase();
  window.g_ts_pii.address.postal_code = document.querySelector('[name="Country"]').value.toLowerCase();
  window.g_ts_pii.address.country = document.querySelector('[name="Postal Code"]').value.toLowerCase();

  window.dataLayer.push({'event': 'upd event'});
});

function callConsole(message){
  console.log(message);
}



