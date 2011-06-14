<?php
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
