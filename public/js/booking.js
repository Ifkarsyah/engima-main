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

let seats = document.getElementsByClassName("flex-container");