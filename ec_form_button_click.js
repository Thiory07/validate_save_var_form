var g_ts_config = {
    emailCssSelector :'[type=email]',
    phoneCssSelector : '[type=tel]',
    country_code: '+57',
    submitButtonCssSelector: '[type="submit"]',
    emailRegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phoneRegEx: /^\+[1-9]\d{6,14}$/
   };
   window.g_ts_obj = window.g_ts_obj||{};
   
   document.addEventListener('click',  function(e){
    var element = e.target;
    
    /* not the submit button */
    if(!element.matches(g_ts_config.submitButtonCssSelector) && ! element.closest(g_ts_config.submitButtonCssSelector)) {return;}

    var form = element.closest('form');
    if (!form){ console.log(`TS warning: No parent form found`); }

    var emailDomElement = form.querySelector(g_ts_config.emailCssSelector);
    if (emailDomElement){
        var email = emailDomElement.value.trim();
        if(g_ts_config.emailRegEx.test(email)){
            console.log(`TS info: The email saved to Javascript Variable is (${email});`);
            window.g_ts_obj.email = email;
        }
    }
    var phoneNumberDomElement = form.querySelector(g_ts_config.phoneCssSelector);
    if (phoneNumberDomElement){
        var phone_number = phoneNumberDomElement.value.replace(/\D/g,'');
        var country_code = g_ts_config.country_code.replace(/\D/g,'');
        if (!phone_number.startsWith(country_code)){phone_number = country_code+phone_number}
        phone_number = `+${phone_number}`;
        if (! g_ts_config.phoneRegEx.test(phone_number)){ 
            console.log(`TS alert: the phone (${phone_number}) is not valid`);
            return;
        }
        window.g_ts_obj.phone_number = phone_number;
    }
    if(!window.g_ts_obj.phone_number && !window.g_ts_obj.email){
        console.log(`TS alert: the phone_number (${window.g_ts_obj.phone_number}) and the email (${window.g_ts_obj.email})`);
        return; /* No Email and no  Phone number on the form*/ 
    }
    console.log(`TS alert: user-provided_data_event no DataLayer, use a variável Javacript: window.g_ts_obj (Email:${window.g_ts_obj.email}, Phone_number:${window.g_ts_obj.phone_number})`);
    window.dataLayer.push({'event': 'user_provided_data_event'});
   });