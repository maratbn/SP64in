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
        var divCEntry = $("<div />");
        var divCSolved =
                    $("<div style='display:none'>CAPTCHA solved</div>");
        var divParentContainer = $("<div />").append(divCEntry)
                                                    .append(divCSolved);

        var divCAPTCHA = $("<div style='"
                    + "position:relative;width:250px;height:70px' />");
        var inputValidate = $("<input type='text'>");
        var buttonSubmit = $("<button>Reveal Email</button>");
        
        divCEntry
            .append(divCAPTCHA)
            .append(
                $("<p>Enter letters above:<br></p>")
                    .append(inputValidate)
                    .append(buttonSubmit));

        var totalInvalid = 0;
        function refreshCAPTCHA() {
            divCAPTCHA.css(
                'background-image',
                "url('captcha.php?" + (new Date()).getTime() + "_" +
                                                   totalInvalid + "')");
        }

        function refreshInput() {
            refreshCAPTCHA();
            inputValidate.val("");
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

        buttonSubmit.click(function() {
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
            });

        refreshInput();

        return divParentContainer;
    }

    function attachCAPTCHA(aSendEmail) {
        var divClickToShow =
                           $("<div>Click to reveal email address.</div>");
        var divCAPTCHA = createCAPTCHA(aSendEmail)
                            .css('display', 'none');

        aSendEmail.qtip({
                style: {
                        name: 'cream',
                        tip: true
                    },
                content: $("<div />").append(divClickToShow)
                                                    .append(divCAPTCHA),
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

        aSendEmail.bind('mouseover', function() {
                if (strEmail) return;

                if (!isCShown) {
                    aSendEmail.qtip('api').show();
                }
            });
        aSendEmail.bind('mouseout', function() {
                if (strEmail) return;

                if (!isCShown) {
                    aSendEmail.qtip('api').hide();
                }
            });
        aSendEmail.bind('click', function() {
                if (strEmail) return;

                if (isCShown) {
                    divClickToShow.css('display', "");
                    divCAPTCHA.css('display', 'none');
                    isCShown = false;
                } else {
                    divClickToShow.css('display', 'none');
                    divCAPTCHA.css('display', "");

                    //  2011-05-22
                    //  Removing the 'width' CSS style that otherwise
                    //  clips the contents.
                    aSendEmail.qtip('api')
                                     .elements.tooltip.css('width', "");

                    aSendEmail.qtip('api').show();
                    isCShown = true;
                }
            });

        $(document).bind('got_@ntisp@m_email', function(data) {
                strEmail = data && data.email;
                aSendEmail.qtip('api').hide();
            });
    }

    attachCAPTCHA($('a[data-antispam]'));
});
