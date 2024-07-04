var g_ts_config = {
  submitButtonCssSelector: '[type="submit"]',
  emailCssSelector: '[type=email]',
  phoneCssSelector: '[type=tel]',
  country_code: '+55',
  emailRegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneRegEx: /^\+[1-9]\d{10,14}$/,
  isgtag: false
};
// Javascript variable for GTM or gTag:
window.enhanced_conversion_data = window.enhanced_conversion_data || {};

window.g_ts_config.saveToWindowVar = function (regEx,value,variable) {
  if (!regEx.test(value)) {console.log(`TS warning: "${value}" is not a valid "${variable}"`);return;  }
  window.enhanced_conversion_data[variable] = value;
  console.log(`TS info: "${value}" saved to window.enhanced_conversion_data."${variable}"`);
};

document.addEventListener('click', function (e) {
  var el = e.target;
  /* if not the submit button, stop the function */
  if (!el.matches(g_ts_config.submitButtonCssSelector) && !el.closest(g_ts_config.submitButtonCssSelector)) { return; }

  var emailDomElement = form.querySelector(g_ts_config.emailCssSelector);
  var phoneNumberDomElement = form.querySelector(g_ts_config.phoneCssSelector);
  var form = el.closest('form');
  if (!form) { console.log(`TS warning: No parent form found`); return; }
  
  if (emailDomElement){
    window.g_ts_config.saveToWindowVar(g_ts_config.emailRegEx,emailDomElement.value.trim(),'email');
  } else { console.log(`TS info: No Email Element found`); }

  if (phoneNumberDomElement) {
    var inputvalue = phoneNumberDomElement.replace(/\D/g, '');
    var country_code = g_ts_config.replace(/\D/g, '');
    var phone = inputvalue.startsWith(country_code) ? `+${inputvalue}` : `+${country_code}${inputvalue}`;
    window.g_ts_config.saveToWindowVar(g_ts_config.phoneRegEx,phone,'phone_number');
  } else { console.log(`TS info: No Phone Number Element found`); }

  window.dataLayer = window.dataLayer || [];
  if (!window.g_ts_config.isgtag) {
    console.log(`TS warning: "user_provided_data_event" on DataLayer, use he javascript variable "window.enhanced_conversion_data" that contains (Email:${window.enhanced_conversion_data.email}, Phone_number:${window.enhanced_conversion_data.phone_number})`);
    window.dataLayer.push({ 'event': 'user_provided_data_event' });
    return;
  }
  gtag('set', 'user_data', window.enhanced_conversion_data);
});

