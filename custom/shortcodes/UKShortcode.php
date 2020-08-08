<?php
namespace Grav\Plugin\Shortcodes;

use Thunder\Shortcode\Shortcode\ShortcodeInterface;

class UKShortcode extends Shortcode
{
    public function init()
    {
        $this->shortcode->getHandlers()->add('uk', static function(ShortcodeInterface $sc) {
            $values = $sc->getParameters();
            $keys = array_keys($values);
            $attrs = '';
            $no_parsing = ['tag', 'class', 'width', 'height', 'href'];
            foreach ($values as $key => $value) {
                if ($key === 'class') {
                    $value = preg_replace('/(?!uc-)\A|\s(?!uc-)/', '$0uk-$1', $value);
                }
                if (!(in_array($key, $no_parsing)) && !(preg_match('/data-*/', $key))) {
                    $key = 'uk-' . $key;
                }
                if ($key !== 'tag') {
                    $attrs .= ' ' . $key . ($value !== '' ? '="' . $value . '"' : '');
                }
            }
            $tag = array_key_exists('tag', $values) ? $values['tag'] : 'div';
            return '<' . $tag . ' ' . $attrs . '>' . $sc->getContent() . '</' . $tag . '>';
        });
    } 
}