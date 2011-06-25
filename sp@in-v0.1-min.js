/**
 *  SP@in = Pain 4 SPAM website component for CAPTCHA-protecting email
 *  addresses from email address harvesting web crawlers.
 *
 *  Version 0.1
 *
 *  Copyright (c) 2011 Marat Nepomnyashy  http://maratbn.com  maratbn@gmail
 *
 *  This module also includes the following embedded 3-rd party code:
 *
 *      jquery.cookie.js
 *      https://github.com/carhartl/jquery-cookie
 *      Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 *      Used under MIT license
 *
 *  Module:         sp@in-v0.1-min.js
 *
 *  Description:    JavaScript logic that activates anchor tags / links with
 *                  HTML attributes 'data-spain' and 'href' with values
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

$(document).ready(function(h){khartl_cookie=function(u,v,r){if(arguments.length>1&&String(v)!=="[object Object]"){r=jQuery.extend({},r);if(v===null||v===undefined){r.expires=-1}if(typeof r.expires==="number"){var x=r.expires,s=r.expires=new Date();s.setDate(s.getDate()+x)}v=String(v);return(document.cookie=[encodeURIComponent(u),"=",r.raw?v:encodeURIComponent(v),r.expires?"; expires="+r.expires.toUTCString():"",r.path?"; path="+r.path:"",r.domain?"; domain="+r.domain:"",r.secure?"; secure":""].join(""))}r=v||{};var q,w=r.raw?function(t){return t}:decodeURIComponent;return(q=new RegExp("(?:^|; )"+encodeURIComponent(u)+"=([^;]*)").exec(document.cookie))?w(q[1]):null};function f(t,s,q){var r={style:{classes:"ui-tooltip-shadow"},content:s,position:{at:"bottom middle",my:"top middle",target:t,viewport:h(window)},show:{effect:function(){h(this).slideDown(200)},event:""},hide:{effect:function(){h(this).slideUp(200)},event:""}};h.extend(true,r,q);return h("<span />").qtip(r).qtip("api")}function c(){return khartl_cookie("sp@in_recall")}var d={};var m=[];function a(q){if(!q){return}if(!d[q]){d[q]=true;m.push(q)}}var i=h("<span />");var l=false;var n=null;function g(q){h.ajax({url:"/components/sp@in/./validator.php",type:"POST",data:h.extend({keys:m.join(" ")},q.request),dataType:"json",complete:function(){if(q.complete){q.complete()}},error:function(){if(q.error){q.error()}},success:function(r){n=r&&r.email||null;l=r&&r.is_req_validated;khartl_cookie("sp@in_recall",r&&r.recall_id||"");if(q.success){q.success(r)}i.trigger("sp@in_update")}})}function o(){var q=khartl_cookie("sp@in_recall");if(!q){return}g({request:{recall:q}})}var k=(function b(){var v=h(["<div style='","color:#333333;","background-color:#ffffff;","border:1px solid #F1D031;","padding:0.3em;","font-family:arial sans-serif;","font-size:10px;","'/>"].join(""));var t=h(["<div style='","position:relative;width:250px;height:70px'>","<div style='","position:absolute;","top:-10px;","width:250px;","text-align:center;","font-weight:bold;","'>SP@in</div>","</div>"].join(""));var y="sp@in_input_"+(new Date()).getTime();var r=h(["<input type='text' style='","float:left;","font-size:2.1em;","letter-spacing:0.1em;","text-align:center;","border:none;","border-bottom:2px dashed #555555;","padding-bottom:0.2em;","width:5em;","'>"].join(""));r.attr("id",y);var x=h(["<button style='","float:right;margin-top:0.5em'>","Reveal Email</button>"].join(""));var z=h(["<label style='","display:block;","text-align:center;","margin-top:0.4em","'>","Enter letters above:","</label>"].join(""));z.attr("for",y);v.append(t).append(h(["<div style='margin:0 1.2em;'>","</div>"].join("")).append(z).append(r).append(x)).append(h("<div style='clear:both' />"));var u=0;function q(){t.css("background-image","url('/components/sp@in/./php-captcha/captcha_img.php?"+(new Date()).getTime()+"_"+u+"')")}function s(){q();r.val("")}function w(){z.text("Validating...  Please wait...");r.attr("readonly",true);x.css("display","none");x.attr("disabled",true);g({request:{validate:r.val()},complete:function(){r.attr("readonly",false);x.attr("disabled",false);x.css("display","");s()},error:function(){z.text("Encountered error making XHR request to server.")},success:function(A){if(A&&A.is_valid){z.text("Validated successfully.")}else{z.text("Incorrect letters entered.  Please try again.");u++}}})}v.bind("keydown",function(A){switch(A&&A.which){case 13:w();break;case 27:i.trigger("sp@in_cancel");break}});x.click(function(){w()});s();return{parent:v,input:r}})();function j(w,u){a(u);function t(){if(!n){return""}if(u){return n.keyed&&n.keyed[u]||""}else{return n.def||""}}function y(){if(!l){return}var A=t();if(A){w.attr("href","mailto:"+A).text(A)}else{w.text("Unable to determine email.")}}y();var z=f(w,h("<div>Click to reveal email address...</div>"));var v=h("<div />");var r=f(w,v,{events:{show:function(){setTimeout(function(){k.input.focus()},0)}}});var x=false;h(document.body).bind("click",function(B){if(!x){return}var A=r.elements.tooltip;if(!A){return}if(!B.target){return}if(h(B.target).parents().filter(A).length>0){return}i.trigger("sp@in_cancel")});function q(){r.hide();x=false}function s(){v.append(k.parent);r.show();x=true}w.bind("mouseover",function(){if(t()){return}if(!x){z.show()}});w.bind("mouseout",function(){if(t()){return}if(!x){z.hide()}});w.bind("click",function(){if(t()){return}if(x){q();z.show()}else{s();z.hide();i.trigger("sp@in_opened",[r])}return false});i.bind("sp@in_cancel",function(A){q()});i.bind("sp@in_opened",function(B,A){if(!x||A===r){return}q()});i.bind("sp@in_update",function(A){if(!t()){return}y();q()});if(!w.text()){w.text("Send Email")}w.css("visibility","")}function e(u){var r=u.attr("href");var s=r&&r.match(/^\s*mailto:\s*((\S*)_)?sp@in$/i);var q=s&&s.length>=1&&s[0];var t=u.attr("data-spain");if(!q&&t===undefined){return}var v=s&&s.length==3&&s[2];if(t&&t.toLowerCase()!="true"){v=t}j(u,v)}function p(r){var q=h("<a href='#' data-spain='"+r.attr("data-spain")+"'></a>");e(q);r.append(q)}h("span[data-spain]").each(function(){p(h(this))});h("a").each(function(){e(h(this))});o();((h.browser.msie&&h.browser.version<=7)?(h("img").filter(function(){return(h(this).attr("src")=="/components/sp@in/graphics/loading-1.gif")})):h('img[src="/components/sp@in/graphics/loading-1.gif"]')).css("display","none")});