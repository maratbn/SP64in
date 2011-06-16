/**
 *  @ntisp@m website component for CAPTCHA-protecting email addresses from
 *  email address harvesting web crawlers.
 *
 *  Copyright (c) 2011 Marat Nepomnyashy    maratbn@gmail
 *
 *  This module also includes the following embedded 3-rd party code:
 *
 *      jquery.cookie.js
 *      https://github.com/carhartl/jquery-cookie
 *      Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 *      Used under MIT license
 *
 *  Module:         @ntisp@m.js
 *
 *  Description:    JavaScript logic that activates anchor tags / links with
 *                  HTML attribute 'data-antispam' to become CAPTCHA-protected
 *                  email links.
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
 * 
 *
 */


$(document).ready(function($) {

    /**
     *  The following is Klaus Hartl's jquery.cookie.js library pasted in with
     *  minor modifications.
     *
     *  https://github.com/carhartl/jquery-cookie
     *  Used under MIT license.
     *  https://github.com/carhartl/jquery-cookie/raw/master/jquery.cookie.js
     *  head: 001687708c9270d399eea2d0c4c10fd6b0169b3e
     */
    //  ======================================================================
        /**
         * jQuery Cookie plugin
         *
         * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
         * Dual licensed under the MIT and GPL licenses:
         * http://www.opensource.org/licenses/mit-license.php
         * http://www.gnu.org/licenses/gpl.html
         *
         */

        // TODO JsDoc

        /**
         * Create a cookie with the given key and value and other optional parameters.
         *
         * @example $.cookie('the_cookie', 'the_value');
         * @desc Set the value of a cookie.
         * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
         * @desc Create a cookie with all available options.
         * @example $.cookie('the_cookie', 'the_value');
         * @desc Create a session cookie.
         * @example $.cookie('the_cookie', null);
         * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
         *       used when the cookie was set.
         *
         * @param String key The key of the cookie.
         * @param String value The value of the cookie.
         * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
         * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
         *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
         *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
         *                             when the the browser exits.
         * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
         * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
         * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
         *                        require a secure protocol (like HTTPS).
         * @type undefined
         *
         * @name $.cookie
         * @cat Plugins/Cookie
         * @author Klaus Hartl/klaus.hartl@stilbuero.de
         */

        /**
         * Get the value of a cookie with the given key.
         *
         * @example $.cookie('the_cookie');
         * @desc Get the value of a cookie.
         *
         * @param String key The key of the cookie.
         * @return The value of the cookie.
         * @type String
         *
         * @name $.cookie
         * @cat Plugins/Cookie
         * @author Klaus Hartl/klaus.hartl@stilbuero.de
         */
        //  2011-05-30  maratbn
        //  Don't want to mess with the jQuery namespace in case the web page
        //  this is running on wants to include the jquery.cookie.js library
        //  (or some other library that registers itself as $.cookie)
        //  explicitly.
        //  jQuery.cookie = function (key, value, options) {
        khartl_cookie = function (key, value, options) {
            
            // key and at least value given, set cookie...
            if (arguments.length > 1 && String(value) !== "[object Object]") {
                options = jQuery.extend({}, options);

                if (value === null || value === undefined) {
                    options.expires = -1;
                }

                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setDate(t.getDate() + days);
                }
                
                value = String(value);
                
                return (document.cookie = [
                    encodeURIComponent(key), '=',
                    options.raw ? value : encodeURIComponent(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            }

            // key and possibly options given, get cookie...
            options = value || {};
            var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
            return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
        };
    //  ======================================================================


    /**
     *  Creates a new qTip and returns its API object.
     */
    function createQT(elTarget, content, configExtra) {
        var config = {
                style: {
                        classes: 'ui-tooltip-shadow'
                    },
                content: content,
                position: {
                    at: 'bottom middle',
                    my: 'top middle',
                    target: elTarget,
                    viewport: $(window)
                },
                show: {
                        effect: function () {
                                $(this).slideDown(200);
                            },
                        event: ""
                    },
                hide: {
                        effect: function () {
                                $(this).slideUp(200);
                            },
                        event: ""
                    }
            };
        $.extend(true, config, configExtra);
        return $("<span />").qtip(config).qtip('api');
    }

    /**
     *  Returns value of session cookie '@ntisp@m_cvalid', which should be
     *  "yes" if CAPTCHA has been solved.
     */
    function getCachedRecallID() {
        return khartl_cookie('@ntisp@m_recall');
    }

    var elEvents = $("<span />");

    var isReqValidated = false;
    var dataEmail = null;

    /**
     *  Does the XHR request to the server with the request parameters
     *  specified to retrieve the email data.
     *
     *  @param  params              Object with parameters.
     *  @param  params.request      Object with the HTTP request
     *                                                     parameters.
     *  @param  params.complete     The 'complete' callback.
     *  @param  params.error        The 'error' callback.
     *  @param  params.success      The 'success' callback.
     */
    function retrieveEmailData(params) {
        $.ajax({
                url: '/components/@ntisp@m/./validator.php',
                type: 'POST',
                data: params.request,
                dataType: 'json',
                complete: function() {
                        if (params.complete) params.complete();
                    },
                error: function() {
                        if (params.error) params.error();
                    },
                success: function(data) {
                        dataEmail = data && data.email || null;
                        isReqValidated = data && data.is_req_validated;

                        khartl_cookie(
                            '@ntisp@m_recall',
                            data && data.recall_id || "");

                        if (params.success) params.success(data);

                        elEvents.trigger('@ntisp@m_update');
                    }
            })
    }

    function recallEmailData() {
        var recall_id = khartl_cookie('@ntisp@m_recall');
        if (!recall_id) return;

        retrieveEmailData({
                request: {'recall': recall_id}
            });
    }
    recallEmailData();

    var captcha = (
        /**
         *  Creates the CAPTCHA entering DOM.
         */
        function createCAPTCHA() {
            var divCEntry = $([
                        "<div style='",
                            "background-color:#ffffff;",
                            "border:1px solid #F1D031;",
                            "padding:0.3em",
                          "'/>"].join(""));

            var divCAPTCHA = $("<div style='"
                        + "position:relative;width:250px;height:70px' />");
            var inputValidate = $([
                        "<input type='text' style='",
                            "float:left;",
                            "font-size:2.1em;",
                            "letter-spacing:0.1em;",
                            "text-align:center;",
                            "border:none;",
                            "border-bottom:2px dashed #555555;",
                            "padding-bottom:0.2em;",
                            "width:5em;",
                          "'>"].join(""));
            var buttonSubmit = $([
                        "<button style='",
                            "float:right;margin-top:0.5em'>",
                          "Reveal Email</button>"].join(""));

            var divStatus = $([
                        "<div style='text-align:center;margin-top:0.4em'>",
                          "Enter letters above:",
                        "</div>"].join(""));

            divCEntry
                .append(divCAPTCHA)
                .append($([
                        "<div style='margin:0 1.2em;'>",
                        "</div>"].join(""))
                        .append(divStatus)
                        .append(inputValidate)
                        .append(buttonSubmit))
                        .append($("<div style='clear:both' />"));

            var totalInvalid = 0;
            function refreshCAPTCHA() {
                divCAPTCHA.css(
                    'background-image',
                    "url('/components/@ntisp@m/./php-captcha/captcha_img.php?"
                        + (new Date()).getTime() + "_" + totalInvalid + "')");
            }

            function refreshInput() {
                refreshCAPTCHA();
                inputValidate.val("");
            }

            /**
             *  Retrieves user's CAPTCHA entry from the DOM, and sends it to
             *  the server.
             */
            function validateCAPTCHA() {
                divStatus.text("Validating...  Please wait...");
                inputValidate.attr('readonly', true);
                buttonSubmit.css('display', 'none');
                buttonSubmit.attr('disabled', true);

                retrieveEmailData({
                        request: {'validate': inputValidate.val()},
                        complete: function() {
                                inputValidate.attr('readonly', false);
                                buttonSubmit.attr('disabled', false);
                                buttonSubmit.css('display', "");
                                refreshInput();
                            },
                        error: function() {
                                divStatus.text("Encountered error making XHR"
                                               + " request to server.");
                            },
                        success: function(data) {
                                if (data && data.is_valid) {
                                    divStatus.text("Validated successfully.");
                                } else {
                                    divStatus.text("Incorrect letters " +
                                               "entered.  Please try again.");
                                    totalInvalid++;
                                }
                            }
                    });
            }

            divCEntry.bind('keydown', function(e) {
                    switch (e && e.which) {
                        case 13:
                            validateCAPTCHA();
                            break;
                        case 27:
                            elEvents.trigger('@ntisp@m_cancel');
                            break;
                    }
                });

            buttonSubmit.click(function() {
                    validateCAPTCHA();
                });

            refreshInput();

            return {
                    parent: divCEntry,
                    input: inputValidate
                };
        })();

    function attachCAPTCHA(aSendEmail) {

        function getEmail() {
            return dataEmail && dataEmail.def || "";
        }

        function updateEmailAddress() {
            if (!isReqValidated) return;

            var strEmail = getEmail();

            aSendEmail
                .attr(
                    'href',
                    strEmail ? 'mailto:' + strEmail : "#")
                .text(
                    strEmail || "Unable to determine email.");
        }

        updateEmailAddress();

        var qapiClickToReveal = createQT(
                            aSendEmail,
                            $("<div>Click to reveal email address.</div>"));

        var elContainerCAPTCHA = $("<div />");
        var qapiCAPTCHA = createQT(aSendEmail, elContainerCAPTCHA, {
                events: {
                        show: function() {
                                setTimeout(function() {
                                        captcha.input.focus();
                                    }, 0);
                            }
                    }
            });

        var isCShown = false;

        function hideCAPTCHA() {
            qapiCAPTCHA.hide();
            isCShown = false;
        }

        function showCAPTCHA() {
            elContainerCAPTCHA.append(captcha.parent);

            qapiCAPTCHA.show();
            isCShown = true;
        }

        aSendEmail.bind('mouseover', function() {
                if (getEmail()) return;

                if (!isCShown) {
                    qapiClickToReveal.show();
                }
            });
        aSendEmail.bind('mouseout', function() {
                if (getEmail()) return;

                if (!isCShown) {
                    qapiClickToReveal.hide();
                }
            });
        aSendEmail.bind('click', function() {
                if (getEmail()) return;

                if (isCShown) {
                    hideCAPTCHA();
                    qapiClickToReveal.show();
                } else {
                    showCAPTCHA();
                    qapiClickToReveal.hide();

                    elEvents.trigger('@ntisp@m_opened', [qapiCAPTCHA]);
                }

                return false;
            });

        elEvents.bind('@ntisp@m_cancel', function(e) {
                hideCAPTCHA();
            });

        elEvents.bind('@ntisp@m_opened', function(e, qapiOpened) {
                if (!isCShown || qapiOpened === qapiCAPTCHA) return;

                hideCAPTCHA();
            });

        elEvents.bind('@ntisp@m_update', function(e) {
                if (!getEmail()) return;

                updateEmailAddress();
                hideCAPTCHA();
            });


        //  Set email anchor link text caption if there isn't one already:
        if (!aSendEmail.text()) aSendEmail.text("Send Email");

        //  Clear-out the 'visibility:hidden' inline style initially applied
        //  by the server-side rendering to prevent the appearance of a
        //  non-functional anchor link.
        aSendEmail.css('visibility', "");
    }

    function insertSendEmailLink(spanParent) {
        var aSendEmail = $("<a href='#'></a>");
        attachCAPTCHA(aSendEmail);
        spanParent.append(aSendEmail);
    }

    $('a[data-antispam]').each(function() {attachCAPTCHA($(this))});
    $('span[data-antispam]').each(function() {insertSendEmailLink($(this))});
});
