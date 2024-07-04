var g_ts_config = {
    submitButtonCssSelector: '[type="submit"]',
    country_code: "+55",
    emailRegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneRegEx: /^\+[1-9]\d{10,14}$/,
    isgtag: false,
  };
  // Javascript variable for GTM or gTag:
  window.enhanced_conversion_data = window.enhanced_conversion_data || {};
  window.dataLayer = window.dataLayer || [];

  document.addEventListener('click', function (e) {
    var el = e.target;
    /* if not the submit button, stop the function */
    if (!el.matches(g_ts_config.submitButtonCssSelector) && !el.closest(g_ts_config.submitButtonCssSelector)) { return; }
  
    var allInputs = document.querySelectorAll('input');
    var emails = [];
    var phones = [];

    allInputs.forEach(function (el){
      var temEmail = el.value.trim();
      if (g_ts_config.emailRegEx.test(temEmail) ){
        emails.push(el.value.trim());        
      }
      var tempPhone = el.value.replace(/\D/g,'');
      tempPhone = tempPhone.startsWith(g_ts_config.country_code) ? `+${tempPhone}` : `+${g_ts_config.country_code}${tempPhone}`;
      if(g_ts_config.phoneRegEx.test(tempPhone)){
        phones.push(tempPhone);
      }
    });
    if (emails.length > 0){
      window.enhanced_conversion_data.email = emails.length > 1 ? emails : emails[0];
    }
    if( phones.length > 0) {
      window.enhanced_conversion_data.phone_number = phones.length > 1 ? phones : phones[0];
    }

  });

  window.g_ts_config.extractEmailFromBody = function(){
    var str =  document.body.textContent.toLocaleLowerCase();
    var email = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    var host = window.location.host.replace('www.','');
    var tempEmails = str.match(email);
    return tempEmails.filter(function (el) { return !el.includes(host)});
  }