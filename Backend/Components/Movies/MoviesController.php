<?php


namespace Components\Movies;


use Core\BaseController;
use Models\MoviesServices;

/**
 * Class MoviesController
 * @package Components
 */
class MoviesController extends BaseController
{
    public function __construct()
    {
        parent::__construct();
        require_once 'MoviesServices.php';
        $this->services = new MoviesServices();
    }
    public function getAvailableSchedules($movieId, $releaseDate)
    {
        if (!$this->services->isExistsMovieId($movieId))
        {
            $this->services->generate($movieId, $releaseDate);
        }
        $schedules = $this->services->getMovieSchedules($movieId);
        http_response_code(200);
        echo json_encode($schedules);
    }

    public function getReviewUser($movieId)
    {
        return array(
            1 => array(
                'userProfile' => 'https://picsum.photos/200',
                'username' => 'Minato',
                'rating' => 8,
                'comment' => 'good evening',
            ),
            2 => array(
                'userProfile' => 'https://picsum.photos/200',
                'username' => 'Minato',
                'rating' => 8,
                'comment' => 'good evening',
            ),
        );
    }
}