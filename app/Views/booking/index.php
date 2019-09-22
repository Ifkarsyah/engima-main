<form action="<?php echo URL_BASE_PUBLIC; ?>/">
    <?php for ($i = 1 ; $i <= 10;$i++)
        {
            echo "<input type=\"radio\" name=\"seat\" value=$i>$i<br>";
        }
        ?>
    <input type="submit" value="Buy Ticket">
</form>