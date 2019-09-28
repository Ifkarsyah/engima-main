<div id="main-content">
    <a href="#" class="previous">&#8249;</a>
    <div class="movschedule">
        <div id="movietitle"><? echo $this->data['bookInfo']['movie'];?></div>
        <div id="release-date"><? echo $this->data['bookInfo']['date'] . ' - ' . $this->data['bookInfo']['time'];?></div>
    </div>
    <hr></hr>
    <div class="booking">
        <div class="flex-container">
            <? for($i = 1; $i <= 30; $i++)
                {
                    if ($this->data['seats'][$i])
                    {
                        echo "<div class=\"booked\"> $i </div>";
                    }
                    else
                    {
                        echo "<div class=\"notbooked\"> $i </div>";
                    }
                };
            ?>
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