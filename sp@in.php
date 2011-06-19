<?php
/**
 *  SP@in website component for CAPTCHA-protecting email addresses from
 *  email address harvesting web crawlers.
 *
 *  Copyright (c) 2011 Marat Nepomnyashy  http://maratbn.com  maratbn@gmail
 *
 *  Module:         sp@in.php
 *
 *  Description:    Server-side PHP logic that provides convenience functions
 *                  for rendering SP@in achor tags / links into
 *                  server-generated PHP pages.
 *
 *                  It is not absolutely necessary to utilize the convenience
 *                  functions in this module in order to render SP@in
 *                  anchor tags on the page.
 *
 *                  For example on how to utilize this module in a PHP page,
 *                  see module 'example.php'.
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
 * 
 *
 */

    /**
     *  Injects SP@in email anchor tag into the server-side-rendered page.
     *
     *  @param  $args                   Array with configuration parameters.
     *
     *  @param  $args['caption']        String to display inside the tag.
     *
     *  @param  $args['class']          String value of the tag attribute
     *                                                                'class'.
     *
     *  @param  $args['style']          String value of the tag attribute
     *                                                                'style'.
     */
    function asInjectEmailAnchorHere(array $args = array()) {

        //  This utility needs to access the configuration file to determine
        //  how to render the email anchor tags.
        require('email.conf.php');

        $argsUse = array_merge(array(
                'caption'=>"Send Email",
                'class'=>"",
                'key'=>"",
                'style'=>""
            ), $args);

        ?><a href='<?php

        if ($flagUseMailto) {
              ?>mailto:<?=$argsUse['key']?>sp@in<?php
        } else {
              ?>#' data-spain='<?php

            if ($argsUse['key']) {
              ?><?=$argsUse['key']?><?php
            } else {
              ?>true<?php
            }
        }

              ?>'<?php

        if ($argsUse['class']) {
            ?> class='<?=$argsUse['class']?>'<?php
        }

            ?> style='<?=$argsUse['style']?>;visibility:hidden'<?php

          ?>><?php
          ?><?=$argsUse['caption']?><?php
        ?></a><?php
    }
?>