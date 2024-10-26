var g_ts_config = {
    /* Configurations */
    CSSEmail :'[type=email],[name="email"]', 
    CSSPhoneNumber : '[type="tel"], [placeholder="Phone Number"]', 
    CSSCountryCode : '.teste',  // deixe vazio se não houver campo de DDI
    CSSSubmitButton: '[type="submit"]', 
    country_code: '+55', 
    event_name: 'user_provided_data_event',
    
    /* Regular expressions */
    emailRegEx: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneRegEx: /^\+[1-9]\d{10,14}$/
};
window.g_ts_obj = window.g_ts_obj||{}; // objeto para armazenar dados do usuário

window.g_ts_config.init = function(){
    document.addEventListener('click', function(e){
        var el = e.target;
        if (!el.matches(g_ts_config.CSSSubmitButton)) return; /* Not the submit button */
        var form = el.closest('form');
        if (form && !form.checkValidity()) return; /* form exist but it is NOT HTML valid */
        
        var DOMEmail = form.querySelector(window.g_ts_config.CSSEmail);
        if ( DOMEmail)window.g_ts_config.saveEmail( DOMEmail);
        
        var DOMphone_number = form.querySelector(window.g_ts_config.CSSPhoneNumber);
        if ( DOMphone_number )window.g_ts_config.savePhoneNumber( DOMphone_number );

        if (!window.g_ts_obj.email && !window.g_ts_obj.phone_number) return; /* There is neither E-mail nor Phone number */
        window.g_ts_config.dispatchEvent();
    });
};

window.g_ts_config.saveEmail = function ( DOMEmail ){
    var input_value = DOMEmail.value;
    if (g_ts_config.emailRegEx.test(input_value) ) {
        console.log( 'TS alert: '+ input_value+' is a valid e-mail;' );
        window.g_ts_obj.email = window.g_ECObj.email = input_value;
        return;
    }
}
window.g_ts_config.savePhoneNumber = function ( DOMphone_number ){
    var tel = DOMphone_number.value;
    var DOMCountryCode;
    var country_code_value;
    if (g_ts_config.CSSCountryCode && g_ts_config.CSSCountryCode !='') {
        DOMCountryCode = document.querySelector(g_ts_config.CSSCountryCode);
        if(DOMCountryCode){
            country_code_value = DOMCountryCode.value || DOMCountryCode.textContent.trim();
        }else {
            country_code_value = g_ts_config.country_code;
        }
    }
    country_code_value = country_code_value || window.g_ts_config.country_code;
    var tel = '+' +  (country_code_value + '' + input_value).replace(/\D/g,'');
    if (! g_ts_config.phoneRegEx.test(tel)) { return; };
    console.log('TS alert: '+ tel+ ' is a valid phone Number;');
    window.g_ts_obj.phone_number = window.g_ECObj.phone_number = tel;
}
window.g_ts_config.dispatchEvent = function() {
    console.log('TS alert: '+window.g_ts_config.event_name+'  on DataLayer, use The Javacript variable: window.g_ts_obj \n(Email:'+ window.g_ts_obj.email+ ', Phone_number:'+window.g_ts_obj.phone_number+')');
    window.dataLayer.push({'event': 'user_provided_data_event'});
}