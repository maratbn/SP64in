<?php
    require_once('sp@in.php');
?>
<!DOCTYPE HTML>

<html>
  <head>
    <title>SP@in (SP64in) Usage Examples</title>
    <link rel='stylesheet'
        href='/components/sp@in/toolkits/jquery/jquery.qtip-nightly.custom/nightly-365741/jquery.qtip.min.css'>
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
    <?php
        if (!function_exists('gd_info')) {
            ?>
              <p>
                If you can read this, then this SP@in examples page has been
                deployed on a web server on which the PHP GD module is
                currently not available.  This module is utilized by SP@in to
                generate the CAPTCHA challenge graphics.
              </p>
              <p>
                SP@in UI will be disabled on client web browsers as long as
                the PHP GD module is not available on the web server.
              </p>
              <p>
                The procedure to install and configure the PHP GD module
                on the web server varies depending on the server type.  On a
                Debian-based Linux system, the appropiate command would be:
              </p>
              <code>
                sudo apt-get install php5-gd
              </code>
            <?php
        }

        /*
         *  The following variable enables this examples page, if set to True.
         *
         *  However, an enabled examples page can expose the configured email
         *  addresses even if these email addresses have not yet been
         *  published on the website.  Therefore, this examples page should
         *  only be enabled for debugging and troubleshooting, but disabled
         *  for public deployment.
         *
         *  SET THE FOLLOWING VARIABLE TO False IF DEPLOYED TO PUBLIC SITE:
         */
        $flagExamplePageEnabledSecurityRisk = False;
        if (!$flagExamplePageEnabledSecurityRisk) {
    ?>
      <p>
        If you can read this, then this SP@in examples page has been disabled
        for public deployment, to prevent unintended exposure of any
        configured email addresses that may not have yet been intended to be
        published.
      </p>
      <p>
        This examples page can be enabled by editing line 56 of this file,
        based on instructions on lines 46 - 54.
      </p>
    <?php
        } else {
    ?>
      <p>
        If you can read this, then this SP@in examples page has been enabled.
        This examples page should only be enabled for debugging and
        troubleshooting, but otherwise disabled for public deployment.  This
        is to prevent unintended exposure of any configured email addresses
        that may not have yet been intended to be published.
      </p>
      <p>
        This examples page can be disabled by editing line 33 of this file,
        based on instructions on lines 23 - 31.
      </p>
      <p>
        This example page is for SP@in version 0.1.7
      </p>
      <ul>
        <li>
          <p>
            Anchor tag injected via PHP convenience function
            'sp64inInjectTag(...)' with all default options:
            <br>
            <?php sp64inInjectTag() ?>
          </p>
        </li>
        <li>
          <p>
            PHP-injected anchor tag with non-default caption:
            <br>
            <?php sp64inInjectTag(array(
                'caption'=>"Send Email to Somebody")) ?>
          </p>
        </li>
        <li>
          <p>
            PHP-injected anchor tag with non-default CSS classes:
            <br>
            <?php sp64inInjectTag(array(
                'class'=>"as_bold as_italic")) ?>
          </p>
        </li>


        <li>
          <p>
            PHP-injected anchor tag with non-default CSS style:
            <br>
            <?php sp64inInjectTag(array(
                    'style'=> "display:block;width:15em;padding:0.4em;"
                              . "margin:0.6em;border: 2px dashed red;"
                              . "text-align:center"
                )) ?>
          </p>
        </li>

        <li>
          <p>
            PHP-injected anchor tag with key 'admin':
            <br>
            <?php sp64inInjectTag(array(
                'key'=>'admin')) ?>
          </p>
        </li>
        <li>
          <p>
            PHP-injected anchor tag with key 'support':
            <br>
            <?php sp64inInjectTag(array(
                'key'=>'support')) ?>
          </p>
        </li>

        <li>
          <p>
            PHP-injected anchor tag with a non-pre-statically-configured email
            address:
            <br>
            <?php sp64inInjectTagForNonConfigEmail("non_config@example.com") ?>
          </p>
        </li>

        <li>
          <p>
            Hard-coded mailto anchor tag originally empty:
            <br>
            <a href='mailto:sp@in'></a>
          </p>
        </li>
        <li>
          <p>
            Upper-case hard-coded mailto anchor tag originally empty:
            <br>
            <a href='MAILTO:SP@IN'></a>
          </p>
        </li>
        <li>
          <p>
            Hard-coded anchor tag originally empty:
            <br>
            <a href='#' data-sp64in='true'></a>
          </p>
        </li>
        <li>
          <p>
            Hard-coded anchor tag originally with custom content:
            <br>
            <a href='#' data-sp64in='true'>Send Email to Somebody</a>
          </p>
        </li>
        <li>
          <p>
            Hard-coded span tag:
            <br>
            <span data-sp64in='true'></span>
          </p>
        </li>
      </ul>

    <?php
        }
    ?>

    <script type='text/javascript'
        src='/components/sp@in/toolkits/jquery/jquery-1.8.3.min.js'>
    </script>
    <script type='text/javascript'
        src='/components/sp@in/toolkits/jquery/jquery.qtip-nightly.custom/nightly-365741/jquery.qtip.min.js'>
    </script>
    <script type='text/javascript'
        src='/components/sp@in/sp@in-v0.1.7-min.js'>
    </script>
  </body>
</html>
