<?php
    //  This configuration file is intended for SP@in (SP64in) version 0.1.9

    $email_default = "webmaster@example.com";

    $emails_keyed = array(
            'webmaster'     => 'joe_the_webmaster@example.com',
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

    //  If this flag is set to 'True', then all the email keys will always be
    //  encrypted with an additional random salt for each session.  This means
    //  that the same keys will never be encrypted the same across separate
    //  sessions, preventing correctly guessing the encrypted key tokens just
    //  by knowing how they look like encrypted.
    //
    //  Disabling this setting may sometimes be useful for debuging, but
    //  otherwise NOT RECOMMENDED.
    $flagAlwaysEncryptWithSalt = True;
?>
