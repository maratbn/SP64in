<?php
    function isCaptchaValid() {
        //  Based on example at:
        //  http://www.ejeliot.com/pages/php-captcha

        require('php-captcha.inc.php');
        return (PhpCaptcha::Validate($_POST['validate']));
    }

    header('Content-Type: application/json');
    $output = array('is_valid' => isCaptchaValid() ? True : False);
    echo json_encode($output);
?>
