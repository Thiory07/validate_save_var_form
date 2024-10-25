var g_ts_config = {
    /* Configurations */
    CSSEmail :'[type=email],[name="email"]', 
    CSSPhoneNumber : '[type="tel"], [placeholder="Phone Number"]', 
    CSSCountryCode : '.teste',  // deixe vazio se não houver campo de DDI
    CSSSubmitButton: '[type="submit"]', 
    country_code: '+55', 
    /* Regular expressions */
    emailRegEx: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneRegEx: /^\+[1-9]\d{10,14}$/
};
window.g_ts_obj = window.g_ts_obj||{}; // objeto para armazenar dados do usuário
window.g_ECObj = window.g_ECObj||{}; // objeto para facilitar a curva de aprendizado.d

window.g_ts_config.init = function(){
    document.addEventListener('click', function(e){
        var el = e.target;
        if (!el.matches(g_ts_config.CSSSubmitButton)) return; /* Not the submit button */
        var form = el.closest('form');
        if (form && !form.checkValidity()) return; /* form exist but it is invalid */
        
        var DOMEmail = form.querySelector(window.g_ts_config.CSSEmail);
        if ( DOMEmail){
            window.g_ts_config.saveEmail( DOMEmail);
        }
        var DOMphone_number = form.querySelector(window.g_ts_config.CSSPhoneNumber);
    });
};
git ad
window.g_ts_config.saveEmail = function( DOMEmail ){
    DOMEmail
}