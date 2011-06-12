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
        <p>
          Anchor tag injected via PHP convenience function
          'asInjectEmailAnchorHere(...)' with all default options:
          <br>
          <?php asInjectEmailAnchorHere() ?>
        </p>
      </li>
      <li>
        <p>
          PHP-injected anchor tag with non-default caption:
          <br>
          <?php asInjectEmailAnchorHere(array(
              'caption'=>"Send Email to Somebody")) ?>
        </p>
      </li>
      <li>
        <p>
          Hard-coded span tag:
          <br>
          <span data-antispam='true'></span>
        </p>
      </li>
      <li>
        <p>
          Hard-coded anchor tag originally empty:
          <br>
          <a href='#' data-antispam='true'></a>
        </p>
      </li>
      <li>
        <p>
          Hard-coded anchor tag originally with custom content:
          <br>
          <a href='#' data-antispam='true'>Send Email to Somebody</a>
        </p>
      </li>
    </ul>

    <script type='text/javascript' src='/toolkits/jquery/jquery-1.5.min.js'>
    </script>
    <script type='text/javascript'
        src='/components/@ntisp@m/./toolkits/jquery/jquery.qtip-nightly.custom/nightly-0b294b/jquery.qtip.js'>
    </script>
    <script type='text/javascript' src='/components/@ntisp@m/./@ntisp@m.js'>
    </script>
  </body>
</html>