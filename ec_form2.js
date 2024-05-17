var g_ts_config = {
  CSSEmail :'[aria-label="Correo Electrónico"]',
  CSSPhoneNumber : '[aria-label="Teléfono"]',
  country_code: '+57',
  CSSSubmitButton: '[type="submit"]'
 }
 g_ts_obj= g_ts_obj||{};
 
 document.addEventListener('input',function(e){
  var input = e.target,
   isEmail = input.matches(g_ts_config.CSSEmail),
   isPhoneNumber = input.matches(g_ts_config.CSSPhoneNumber);
  if (!isEmail && !isPhoneNumber) return;
  
  if (isEmail && /\S+@\S+\.\S+/.test(input.value) ) {
   console.log('é um e-mail válido inputs' );
   g_ts_obj.email = input.value
  }
  
  
  if (isPhoneNumber)  {
   var tel = '+' +  (g_ts_config.country_code + input.value).replace(/\D/g,'');
      console.log(tel + 'é o telefone' );
   if (! /^\+[1-9]\d{1,14}$/.test(tel)) return;
   g_ts_obj.phone_number = tel;
  }
 });
 
 document.addEventListener('click',  function(e){
  var  element = e.target;
  if(element.matches(CSSSubmitButton) || CSSSubmitButton.closest(CSSSubmitButton)) {
    window.dataLayer.push({'event': 'user-provided_data_event'});
  }
 });