<?php

use Bramus\Router\Router;

require_once 'vendor/autoload.php';

spl_autoload_register(function ($className) {
    $className = str_replace("\\", DIRECTORY_SEPARATOR, $className);
    require_once $className . '.php';
});


function getJsonBody(): array
{
    $rawData = file_get_contents("php://input");
    return json_decode($rawData, true);
}

function cors(): void
{
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: *');
    header('Access-Control-Allow-Headers: *');
    header('Access-Control-Allow-Credentials: true');
}

$publicRoute = new Router();
$publicRoute->options('/.*', function () {
    cors();
});

$publicRoute->before('GET|POST|UPDATE|DELETE', '/.*', function() {
    cors();
});

$publicRoute->mount('', function () use ($publicRoute) {
    $userRoute = new Components\User\UserController();
    $publicRoute->post('/login', function () use ($userRoute, $publicRoute) {
        $userRoute->login(getJsonBody());
    });

    $publicRoute->post('/register', function () use ($userRoute, $publicRoute) {
        $userRoute->register($_POST);
    });
});
$publicRoute->run();

/////////////////////////////////////// PRIVATE ROUTE //////////////////////////////////////////
$privateRoute = new Router();
$privateRoute->options('/.*', function () {
    cors();
});

$privateRoute->before('GET|POST|UPDATE|DELETE', '/.*', function() {
    cors();
});


$privateRoute->get('/user/username', function () use ($privateRoute){
    $userRoute = new Components\User\UserController();
    $userRoute->getUsername($_GET['token']);
});

$privateRoute->mount('', function () use ($privateRoute) {
    $privateRoute->mount('/movies', function () use ($privateRoute) {
        $moviesController = new Components\Movies\MoviesController();
        $privateRoute->get('/(\d+)/schedules', function ($movieId) use ($moviesController) {
            if (!isset($_GET['release_date']))
            {
                http_response_code(400);
                exit();
            }
            $moviesController->getAvailableSchedules($movieId, $_GET['release_date']);
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