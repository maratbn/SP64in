<?php
    require_once('sp@in.php');
?>
<!DOCTYPE HTML>

<html>
  <head>
    <title>SP@in usage example</title>
    <link rel='stylesheet'
        href='/components/sp@in/./toolkits/jquery/jquery.qtip-nightly.custom/nightly-0b294b/jquery.qtip.min.css'>
    <style>
      .as_bold {
          font-weight:      bold;
      }
      .as_italic {
          font-style:       italic;
      }
    </style>
  </head>
  <body>
    <ul>
      <li>
        <p>
          Anchor tag injected via PHP convenience function
          'spainInjectTag(...)' with all default options:
          <br>
          <?php spainInjectTag() ?>
        </p>
      </li>
      <li>
        <p>
          PHP-injected anchor tag with non-default caption:
          <br>
          <?php spainInjectTag(array(
              'caption'=>"Send Email to Somebody")) ?>
        </p>
      </li>
      <li>
        <p>
          PHP-injected anchor tag with non-default CSS classes:
          <br>
          <?php spainInjectTag(array(
              'class'=>"as_bold as_italic")) ?>
        </p>
      </li>


      <li>
        <p>
          PHP-injected anchor tag with non-default CSS style:
          <br>
          <?php spainInjectTag(array(
                  'style'=> "display:block;width:15em;padding:0.4em;"
                            . "margin:0.6em;border: 2px dashed red;"
                            . "text-align:center"
              )) ?>
        </p>
      </li>

      <li>
        <p>
          PHP-injected anchor tag with key 'webmaster':
          <br>
          <?php spainInjectTag(array(
              'key'=>'webmaster')) ?>
        </p>
      </li>
      <li>
        <p>
          PHP-injected anchor tag with key 'admin':
          <br>
          <?php spainInjectTag(array(
              'key'=>'admin')) ?>
        </p>
      </li>

      <li>
        <p>
          PHP-injected anchor tag with a non-pre-statically-configured email
          address:
          <br>
          <?php spainInjectTagForNonConfigEmail("non_config@example.com") ?>
        </p>
      </li>

      <li>
        <p>
          Hard-coded span tag:
          <br>
          <span data-spain='true'></span>
        </p>
      </li>
      <li>
        <p>
          Hard-coded anchor tag originally empty:
          <br>
          <a href='#' data-spain='true'></a>
        </p>
      </li>
      <li>
        <p>
          Hard-coded anchor tag originally with custom content:
          <br>
          <a href='#' data-spain='true'>Send Email to Somebody</a>
        </p>
      </li>
    </ul>

    <script type='text/javascript' src='/toolkits/jquery/jquery-1.5.min.js'>
    </script>
    <script type='text/javascript'
        src='/components/sp@in/./toolkits/jquery/jquery.qtip-nightly.custom/nightly-0b294b/jquery.qtip.min.js'>
    </script>
    <script type='text/javascript' src='/components/sp@in/./sp@in-v0.1.1-min.js'>
    </script>
  </body>
</html>