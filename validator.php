<?php
    function isCaptchaValid() {
        //  Based on example at:
        //  http://www.ejeliot.com/pages/php-captcha
        require('php-captcha.inc.php');
        return PhpCaptcha::Validate($_POST['validate']) ? True : False;
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

    $isValid = isCaptchaValid();

    $output = array('is_valid' => $isValid);

    if ($isValid) {
        setEmailData($output);
    }

    echo json_encode($output);
?>
