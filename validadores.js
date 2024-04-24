window.g_ts = { 
  emailCSSSelector: "[type=email]",
  phoneCSSSelector: "[type=tel]",
  country_code: '54',
  sendButtonCSSSelector: '[type="submit"]'
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
  var country_code = this.country_code;
  tel = tel.replace(/\D/g, '');
  if (!tel.startsWith(country_code)){ tel = country_code+ tel}
  return '+'+tel;
}


window.g_ts.saveEmailToVar = function(input){
  var temp_mail =this.filterEmail(input.value);
  if (!window.g_ts.validateMail(temp_mail) ){console.log('TS Error: email inválido');return;}
  window.g_ts_pii.email = temp_mail;
  console.log('TS: email salvo em variável da janela');return;
}
window.g_ts.savePhoneToVar = function(input){
  var temp_phone = this.filterPhone(input.value);
  if (!window.g_ts.validatePhone(temp_phone)){console.log('TS Error:telefone inválido');return;}
  window.g_ts_pii.phone_number  = temp_phone;
  console.log('TS: telefone salvo em variável da janela');return;
}

// Ouvir Inputs
document.addEventListener( 'input', function(e){  
  var input = e.target,
   isEmail = window.g_ts.emailCSSSelector? input.matches(window.g_ts.emailCSSSelector):false,
   isPhone = window.g_ts.phoneCSSSelector? input.matches(window.g_ts.phoneCSSSelector):false;
  
  if ( !isPhone && !isEmail ) return;
  if (isEmail){window.g_ts.saveEmailToVar(input);return;} 
  if (isPhone){window.g_ts.savePhoneToVar(input);return;}
});

// Submit
document.addEventListener( 'click', function(e){  
  var button = e.target;
  if ( !button.matches(window.g_ts.sendButtonCSSSelector)) return;
  console.log('TS: botão enviar clicado');
  var  form= e.target.closest('form');
  var errors = [];
  if (!form.checkValidity()) return; 
  console.log('TS: form válidado pelo HTML');

  if (window.g_ts_pii.email  && !window.g_ts.validateMail(window.g_ts_pii.email)){errors.push('TS Error:Erro de validação no email');}
  
  if (window.g_ts_pii.phone_number && !window.g_ts.validatePhone(window.g_ts_pii.phone_number) ) {errors.push('TS Error:Erro de validação no phone number');}

  if (errors.length >0){console.log(errors);return;}

  window.dataLayer = window.dataLayer || [];
  console.log('TS: DataLayer UPD event, g_ts_pii na janela');
  window.dataLayer.push({
    'event': 'dataLayer upd event'
  });
});
