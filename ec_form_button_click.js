var g_ts_config = {
  submitButtonCssSelector: '[type="submit"]',
  emailCssSelector: "[type=email]",
  phoneCssSelector: "[type=tel]",
  country_code: "+55",
  emailRegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneRegEx: /^\+[1-9]\d{10,14}$/,
  isgtag: false,
};
// Javascript variable for GTM or gTag:
window.enhanced_conversion_data = window.enhanced_conversion_data || {};
window.dataLayer = window.dataLayer || [];

window.g_ts_config.submitClick = function (e) {
  var el = e.target;
  var emailDomElement = form.querySelector(g_ts_config.emailCssSelector);
  var phoneNumberDomElement = form.querySelector(g_ts_config.phoneCssSelector);
  var form = el.closest("form");
  if (!form) {console.log(`TS warning: No parent form found`);return;}
  if (!form.checkValidity()) {console.log(`TS warning: form validation failed`);return;}

  if (emailDomElement) {
    window.g_ts_config.saveToWindowVar( g_ts_config.emailRegEx, emailDomElement.value.trim(), 'email' )
  } else {
    console.log(`TS info: No Email Element found`);
  }

  if (phoneNumberDomElement) {
    var inputvalue = phoneNumberDomElement.value.replace(/\D/g, "");
    var country_code = g_ts_config.country_code.replace(/\D/g, "");
    var phone = inputvalue.startsWith(country_code) ? `+${inputvalue}` : `+${country_code}${inputvalue}`;
    window.g_ts_config.saveToWindowVar( g_ts_config.phoneRegEx, phone, 'phone_number' );
  } else {
    console.log(`TS info: No Phone Number Element found`);
  }

  if (!window.g_ts_config.isgtag) {
    console.log(`TS warning: "user_provided_data_event" on DataLayer, use the javascript variable "window.enhanced_conversion_data" that contains (Email:${window.enhanced_conversion_data.email}, Phone_number:${window.enhanced_conversion_data.phone_number})`);
    window.dataLayer.push({ event: "user_provided_data_event" });
    return;
  }
  gtag("set", "user_data", window.enhanced_conversion_data);
};

window.g_ts_config.addSubmitClickListener = function () {
  var btns = document.querySelectorAll(
    window.g_ts_config.submitButtonCssSelector
  );
  btns.forEach(function (el) {
    console.log(`TS info: Listener Added to "${el.textContent} submit button"`);
    el.addEventListener("click", window.g_ts_config.submitClick);
  });
  return btns.length > 0 ? true : false;
};

window.g_ts_config.timedTryAddSubmitClickListener = function (time) {
  console.log('TS info: Trying to add Button Click Listener');
  if (!window.g_ts_config.addSubmitClickListener())
    setTimeout(window.g_ts_config.timedTryAddSubmitClickListener, time);
};

window.g_ts_config.saveToWindowVar = function (regEx,value,variable) {
  if (!regEx.test(value)) {
    console.log(`TS warning: "${value}" is not a valid "${variable}"`);
    return;
  }
  window.enhanced_conversion_data[variable] = value;
  console.log(`TS info: "${value}" saved to window.enhanced_conversion_data."${variable}"`);
};

// start:
window.g_ts_config.timedTryAddSubmitClickListener(500);
