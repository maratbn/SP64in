/**
* SP@in (SP64in) = Pain 4 SPAM website component for CAPTCHA-protecting
* email addresses from email address harvesting web crawlers.
*
* http://maratbn.com/projects/sp64in
*
* Version: 0.1.9
*
* Copyright (c) 2011-2013 Marat Nepomnyashy http://maratbn.com maratbn@gmail
*
* This module also includes the following embedded 3-rd party code:
*
* jquery.cookie.js
* https://github.com/carhartl/jquery-cookie
* Copyright (c) 2010 Klaus Hartl (stilbuero.de)
* Used under MIT license
*
* Module: sp@in-v0.1.9-min.js
*
* Description: Compressed / minified version of 'sp@in.js'.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
* * Redistributions of source code must retain the above copyright
* notice, this list of conditions and the following disclaimer.
* * Redistributions in binary form must reproduce the above copyright
* notice, this list of conditions and the following disclaimer in the
* documentation and/or other materials provided with the distribution.
* * Neither the name of the <organization> nor the
* names of its contributors may be used to endorse or promote products
* derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
* THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


jQuery(document).ready(function(h){khartl_cookie=function(r,s,p){if(arguments.length>1&&String(s)!=="[object Object]"){p=jQuery.extend({},p);if(s===null||s===undefined){p.expires=-1}if(typeof p.expires==="number"){var v=p.expires,q=p.expires=new Date();q.setDate(q.getDate()+v)}s=String(s);return(document.cookie=[encodeURIComponent(r),"=",p.raw?s:encodeURIComponent(s),p.expires?"; expires="+p.expires.toUTCString():"",p.path?"; path="+p.path:"",p.domain?"; domain="+p.domain:"",p.secure?"; secure":""].join(""))}p=s||{};var o,u=p.raw?function(t){return t}:decodeURIComponent;return(o=new RegExp("(?:^|; )"+encodeURIComponent(r)+"=([^;]*)").exec(document.cookie))?u(o[1]):null};function f(r,q,o){var p={style:{classes:"ui-tooltip-shadow"},content:q,position:{at:"bottom middle",my:"top middle",target:r,viewport:h(window)},show:{effect:function(){h(this).slideDown(200)},event:""},hide:{effect:function(){h(this).slideUp(200)},event:""}};h.extend(true,p,o);return h("<span />").qtip(p).qtip("api")}function c(){return khartl_cookie("sp@in_recall")}var d={};function b(p,o){if(!p){return}if(!d[p]){d[p]={map_keys:{},arr_keys:[]}}if(!o){return}if(!d[p].map_keys[o]){d[p].map_keys=true;d[p].arr_keys.push(o)}}var i=h("<span />");var a=true;var k=false;var l=null;function g(o){h.ajax({url:o.path+"/validator.php",type:"POST",data:h.extend({keys:d[o.path].arr_keys.join(" ")},o.request),dataType:"json",complete:function(){if(o.complete){o.complete()}},error:function(){if(o.error){o.error()}},success:function(p){l=p&&p.email||null;k=p&&p.is_req_validated;khartl_cookie("sp@in_recall",p&&p.recall_id||"");if(o.success){o.success(p)}i.trigger("sp@in_update")}})}function m(){var o=khartl_cookie("sp@in_recall");if(!o){return}for(strPath in d){g({path:strPath,request:{recall:o}})}}function j(x,t){function q(K){var I=h(["<div style='","color:#333333;","background-color:#ffffff;","border:1px solid #F1D031;","padding:0.3em;","font-family:arial sans-serif;","font-size:10px;","'/>"].join(""));if(h.browser.msie&&h.browser.version<=6){I.css("position","relative");I.css("width","252px")}var G=h(["<div style='","position:relative;width:250px;height:70px'>","<div style='","position:absolute;","top:-10px;","width:250px;","text-align:center;","font-weight:bold;","'>","<a href='http://maratbn.com/projects/sp64in'"," target='_new'>SP@in</a>","</div>","</div>"].join(""));var M="sp@in_input_"+(new Date()).getTime();var E=h(["<input type='text' style='","float:left;","font-size:2.1em;","letter-spacing:0.1em;","text-align:center;","border:none;","border-bottom:2px dashed #555555;","padding-bottom:0.2em;","width:5em;","'>"].join(""));E.attr("id",M);var L=h(["<button style='","float:right;margin-top:0.5em'>","Reveal Email</button>"].join(""));var N=h(["<label style='","display:block;","text-align:center;","margin-top:0.4em","'>","Enter letters above:","</label>"].join(""));N.attr("for",M);I.append(G).append(h(["<div style='margin:0 1.2em;'>","</div>"].join("")).append(N).append(E).append(L)).append(h("<div style='clear:both' />"));var H=0;function D(){G.css("background-image","url('"+K+"/php-captcha/captcha_img.php?"+(new Date()).getTime()+"_"+H+"')")}function F(){D();E.val("")}function J(){N.text("Validating...  Please wait...");E.attr("readonly",true);L.css("display","none");L.attr("disabled",true);g({path:K,request:{validate:E.val()},complete:function(){E.attr("readonly",false);L.attr("disabled",false);L.css("display","");F()},error:function(){N.text("Encountered error making XHR request to server.")},success:function(O){if(O&&O.is_valid){N.text("Validated successfully.")}else{N.text("Incorrect letters entered.  Please try again.");H++}}})}I.bind("keydown",function(O){switch(O&&O.which){case 13:J();break;case 27:i.trigger("sp@in_cancel");break}});L.click(function(){J()});F();return{parent:I,input:E}}function s(){if(!l){return""}if(t){return l.keyed&&l.keyed[t]||""}else{return l.def||""}}function C(){if(!k){return}var D=s();if(D){x.attr("href","mailto:"+D).text(D)}else{x.text("Unable to determine email.")}}var v=x.attr("data-sp64in-path")||"/components/sp@in/";if(x.attr("data-sp64in")=="nogd"){a=false}b(v,t);var z=q(v);C();var w=h.browser.msie&&h.browser.version<7;var A=null;if(w){A="MS IE version < 7 not supported.  Please use a more modern web browser."}else{if(!a){A="PHP GD needed for CAPTCHA generation not available.  PHP GD module needs to be properly installed and configured on the web server."}else{A="Click to reveal email address..."}}var B=f(x,h(["<div>",A,"</div>"].join("")),{show:{effect:true},hide:{effect:true}});var u=h("<div />");var p=f(x,u,{events:{show:function(){setTimeout(function(){z.input.focus()},0)}}});var y=false;h(document.body).bind("click",function(E){if(!y){return}var D=p.elements.tooltip;if(!D){return}if(!E.target){return}if(h(E.target).parents().filter(D).length>0){return}i.trigger("sp@in_cancel")});function o(){p.hide();y=false}function r(){u.append(z.parent);p.show();y=true}x.bind("mouseover",function(){if(s()){return}if(!y){B.show()}});x.bind("mouseout",function(){if(s()){return}if(!y){B.hide()}});x.bind("click",function(){if(w||!a){B.show();return false}if(s()){return true}if(y){o();B.show()}else{r();B.hide();i.trigger("sp@in_opened",[p])}return false});i.bind("sp@in_cancel",function(D){o()});i.bind("sp@in_opened",function(E,D){if(!y||D===p){return}o()});i.bind("sp@in_update",function(D){if(!s()){return}C();o()});if(a){if(!x.text()){x.text("Send Email")}}else{x.text("SP@in disabled")}x.css("visibility","")}function e(t){var q=t.attr("href");var r=q&&q.match(/^\s*mailto:\s*((\S*)_)?sp@in$/i);var p=r&&r.length>=1&&r[0];var s=t.attr("data-sp64in");if(!s){s=t.attr("data-spain")}if(!p&&s===undefined){return}var u=r&&r.length==3&&r[2];var o=s&&s.toLowerCase();if(s&&o!="true"&&o!="nogd"){u=s}j(t,u)}function n(p){var o=h("<a href='#' data-sp64in='"+p.attr("data-sp64in")+"'></a>");var q=p.attr("data-sp64in-path");if(q){o.attr("data-sp64in-path",q)}e(o);p.append(o)}h("a").each(function(){e(h(this))});h("span[data-sp64in]").each(function(){n(h(this))});h("span[data-spain]").each(function(){n(h(this))});m();((h.browser.msie&&h.browser.version<=7)?(h("img").filter(function(){var o=h(this).attr("src");return o&&o.match(/\/graphics\/sp@in-loading-1.gif$/)})):h('img[src$="/graphics/sp@in-loading-1.gif"]')).css("display","none")});
