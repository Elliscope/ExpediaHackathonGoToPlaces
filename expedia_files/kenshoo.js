/*! kenshoo 0.0.1 2017-10-17 */

var Kenshoo_Helpers=function(){var a=function(a){var b=new XMLHttpRequest;return"withCredentials"in b?b.open("GET",a,!0):"undefined"!=typeof XDomainRequest?(b=new XDomainRequest,b.open("GET",a)):b=null,b},b=function(a){return c("k_user_id",a)},c=function(a,b){if(b||(b=d()),a){var c=new Date;c.setTime(c.getTime()+31536e6);var e="; expires="+c.toGMTString();return document.cookie=a+"="+b+e+"; path=/",b}},d=function(){return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()},e=function(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)};return{loadPixel:function(a,b){var c=document.location.protocol;0!==c.indexOf("http")&&(c="https:");var d=new Image(1,1);return d.onload=b,d.src=c+"//"+a,d},getParameter:function(a,b){b||(b=window.location.href);var c=b.indexOf("?");if(-1==c)return null;for(var d=b.substring(c+1).split("&"),e=0;e<d.length;e++){var f=d[e].split("=");if(f[0]===a)return f[1]}return null},generateUUID:function(){return d()},getCookie:function(c){var d=this.getParameter("k_user_id");if(d)return c(d);var e=this.getDomainCookie();if(e)return c(e);var f=a("https://services.xg4ken.com/kid");f&&(f.onload=function(){if(200==f.status){var a=f.responseText;b(a),c(a)}else 404==f.status&&(b(),c(null))},f.onerror=function(){b(),c(null)},f.send())},getDomainCookie:function(a){a||(a="k_user_id");for(var b=a+"=",c=document.cookie.split(";"),d=0;d<c.length;d++){for(var e=c[d];" "==e.charAt(0);)e=e.substring(1,e.length);if(0===e.indexOf(b))return e.substring(b.length,e.length)}return null},createDomainCookie:function(a,b,c){if(a){b||(b=d()),c||(c=31536e6);var e=new Date;e.setTime(e.getTime()+c);var f="; expires="+e.toGMTString();return document.cookie=a+"="+b+f+"; path=/",b}},createRandomDomainCookie:function(a,b){return this.createDomainCookie(a,"",b)},paramsToString:function(a,b,c){var d=c||"",e="";if(null!==a){for(var f in a)""!==e&&(e+="&"),e+=d+f+"="+a[f];""!==e&&(e=b+e)}return e},isEmptyString:function(a){return void 0===a||null===a||(Kenshoo_Helpers.isString(a)?""===Kenshoo_Helpers.trim(a):!Kenshoo_Helpers.isNumber(a))},isNumber:function(a){return"number"==typeof a},isString:function(a){return"string"==typeof a},trim:function(a){return a.replace(/^\s+|\s+$/g,"")},findGroupForCookie:function(a,b){b||(b="");var d=this.getDomainCookie("k_rlsa");d||(d=c("k_rlsa")),d+="_"+b;for(var e=0,f=0;f<d.length;f++)e+=d.charCodeAt(f);e=Math.abs(e),a||(a=[1,1]);var g=0;for(f=0;f<a.length;f++)g+=1*a[f];var h=e%g,i=0;for(f=0;f<a.length;f++)if(i+=a[f],h<i){var j=String.fromCharCode(97+f);return j}return null},getDomain:function(){return window.location.host},getRandomNumber:function(a,b){return Math.floor(Math.random()*(b+1)+a)},makeCORSRequest:function(a,b){var c=new XMLHttpRequest;"withCredentials"in c?(c.open("GET",a,!0),c.withCredentials=!0):"undefined"!=typeof XDomainRequest?(c=new XDomainRequest,c.open("GET",a)):c=null,c&&(c.onload=function(){200==c.status?b(c.responseText):404==c.status&&b(null)},c.onerror=function(){b(null)},c.send())}}}(),kenshoo=function(){var a=Kenshoo_Helpers,b=function(b,c){var d=b+".xg4ken.com/media/redir.php";d+=a.paramsToString(c,"?"),a.loadPixel(d)},c=function(b,c,d){var e=b+".xg4ken.com/pixel/v1?track=1&token="+c;e+=a.paramsToString(d,"&"),a.loadPixel(e)},d=function(b,c){var d="googleads.g.doubleclick.net/pagead/viewthroughconversion/"+b+"/?value=0&guid=ON&script=0";d+=a.paramsToString(c,"&","data."),d+="&random="+(new Date).getTime(),a.loadPixel(d)},e=function(a,b,c,d){var e=a[b];f(e,c,d)},f=function(b,c,d){if(b){var e="www.facebook.com/tr/?ev="+b;c&&(e+="&cd[value]="+c),d&&(e+="&cd[currency]="+d),e+="&noscript=1",a.loadPixel(e)}},g=function(){a.getCookie(function(c){var d=a.getParameter("ken_ks"),e=a.getParameter("ken_prf"),f=a.getParameter("ken_cid");c&&d&&e&&f&&b(d,{k_user_id:c,prof:e,affcode:f,url:"http://"+d+".xg4ken.com"})})};return{trackConversion:function(a,b,d){c(a,b,d)},trackClick:function(){g()},trackRLSA:function(a,b){d(a,b)},trackRLSAExperiment:function(b,c,e){var f=a.findGroupForCookie(e,c);b&&c&&null!==f&&d(b,{kenshoo_experiment:c,kenshoo_group:f})},trackOCPM:function(a,b,c){f(a,b,c)},trackOCPMWithConversionTypeMapping:function(a,b,c,d){e(a,b,c,d)},match:function(a){Uds_Pixel.matchAndSync(a)}}}(),Uds_Pixel=function(){var a=Kenshoo_Helpers,b="https://services.xg4ken.com/kid?client_domain=".concat(a.getDomain()),c=function(c){(User_Match.shouldPerformMatch(c)||User_Sync.shouldPerformSync())&&a.makeCORSRequest(b,function(a){User_Match.match(c,a),User_Sync.sync(a)})};return{matchAndSync:function(a){c(a)}}}(),MATCH_COOKIE_NAME="kenshoo_id_match",User_Match=function(){var a=Kenshoo_Helpers,b=function(a,b,c){return"services.xg4ken.com/services/uds/match?source="+a+"&ken_id="+b+"&partner_uid="+c+"&hmac="};return{match:function(c,d){if(this.shouldPerformMatch(c)&&!a.isEmptyString(d)){var e=b(a.getDomain(),d,c);a.loadPixel(e,function(){a.createRandomDomainCookie(MATCH_COOKIE_NAME,6048e5)})}},shouldPerformMatch:function(b){return a.isEmptyString(a.getDomainCookie(MATCH_COOKIE_NAME))&&!a.isEmptyString(b)}}}(),RAND_URL_PARAM="&_rand=",User_Sync=function(){var a=Kenshoo_Helpers,b={prefix:"cw.addthis.com/t.gif?pid=50&pdid=",syncCookieName:"kenshoo_crosswise_id_sync",cookieExpiry:864e5},c=[b],d=function(a,b,c){return a+b+RAND_URL_PARAM+c},e=function(b){return a.isEmptyString(a.getDomainCookie(b))},f=function(b,c){if(e(b.syncCookieName)){var f=a.getRandomNumber(1,1e4),g=d(b.prefix,c,f);a.loadPixel(g,function(){a.createRandomDomainCookie(b.syncCookieName,b.cookieExpiry)})}};return{sync:function(a){for(var b=0;b<c.length;b++)f(c[b],a)},shouldPerformSync:function(){for(var a=0;a<c.length;a++)if(e(c[a].syncCookieName))return!0;return!1}}}();
//# sourceMappingURL=kenshoo.js.map