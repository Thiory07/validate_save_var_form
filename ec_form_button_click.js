var g_ts_config = {
  submitButtonCssSelector: '[type="submit"]',
  emailCssSelector :'[type=email]',
  phoneCssSelector : '[type=tel]',
  country_code: '+57',
  emailRegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneRegEx: /^\+[1-9]\d{6,14}$/
};
// Javascript variable for GTM or gTag:
window.g_ts_obj = window.g_ts_obj||{};

document.addEventListener('click',  function(e){
var el = e.target;

/* if not the submit button, stop the function */
if(!el.matches(g_ts_config.submitButtonCssSelector) && ! el.closest(g_ts_config.submitButtonCssSelector)) {return;}

var form = el.closest('form');
if (!form){ console.log(`TS warning: No parent form found`); return;}

var emailDomElement = form.querySelector(g_ts_config.emailCssSelector);
if (emailDomElement && g_ts_config.emailRegEx.test(emailDomElement.value)){
  g_ts_obj = emailDomElement.value;
}else{ console.log(`TS info: No Email Element found`);}

var phoneNumberDomElement = form.querySelector(g_ts_config.phoneCssSelector);
if (phoneNumberDomElement){
  var inputvalue = phoneNumberDomElement.replace(/\D/g,'');
  var country_code = g_ts_config.replace(/\D/g,'');
  var phone = inputvalue.startsWith(country_code) ? `+${inputvalue}`:`+${country_code}${inputvalue}` ;
  if (g_ts_config.phoneRegEx.test(phone)){
    window.g_ts_obj.phone_number = phone;
  }else{ console.log(`TS info: Invalid Phone number "${phone}"`);}
}else{ console.log(`TS info: No Phone Number Element found`);}

console.log(`TS warning: "user_provided_data_event" on DataLayer, use he javascript variable "window.g_ts_obj" that contains (Email:${window.g_ts_obj.email}, Phone_number:${window.g_ts_obj.phone_number})`);
window.dataLayer.push({'event': 'user_provided_data_event'});
});