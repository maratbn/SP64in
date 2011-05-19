<!DOCTYPE HTML>

<html>
  <head>
    <title>CAPTCHA test</title>
  </head>
  <body>
    <a id='aSendEmail' href='#'>Send Email</a>
    <div id='divCEntry'>
      <div id='divCAPTCHA' style='position:relative;width:250px;height:70px'>
      </div>
      <p>
        Enter letters above:<br>
        <input type='text' id='inputValidate'>
        <button id='buttonSubmit'>Submit</button>
      </p>
    </div>
  </body>
  <script type='text/javascript' src='/toolkits/jquery/jquery-1.5.min.js'>
  </script>
  <script type='text/javascript'>
      $(document).ready(function($) {
          var totalInvalid = 0;
          function refreshCAPTCHA() {
              $('#divCAPTCHA').css(
                  'background-image',
                  "url('captcha.php?" + (new Date()).getTime() + "_" +
                                                        totalInvalid + "')");
          }

          function refreshInput() {
              refreshCAPTCHA();
              $('#inputValidate').val("");
          }

          function updateEmailAddress(data) {
              var strEmail = data && data.email;
              $('#aSendEmail')
                  .attr(
                      'href',
                      strEmail ? 'mailto://' + strEmail : "#")
                  .text(
                      strEmail || "Unable to determine email.");
          }

          refreshCAPTCHA();

          $('#buttonSubmit').click(function() {
                  $.ajax({
                          url: 'captcha_validator.php',
                          type: 'POST',
                          data: {'validate': $('#inputValidate').val()},
                          dataType: 'json',
                          error: function() {
                                  alert("Encountered error making XHR request"
                                          + " to server.");
                              },
                          success: function(data) {
                                  var isValid = data && data.is_valid;
                                  if (isValid) {
                                      $('#divCEntry').css('display', 'none');
                                      updateEmailAddress(data);
                                  } else {
                                      totalInvalid++;
                                      refreshInput();
                                  }
                              }
                      })
              });
      });
  </script>
</html>