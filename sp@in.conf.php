<?php if (!class_exists('SP64inCfg')) {class SP64inCfg {
// SP@in configuration starts here


    public $email_default = "webmaster@example.com";

    public $emails_keyed = array(
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

    public $urls_keyed = array(
            'sp64in'        => 'http://maratbn.com/projects/sp64in',
            'sp64in_github' => array(
                'caption'   => 'Visit SP@in (SP64in) GitHub page',
                'url'       => 'https://github.com/maratbn/sp64in')
        );

    //  This is the default CSS class for the parent <span>.
    public $class_parent_span = 'sp64in_parent';


// The default configuration below should not be modified in most cases

    //  If this flag is set to 'True' then rendered SP@in tags will have
    //  'mailto:' 'href's:
    public $flagUseMailto = True;

    //  If this flag is set to 'True', then all the email keys will always be
    //  rendered to the client encrypted rather than in cleartext.
    //
    //  Disabling this setting may sometimes be useful for debuging, but
    //  otherwise NOT RECOMMENDED.
    public $flagAlwaysEncryptKeys = True;

    //  If this flag is set to 'True', then all the email keys will always be
    //  encrypted with an additional random salt for each session.  This means
    //  that the same keys will never be encrypted the same across separate
    //  sessions, preventing correctly guessing the encrypted key tokens just
    //  by knowing how they look like encrypted.
    //
    //  Disabling this setting may sometimes be useful for debuging, but
    //  otherwise NOT RECOMMENDED.
    public $flagAlwaysEncryptWithSalt = True;


// SP@in configuration ends here
}
global $sp64in_cfg; $sp64in_cfg = new SP64inCfg();}?>
