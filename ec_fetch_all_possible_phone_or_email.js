var g_ts_config = {
  submitButtonCssSelector: '[type="submit"]',
  country_code: "55",
  emailRegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  phoneRegEx: /^\+[1-9]\d{10,14}$/
};
// Javascript variable for GTM or gTag:
window.enhanced_conversion_data = window.enhanced_conversion_data || {};
window.dataLayer = window.dataLayer || [];
window.g_ts_config.country_code = g_ts_config.country_code.replace(/\D/g, "");
window.windowHost = window.location.host.replace('www.', '');
window.g_ts_config.emails = []; window.g_ts_config.phones = [];

document.addEventListener('input', function(e){
  var el = e.target;
  var temEmail = el.value.trim();
  window.g_ts_config.emails = emails = []; window.g_ts_config.phones = phones = [];

  if (g_ts_config.emailRegEx.test(temEmail)) window.g_ts_config.emails.push(temEmail);

  var tempPhone = el.value.replace(/\D/g, '');
  tempPhone = tempPhone.startsWith(g_ts_config.country_code) ? `+${tempPhone}` : `+${g_ts_config.country_code}${tempPhone}`;
  if (g_ts_config.phoneRegEx.test(tempPhone)) window.g_ts_config.phones.push(tempPhone);

  if (window.g_ts_config.emails.length > 0) window.enhanced_conversion_data.email = emails.length > 1 ? [emails[0],emails[1]] : emails[0];
  if (window.g_ts_config.phones.length > 0) window.enhanced_conversion_data.phone_number = phones.length > 1 ? [phones[0],phones[1]] : phones[0];
})
document.addEventListener('click', function (e) {
  var el = e.target;
  /* Not the submit button */
  if (!el.matches(g_ts_config.submitButtonCssSelector) && !el.closest(g_ts_config.submitButtonCssSelector)) { return; }
  window.g_ts_config.fireUpdEvent();
});

window.g_ts_config.fireUpdEvent = function(){
  if (Object.keys(window.enhanced_conversion_data).length == 0)return;
  console.log(window.enhanced_conversion_data);
  if (typeof gtag != 'undefined') { gtag("set", "user_data", g_ts_obj); }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'event': 'upd_event' });
}

window.g_ts_config.extractEmailFromBody = function () {
  var email = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  return document.body.textContent.toLocaleLowerCase().match(email).filter(function (el) { return !el.includes(window.windowHost) });
}

window.g_ts_config.init = function(){
  window.enhanced_conversion_data = window.enhanced_conversion_data || {};
  if (window.enhanced_conversion_data.email) window.g_ts_config.fireUpdEvent();
  var emails = window.g_ts_config.extractEmailFromBody();
  if (emails.length > 0) window.enhanced_conversion_data.email = emails.length > 1 ? emails : emails[0];
  if (window.enhanced_conversion_data.email) window.g_ts_config.fireUpdEvent();
}
if (/complete|interactive|loaded/.test(document.readyState)) {
  window.g_ts_config.init();
} else {
  document.addEventListener('DOMContentLoaded', window.g_ts_config.init);
}