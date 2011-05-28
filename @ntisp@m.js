/**
 *  @ntisp@m website component for CAPTCHA-protecting email addresses from
 *  email address harvesting web crawlers.
 *
 *  Copyright (c) 2011 Marat Nepomnyashy    maratbn@gmail
 *  All rights reserved.
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
    function createCAPTCHA(aSendEmail) {
        var divCEntry = $([
                    "<div style='",
                        "background-color:#ffffff;",
                        "border:1px solid #F1D031;",
                        "padding:0.3em",
                      "'/>"].join(""));
        var divCSolved =
                    $("<div style='display:none'>CAPTCHA solved</div>");
        var divParentContainer = $("<div />").append(divCEntry)
                                                    .append(divCSolved);

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
        
        divCEntry
            .append(divCAPTCHA)
            .append($([
                    "<div style='margin:0 1.2em;'>",
                      "<div style='text-align:center;margin-top:0.4em'>",
                        "Enter letters above:",
                      "</div>",
                    "</div>"].join(""))
                    .append(inputValidate)
                    .append(buttonSubmit))
                    .append($("<div style='clear:both' />"));

        var totalInvalid = 0;
        function refreshCAPTCHA() {
            divCAPTCHA.css(
                'background-image',
                "url('/components/@ntisp@m/./captcha.php?" +
                          (new Date()).getTime() + "_" + totalInvalid + "')");
        }

        function refreshInput() {
            refreshCAPTCHA();
            inputValidate.val("");
            inputValidate.focus();
        }

        function updateEmailAddress(data) {
            var strEmail = data && data.email;
            aSendEmail
                .attr(
                    'href',
                    strEmail ? 'mailto://' + strEmail : "#")
                .text(
                    strEmail || "Unable to determine email.");

            $(document).trigger('got_@ntisp@m_email', data);
        }

        /**
         *  Does the XHR request to the server with the user response to
         *  validate the CAPTCHA.
         */
        function validateCAPTCHA() {
            $.ajax({
                    url: '/components/@ntisp@m/./captcha_validator.php',
                    type: 'POST',
                    data: {'validate': inputValidate.val()},
                    dataType: 'json',
                    error: function() {
                            alert("Encountered error making XHR"
                                           + " request to server.");
                        },
                    success: function(data) {
                            var isValid = data && data.is_valid;
                            if (isValid) {
                                divCEntry.css('display', 'none');
                                divCSolved.css('display', "");
                                updateEmailAddress(data);
                            } else {
                                totalInvalid++;
                                refreshInput();
                            }
                        }
                })
        }

        inputValidate.bind('keydown', function(e) {
                if (e && e.which == 13) validateCAPTCHA();
            });

        buttonSubmit.click(function() {
                validateCAPTCHA();
            });

        refreshInput();

        return {
                parent: divParentContainer,
                input: inputValidate
            };
    }

    function attachCAPTCHA(aSendEmail) {
        var divClickToShow =
                           $("<div>Click to reveal email address.</div>");
        var captcha = createCAPTCHA(aSendEmail);
        var divCAPTCHA = captcha.parent;
        var inputValidate = captcha.input;

        divCAPTCHA.css('display', 'none');

        aSendEmail.qtip({
                style: {
                        classes: 'ui-tooltip-shadow'
                    },
                content: $("<div />").append(divClickToShow)
                                                    .append(divCAPTCHA),
                position: {
                    at: 'bottom middle',
                    my: 'top middle',
                    viewport: $(window)
                },
                show: {
                        effect: {
                            effect: 'fade',
                            length: 500
                        },
                        event: ""
                    },
                hide: {
                        effect: {
                            effect: 'fade',
                            length: 500
                        },
                        event: ""
                    }
            });

        var isCShown = false;
        var strEmail = "";

        var qapi = aSendEmail.qtip('api');

        aSendEmail.bind('mouseover', function() {
                if (strEmail) return;

                if (!isCShown) {
                    qapi.show();
                }
            });
        aSendEmail.bind('mouseout', function() {
                if (strEmail) return;

                if (!isCShown) {
                    qapi.hide();
                }
            });
        aSendEmail.bind('click', function() {
                if (strEmail) return;

                if (isCShown) {
                    divClickToShow.css('display', "");
                    divCAPTCHA.css('display', 'none');
                    qapi.reposition();
                    isCShown = false;
                } else {
                    divClickToShow.css('display', 'none');
                    divCAPTCHA.css('display', "");

                    //  2011-05-22
                    //  Removing the 'width' CSS style that otherwise
                    //  clips the contents.
                    var elements = qapi.elements;
                    if (elements && elements.tooltip)
                        elements.tooltip.css('width', "");

                    //  2011-05-23
                    //  The following call to reposition() was necessary to
                    //  make this work on IE8 in "compatibility" mode.
                    qapi.reposition();

                    qapi.show();
                    qapi.reposition();
                    inputValidate.focus();
                    isCShown = true;
                }

                return false;
            });

        $(document).bind('got_@ntisp@m_email', function(e, data) {
                strEmail = data && data.email;
                qapi.hide();
            });
    }

    function insertSendEmailLink(spanParent) {
        var aSendEmail = $("<a href='#'>Send Email</a>");
        attachCAPTCHA(aSendEmail);
        spanParent.append(aSendEmail);
    }

    insertSendEmailLink($('span[data-antispam]'));
});
