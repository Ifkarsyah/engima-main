let modal = document.getElementById("buy-modal");

let btn = document.getElementById("buy-btn");

btn.onclick = function(){
    modal.style.display = "block";
}

window.onclick = function(event){
    if(event.target === modal){
        modal.style.display = "none";
    }
}

let seats = document.getElementsByClassName('seat-chair not-booked');
let bookingSeat = document.getElementById("booking-seat");
let seatSelectionNumber = 0;

seats[0].className = "seat-chair seat-active";
for (let i=0; i < seats.length; i++){
    seats[i].addEventListener("click", function () {
        let currentSeat = document.getElementsByClassName("seat-active");
        currentSeat[0].className = "seat-chair not-booked";
        this.className = "seat-chair seat-active";
        bookingSeat.innerText = "Seat #" + this.innerText;
        seatSelectionNumber = this.innerText;
    })
}

let buttonBuyTicket = document.getElementById("buy-btn");
buttonBuyTicket.addEventListener("click", function () {
    let currentURL = window.location.href;
    let lastURLSegment = currentURL.substr(currentURL.lastIndexOf('/') + 1);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", URL_BASE_PUBLIC + 'booking/book/' + lastURLSegment, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        seatNumber: seatSelectionNumber
    }));
})
