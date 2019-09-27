<form action="<? echo URL_BASE_PUBLIC . 'register/proceed'?>" method="post" enctype="multipart/form-data">

    <div class="container">
        <label><h1>Welcome to <b>Engi</b>ma!</h1></label>
        <label for="username"><h3>Username</h3></label>
        <input type="text" placeholder="joh@doe.com" name="username" required>

        <label for="email"><h3>Email Address</h3></label>
        <input type="text" placeholder="joh@doe.com" name="email" required>

        <label for="phone"><h3>Phone Number</h3></label>
        <input type="text" placeholder="+62813xxxxxxxx" name="phone" required>

        <label for="password"><h3>Password</h3></label>
        <input type="password" placeholder="make as strong as possible" name="password" required>

        <label for="confirmPassword"><h3>Confirm Password</h3></label>
        <input type="text" placeholder="same as above" name="confirmPassword" required>

        <label for="profilePic"><h3>Profile Picture</h3></label>
        <input type="file" placeholder="" name="profilePic" required>
        <button class="button_browse">Browse</button>


        <button type="submit">Register</button>
        <label><h4>Already have account? <a href="<? echo URL_BASE_PUBLIC . 'login'?>">Login here </a href></h4></label>
    </div>
</form>