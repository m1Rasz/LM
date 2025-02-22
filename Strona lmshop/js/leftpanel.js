function openNav() {
    var sidenav = document.getElementById("mySidenav");
    var toggleIcon = document.querySelector(".toggle_icon");

    // Prze��czanie klasy 'open'
    sidenav.classList.toggle("open");
    toggleIcon.classList.toggle("active");
}

// Zamkni�cie po klikni�ciu poza menu
document.addEventListener("click", function (event) {
    var sidenav = document.getElementById("mySidenav");
    var toggleIcon = document.querySelector(".toggle_icon");

    if (
        sidenav.classList.contains("open") &&
        !sidenav.contains(event.target) &&
        !toggleIcon.contains(event.target)
    ) {
        sidenav.classList.remove("open");
        toggleIcon.classList.remove("active");
    }
});
