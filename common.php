<?php
/**
 *  SP@in (SP64in) = Pain 4 SPAM website component for CAPTCHA-protecting
 *  email addresses from email address harvesting web crawlers.
 *
 *  http://maratbn.com/projects/sp64in
 *
 *  Copyright (c) 2011-2013 Marat Nepomnyashy  http://maratbn.com  maratbn@gmail
 *
 *  Module:         common.php
 *
 *  Description:    Server-side PHP logic with some common internal utility
 *                  functions used by other SP@in component PHP files.
 *
 *                  This PHP file is not intended to be imported by any PHP
 *                  file that is not part of the SP@in website component
 *                  internal PHP logic.
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
 */

    /**
     *  SP@in internal logic function.  Not intended for calls from outside
     *  of SP@in.
     *
     *  Determines the URL path to the SP@in component installation location.
     *  This is used to direct the client to the appropriate server-side
     *  resources.
     */
    function sp64in_determineURLPath() {
        $strURLPath = substr(
                        dirname(__FILE__), strlen($_SERVER['DOCUMENT_ROOT']));
        if ($strURLPath[0] != '/') $strURLPath = '/' . $strURLPath;
        $strURLPath .= '/';
        return $strURLPath;
    }

    /**
     *  SP@in internal logic function.  Not intended for calls from outside
     *  of SP@in.
     *
     *  Encrypts the email key specified.
     */
    function sp64in_encryptKey($strKey) {
        //  Need to read the configuration setting
        //  '$flagAlwaysEncryptWithSalt':
        require('sp@in.conf.php');global $sp64in_cfg;

        //  Prepare string to encrypt:
        $strEncrypt = $strKey;

        //  Now need to check if the encryption should be salted:
        if ($sp64in_cfg->flagAlwaysEncryptWithSalt) {
            //  Start a session if it was not started already:
            if (!strlen(session_id())) session_start();

            //  Make sure to have a salt:
            if (!array_key_exists('sp@in_salt', $_SESSION)) {
                $_SESSION['sp@in_salt'] = uniqid("", True);
            }

            //  Add the salt:
            $strEncrypt .= $_SESSION['sp@in_salt'];
        }

        return sha1($strEncrypt);
    }

    /**
     *  SP@in internal logic function.  Not intended for calls from outside
     *  of SP@in.
     *
     *  Encrypts the email key specified according to the configuration
     *  setting '$flagAlwaysEncryptKeys' in the configuration file
     *  'sp@in.conf.php'.
     *
     *  @param  $strKey                 String with the email key to possibly
     *                                                                encrypt.
     */
    function sp64in_encryptKeyIfNeeded($strKey) {
        //  Need to read the configuration setting '$flagAlwaysEncryptKeys':
        require('sp@in.conf.php');global $sp64in_cfg;
        return $sp64in_cfg->flagAlwaysEncryptKeys
                                       ? sp64in_encryptKey($strKey) : $strKey;
    }

    /**
     *  SP@in internal logic function.  Not intended for calls from outside
     *  of SP@in.
     *
     *  Injects the actual SP@in anchor HTML tags into the
     *  server-side-rendered page.
     *
     *  @param  $opts                   Array with configuration parameters.
     *
     *  @param  $opts['caption']        String to display inside the tag.
     *
     *  @param  $opts['class']          String value for the tag attribute
     *                                                                'class'.
     *
     *  @param  $opts['data-sp']        String value for the tag attribute
     *                                                          'data-sp64in'.
     *
     *  @param  $opts['href']           String value for the tag attribute
     *                                                                 'href'.
     *
     *  @param  $opts['style']          String value for the tag attribute
     *                                                                'style'.
     */
    function sp64in_injectTag($opts) {

        //  This utility needs to access the configuration file to determine
        //  how to render the email anchor tags.
        require('sp@in.conf.php');global $sp64in_cfg;

        $strURLPath = sp64in_determineURLPath();

        ?><span class='<?=$sp64in_cfg->class_parent_span?>'><?php
          ?><img src='<?=$strURLPath?>/graphics/sp@in-loading-1.gif' title='SP@in field initializing...'/><?php
          ?><a href='<?=$opts['href']?>'<?php

        if (strlen($opts['data-sp'])) {
                ?> data-sp64in='<?=$opts['data-sp']?>'<?php
        }

        if (!function_exists('gd_info')) {
                ?> data-sp64in-nogd='true'<?php
        }

        if (!preg_match('/^\/components\/sp@in\/?$/', $strURLPath)) {
                ?> data-sp64in-path='<?= $strURLPath ?>'<?php
        }

        if (strlen($opts['class'])) {
              ?> class='<?=$opts['class']?>'<?php
        }

              ?> style='<?php
                ?><?=$opts['style']?>;<?php
                ?>visibility:hidden'><?php

            ?><?=$opts['caption']?></a><?php
        ?></span><?php
    }
?>
