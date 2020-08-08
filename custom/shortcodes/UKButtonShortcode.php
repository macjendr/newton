<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class UKButtonShortcode extends Shortcode
{
    public function init()
    {
        $this->shortcode->getHandlers()->add('uk-button', static function(ShortcodeInterface $sc) {
            $class = $sc->getParameter('class');
            // $params = $sc->getParameters();
            $class_output = $class ? 'class="uk-button ' . $class . '"' : '';
            return '<button ' . $class_output . '>' . $sc->getContent() . '</button>'; // . implode("|",$params);
        });
    }
}