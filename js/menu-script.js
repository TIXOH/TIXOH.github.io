var menuItem = document.querySelectorAll(".menu-item");

for (var i = 0; i < menuItem.length; i++) {
    menuItem[i].addEventListener("click", setMenuActive);
}

function setMenuActive() {
    for (var i = 0; i < menuItem.length; i++) {
        menuItem[i].classList.remove("menu-active");
    }
    this.classList.add("menu-active");
}