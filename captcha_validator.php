<?php
    require('email.conf.php');
    require('php-captcha.inc.php');

    function isCaptchaValid() {
        //  Based on example at:
        //  http://www.ejeliot.com/pages/php-captcha

        return (PhpCaptcha::Validate($_POST['validate']));
    }

    header('Content-Type: application/json');

    $isValid = isCaptchaValid();
    $output = array(
                'is_valid' => $isValid ? True : False,
                'email' => $isValid ? $email_default : "");

    echo json_encode($output);
?>
