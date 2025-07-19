function openNav() {
            const sidenav = document.getElementById("mySidenav");
            const toggleIcon = document.querySelector(".menu-toggle");

            sidenav.classList.toggle("open");
            toggleIcon.classList.toggle("active");

            toggleIcon.innerHTML = sidenav.classList.contains("open") ? "&#x25C0;" : "&#x25B6;";
        }

        // Zamykanie menu po kliknięciu poza nim
        document.addEventListener("click", function (event) {
            const sidenav = document.getElementById("mySidenav");
            const toggleIcon = document.querySelector(".menu-toggle");

            if (
                sidenav.classList.contains("open") &&
                !sidenav.contains(event.target) &&
                !toggleIcon.contains(event.target)
            ) {
                sidenav.classList.remove("open");
                toggleIcon.classList.remove("active");
                toggleIcon.innerHTML = "&#x25B6;";
            }
        });
