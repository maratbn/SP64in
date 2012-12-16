<?php
/**
 *  SP@in (SP64in) = Pain 4 SPAM website component for CAPTCHA-protecting
 *  email addresses from email address harvesting web crawlers.
 *
 *  http://maratbn.com/projects/sp64in
 *
 *  Version: 0.1.4
 *
 *  Copyright (c) 2011-2012 Marat Nepomnyashy  http://maratbn.com  maratbn@gmail
 *
 *  Module:         sp@in.php
 *
 *  Description:    Server-side PHP logic that provides convenience functions
 *                  for rendering SP@in achor tags / links into
 *                  server-generated PHP pages.
 *
 *                  It is not absolutely necessary to utilize the convenience
 *                  functions in this module in order to render SP@in
 *                  anchor tags on the page.
 *
 *                  For example on how to utilize this module in a PHP page,
 *                  see module 'example.php'.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *      * Redistributions of source code must retain the above copyright
 *        notice, this list of conditions and the following disclaimer.
 *      * Redistributions in binary form must reproduce the above copyright
 *        notice, this list of conditions and the following disclaimer in the
 *        documentation and/or other materials provided with the distribution.
 *      * Neither the name of the <organization> nor the
 *        names of its contributors may be used to endorse or promote products
 *        derived from this software without specific prior written permission.
 * 
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" 
 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 *  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 *  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 *  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 *  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 *  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 *  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 *  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 *  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 *
 */

    require_once('common.php');

    /**
     *  Injects SP@in email anchor tag into the server-side-rendered page.
     *
     *  @param  $opts                   Array with configuration parameters.
     *
     *  @param  $opts['caption']        String to display inside the tag.
     *
     *  @param  $opts['class']          String value of the tag attribute
     *                                                                'class'.
     *
     *  @param  $opts['key']            String value of the configured key in
     *                                  'sp@in.conf.php' associated with the
     *                                  email for which the email anchor tag
     *                                  will be rendered.
     *
     *                                  Email anchor tag will be rendered for
     *                                  the default email by default.
     *
     *  @param  $opts['style']          String value of the tag attribute
     *                                                                'style'.
     */
    function spainInjectTag(array $opts = array()) {

        //  This utility needs to access the configuration file to determine
        //  how to render the email anchor tags.
        require('sp@in.conf.php');

        $optsUse = array_merge(array(
                'caption'=>"Send Email",
                'class'=>"",
                'key'=>"",
                'style'=>""
            ), $opts);

        ?><img src='/components/sp@in/graphics/loading-1.gif' title='SP@in field initializing...'/><?php
        ?><a href='<?php

        if ($flagUseMailto) {
              ?>mailto:<?php
            if (strlen($optsUse['key'])) {
                ?><?=encryptKeyIfNeeded($optsUse['key'])?>_<?php
            }
                ?>sp@in<?php
        } else {
              ?>#' data-spain='<?php

            if (strlen($optsUse['key'])) {
              ?><?=encryptKeyIfNeeded($optsUse['key'])?><?php
            } else {
              ?>true<?php
            }
        }

              ?>'<?php

        if (strlen($optsUse['class'])) {
            ?> class='<?=$optsUse['class']?>'<?php
        }

            ?> style='<?=$optsUse['style']?>;visibility:hidden'<?php

          ?>><?php
          ?><?=$optsUse['caption']?><?php
        ?></a><?php
    }

    /**
     *  Injects SP@in email anchor tag into the server-side-rendered page for
     *  a dynamic email address that has not been statically configured in the
     *  file 'sp@in.conf.php'
     *
     *  @param  $opts                   Array with configuration parameters,
     *                                  same as for the function
     *                                  'spainInjectTag(...)' except for the
     *                                  'key' option, that is determined by
     *                                  this function.
     *
     *  strNonConfigEmail               String with the dynamic email address
     *                                  to render the tag for.
     */
    function spainInjectTagForNonConfigEmail(
        $strNonConfigEmail,
        array $opts = null) {

        //  This utility needs to access the configuration file to determine
        //  how to render the email anchor tags.
        require('sp@in.conf.php');

        //  Start a session if it was not started already:
        if (!strlen(session_id())) session_start();

        //  Now that the session has been initialized and configuration file
        //  loaded, it is time to get down to business.

        $strKeyUse = null;          //  This variable will hold the key.

        //  First need to check if the email address specified is actually
        //  configured already:
        $flagEmailAlreadyConfigured = False;
        if ($strNonConfigEmail == $email_default) {
            $flagEmailAlreadyConfigured = True;
        } else {
            foreach ($emails_keyed as $strKey => $strValue) {
                if ($strNonConfigEmail == $strValue) {
                    $strKeyUse = $strKey;
                    $flagEmailAlreadyConfigured = True;
                    break;
                }
            }
        }

        //  If the email address specified really is not an already configured
        //  address, then need to create a new key for it now.
        if (!$flagEmailAlreadyConfigured) {
            if (!array_key_exists('sp@in_keys_dynamic', $_SESSION)) {
                $_SESSION['sp@in_keys_dynamic'] = array();
            }
            if (array_key_exists(
                $strNonConfigEmail,
                $_SESSION['sp@in_keys_dynamic'])) {
                $strKeyUse = $_SESSION['sp@in_keys_dynamic'][$strNonConfigEmail];
            } else {
                $strKeyUse = uniqid("", True);
                $_SESSION['sp@in_keys_dynamic'][$strNonConfigEmail] = $strKeyUse;
                if (!array_key_exists('sp@in_emails_keyed_dynamic',
                                                                 $_SESSION)) {
                    $_SESSION['sp@in_emails_keyed_dynamic'] = array();
                }
                $_SESSION['sp@in_emails_keyed_dynamic'][$strKeyUse] =
                                                           $strNonConfigEmail;
            }
        }

        //  The key has now been either determined or generated.
        $optsUse = $opts;
        if (!$optsUse) $opsUse = array();
        $optsUse['key'] = $strKeyUse;

        //  Time to render the tag.
        spainInjectTag($optsUse);
    }
?>
