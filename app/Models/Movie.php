<?php


namespace App\Models;


use App\Core\BaseModel;

class Movie extends BaseModel
{

    public function getMovieListToday()
    {
        // TODO : SELECT
        return array($this->getMovieDetailByID(1), $this->getMovieDetailByID(2));
    }

    public function getMovieDetailByID($id)
    {

    }

    // Helper
    private function getMovieRatingByID($id)
    {
        return 8.4;
    }

    private function getMovieGenreListByID($id)
    {
        return ['drama', 'history'];
    }
}