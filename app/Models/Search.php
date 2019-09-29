<?php


namespace App\Models;


use App\Core\BaseModel;

/**
 * Class Search
 * @package App\Models
 */
class Search extends BaseModel
{
    public function searchMovies($querySearch, $pageNumber)
    {
        $initialData = ($pageNumber * 6) - 6;
        $dbResult = $this->db->execute(
            "SELECT id, title, plot, rating, poster 
                         FROM movies m
                         WHERE title LIKE '%$querySearch%'
                         LIMIT $initialData, 6",
        );
        $dbResult = $dbResult->getQueryResult();

        // foreach ($dbResult as $row)
        // {
        //     if (!$row->rating)
        //     {
        //         $row->rating = 'no rating';
        //     }
        // }
        return  $dbResult;
    }

    public function totalMovies($querySearch)
    {
        $dbResult = $this->db->execute(
            "SELECT id, title, plot, rating, poster 
                         FROM movies m
                         WHERE title LIKE '%$querySearch%'",
        );
        $dbResult = $dbResult->getQueryResult();

        // -- // foreach ($dbResult as $row)
        // -- // {
        // -- //     if (!$row->rating)
        // -- //     {
        // -- //         $row->rating = 'no rating';
        // -- //     }
        // -- // }

        return  count($dbResult);
    }    
}