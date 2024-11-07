window.g_ts__config = window.g_ts__config || {};
window.g_ts__pii = window.g_ts__pii || {};

window.g_ts__config.client_domain = 'testes-do-tio.free.nf';
window.g_ts__config.user_provided_data_event = 'upd_event';
window.dataLayer = window.dataLayer||[];
window.g_ts__config.is_fired = false;
window.g_ts__app = {};
window.g_ts__app.extractEmails = function (text) {
  return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
}
window.g_ts__app.checkWindowLoaded = function() {
  return document.readyState === "complete" || document.readyState === "interactive";
}
window.g_ts__app.findEmailsStart = function(){
  var allText = '';
  allText = document.body.textContent;
  document.querySelectorAll('input').forEach ( function (input,i){
    allText += input.value+" "; 
  });
  emails =[];
  emails = window.g_ts__app.extractEmails(allText);
  emails = emails.filter(function (email){ return !email.includes( window.g_ts__config.client_domain); });
  window.g_ts__pii.email = emails[0];
  console.log(window.g_ts__pii.email);
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(window.g_ts__pii.email) ){
    window.g_ts__config.is_fired = true;
    window.dataLayer.push({ event:window.g_ts__config.user_provided_data_event});
    setTimeout(function (){ window.g_ts__config.is_fired = false; }, 1000);
  }
};
window.g_ts__app.dispatchEvent = function(){
  if (window.g_ts__config.is_fired) return;
  window.g_ts__app.findEmailsStart();
}
document.addEventListener('click',window.g_ts__app.dispatchEvent );
document.addEventListener('submit',window.g_ts__app.dispatchEvent );

if (window.g_ts__app.checkWindowLoaded() ){
  window.g_ts__app.dispatchEvent ();
}else{
  window.document('DOMContentLoaded', window.g_ts__app.dispatchEvent);
}