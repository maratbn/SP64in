<?php
    $email_default = "webmaster@example.com";

    $emails_keyed = array(
            'admin'         => 'tom_the_admin@example.com',
            'president'     => 'roy@example.com',
            'vpresident'    => 'franklin@example.com',
            'ceo'           => 'art@example.com',
            'treasurer'     => 'max@example.com',
            'pubrelations'  => 'roz@example.com',
            'sales'         => 'rudy@example.com',
            'support'       => 'ellen@example.com',
            'product'       => 'violet@example.com',
            'marketing'     => 'clark@example.com',
            'engineering'   => 'brad@example.com'
        );

    //  If this flag is set to 'True' then rendered SP@in tags will have
    //  'mailto:' 'href's:
    $flagUseMailto = True;

    //  If this flag is set to 'True', then all the email keys will always be
    //  rendered to the client encrypted rather than in cleartext.
    //
    //  Disabling this setting may sometimes be useful for debuging, but
    //  otherwise NOT RECOMMENDED.
    $flagAlwaysEncryptKeys = True;
?>