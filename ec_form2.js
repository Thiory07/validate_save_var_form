var g_ts_config = {
  CSSEmail :'[type=email]',
  CSSPhoneNumber : '[type=tel]',
  country_code: '+57',
  CSSSubmitButton: '[type="submit"]',
  emailRegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneRegEx: /^\+[1-9]\d{6,14}$/
 };
 window.g_ts_obj = window.g_ts_obj||{};
 
 document.addEventListener('input',function(e){
  var input = e.target,
   isEmail = input.matches(g_ts_config.CSSEmail),
   isPhoneNumber = input.matches(g_ts_config.CSSPhoneNumber);
  if (!isEmail && !isPhoneNumber) {return; /* Not the e-mail nor the Phonenumber input */}
  if (isEmail && g_ts_config.emailRegEx.test(input.value) ) {
   console.log( `TS alert: ${input.value} is a valid e-mail;` );
   window.g_ts_obj.email = input.value
  }  
  if (isPhoneNumber)  {
   var tel = '+' +  (g_ts_config.country_code + input.value).replace(/\D/g,'');
   console.log(`TS alert: ${tel} is a valid phone Number;` );
   if (! g_ts_config.phoneRegEx.test(tel)) return;
   window.g_ts_obj.phone_number = tel;
  }
 });
 
 document.addEventListener('click',  function(e){
  var  element = e.target;
  if(!element.matches(g_ts_config.CSSSubmitButton) && ! element.closest(g_ts_config.CSSSubmitButton)) {return;}
  if(!window.g_ts_obj.phone_number && !window.g_ts_obj.email){return; /* not the submit button */}
  console.log(`TS alert: user-provided_data_event no DataLayer, use a variável Javacript: window.g_ts_obj (Email:${window.g_ts_obj.email}, Phone_number:${window.g_ts_obj.phone_number})`);
  window.dataLayer.push({'event': 'user_provided_data_event'});
 });