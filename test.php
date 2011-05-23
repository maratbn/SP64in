<!DOCTYPE HTML>

<html>
  <head>
    <title>CAPTCHA test</title>
    <link rel='stylesheet'
        href='./toolkits/jquery/jquery.qtip-nightly.custom/nightly-0b294b/jquery.qtip.css'>
  </head>
  <body>
    <a id='aSendEmail' href='#'>Send Email</a>
  </body>
  <script type='text/javascript' src='/toolkits/jquery/jquery-1.5.min.js'>
  </script>
  <script type='text/javascript'
      src='./toolkits/jquery/jquery.qtip-nightly.custom/nightly-0b294b/jquery.qtip.js'>
  </script>
  <script type='text/javascript'>
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
              var buttonSubmit = $("<button>Submit</button>");
              
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

                  $(document).trigger('got_@nti_sp@m_email', data);
              }

              refreshInput();

              buttonSubmit.click(function() {
                      $.ajax({
                              url: 'captcha_validator.php',
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

              $(document).bind('got_@nti_sp@m_email', function(data) {
                      strEmail = data && data.email;
                      aSendEmail.qtip('api').hide();
                  });
          }

          attachCAPTCHA($('#aSendEmail'));
      });
  </script>
</html>