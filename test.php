<!DOCTYPE HTML>

<html>
  <head>
    <title>CAPTCHA test</title>
    <link rel='stylesheet'
        href='/toolkits/jquery/jquery.qtip-nightly.custom/nightly-0b294b/jquery.qtip.css'>
  </head>
  <body>
    <a id='aSendEmail' href='#'>Send Email</a>
  </body>
  <script type='text/javascript' src='/toolkits/jquery/jquery-1.5.min.js'>
  </script>
  <script type='text/javascript'
      src='/toolkits/jquery/jquery.qtip-nightly.custom/nightly-0b294b/jquery.qtip.js'>
  </script>
  <script type='text/javascript'>
      $(document).ready(function($) {
          function createCAPTCHA(aSendEmail) {
              var divCEntry = $("<div />");
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
                                          updateEmailAddress(data);
                                      } else {
                                          totalInvalid++;
                                          refreshInput();
                                      }
                                  }
                          })
                  });

              return divCEntry;
          }

          function attachCAPTCHA(aSendEmail) {
              aSendEmail.qtip({
                      style: {
                              name: 'cream',
                              tip: true
                          },
                      content: "Click to show email address.",
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

              aSendEmail.click(function() {
                  });
          }

          attachCAPTCHA($('#aSendEmail'));
      });
  </script>
</html>