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
        $reviewList = $this->services->getListReviewByMovieID($movieId);
        if (empty($reviewList)) {
            http_response_code(200);
            echo json_encode(array('results' => []));
        } else {
            http_response_code(200);
            echo json_encode(array('results' => $reviewList));
        };
    }
}