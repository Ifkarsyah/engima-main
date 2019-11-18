<?php


namespace Utilities;


/**
 * Class Redirect
 * @package Utilities
 */
class Redirect
{
    /**
     * @param string $location
     */
    public static function to($location = '')
    {
        header('Location:' . URL_BASE_PUBLIC . $location);
        die();
    }
}