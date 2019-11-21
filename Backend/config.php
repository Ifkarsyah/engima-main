<?php

define('URL_BASE_ENGIMA', 'http://localhost/engima/Backend');
define('URL_BASE_PUBLIC', URL_BASE_ENGIMA . '/public_html');
define('URL_BASE_COMPONENT', URL_BASE_ENGIMA . '/App/Components');
define('URL_BASE_TEMPLATE', URL_BASE_ENGIMA . '/App/Templates');

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'engima');

define('COOKIE_USER', 'userLogin');
define('COOKIE_EXPIRE', time() + 3600);
define('ENGIMA_TOKEN_SECRET', 'engima_token');

date_default_timezone_set('Asia/Jakarta');

