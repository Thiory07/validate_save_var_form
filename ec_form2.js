/* 
Como usar:

Configuração:
- Coloque os seletores para os campos de Email , telefone e DDI (código telefonico do país);
- Coloque o seletor do botão de enviar;
- Se o site não tiver um campo de DDI, deixe o campo "CSSCountryCode" vazio e prencha o "country_code" com o código do país do site;

Acionamentos:
- este código cria um evento adicional de dados do usuário no dataLayer ou para GTAG, "user_provided_data_event";
- a variável que guarda os dados do usuário na janela é "window.g_ts_obj" que pode ser utilizada para envio de dados para google tag manager ou gtag;
*/
var g_ts_config = {
  /* Configurations */
  CSSEmail :'[type=email],[name="email"]', 
  CSSPhoneNumber : '[name="tel"]', 
  CSSCountryCode : '',  
  CSSSubmitButton: '[type="submit"]', 
  country_code: '+55', 

  /* Regular expressions */
  emailRegEx: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneRegEx: /^\+[1-9]\d{8,14}$/

  
 };
 window.g_ts_obj = window.g_ts_obj||{}; // objeto para armazenar dados do usuário
 window.g_ECObj = window.g_ECObj||{}; // objeto para facilitar a curva de aprendizado.d
 
 document.addEventListener('input',function(e){
  var input = e.target,
  isEmail = input.matches(g_ts_config.CSSEmail),
  isPhoneNumber = input.matches(g_ts_config.CSSPhoneNumber);
  var isCountryCode = false;

  if (!isEmail && !isPhoneNumber) {return; /* Not the e-mail nor the Phonenumber input */}
  if (isEmail && g_ts_config.emailRegEx.test(input.value) ) {
   console.log( 'TS alert: '+ input.value+' is a valid e-mail;' );
   window.g_ts_obj.email = window.g_ECObj.email = input.value;
   return;
  }  

  if (isPhoneNumber)  { 
   var DOMCountryCode;
   if (g_ts_config.CSSCountryCode && g_ts_config.CSSCountryCode !='') DOMCountryCode = document.querySelector(g_ts_config.CSSCountryCode);
   if (DOMCountryCode) g_ts_config.temp_cc = DOMCountryCode.value.replace(/\D/g,'');
   g_ts_config.temp_cc = g_ts_config.temp_cc || g_ts_config.country_code ;
   var tel = '+' +  (g_ts_config.temp_cc + '' + input.value).replace(/\D/g,'');
   if (! g_ts_config.phoneRegEx.test(tel)) return;
   
   console.log('TS alert: '+ tel+ ' is a valid phone Number;');
   window.g_ts_obj.phone_number = window.g_ECObj.phone_number = tel;
  }
 });
 
 document.addEventListener('click',  function(e){
  var  element = e.target;
  console.log(e.target);
  if(!element.matches(g_ts_config.CSSSubmitButton) && ! element.closest(g_ts_config.CSSSubmitButton)) {return; /* not the submit button */}
  
  var form = element.closest('form');
  if(form && form.checkValidity()) {return; /* form exist and is invalid */};
  /* Not a form or a valid form; */ 
  if(!window.g_ts_obj.phone_number && !window.g_ts_obj.email){return; /* There is no E-mail nor Phone number */}
  console.log('TS alert: user-provided_data_event on DataLayer, use The Javacript variable: window.g_ts_obj \n(Email:'+ window.g_ts_obj.email+ ', Phone_number:'+window.g_ts_obj.phone_number+')');
  window.dataLayer.push({'event': 'user_provided_data_event'});
  if( gtag ) gtag('set', 'user_data', window.g_ts_obj);
 });