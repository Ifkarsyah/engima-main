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

alert("hy");