<?php
/**
 *  SP@in (SP64in) = Pain 4 SPAM website component for CAPTCHA-protecting
 *  email addresses from email address harvesting web crawlers.
 *
 *  http://maratbn.com/projects/sp64in
 *
 *  Copyright (c) 2011-2013 Marat Nepomnyashy  http://maratbn.com  maratbn@gmail
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
     *  Initializes the PHP session used by SP@in, if a PHP session has not
     *  already been initialized.  
     *
     *  This function adds a session cookie to the HTTP response, and
     *  therefore must be called before any HTTP response generation, so that
     *  the session cookie gets included in the HTTP headers.
     */
    function sp64inInit() {
        //  Need to read the configuration setting
        //  '$flagAlwaysEncryptWithSalt':
        require('sp@in.conf.php');

        //  Now need to check if the encryption should be salted:
        //  (as the PHP session is currently used only to store that salt)
        if ($flagAlwaysEncryptWithSalt) {
            //  Start a session if it was not started already:
            if (!strlen(session_id())) session_start();
        }
    }

    /**
     *  Calls the function 'sp64inInjectTagForEmail()'.
     *
     *  @deprecated  Use 'sp64inInjectTagForEmail()' instead.
     */
    function sp64inInjectTag(array $opts = array()) {
        sp64inInjectTagForEmail($opts);
    }

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
    function sp64inInjectTagForEmail(array $opts = array()) {

        //  This utility needs to access the configuration file to determine
        //  how to render the email anchor tags.
        require('sp@in.conf.php');

        $optsUse = array_merge(array(
                'caption'=>'Send Email',
                'class'=>"",
                'key'=>"",
                'style'=>""
            ), $opts);

        $strAttrHref = '#';
        if ($flagUseMailto) {
            $strAttrHref = 'mailto:' .
                            (strlen($optsUse['key'])
                                ? (sp64in_encryptKeyIfNeeded($optsUse['key'])
                                                                        . '_')
                                : '') . 'sp@in';
        }

        $strAttrDataSp = null;
        if (function_exists('gd_info')) {
            if (!$flagUseMailto) {
                if (strlen($optsUse['key'])) {
                    $strAttrDataSp = sp64in_encryptKeyIfNeeded($optsUse['key']);
                } else {
                    $strAttrDataSp = 'true';
                }
            }
        } else {
            $strAttrDataSp = 'nogd';
        }

        $strURLPath = sp64in_determineURLPath();

        ?><img src='<?=$strURLPath?>/graphics/sp@in-loading-1.gif' title='SP@in field initializing...'/><?php
        ?><a href='<?=$strAttrHref?>'<?php

        if ($strAttrDataSp) {
              ?> data-sp64in='<?= $strAttrDataSp ?>'<?php
        }

        if (!function_exists('gd_info')) {
              ?> data-sp64in-nogd='true'<?php
        }

        if (!preg_match('/^\/components\/sp@in\/?$/', $strURLPath)) {
              ?> data-sp64in-path='<?= $strURLPath ?>'<?php
        }

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
     *                                  'sp64inInjectTag(...)' except for the
     *                                  'key' option, that is determined by
     *                                  this function.
     *
     *  strNonConfigEmail               String with the dynamic email address
     *                                  to render the tag for.
     */
    function sp64inInjectTagForNonConfigEmail(
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
        sp64inInjectTag($optsUse);
    }
?>
