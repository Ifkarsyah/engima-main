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
        $dbResult = $this->db->execute(
            "SELECT m.id, title, poster, rating, plot 
                         FROM movies m JOIN schedules s on m.id = s.movie_id
                         WHERE m.title LIKE :querySearch COLLATE utf8_general_ci
                         GROUP BY m.id",
            [
                'querySearch' => '%' . $querySearch . '%',
                'pageNumber' => $pageNumber
            ]);
        $dbResult = $dbResult->getQueryResult();

        foreach ($dbResult as $row)
        {
            if (!$row->rating)
            {
                $row->rating = 'no rating';
            }
        }
        return  $dbResult;
    }
}