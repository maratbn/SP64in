<?php
    //  Based on example at:
    //  http://www.ejeliot.com/pages/php-captcha

    require('php-captcha.inc.php');
    $aFonts = array('./Purisa-Oblique.ttf');
    $oVisualCaptcha = new PhpCaptcha($aFonts, 250, 70);
    $oVisualCaptcha->Create();
?>
