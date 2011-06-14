<?php
/**
 *  @ntisp@m website component for CAPTCHA-protecting email addresses from
 *  email address harvesting web crawlers.
 *
 *  Copyright (c) 2011 Marat Nepomnyashy    maratbn@gmail
 *
 *  Module:         @ntisp@m.php
 *
 *  Description:    @ntisp@m server-side component for validating CAPTCHAs
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

    function isCaptchaValid($arg_validate) {
        //  Based on example at:
        //  http://www.ejeliot.com/pages/php-captcha
        require('php-captcha.inc.php');
        return PhpCaptcha::Validate($arg_validate) ? True : False;
    }

    # Sets email and recall data on the output hash map.
    function setEmailData(&$output) {
        $recall_id = uniqid(True);

        session_name('@ntisp@m');
        session_start();
        $_SESSION['recall'][$recall_id] = True;

        require('email.conf.php');

        $output['email']        = $email_default;
        $output['recall_id']    = $recall_id;
    }

    header('Content-Type: application/json');

    $output = array();

    $flagOKtoOutputData = False;

    $arg_recall = $_POST['recall'];
    if ($arg_recall) {
        session_name('@ntisp@m');
        session_start();
        if ($_SESSION['recall'][$arg_recall]) {
            $_SESSION['recall'][$arg_recall] = False;
            $flagOKtoOutputData = True;
        }
    } else {
        $arg_validate = $_POST['validate'];
        if ($arg_validate) {
            $isValid = isCaptchaValid($arg_validate);
            $output['is_valid'] = $isValid;
            if ($isValid) $flagOKtoOutputData = True;
        }
    }

    if ($flagOKtoOutputData) {
        setEmailData($output);
    }

    echo json_encode($output);
?>
