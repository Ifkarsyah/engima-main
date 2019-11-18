<?php

use Bramus\Router\Router;

require_once 'vendor/autoload.php';

spl_autoload_register(function ($className) {
    $className = str_replace("\\", DIRECTORY_SEPARATOR, $className);
    require_once $className . '.php';
});

$publicRoute = new Router();
$publicRoute->mount('', function () use ($publicRoute) {
    $userRoute = new Components\User\UserController();
    $publicRoute->post('/login', function () use ($userRoute, $publicRoute){
       $userRoute->login($_POST);
    });

    $publicRoute->post('/register', function () use ($userRoute, $publicRoute){
        $userRoute->register($_POST);
    });
});
$publicRoute->run();


$privateRoute = new Router();
$privateRoute->mount('', function () use ($privateRoute) {
    $privateRoute->before('GET|POST', '/', function () {
        // check is authenticated
        echo 'hai';
    });

    $privateRoute->mount('/movies', function () use ($privateRoute) {
        $moviesController = new Components\Movies\MoviesController();

        $privateRoute->get('/', function () use ($moviesController) {
            if (isset($_GET['keyword'])) {
                $moviesController->search($_GET['keyword'], $_GET['offset']);
            } else {
                $moviesController->showHomepage();
            }
        });

        $privateRoute->get('/(\d+)', function ($movieId) use ($moviesController) {
            $moviesController->getDetail($movieId);
        });

        $privateRoute->get('/(\d+)/schedules', function ($movieId) use ($moviesController) {
            $moviesController->getAvailableSchedules($movieId);
        });

        $privateRoute->get('/(\d+)/reviews', function ($movieId) use ($moviesController) {
            $moviesController->getReviewUser($movieId);
        });
    });

    $privateRoute->mount('/schedules', function () use ($privateRoute) {
        $scheduleController = new Components\Schedules\ScheduleController();
        $privateRoute->get('/(\d+)', function ($scheduleId) use ($scheduleController) {
            $scheduleController->getDetail($scheduleId);
        });
    });

    $privateRoute->mount('reviews', function () use ($privateRoute) {
        $reviewsController = new Components\Reviews\ReviewsController();
        $privateRoute->post('/user/(\d+)/schedule/(\d+)', function ($userId, $scheduleId) use ($reviewsController) {
            $comment = $_POST['comment'];
            $reviewsController->addReview($userId, $scheduleId, $comment);
        });
        $privateRoute->delete('/(\d+)', function ($reviewId) use ($reviewsController) {
            $comment = $_POST['comment'];
            $reviewsController->deleteReview($reviewId);
        });
    });
});
$privateRoute->run();