<?php


namespace App\Utilities;


class Redirect
{
    public static function to($location = '')
    {
        header('Location:' . $location);
        die();
    }
}