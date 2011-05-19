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
      <img src='captcha.php'>
    </p>
    <form method='POST'>
      Enter letters above:<br>
      <input type='text' name='validate'>
      <button>Submit</button>
    </form>
  </body>
</html>