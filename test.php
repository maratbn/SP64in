<!DOCTYPE HTML>

<html>
  <head>
    <title>CAPTCHA test</title>
  </head>
  <body>
    <p>
      <img src='captcha.php'>
    </p>
    <p>
      Enter letters above:<br>
      <input type='text' name='validate' id='inputValidate'>
      <button id='buttonSubmit'>Submit</button>
    </p>
  </body>
  <script type='text/javascript' src='/toolkits/jquery/jquery-1.5.min.js'>
  </script>
  <script type='text/javascript'>
      $(document).ready(function($) {
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
                                      alert("Valid");
                                  } else {
                                      alert("Invalid");
                                  }
                              }
                      })
              });
      });
  </script>
</html>