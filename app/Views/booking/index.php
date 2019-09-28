<div id="main-content">
    <div class = "header">
        <h1><?php $this->data['bookInfo']['movie']; ?></h1>
        <h4><?php $this->data['bookInfo']['date_time']; ?><PM></PM></h4>
    </div>

    <form action="<?php echo URL_BASE_PUBLIC; ?>booking/book" method="post">

        <div class="seats">
            <?php for ($i = 1 ; $i <= 30;$i++)
            {
                if ($this->data['seats'][$i])
                {
                    echo "<input type=\"radio\" name=\"seatNumber\" value=$i>$i : Udah di pesan<br>";
                }
                else
                {
                    echo "<input type=\"radio\" name=\"seatNumber\" value=$i>$i : Bisa dipilih<br>";
                }

            }
            ?>
        </div>

        <div class="booking-summary">

        </div>

        <input type="submit" value="Buy Ticket">

    </form>
</div>