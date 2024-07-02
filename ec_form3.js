var g_ts_config = {
  CSSEmail :'[type="email"]',
  CSSPhoneNumber : '[type="tel"]',
  country_code: '+57',
  CSSSubmitButton: '[type="submit"]'
 }
 g_ts_obj= g_ts_obj||{};

function fetch_ts_obj(){
 document.querySelectorAll(`${g_ts_config.CSSEmail} , ${g_ts_config.CSSPhoneNumber}`).forEach(function(el,i){
  var input = el,
  text = input.value?input.value:input.textContent.trim();
   
  if (input.matches(g_ts_config.CSSEmail)) {
   if (! /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(text) ){
    console.log('TS: É um e-mail inválido inputs' );
    return;
   }
   console.log('TS: É um e-mail válido inputs' );
   g_ts_obj.email = text
  }
 
  if (input.matches(g_ts_config.CSSPhoneNumber))  {
   var tel = `+${(g_ts_config.country_code + text).replace(/\D/g,'')}`;
   if (! /^\+[1-9]\d{1,14}$/.test(tel)){
    console.log('TS: É um telefone inválido' ); 
    return;
   }
   console.log('TS: É um telefone válido' );
   g_ts_obj.phone_number = tel;
  }  
 });
}

document.addEventListener('click', function(e){
  timed_fetch();
});