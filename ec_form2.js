var g_ts_config = {
  CSSEmail :'[aria-label="Correo Electrónico"]',
  CSSPhoneNumber : '[aria-label="Teléfono"]',
  country_code: '+57',
  CSSSubmitButton: '[type="submit"]',
  emailRegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneRegEx: /^\+[1-9]\d{6,14}$/
 }
 g_ts_obj= g_ts_obj||{};
 
 document.addEventListener('input',function(e){
  var input = e.target,
   isEmail = input.matches(g_ts_config.CSSEmail),
   isPhoneNumber = input.matches(g_ts_config.CSSPhoneNumber);
  if (!isEmail && !isPhoneNumber) {
    console.log(`TS alert: it is neither the E-mail nor the Phone number input;`)
    return;
  }
  if (isEmail && g_ts_config.emailRegEx.test(input.value) ) {
   console.log( `TS alert: ${input.value} is a valid e-mail;` );
   g_ts_obj.email = input.value
  }
  
  
  if (isPhoneNumber)  {
   var tel = '+' +  (g_ts_config.country_code + input.value).replace(/\D/g,'');
      console.log(`TS alert: ${tel} is a valid phone Number;` );
   if (! g_ts_config.phoneRegEx.test(tel)) return;
   g_ts_obj.phone_number = tel;
  }
 });
 
 document.addEventListener('click',  function(e){
  var  element = e.target;
  if(!element.matches(CSSSubmitButton) && !CSSSubmitButton.closest(CSSSubmitButton)) {return;}
  if(!g_ts_obj.phone_number && !g_ts_obj.email){
    console.log(`TS alert: There is neither Phone number nor E-mail`);
    return;
  }
  console.log(`TS alert: user-provided_data_event no DataLayer, use a variável Javacript: g_ts_obj (Email:${g_ts_obj.email}, Phone_number:${g_ts_obj.phone_number})`);
  window.dataLayer.push({'event': 'user-provided_data_event'});
 });