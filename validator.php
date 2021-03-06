<?php
/**
 *  SP@in (SP64in) = Pain 4 SPAM website component for CAPTCHA-protecting
 *  email addresses from email address harvesting web crawlers.
 *
 *  http://maratbn.com/projects/sp64in
 *
 *  Copyright (c) 2011-2013 Marat Nepomnyashy  http://maratbn.com  maratbn@gmail
 *
 *  Module:         validator.php
 *
 *  Description:    SP@in server-side component for validating CAPTCHAs
 *                  entered by the user, and responding with email address
 *                  data to remote web users who successfuly validated the
 *                  CAPTCHA.
 *
 *                  This is intended to be a stand-alone PHP file that should
 *                  not be included by any other PHP file or server-side
 *                  component.
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

    require_once('common.php');

    function isCaptchaValid($arg_validate) {
        //  Based on example at:
        //  http://www.ejeliot.com/pages/php-captcha
        require('./php-captcha/php-captcha.inc.php');
        $isValid = PhpCaptcha::Validate($arg_validate) ? True : False;

        return $isValid;
    }

    # Sets email and recall data on the output hash map.
    function setEmailData(&$output) {

        //  This creates and saves a recall id so that the user does not have
        //  to enter the CAPTCHA more than once:
        if (!array_key_exists('sp@in_recall', $_SESSION))
            $_SESSION['sp@in_recall'] = array();

        $recall_id = uniqid("", True);
        $_SESSION['sp@in_recall'][$recall_id] = True;

        require('sp@in.conf.php');global $sp64in_cfg;

        $arrEmailsKeyed = null;
        $arrUrlsKeyed = null;

        //  May need to merge-in the dynamically generated keys.
        if (array_key_exists('sp@in_emails_keyed_dynamic', $_SESSION)) {
            $arrEmailsKeyed = array_merge(
                                    $sp64in_cfg->emails_keyed,
                                    $_SESSION['sp@in_emails_keyed_dynamic']);
        } else {
            $arrEmailsKeyed =& $sp64in_cfg->emails_keyed;
        }
        $arrUrlsKeyed =& $sp64in_cfg->urls_keyed;

        //  Here need to encrypt all keys as dictated by the configuration.
        $arrEmailsKeyedEnc = null;
        if ($sp64in_cfg->flagAlwaysEncryptKeys) {
            $arrEmailsKeyedEnc = array();
            foreach ($arrEmailsKeyed as $strKey => $strEmail) {
                $arrEmailsKeyedEnc[sp64in_encryptKey($strKey)] = $strEmail;
            }
        }
        $arrUrlsKeyedEnc = null;
        if ($sp64in_cfg->flagAlwaysEncryptKeys) {
            $arrUrlsKeyedEnc = array();
            foreach ($arrUrlsKeyed as $strKey => $strUrl) {
                $arrUrlsKeyedEnc[sp64in_encryptKey($strKey)] = $strUrl;
            }
        }

        //  Now will pick out only the keys within which the client is
        //  interested:
        $arg_keysNeeded = array_key_exists('keys', $_POST)
                                                      ? $_POST['keys'] : "";
        $arrKeysNeeded = explode(" ", $arg_keysNeeded);

        $arrUrlsKeyedNeeded = array();

        $arrEmailsKeyedPickFrom =& $arrEmailsKeyedEnc ? $arrEmailsKeyedEnc
                                                            : $arrEmailsKeyed;
        foreach ($arrKeysNeeded as $strKey) {
            if (!array_key_exists($strKey, $arrEmailsKeyedPickFrom))
                continue;

            $arrUrlsKeyedNeeded[$strKey] = array(
                'caption' => $arrEmailsKeyedPickFrom[$strKey],
                'url' => ('mailto:' . $arrEmailsKeyedPickFrom[$strKey]));
        }

        $arrUrlsKeyedPickFrom =& $arrUrlsKeyedEnc ? $arrUrlsKeyedEnc
                                                              : $arrUrlsKeyed;
        foreach ($arrKeysNeeded as $strKey) {
            if (!array_key_exists($strKey, $arrUrlsKeyedPickFrom))
                continue;

            $dataUrl = $arrUrlsKeyedPickFrom[$strKey];
            if (!$dataUrl) continue;

            if (is_array($dataUrl)) {
                $arrUrlsKeyedNeeded[$strKey] = $dataUrl;
            } else {
                $arrUrlsKeyedNeeded[$strKey] = array(
                    'caption' => ('Visit ' . $dataUrl),
                    'url' => $dataUrl);
            }
        }

        $output['urls']               = array();
        $output['urls']['def']
                    = array(
                        'caption' => $sp64in_cfg->email_default,
                        'url' => ('mailto:' . $sp64in_cfg->email_default));
        $output['urls']['keyed']        = $arrUrlsKeyedNeeded;
        $output['recall_id']            = $recall_id;
        $output['is_req_validated']     = True;
    }

    header('Content-Type: application/json');

    $output = array();

    $flagUserSolvedCaptcha = False;

    $arg_recall = array_key_exists('recall', $_POST) ? $_POST['recall'] : "";
    $arg_validate = array_key_exists('validate', $_POST)
                                                    ? $_POST['validate'] : "";

    if ($arg_validate) {
        $isValid = isCaptchaValid($arg_validate);
        $output['is_valid'] = $isValid;
        if ($isValid) $flagUserSolvedCaptcha = True;
    }

    //  Start a session if it was not started already:
    if (!strlen(session_id())) session_start();

    if (!$arg_validate && $arg_recall) {
        if (array_key_exists('sp@in_recall', $_SESSION) &&
            array_key_exists($arg_recall, $_SESSION['sp@in_recall']) &&
                                     $_SESSION['sp@in_recall'][$arg_recall]) {
            $_SESSION['sp@in_recall'][$arg_recall] = False;
            $flagUserSolvedCaptcha = True;
        }
    }

    if ($flagUserSolvedCaptcha) {
        setEmailData($output);
    }

    echo json_encode($output);
?>
