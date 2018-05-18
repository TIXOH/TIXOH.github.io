var modal = document.querySelector("#myModal");
var listItemImg = document.querySelectorAll('.img');
var modalImg = document.querySelector("#modal-img");
var close = document.querySelector(".close");

for (var i = 0; i < listItemImg.length; i++) {
    listItemImg[i].addEventListener("click", function () {
        modal.classList.toggle("hide");
        modalImg.src = this.src;
    });
}

close.addEventListener("click", function () {
    modal.classList.toggle("hide");
});