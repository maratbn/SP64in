<?php
    require_once('@ntisp@m.php');
?>
<!DOCTYPE HTML>

<html>
  <head>
    <title>CAPTCHA test</title>
    <link rel='stylesheet'
        href='/components/@ntisp@m/./toolkits/jquery/jquery.qtip-nightly.custom/nightly-0b294b/jquery.qtip.css'>
  </head>
  <body>
    <ul>
      <li>
        Hard-coded span tag:<br>
        <span data-antispam='true'></span>
      </li>
      <li>
        Hard-coded anchor tag:<br>
        <a href='#' data-antispam='true'>Send Email to Somebody</a>
      </li>
      <li>
        Anchor tag injected via PHP convenience function
        'asInjectEmailAnchorHere(...)':<br>
        <?php asInjectEmailAnchorHere() ?>
      </li>
      <li>
        PHP-injected anchor tag with non-default caption:<br>
        <?php asInjectEmailAnchorHere(array(
            'caption'=>"Send Email to Somebody")) ?>
      </li>
    </ul>
  </body>
  <script type='text/javascript' src='/toolkits/jquery/jquery-1.5.min.js'>
  </script>
  <script type='text/javascript'
      src='/components/@ntisp@m/./toolkits/jquery/jquery.qtip-nightly.custom/nightly-0b294b/jquery.qtip.js'>
  </script>
  <script type='text/javascript' src='/components/@ntisp@m/./@ntisp@m.js'>
  </script>
</html>