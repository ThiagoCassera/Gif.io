const dropdownBtn = document.getElementById('dropdownBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

// Mostrar/ocultar menú al hacer clic en el botón
dropdownBtn.addEventListener('click', () => {
    const expanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
        dropdownMenu.classList.remove('show');
        dropdownBtn.setAttribute('aria-expanded', 'false');
    } else {
        dropdownMenu.classList.add('show');
        dropdownBtn.setAttribute('aria-expanded', 'true');
    }
});

// Cerrar menú si se hace clic afuera
document.addEventListener('click', (e) => {
    if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('show');
        dropdownBtn.setAttribute('aria-expanded', 'false');
    }
});

// Cambiar tema según opción seleccionada
const dropdownItems = document.querySelectorAll(".dropdown-item");
const logo = document.getElementById("logo");

dropdownItems.forEach(item => {
    item.addEventListener("click", () => {
        const theme = item.id;

        if (theme === "light") {
            document.body.classList.remove("light", "night");
            document.body.classList.add("light");
            logo.src = "fotos/gifOF_logo.png";

        } else if (theme === "night") {
            document.body.classList.remove("light", "night");
            document.body.classList.add("night");
            logo.src = "fotos/gifOF_logo_dark.png";

        }

        // Cierra el menú al seleccionar
        dropdownMenu.classList.remove("show");
        dropdownBtn.setAttribute('aria-expanded', 'false');
    });
});