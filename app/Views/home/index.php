<?php use App\Core\BaseController;

if (isset(BaseController::$userLoggedIn)): ?>
    <p>Hello, <? echo BaseController::$userLoggedIn->getUsername(); ?></p>
<? else: ?>
    <h1>User is logout</h1>
<?endif; ?>
