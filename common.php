<?php
/**
 *  SP@in (SP64in) = Pain 4 SPAM website component for CAPTCHA-protecting
 *  email addresses from email address harvesting web crawlers.
 *
 *  http://maratbn.com/projects/sp64in
 *
 *  Version: RELEASE_SP64in
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
?>
