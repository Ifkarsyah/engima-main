<div id="main-content">
    <h1>Transaction History</h1>

    <? foreach ($this->data['transactions'] as $transaction): ?>
        <div id="movie">
            <img id="moviepic" src="/tugas-besar-1-2019/public/img/movie/movie-<?php echo $transaction->movie_id;?>.jpg">
            <div id="movietext" class="container">
                <div>
                    <h2 id="movietitle"><?php echo $transaction->title; ?></h2>
                    <div id="moviedesc" class="container">
                        <span id="schedule">
                            <span style="color: rgb(0, 178, 190)">Schedule: </span>
                            <span><?php echo $transaction->date_time; ?></span>
                        </span>
                    </div>
                </div>
                <?php if($transaction->is_can_review): ?>
                    <?php if($transaction->is_review_exists): ?>
                        <span>
                        <a href= "<? echo URL_BASE_PUBLIC . "review/" . $transaction->id; ?>"><button id="editreview">Edit Review</button></a>
                        </span>
                        <span>
                            <a href= "<? echo URL_BASE_PUBLIC . "transaction/deleteReview/" . $transaction->id;?>"><button id="deletereview">Delete Review</button></a>
                        </span>
                    <?php else: ?>
                        <a href= "<? echo URL_BASE_PUBLIC . "review/" . $transaction->id; ?>"><button id="addreview">Add Review</button></a>
                    <?php endif; ?>
                        
                <?php endif; ?>
    <?endforeach;?>

    <!-- <div id="movie">
        <img id="moviepic" src="../../../transhistpage/Captain%20Marvel.jpg" alt="Captain Marvel">
        <div id="movietext" class="container">
            <div>
                <h2 id="movietitle">Captain Marvel</h2>
                <div id="moviedesc" class="container">
                    <span id="schedule">
                        <span style="color: rgb(0, 178, 190)">Schedule: </span>
                        <span> September 29, 2019 - 03.00 PM</span>
                    </span>
                </div>
            </div>
            <button id="addreview">Add Review</button>
        </div>
        <hr noshade>
    </div>

    <div id="movie">
        <img id="moviepic" src="../../../transhistpage/Captain%20Marvel.jpg" alt="Captain Marvel">
        <div id="movietext" class="container">
            <div>
                <h2 id="movietitle">Captain Marvel</h2>
                <div id="moviedesc" class="container">
                    <span id="schedule">
                        <span style="color: rgb(0, 178, 190)">Schedule: </span>
                        <span> September 29, 2019 - 03.00 PM</span>
                    </span>
                </div>
            </div>
            <span>
                <button id="editreview">Edit Review</button>
            </span>
            <span>
                <button id="deletereview">Delete Review</button>
            </span>
        </div>
        <hr noshade>
    </div> -->
</div>