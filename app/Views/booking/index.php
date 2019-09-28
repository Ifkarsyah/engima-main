<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="booking.css">
</head>

<body>
        <div class="nav">
                <ul>
                    <li><a class="active" href="#home"><engima><eng>Engi</eng>ma</engima></a></li>
                    <li><input type="text2" placeholder="Search movie" name="search2"></li>
                    <li style="float:right"><a href = "#home"><navbar>Logout</navbar></a></li>
                    <li style="float:right"><a href = "#home"><navbar>Transaction</navbar></a></li>
                </ul>
        </div>

<div id="result">
    <a href="#" class="previous">&#8249;</a>
    <div class="movschedule">
        <div id="movietitle">SPIDER-MAN FAR FROM HOME</div>
        <div id="release-date">July 2, 2019</div>
    </div>
    <hr></hr>
    <div class="booking">
        <div class="flex-container">
                <div class="notbooked">1</div>
                <div class="booked">2</div>
                <div class="notbooked">3</div>
                <div class="notbooked">4</div>
                <div class="booked">5</div>
                <div class="notbooked">6</div>
                <div class="booked">7</div>
                <div class="notbooked">8</div>
                <div class="booked">9</div>
                <div class="notbooked">10</div>
                <div class="booked">11</div>
                <div class="notbooked">12</div>
                <div class="notbooked">13</div>
                <div class="notbooked">14</div>
                <div class="notbooked">15</div>
                <div class="notbooked">16</div>
                <div class="booked">17</div>
                <div class="notbooked">18</div>
                <div class="notbooked">19</div>
                <div class="notbooked">20</div>
                <div class="notbooked">21</div>
                <div class="notbooked">22</div>
                <div class="booked">23</div>
                <div class="notbooked">24</div>
                <div class="notbooked">25</div>
                <div class="notbooked">26</div>
                <div class="booked">27</div>
                <div class="booked">28</div>
                <div class="notbooked">29</div>
                <div class="booked">30</div>
                <div class="screen">Screen</div>
        </div>    
        <div class="confirmation">
            <div class="booking-top"><booking>Booking Summary</booking></div>
            <div class="booking-detail">
                    <div id="detailtitle">SPIDER-MAN FAR FROM HOME</div>
                    <div id="release-date">July 2, 2019</div>
            </div>
            <div class="seat">
                <div id="booking-seat">Seat #3</div>
                <div id="price">Rp 45000</div>
            </div>

            <button id="buybtn">Buy Ticket</button>

            <div id="buymodal" class="modal">
                <div class="modal-content">
                    <div id="payment">Payment Success!</div>
                    <div id="thankyou">Thank you for purchasing! You can view your purcahse now.</div>
                    <buttontransaction>Go to transaction history</buttontransaction>
                </div>
            </div>

        </div>
    </div>
</div>

</body>
<script>
    var modal = document.getElementById("buymodal");

    var btn = document.getElementById("buybtn");

    btn.onclick = function(){
        modal.style.display = "block";
    }

    window.onclick = function(event){
        if(event.target == modal){
            modal.style.display = "none";
        }
    }
</script>

</html>