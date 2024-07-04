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

  document.addEventListener('click', function (e) {
    var el = e.target;
    /* if not the submit button, stop the function */
    if (!el.matches(g_ts_config.submitButtonCssSelector) && !el.closest(g_ts_config.submitButtonCssSelector)) { return; }
  
  });