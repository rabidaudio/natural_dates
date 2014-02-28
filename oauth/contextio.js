// oauth functionality is based on this:
//https://gist.github.com/andyedinborough/1012960

(function ($) {
    var module={};
    module.HOST = "https://api.context.io/2.0";
    var callback_url = "http://localhost/#logged_in";
    
    module.build_oauth_url = function(data){
        console.log("building...");
        OAuth.setTimestampAndNonce(data);
        if(data.consumerKey)    data.parameters.oauth_consumer_key = data.consumerKey;
        if(data.tokenKey)       data.parameters.oauth_token = data.tokenKey;
        OAuth.SignatureMethod.sign(data, { consumerSecret: data.consumerSecret, tokenSecret: (data.tokenSecret || '') });
        
        var parameterMap = OAuth.getParameterMap(data);
        var baseStr = OAuth.decodeForm(OAuth.SignatureMethod.getBaseString(data));
        console.log(parameterMap);
        console.log(baseStr);
        return baseStr[2][0]+"&"+"oauth_signature="+encodeURIComponent(data.parameters.oauth_signature);
    };

    module.request = function(path, method, user, my_data, include_token, callback, debug){
        var cb = (typeof callback == 'function') ? callback : new Function(callback);
        var result;
        
        var data={
            type: method,
            url: module.HOST+path,
            consumerKey: user.consumer_key,
            consumerSecret: user.consumer_secret
        };
        if(include_token){
            data.tokenKey = user.access_token;
            data.tokenSecret = user.access_token_secret;
        }
        data.method = data.type;
        data.action = data.url;
        data.url = data.url +"?"+ module.build_oauth_url(data);
        console.log( data.url );
        console.log( 'http://jsonp.jit.su/?callback=?&url='+encodeURIComponent(data.url) );
        console.log(data.method);
        if(debug){ console.log("DEBUG enabled. skipping"); return; }//DEBUG TODO
        $.ajax({
            //TODO until context.io enables jsonp support, we use this TOTAL hack:
            //http://jsonp.jit.su/
            url: 'http://jsonp.jit.su/?callback=?&url='+encodeURIComponent(data.url),
            data: my_data,
            dataType: 'jsonp',
            type: data.method
        })
        .done(function(data){
            result = data;
        })
        .fail(function(xhr, textstatus, errorThrown){
            console.log("account request failed");
            throw errorThrown;
        })
        .always(function(){
                console.log("DEBUG - request result:");
                console.log(result);
                setTimeout(cb, 0, result[0]);
        })
    };
    
    //These are handy wrappers for request()
    module.get_account = function(user, callback){
        module.request("/accounts", "GET", user, {email: user.email}, false, callback, false);
    };
    module.get_connect_token = function(user, callback){//TODO not working, probably becuase we can't POST through the proxy
        module.request("/connect_tokens", "POST", user, {
            callback_url: callback_url,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            source_sync_flags: 1
        }, false, callback, true);
    };
    //module.get_messages = function(user, 
    
    $.ContextIO = module;
}(jQuery));
