var g_EC = {
    "email" : "[type='email']",
    "phone_number" : "[type='tel']"
  };
  window.g_setupEC = {};
  window.g_ECObj = {};
  var g_countryCode = '55';
  document.addEventListener('input', g_setup_ECObj);
  function g_setup_ECObj(e) {
    var input = e.target;
    for(i in g_EC) {
      if(input.matches(g_EC[i])) g_setupEC['g_' + i] = input.value;
    }
    g_save_toECObj();
  }
  function g_save_toECObj() {
    for(i in g_EC) {
      if(g_setupEC['g_' + i] && i === 'email' && g_validateMail(g_setupEC['g_' + i])) window.g_ECObj[i] = g_setupEC['g_' + i];
      if(g_setupEC['g_' + i] && i === 'phone_number') {
        var cleanedPhone = g_validatePhone(g_setupEC['g_' + i]);
        var finalPhone = cleanedPhone.includes('+') ? cleanedPhone : cleanedPhone.startsWith(g_countryCode) ? 'g_' + cleanedPhone : '+' + g_countryCode + cleanedPhone;
        finalPhone.length >= 11 && finalPhone.length <= 15 ? (window.g_ECObj[i] = finalPhone) : delete window.g_ECObj[i];
      }
    }
  }
  function g_validateMail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function g_validatePhone(tel) {
    return tel.replace(/\D/g, '');
  }
  g_save_toECObj();