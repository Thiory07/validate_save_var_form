var g_ts_config = {
  /* Configurations */
  CSSEmail :'[type=email]', // email selectors
  CSSPhoneNumber : '[placeholder="Teléfono*"]', // phone number selectors
  CSSCountryCode : '', // leave empty if there is no country code input
  CSSSubmitButton: '[type="submit"]', // a button that will generate "user_provided_data_event"
  country_code: '+55', // if there is no Phone input, hancode the country code

  /* Regular expressions */
  emailRegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneRegEx: /^\+[1-9]\d{6,14}$/
 };
 window.g_ts_obj = window.g_ts_obj||{}; // objeto para armazenar dados do usuário
 window.g_ECObj = window.g_ECObj||{};
 
 document.addEventListener('input',function(e){
  var input = e.target,
   isEmail = input.matches(g_ts_config.CSSEmail),
   isPhoneNumber = input.matches(g_ts_config.CSSPhoneNumber);
   let isCountryCode = false;
   if (g_ts_config.CSSCountryCode !=''){
    isCountryCode = input.matches(g_ts_config.CSSCountryCode);
   }
   g_ts_config.temp_cc = g_ts_config.temp_cc || g_ts_config.country_code;

  if (!isEmail && !isPhoneNumber) {return; /* Not the e-mail nor the Phonenumber input */}
  if (isEmail && g_ts_config.emailRegEx.test(input.value) ) {
   console.log( 'TS alert: '+ input.value+' is a valid e-mail;' );
   window.g_ts_obj.email = input.value;
   window.g_ECObj.email = input.value;
   return;
  }  

  if (isPhoneNumber)  {
   g_ts_config.temp_cc == g_ts_config.temp_cc || g_ts_config.country_code ; 
   var DOMCountryCode;
   if (g_ts_config.CSSCountryCode) DOMCountryCode = document.querySelector(g_ts_config.CSSCountryCode);
   if (DOMCountryCode) g_ts_config.temp_cc = DOMCountryCode.value.replace(/\D/g,'');
   var tel = '+' +  (g_ts_config.temp_cc + '' + input.value).replace(/\D/g,'');
   console.log('TS alert: '+ tel+ ' is a valid phone Number;');
   if (! g_ts_config.phoneRegEx.test(tel)) return;
   window.g_ts_obj.phone_number = tel;
   window.g_ECObj.phone_number = tel;
  }
 });
 
 document.addEventListener('click',  function(e){
  var  element = e.target;
  console.log(e.target);
  if(!element.matches(g_ts_config.CSSSubmitButton) && ! element.closest(g_ts_config.CSSSubmitButton)) {return; /* not the submit button */}
  if(!window.g_ts_obj.phone_number && !window.g_ts_obj.email){return; /* There is no E-mail nor Phone number */}
  console.log('TS alert: user-provided_data_event on DataLayer, use The Javacript variable: window.g_ts_obj \n(Email:'+ window.g_ts_obj.email+ ', Phone_number:'+window.g_ts_obj.phone_number+')');
  window.dataLayer.push({'event': 'user_provided_data_event'});
 });