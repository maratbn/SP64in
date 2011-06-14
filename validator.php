<?php
    require('email.conf.php');
    require('php-captcha.inc.php');

    function isCaptchaValid() {
        //  Based on example at:
        //  http://www.ejeliot.com/pages/php-captcha

        return PhpCaptcha::Validate($_POST['validate']) ? True : False;
    }

    header('Content-Type: application/json');

    $isValid = isCaptchaValid();

    $output = array('is_valid' => $isValid);

    if ($isValid) {
        $recall_id = uniqid(True);

        session_name('@ntisp@m');
        session_start();
        $_SESSION['recall'][$recall_id] = True;

        $output['email']        = $email_default;
        $output['recall_id']    = $recall_id;
    }

    echo json_encode($output);
?>
