function openNav() {
    var sidenav = document.getElementById("mySidenav");
    sidenav.classList.toggle("open");
    var toggleIcon = document.querySelector(".toggle_icon");
    toggleIcon.classList.toggle("active");

    if (sidenav.style.width === "250px") {
        closeNav();
    } else {
        sidenav.style.width = "250px";
    }
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// Dodanie obs³ugi zamykania po klikniêciu poza okienkiem
document.addEventListener("click", function (event) {
    var sidenav = document.getElementById("mySidenav");
    var toggleIcon = document.querySelector(".toggle_icon");

    if (sidenav.style.width === "250px" && !sidenav.contains(event.target) && !toggleIcon.contains(event.target)) {
        closeNav();
    }
});