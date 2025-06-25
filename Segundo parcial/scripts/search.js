//tomo y les asingo una variable a los elementos html que voy a usar 
const input = document.getElementById("searchBar");
const button = document.getElementById("busqueda-boton");
const resultadosBusqueda = document.getElementById("resultados-busqueda");
const lupaImg = document.getElementById("lupa-img");

//funcion que se activa al generar un evento (en este caso input)
input.addEventListener("input", () => {
    //verifica si hay texto para que el boton se habilite
    const hayTexto = input.value.trim() !== "";
    button.disabled = !hayTexto;
    //verifica el tema 
    const isDarkMode = document.body.classList.contains("night");
    // dependiendo de si hay texto y el tema de fondo que imagen de lupa poner
    if (hayTexto) {
        lupaImg.src = isDarkMode ? "fotos/lupa_light.svg" : "fotos/lupa.svg";
    } else {
        lupaImg.src = isDarkMode ? "fotos/lupa_inactive_light.svg" : "fotos/lupa_inactive.svg";
    }
});
//funcion asincronica que se ejecuta al hacer click
button.addEventListener("click", async () => {
    //obtiene el texto ingresado en el input
    const query = input.value.trim();
    if (query === "") return;
    //llamado y consulta al endpoint search de Giphy y lo pasa a formato JSON (JSON = almacena e intercambia datos entre sistemas)
    const response = await fetch(`${ENV.BASE_URL}/search?api_key=${ENV.API_KEY}&q=${encodeURIComponent(query)}&limit=10`);
    const data = await response.json();

    //Verifica si hay resultados
    if (!data.data.length) {
        alert("No se encontraron resultados.");
        return;
    }

    // Creacion de nueva seccion con los resultados
    const newSection = document.createElement("section");
    newSection.className = "gif-section";
    const tituloDiv = document.createElement("div");
    tituloDiv.className = "titulos-seccion";
    //Agrega titulo
    const title = document.createElement("h5");
    title.textContent = query;

    tituloDiv.appendChild(title);
    newSection.appendChild(tituloDiv);

    //por cada gif recibido crea una "tarjeta" para que tenga estilo
    const container = document.createElement("div");
    container.className = "gif-container";

    data.data.forEach(gif => {
        const gifCard = document.createElement("div");
        gifCard.className = "gif-card";

        const img = document.createElement("img");
        img.src = gif.images.fixed_height.url;
        img.alt = gif.title;
        //inserta las tarjetas al contenedor
        gifCard.appendChild(img);
        container.appendChild(gifCard);
    });
    //Agrega la sección al principio de los resultados
    resultadosBusqueda.innerHTML = "";
    newSection.appendChild(container);
    resultadosBusqueda.prepend(newSection);
    //Limpia el formulario 
    input.value = "";
    button.disabled = true;
    lupaImg.src = "fotos/lupa_inactive.svg";
});