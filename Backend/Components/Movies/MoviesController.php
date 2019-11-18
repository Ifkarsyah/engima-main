<?php


namespace Components\Movies;


use Core\BaseController;

/**
 * Class MoviesController
 * @package Components
 */
class MoviesController extends BaseController
{
    public function search($keyword, $offset)
    {
        if (!isset($offset)) {
            $offset = 1;
        }
    }

    public function showHomepage()
    {
        $movieList = array(
            1 => array(
                'movieId' => 1,
                'title' => 'Sample title',
                'rating' => 8, 5,
                'poster' => 'https://picsum.photos/200'
            ),
            2 => array(
                'movieId' => 1,
                'title' => 'Sample title',
                'rating' => 8.5,
                'poster' => 'https://picsum.photos/200'
            ),
            3 => array(
                'movieId' => 1,
                'title' => 'Sample title',
                'rating' => 8.5,
                'poster' => 'https://picsum.photos/200'
            ),
            4 => array(
                'movieId' => 1,
                'title' => 'Sample title',
                'rating' => 8.5,
                'poster' => 'https://picsum.photos/200'
            ),
        );
        http_response_code(200);
        echo json_encode($movieList);
    }

    public function getDetail($movieId)
    {
        $movieDetail =  array(
            'poster' => 'https://picsum.photos/200',
            'title' => 'Joker',
            'releasedDate' => '2019-10-2',
            'rating' => 8.5,
            'duration' => 182,
            'plot' => 'lorem ipsum dolor sit amet'
        );
        http_response_code(200);
        echo json_encode($movieDetail);
    }

    public function getAvailableSchedules($movieId)
    {
        $schedules =  array(
            1 => array(
                'scheduleId' => 1,
                'time' => '20:20',
                'availableSeat' => 20,
            ),
            2 => array(
                'scheduleId' => 1,
                'time' => '20:20',
                'availableSeat' => 20,
            ),
        );
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