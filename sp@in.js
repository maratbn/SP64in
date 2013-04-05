/**
 *  SP@in (SP64in) = Pain 4 SPAM website component for CAPTCHA-protecting
 *  email addresses from email address harvesting web crawlers.
 *
 *  http://maratbn.com/projects/sp64in
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
 *  Module:         sp@in.js
 *
 *  Description:    JavaScript logic that activates anchor tags / links with
 *                  HTML attributes 'data-sp64in' and 'href' with values
 *                  'mailto:<key>_sp@in' to become CAPTCHA-protected email
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


jQuery(document).ready(function($) {

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
        var khartl_cookie = function (key, value, options) {
            
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
     *  Returns the value of session cookie 'sp@in_recall', which is the
     *  recall ID to retrieve the emails from the server if the user already
     *  solved the CAPTCHAs on his last visit to the page.
     */
    function getCachedRecallID(strPathHash) {
        var strAllData = khartl_cookie('sp@in_recall');
        if (!strAllData) return "";

        var reFindRecallID = new RegExp('\\[' + strPathHash +
                                                         ':([^\\[:\\[]+)\\]');
        var arrMatches = reFindRecallID.exec(strAllData);

        if (!arrMatches || arrMatches.length != 2) return "";
        return arrMatches[1];
    }

    function setCachedRecallID(strPathHash, strRecallID) {
        var strNewSegment = '[' + strPathHash + ':' + strRecallID + ']';

        var strAllData = khartl_cookie('sp@in_recall') || "";

        var reReplaceRecallID = new RegExp('\\[' + strPathHash +
                                                         ':([^\\[:\\[]+)\\]');
        if (reReplaceRecallID.test(strAllData)) {
            strAllData = strAllData.replace(reReplaceRecallID, strNewSegment);
        } else {
            strAllData += strNewSegment;
        }

        khartl_cookie('sp@in_recall', strAllData);
    }

    /**
     *  Turns a path string into a compact number, many of which can be stored
     *  in local cookie as keys for path recall IDs.
     *
     *  Borrowed from: http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
     */
    function getHashForPath(strPath) {
        var hash = 0;
        if (!strPath) return hash;

        for (var i = 0; i < strPath.length; i++) {
            var ch = strPath.charCodeAt(i);
            hash = ((hash<<5)-hash)+ch;
            hash = hash & hash;     // Convert to 32bit integer.
        }

        return hash < 0 ? -hash : hash;   // Keep the number positive.
    }

    var mapPaths = {}

    /**
     *  Remembers a sp@in tag path and key present on the page, to be able to
     *  later tell the server which emails we need for this page.
     */
    function rememberPathKey(strPath, strKey) {
        if (!strPath) return;

        if (!mapPaths[strPath]) mapPaths[strPath] = {
                hash: getHashForPath(strPath),
                map_keys: {},
                arr_keys: []
            };

        if (!strKey) return;

        if (!mapPaths[strPath].map_keys[strKey]) {
            mapPaths[strPath].map_keys = true;
            mapPaths[strPath].arr_keys.push(strKey);
        }
    }

    var elEvents = $("<span />");

    var isGDAvailable = true;
    var isReqValidated = false;
    var dataEmails = null;

    /**
     *  Does the XHR request to the server with the request parameters
     *  specified to retrieve the email data.
     *
     *  @param  params              Object with parameters.
     *  @param  params.path         String with the path to the root directory
     *                              where SP@in server-side components are
     *                              installed.
     *  @param  params.request      Object with the HTTP request
     *                                                     parameters.
     *  @param  params.complete     The 'complete' callback.
     *  @param  params.error        The 'error' callback.
     *  @param  params.success      The 'success' callback.
     */
    function retrieveEmailData(params) {
        $.ajax({
                url: params.path + '/validator.php',
                type: 'POST',
                data: $.extend(
                            {keys: mapPaths[params.path].arr_keys.join(" ")},
                            params.request),
                dataType: 'json',
                complete: function() {
                        if (params.complete) params.complete();
                    },
                error: function() {
                        if (params.error) params.error();
                    },
                success: function(data) {
                        dataEmails = data && data.emails || null;
                        isReqValidated = data && data.is_req_validated;

                        setCachedRecallID(
                            mapPaths[params.path].hash,
                            data && data.recall_id || "");

                        if (params.success) params.success(data);

                        elEvents.trigger('sp@in_update');
                    }
            })
    }

    function recallEmailData() {
        for (strPath in mapPaths) {
            var recall_id = getCachedRecallID(mapPaths[strPath].hash);
            if (!recall_id) continue;

            retrieveEmailData({
                    'path': strPath,
                    request: {'recall': recall_id}
                });
        }
    }

    function attachCAPTCHAForKey(aSendEmail, strKey) {

        /**
         *  Creates the CAPTCHA entering DOM.
         */
        function createCAPTCHA(strPath) {
            var divCEntry = $([
                        "<div style='",
                            "color:#333333;",
                            "background-color:#ffffff;",
                            "border:1px solid #F1D031;",
                            "padding:0.3em;",
                            "font-family:arial sans-serif;",
                            "font-size:10px;",
                          "'/>"].join(""));

            // This <div> stretches on IE6 if dimensions are not applied.
            if ($.browser.msie && $.browser.version <= 6) {
                divCEntry.css('position', 'relative');
                divCEntry.css('width', '252px');
            }

            var divCAPTCHA = $([
                        "<div style='",
                            "position:relative;width:250px;height:70px'>",
                          "<div style='",
                                  "position:absolute;",
                                  "top:-10px;",
                                  "width:250px;",
                                  "text-align:center;",
                                  "font-weight:bold;",
                                "'>",
                            "<a href='http://maratbn.com/projects/sp64in'",
                                                   " target='_new'>SP@in</a>",
                          "</div>",
                        "</div>"].join(""));

            var idInputValidate = "sp@in_input_" + (new Date()).getTime();

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

            inputValidate.attr('id', idInputValidate);

            var buttonSubmit = $([
                        "<button style='",
                            "float:right;margin-top:0.5em'>",
                          "Reveal Email</button>"].join(""));

            var elStatus = $([
                        "<label style='",
                              "display:block;",
                              "text-align:center;",
                              "margin-top:0.4em",
                            "'>",
                          "Enter letters above:",
                        "</label>"].join(""));

            elStatus.attr('for', idInputValidate);

            divCEntry
                .append(divCAPTCHA)
                .append($([
                        "<div style='margin:0 1.2em;'>",
                        "</div>"].join(""))
                        .append(elStatus)
                        .append(inputValidate)
                        .append(buttonSubmit))
                .append($("<div style='clear:both' />"));

            var totalInvalid = 0;
            function refreshCAPTCHA() {
                divCAPTCHA.css(
                    'background-image',
                    "url('" + strPath + "/php-captcha/captcha_img.php?"
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
                elStatus.text("Validating...  Please wait...");
                inputValidate.attr('readonly', true);
                buttonSubmit.css('display', 'none');
                buttonSubmit.attr('disabled', true);

                retrieveEmailData({
                        path: strPath,
                        request: {'validate': inputValidate.val()},
                        complete: function() {
                                inputValidate.attr('readonly', false);
                                buttonSubmit.attr('disabled', false);
                                buttonSubmit.css('display', "");
                                refreshInput();
                            },
                        error: function() {
                                elStatus.text("Encountered error making XHR"
                                               + " request to server.");
                            },
                        success: function(data) {
                                if (data && data.is_valid) {
                                    elStatus.text("Validated successfully.");
                                } else {
                                    elStatus.text("Incorrect letters " +
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
                            elEvents.trigger('sp@in_cancel');
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
        }

        function getEmail() {
            if (!dataEmails) return "";

            if (strKey) {
                return dataEmails.keyed && dataEmails.keyed[strKey] || "";
            } else {
                return dataEmails.def || "";
            }
        }

        var strPath = aSendEmail.attr('data-sp64in-path')
                                                      || '/components/sp@in/';

        if (aSendEmail.attr('data-sp64in-nogd')) isGDAvailable = false;

        rememberPathKey(strPath, strKey);

        var captcha = createCAPTCHA(strPath);

        var isIEUnder7 = $.browser.msie && $.browser.version < 7;

        var strClickToRevealText = null;
        if (isIEUnder7) {
            strClickToRevealText = "MS IE version < 7 not supported.  \
Please use a more modern web browser.";
        } else if (!isGDAvailable) {
            strClickToRevealText = "PHP GD needed for CAPTCHA generation not \
available.  PHP GD module needs to be properly installed and configured on \
the web server.";
        } else {
            strClickToRevealText = "Click to reveal email address...";
        }

        var elClickToRevealText = $([   "<div>",
                                          strClickToRevealText,
                                        "</div>"].join(""));

        var qapiClickToReveal = createQT(
                            aSendEmail,
                            elClickToRevealText,
                            {
                                show: { effect: true },
                                hide: { effect: true }
                            });

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
        var isErrorShown = false;

        //  This callback will close the qTip on an outside mouseclick.
        $(document.body).bind('click', function(event) {
                if (isErrorShown) { //  The 'click to reveal' mouse-over
                                    //  bubble may be used to show errors.
                    isErrorShown = false;
                    qapiClickToReveal.hide();
                }

                //  No need to hide a non-rendered or non-shown qTip.
                if (!isCShown) return;
                var elQT = qapiCAPTCHA.elements.tooltip;
                if (!elQT) return;

                //  Need to know which element was clicked to continue.
                if (!event.target) return;

                //  This checks if the original element clicked is inside the
                //  qTip, and if so, it lets the qTip remain.
                if ($(event.target).parents().filter(elQT).length > 0) return;

                //  If execution got to here it means that the click was
                //  outside an opened qTip, and sending this event will close
                //  it.
                elEvents.trigger('sp@in_cancel');
            });

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
                if (getEmail()) return true;

                if (isIEUnder7 || !isGDAvailable) {
                    qapiClickToReveal.show();
                    return false;
                }

                if (isCShown) {
                    hideCAPTCHA();
                    qapiClickToReveal.show();
                } else {
                    showCAPTCHA();
                    qapiClickToReveal.hide();

                    elEvents.trigger('sp@in_opened', [qapiCAPTCHA]);
                }

                return false;
            });

        elEvents.bind('sp@in_cancel', function(e) {
                hideCAPTCHA();
            });

        elEvents.bind('sp@in_opened', function(e, qapiOpened) {
                if (!isCShown || qapiOpened === qapiCAPTCHA) return;

                hideCAPTCHA();
            });

        elEvents.bind('sp@in_update', function(e) {
                if (!isReqValidated) return;

                var strEmail = getEmail();

                if (strEmail) {
                    aSendEmail
                        .attr('href', 'mailto:' + strEmail)
                        .text(strEmail);
                    qapiClickToReveal.hide();
                } else {
                    elClickToRevealText.text(
                        "Unable to retrieve data.  Click to try again...");
                    qapiClickToReveal.show();
                    isErrorShown = true;
                }

                hideCAPTCHA();
            });


        if (isGDAvailable) {
            //  Set email anchor link text caption if there isn't one already:
            if (!aSendEmail.text()) aSendEmail.text("Send Email");
        } else {
            aSendEmail.text("SP@in disabled");
        }

        //  Clear-out the 'visibility:hidden' inline style initially applied
        //  by the server-side rendering to prevent the appearance of a
        //  non-functional anchor link.
        aSendEmail.css('visibility', "");
    }

    function attachCAPTCHA(aSendEmail) {
        var strHref = aSendEmail.attr('href');
        var arrMailto = strHref && strHref.match(/^\s*mailto:\s*((\S*)_)?sp@in$/i);
        var strMailto = arrMailto && arrMailto.length >= 1 && arrMailto[0];

        var strAS = aSendEmail.attr('data-sp64in');
        if (!strAS) strAS = aSendEmail.attr('data-spain');
        if (!strMailto && strAS === undefined) return;

        var strKey = arrMailto && arrMailto.length == 3 && arrMailto[2];

        var strASLC = strAS && strAS.toLowerCase();
        if (strAS && strASLC != 'true' && strASLC != 'nogd') strKey = strAS;

        attachCAPTCHAForKey(aSendEmail, strKey);
    }

    function insertSendEmailLink(spanParent) {
        var aSendEmail = $("<a href='#' data-sp64in='" +
                                 spanParent.attr('data-sp64in') + "'></a>");

        var strNogd = spanParent.attr('data-sp64in-nogd');
        if (strNogd) aSendEmail.attr('data-sp64in-nogd', strNogd);

        var strPath = spanParent.attr('data-sp64in-path');
        if (strPath) aSendEmail.attr('data-sp64in-path', strPath);

        attachCAPTCHA(aSendEmail);
        spanParent.append(aSendEmail);
    }

    $('a').each(function() {attachCAPTCHA($(this))});
    $('span[data-sp64in]').each(function() {insertSendEmailLink($(this))});
    $('span[data-spain]').each(function() {insertSendEmailLink($(this))});

    recallEmailData();

    //  Need to hide the loading graphics.
    //  A less efficient algorithm is used on <= IE7 because jQuery has a
    //  problem with the attribute selector on this browser.
    (($.browser.msie && $.browser.version <= 7)
        ? ($('img').filter(
            function() {
                var strAttrSrc = $(this).attr('src');
                return strAttrSrc &&
                         strAttrSrc.match(/\/graphics\/sp@in-loading-1.gif$/);
            }))
        : $('img[src$="/graphics/sp@in-loading-1.gif"]'))
        .css('display','none');
});
