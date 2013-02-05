/**
 *  SP@in (SP64in) = Pain 4 SPAM website component for CAPTCHA-protecting
 *  email addresses from email address harvesting web crawlers.
 *
 *  http://maratbn.com/projects/sp64in
 *
 *  Version: 0.1.7
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
 *  Module:         sp@in-v0.1.7-min.js
 *
 *  Description:    JavaScript logic that activates anchor tags / links with
 *                  HTML attributes 'data-sp64in' and 'href' with values
 *                  'mailto:<key>sp@in' to become CAPTCHA-protected email
 *                  links.
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
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
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


jQuery(document).ready(function(i){khartl_cookie=function(v,w,s){if(arguments.length>1&&String(w)!=="[object Object]"){s=jQuery.extend({},s);if(w===null||w===undefined){s.expires=-1}if(typeof s.expires==="number"){var y=s.expires,u=s.expires=new Date();u.setDate(u.getDate()+y)}w=String(w);return(document.cookie=[encodeURIComponent(v),"=",s.raw?w:encodeURIComponent(w),s.expires?"; expires="+s.expires.toUTCString():"",s.path?"; path="+s.path:"",s.domain?"; domain="+s.domain:"",s.secure?"; secure":""].join(""))}s=w||{};var r,x=s.raw?function(t){return t}:decodeURIComponent;return(r=new RegExp("(?:^|; )"+encodeURIComponent(v)+"=([^;]*)").exec(document.cookie))?x(r[1]):null};function g(u,t,r){var s={style:{classes:"ui-tooltip-shadow"},content:t,position:{at:"bottom middle",my:"top middle",target:u,viewport:i(window)},show:{effect:function(){i(this).slideDown(200)},event:""},hide:{effect:function(){i(this).slideUp(200)},event:""}};i.extend(true,s,r);return i("<span />").qtip(s).qtip("api")}function d(){return khartl_cookie("sp@in_recall")}var e={};var n=[];function b(r){if(!r){return}if(!e[r]){e[r]=true;n.push(r)}}var j=i("<span />");var a=true;var m=false;var o=null;function h(r){i.ajax({url:"/components/sp@in/./validator.php",type:"POST",data:i.extend({keys:n.join(" ")},r.request),dataType:"json",complete:function(){if(r.complete){r.complete()}},error:function(){if(r.error){r.error()}},success:function(s){o=s&&s.email||null;m=s&&s.is_req_validated;khartl_cookie("sp@in_recall",s&&s.recall_id||"");if(r.success){r.success(s)}j.trigger("sp@in_update")}})}function p(){var r=khartl_cookie("sp@in_recall");if(!r){return}h({request:{recall:r}})}var l=(function c(){var w=i(["<div style='","color:#333333;","background-color:#ffffff;","border:1px solid #F1D031;","padding:0.3em;","font-family:arial sans-serif;","font-size:10px;","'/>"].join(""));if(i.browser.msie&&i.browser.version<=6){w.css("position","relative");w.css("width","252px")}var u=i(["<div style='","position:relative;width:250px;height:70px'>","<div style='","position:absolute;","top:-10px;","width:250px;","text-align:center;","font-weight:bold;","'>","<a href='http://maratbn.com/projects/sp64in'"," target='_new'>SP@in</a>","</div>","</div>"].join(""));var z="sp@in_input_"+(new Date()).getTime();var s=i(["<input type='text' style='","float:left;","font-size:2.1em;","letter-spacing:0.1em;","text-align:center;","border:none;","border-bottom:2px dashed #555555;","padding-bottom:0.2em;","width:5em;","'>"].join(""));s.attr("id",z);var y=i(["<button style='","float:right;margin-top:0.5em'>","Reveal Email</button>"].join(""));var A=i(["<label style='","display:block;","text-align:center;","margin-top:0.4em","'>","Enter letters above:","</label>"].join(""));A.attr("for",z);w.append(u).append(i(["<div style='margin:0 1.2em;'>","</div>"].join("")).append(A).append(s).append(y)).append(i("<div style='clear:both' />"));var v=0;function r(){u.css("background-image","url('/components/sp@in/./php-captcha/captcha_img.php?"+(new Date()).getTime()+"_"+v+"')")}function t(){r();s.val("")}function x(){A.text("Validating...  Please wait...");s.attr("readonly",true);y.css("display","none");y.attr("disabled",true);h({request:{validate:s.val()},complete:function(){s.attr("readonly",false);y.attr("disabled",false);y.css("display","");t()},error:function(){A.text("Encountered error making XHR request to server.")},success:function(B){if(B&&B.is_valid){A.text("Validated successfully.")}else{A.text("Incorrect letters entered.  Please try again.");v++}}})}w.bind("keydown",function(B){switch(B&&B.which){case 13:x();break;case 27:j.trigger("sp@in_cancel");break}});y.click(function(){x()});t();return{parent:w,input:s}})();function k(y,v){if(y.attr("data-sp64in")=="nogd"){a=false}b(v);function u(){if(!o){return""}if(v){return o.keyed&&o.keyed[v]||""}else{return o.def||""}}function B(){if(!m){return}var D=u();if(D){y.attr("href","mailto:"+D).text(D)}else{y.text("Unable to determine email.")}}B();var x=i.browser.msie&&i.browser.version<7;var A=null;if(x){A="MS IE version < 7 not supported.  Please use a more modern web browser."}else{if(!a){A="PHP GD needed for CAPTCHA generation not available.  PHP GD module needs to be properly installed and configured on the web server."}else{A="Click to reveal email address..."}}var C=g(y,i(["<div>",A,"</div>"].join("")),{show:{effect:true},hide:{effect:true}});var w=i("<div />");var s=g(y,w,{events:{show:function(){setTimeout(function(){l.input.focus()},0)}}});var z=false;i(document.body).bind("click",function(E){if(!z){return}var D=s.elements.tooltip;if(!D){return}if(!E.target){return}if(i(E.target).parents().filter(D).length>0){return}j.trigger("sp@in_cancel")});function r(){s.hide();z=false}function t(){w.append(l.parent);s.show();z=true}y.bind("mouseover",function(){if(u()){return}if(!z){C.show()}});y.bind("mouseout",function(){if(u()){return}if(!z){C.hide()}});y.bind("click",function(){if(x||!a){C.show();return false}if(u()){return true}if(z){r();C.show()}else{t();C.hide();j.trigger("sp@in_opened",[s])}return false});j.bind("sp@in_cancel",function(D){r()});j.bind("sp@in_opened",function(E,D){if(!z||D===s){return}r()});j.bind("sp@in_update",function(D){if(!u()){return}B();r()});if(a){if(!y.text()){y.text("Send Email")}}else{y.text("SP@in disabled")}y.css("visibility","")}function f(w){var t=w.attr("href");var u=t&&t.match(/^\s*mailto:\s*((\S*)_)?sp@in$/i);var s=u&&u.length>=1&&u[0];var v=w.attr("data-sp64in");if(!v){v=w.attr("data-spain")}if(!s&&v===undefined){return}var x=u&&u.length==3&&u[2];var r=v&&v.toLowerCase();if(v&&r!="true"&&r!="nogc"){x=v}k(w,x)}function q(s){var r=i("<a href='#' data-sp64in='"+s.attr("data-sp64in")+"'></a>");f(r);s.append(r)}i("a").each(function(){f(i(this))});i("span[data-sp64in]").each(function(){q(i(this))});i("span[data-spain]").each(function(){q(i(this))});p();((i.browser.msie&&i.browser.version<=7)?(i("img").filter(function(){return(i(this).attr("src")=="/components/sp@in/graphics/loading-1.gif")})):i('img[src="/components/sp@in/graphics/loading-1.gif"]')).css("display","none")});