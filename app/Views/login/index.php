<h1>Login Page</h1>
<form action="<?php echo URL_BASE_PUBLIC; ?>login/proceed" method="post">
    Username: <input type="text" name="username"><br>
    Password: <input type="password" name="password"><br>
    <input type="submit">
</form>
<p>Don't have an account? <a href="<?php echo URL_BASE_PUBLIC; ?>register/index">Register Here</a> </p>