<!DOCTYPE HTML>

<html>
  <head>
    <title>CAPTCHA test</title>
  </head>
  <body>
    <p>
      Letters entered: <?=$_POST['validate']?>
    </p>
    <p>
      <?php
          //  Based on example at:
          //  http://www.ejeliot.com/pages/php-captcha

          require('php-captcha.inc.php');
          if (PhpCaptcha::Validate($_POST['validate'])) {
              echo 'Valid code entered';
          } else {
              echo 'Invalid code entered';
          }
      ?>
    </p>
    <p>
      <img src='captcha.php'>
    </p>
    <form method='POST'>
      Enter letters above:<br>
      <input type='text' name='validate'>
      <button>Submit</button>
    </form>
  </body>
</html>