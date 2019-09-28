<div id="main-content">
    <h1>Transaction History</h1>

    <? foreach ($this->data['transactions'] as $transaction): ?>

    <?endforeach;?>
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
    </div>
</div>