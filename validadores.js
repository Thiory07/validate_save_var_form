window.g_ts = { 
  emailCSSSelector: "[type=email]",
  phoneCSSSelector: "[type=tel]",
  country_code: '54'
};
window.g_ts_pii={};

// checks if it has the + sign and if it is has 2 and 15 numbers
window.g_ts.validatePhone = function(tel){return /^\+[1-9]\d{1,14}$/.test(tel);}
// verifies if the email is valid.
window.g_ts.validateMail = function(email){return /\S+@\S+\.\S+/.test(email);}
// filtra e pega o primeiro email válido do texto
window.g_ts.filterEmail = function(text) {return text.match(/[a-zA-Z0-9-_.]+@[a-zA-Z0-9-_.]+/gi)[0];}
//filtrar numero de telefone.
window.g_ts.filterPhone = function(tel,country_code) {
  tel = tel.replace(/\D/g, '');
  country_code = country_code.replace(/\D/g, '');
  if (!tel.startsWith(country_code)){ tel = country_code+ tel}
  return '+'+tel;
}


window.g_ts.saveEmailToVar = function(input){
  var temp_mail = window.g_ts.filterEmail(input.value);
  if (!window.g_ts.validateMail(temp_mail) ){console.log('email inválido');return;}
  window.g_ts_pii.email = temp_mail;
  console.log('email salvo em variável da janela');return;
}
window.g_ts.savePhoneToVar = function(input){
  var temp_phone = window.g_ts.filterPhone(temp_phone, window.g_ts.country_code);
  if (!window.g_ts.validatePhone(temp_phone)){console.log('telefone inválido');return;}
  window.g_ts_pii.phone_number  = temp_phone;
  console.log('telefone salvo');return;
}
document.addEventListener( 'input', function(e){  
  var input = e.target,
   isEmail = window.g_ts.emailCSSSelector? input.matches(window.g_ts.emailCSSSelector):false,
   isPhone = window.g_ts.phoneCSSSelector? input.matches(window.g_ts.phoneCSSSelector):false;
  
  if ( !isPhone && !isEmail ) return;
  if (isEmail){window.g_ts.saveEmailToVar(input);return;} 
  if (isPhone){window.g_ts.savePhoneToVar(input);return;}
});