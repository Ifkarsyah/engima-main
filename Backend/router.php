<?php

use Bramus\Router\Router;

require_once 'vendor/autoload.php';

spl_autoload_register(function ($className) {
    $className = str_replace("\\", DIRECTORY_SEPARATOR, $className);
    require_once $className . '.php';
});

$router = new Router();

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

$router->options('/.*', function () {
    cors();
});

$router->before('GET|POST|UPDATE|DELETE', '/.*', function() {
    cors();
});

$router->mount('', function () use ($router) {
    $userRoute = new Components\User\UserController();
    $router->post('/login', function () use ($userRoute, $router) {
        $userRoute->login(getJsonBody());
    });

    $router->post('/register', function () use ($userRoute, $router) {
        $userRoute->register($_POST);
    });
});

$router->mount('', function () use ($router) {
    $router->mount('/movies', function () use ($router) {
        $moviesController = new Components\Movies\MoviesController();

        $router->get('/', function () use ($moviesController) {
            if (isset($_GET['keyword'])) {
                $moviesController->search($_GET['keyword'], $_GET['offset']);
            } else {
                $moviesController->showHomepage();
            }
        });

        $router->get('/(\d+)', function ($movieId) use ($moviesController) {
            $moviesController->getDetail($movieId);
        });

        $router->get('/(\d+)/schedules', function ($movieId) use ($moviesController) {
            $moviesController->getAvailableSchedules($movieId);
        });

        $router->get('/(\d+)/reviews', function ($movieId) use ($moviesController) {
            $moviesController->getReviewUser($movieId);
        });
    });

    $router->mount('/schedules', function () use ($router) {
        $scheduleController = new Components\Schedules\ScheduleController();
        $router->get('/(\d+)', function ($scheduleId) use ($scheduleController) {
            $scheduleController->getDetail($scheduleId);
        });
    });

    $router->mount('reviews', function () use ($router) {
        $reviewsController = new Components\Reviews\ReviewsController();
        $router->post('/user/(\d+)/schedule/(\d+)', function ($userId, $scheduleId) use ($reviewsController) {
            $comment = $_POST['comment'];
            $reviewsController->addReview($userId, $scheduleId, $comment);
        });
        $router->delete('/(\d+)', function ($reviewId) use ($reviewsController) {
            $comment = $_POST['comment'];
            $reviewsController->deleteReview($reviewId);
        });
    });
});
$router->run();