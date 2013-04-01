/**
 *  SP@in (SP64in) = Pain 4 SPAM website component for CAPTCHA-protecting
 *  email addresses from email address harvesting web crawlers.
 *
 *  http://maratbn.com/projects/sp64in
 *
 *  Version: 0.2
 *
 *  Copyright (c) 2011-2013 Marat Nepomnyashy  http://maratbn.com  maratbn@gmail
 *
 *  This module also includes the following embedded 3-rd party code:
 *
 *      jquery.cookie.js
 *      https://github.com/carhartl/jquery-cookie
 *      Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 *      Used under MIT license
 *
 *  Module:         sp@in-v0.2-min.js
 *
 *  Description:    Compressed / minified version of 'sp@in.js'.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *      * Redistributions of source code must retain the above copyright
 *        notice, this list of conditions and the following disclaimer.
 *      * Redistributions in binary form must reproduce the above copyright
 *        notice, this list of conditions and the following disclaimer in the
 *        documentation and/or other materials provided with the distribution.
 *      * Neither the name of the <organization> nor the
 *        names of its contributors may be used to endorse or promote products
 *        derived from this software without specific prior written permission.
 * 
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS 
 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 *  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 *  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 *  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 *  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


jQuery(document).ready(function(j){var e=function(v,w,s){if(arguments.length>1&&String(w)!=="[object Object]"){s=jQuery.extend({},s);if(w===null||w===undefined){s.expires=-1}if(typeof s.expires==="number"){var y=s.expires,u=s.expires=new Date();u.setDate(u.getDate()+y)}w=String(w);return(document.cookie=[encodeURIComponent(v),"=",s.raw?w:encodeURIComponent(w),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join(""))}s=w||{};var r,x=s.raw?function(t){return t}:decodeURIComponent;return(r=new RegExp("(?:^|; )"+encodeURIComponent(v)+"=([^;]*)").exec(document.cookie))?x(r[1]):null};function h(u,t,r){var s={style:{classes:"ui-tooltip-shadow"},content:t,position:{at:"bottom middle",my:"top middle",target:u,viewport:j(window)},show:{effect:function(){j(this).slideDown(200)},event:""},hide:{effect:function(){j(this).slideUp(200)},event:""}};j.extend(true,s,r);return j("<span />").qtip(s).qtip("api")}function d(r){var u=e("sp@in_recall");if(!u){return""}var s=new RegExp("\\["+r+":([^\\[:\\[]+)\\]");var t=s.exec(u);if(!t||t.length!=2){return""}return t[1]}function n(t,v){var r="["+t+":"+v+"]";var u=e("sp@in_recall")||"";var s=new RegExp("\\["+t+":([^\\[:\\[]+)\\]");if(s.test(u)){u=u.replace(s,r)}else{u+=r}e("sp@in_recall",u)}function c(u){var t=0;if(!u){return t}for(var r=0;r<u.length;r++){var s=u.charCodeAt(r);t=((t<<5)-t)+s;t=t&t}return t<0?-t:t}var f={};function b(s,r){if(!s){return}if(!f[s]){f[s]={hash:c(s),map_keys:{},arr_keys:[]}}if(!r){return}if(!f[s].map_keys[r]){f[s].map_keys=true;f[s].arr_keys.push(r)}}var k=j("<span />");var a=true;var m=false;var o=null;function i(r){j.ajax({url:r.path+"/validator.php",type:"POST",data:j.extend({keys:f[r.path].arr_keys.join(" ")},r.request),dataType:"json",complete:function(){if(r.complete){r.complete()}},error:function(){if(r.error){r.error()}},success:function(s){o=s&&s.email||null;m=s&&s.is_req_validated;n(f[r.path].hash,s&&s.recall_id||"");if(r.success){r.success(s)}k.trigger("sp@in_update")}})}function p(){for(strPath in f){var r=d(f[strPath].hash);if(!r){continue}i({path:strPath,request:{recall:r}})}}function l(A,w){function t(N){var L=j(["<div style='","color:#333333;","background-color:#ffffff;","border:1px solid #F1D031;","padding:0.3em;","font-family:arial sans-serif;","font-size:10px;","'/>"].join(""));if(j.browser.msie&&j.browser.version<=6){L.css("position","relative");L.css("width","252px")}var J=j(["<div style='","position:relative;width:250px;height:70px'>","<div style='","position:absolute;","top:-10px;","width:250px;","text-align:center;","font-weight:bold;","'>","<a href='http://maratbn.com/projects/sp64in'"," target='_new'>SP@in</a>","</div>","</div>"].join(""));var P="sp@in_input_"+(new Date()).getTime();var H=j(["<input type='text' style='","float:left;","font-size:2.1em;","letter-spacing:0.1em;","text-align:center;","border:none;","border-bottom:2px dashed #555555;","padding-bottom:0.2em;","width:5em;","'>"].join(""));H.attr("id",P);var O=j(["<button style='","float:right;margin-top:0.5em'>","Reveal Email</button>"].join(""));var Q=j(["<label style='","display:block;","text-align:center;","margin-top:0.4em","'>","Enter letters above:","</label>"].join(""));Q.attr("for",P);L.append(J).append(j(["<div style='margin:0 1.2em;'>","</div>"].join("")).append(Q).append(H).append(O)).append(j("<div style='clear:both' />"));var K=0;function G(){J.css("background-image","url('"+N+"/php-captcha/captcha_img.php?"+(new Date()).getTime()+"_"+K+"')")}function I(){G();H.val("")}function M(){Q.text("Validating...  Please wait...");H.attr("readonly",true);O.css("display","none");O.attr("disabled",true);i({path:N,request:{validate:H.val()},complete:function(){H.attr("readonly",false);O.attr("disabled",false);O.css("display","");I()},error:function(){Q.text("Encountered error making XHR request to server.")},success:function(R){if(R&&R.is_valid){Q.text("Validated successfully.")}else{Q.text("Incorrect letters entered.  Please try again.");K++}}})}L.bind("keydown",function(R){switch(R&&R.which){case 13:M();break;case 27:k.trigger("sp@in_cancel");break}});O.click(function(){M()});I();return{parent:L,input:H}}function v(){if(!o){return""}if(w){return o.keyed&&o.keyed[w]||""}else{return o.def||""}}function F(){if(!m){return}var G=v();if(G){A.attr("href","mailto:"+G).text(G)}else{A.text("Unable to determine email.")}}var y=A.attr("data-sp64in-path")||"/components/sp@in/";if(A.attr("data-sp64in-nogd")){a=false}b(y,w);var C=t(y);F();var z=j.browser.msie&&j.browser.version<7;var D=null;if(z){D="MS IE version < 7 not supported.  Please use a more modern web browser."}else{if(!a){D="PHP GD needed for CAPTCHA generation not available.  PHP GD module needs to be properly installed and configured on the web server."}else{D="Click to reveal email address..."}}var E=h(A,j(["<div>",D,"</div>"].join("")),{show:{effect:true},hide:{effect:true}});var x=j("<div />");var s=h(A,x,{events:{show:function(){setTimeout(function(){C.input.focus()},0)}}});var B=false;j(document.body).bind("click",function(H){if(!B){return}var G=s.elements.tooltip;if(!G){return}if(!H.target){return}if(j(H.target).parents().filter(G).length>0){return}k.trigger("sp@in_cancel")});function r(){s.hide();B=false}function u(){x.append(C.parent);s.show();B=true}A.bind("mouseover",function(){if(v()){return}if(!B){E.show()}});A.bind("mouseout",function(){if(v()){return}if(!B){E.hide()}});A.bind("click",function(){if(v()){return true}if(z||!a){E.show();return false}if(B){r();E.show()}else{u();E.hide();k.trigger("sp@in_opened",[s])}return false});k.bind("sp@in_cancel",function(G){r()});k.bind("sp@in_opened",function(H,G){if(!B||G===s){return}r()});k.bind("sp@in_update",function(G){if(!v()){return}F();r()});if(a){if(!A.text()){A.text("Send Email")}}else{A.text("SP@in disabled")}A.css("visibility","")}function g(w){var t=w.attr("href");var u=t&&t.match(/^\s*mailto:\s*((\S*)_)?sp@in$/i);var s=u&&u.length>=1&&u[0];var v=w.attr("data-sp64in");if(!v){v=w.attr("data-spain")}if(!s&&v===undefined){return}var x=u&&u.length==3&&u[2];var r=v&&v.toLowerCase();if(v&&r!="true"&&r!="nogd"){x=v}l(w,x)}function q(t){var s=j("<a href='#' data-sp64in='"+t.attr("data-sp64in")+"'></a>");var r=t.attr("data-sp64in-nogd");if(r){s.attr("data-sp64in-nogd",r)}var u=t.attr("data-sp64in-path");if(u){s.attr("data-sp64in-path",u)}g(s);t.append(s)}j("a").each(function(){g(j(this))});j("span[data-sp64in]").each(function(){q(j(this))});j("span[data-spain]").each(function(){q(j(this))});p();((j.browser.msie&&j.browser.version<=7)?(j("img").filter(function(){var r=j(this).attr("src");return r&&r.match(/\/graphics\/sp@in-loading-1.gif$/)})):j('img[src$="/graphics/sp@in-loading-1.gif"]')).css("display","none")});
