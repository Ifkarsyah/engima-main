<?php use App\Core\BaseController;

if (isset(BaseController::$userLoggedIn)): ?>
    <p>Engima. Search Tab. Transactions. </p>
    <a href="<? URL_BASE_PUBLIC; ?>logout">Logout</a>
<? else: ?>
    <p>Engima. Search Tab. Transactions. Nyuruh Login</p>
<?endif; ?>
