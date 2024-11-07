window.g_ts__config = window.g_ts__config || {};
window.g_ts__pii = window.g_ts__pii || {};

window.g_ts__config.client_domain = 'testes-do-tio.free.nf';
window.g_ts__config.user_provided_data_event = 'upd_event';

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
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(window.g_ts__pii.email)){
    window.dataLayer.push({ event:window.g_ts__config.user_provided_data_event});
  }
};

document.addEventListener('click',function(){
  window.g_ts__app.findEmailsStart();
});
document.addEventListener('submit',function(){
  window.g_ts__app.findEmailsStart();
});

if (window.g_ts__app.checkWindowLoaded() ){
  window.g_ts__app.findEmailsStart();
}else{
  window.document('DOMContentLoaded', function(){
    window.g_ts__app.findEmailsStart();
  });
}