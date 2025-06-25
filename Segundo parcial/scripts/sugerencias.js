//array con palabras clave para mostrar las sugerencias
const SUGGESTION_TAGS = ['funny', 'reaction', 'happy', 'wow', 'love'];

//funcion que elige tags de forma aleatoria 
function obtenerTagAleatorio() {
    const indice = Math.floor(Math.random() * SUGGESTION_TAGS.length);
    return SUGGESTION_TAGS[indice];
}
// buscar y mostrar GIFs sugeridos.
async function mostrarSugerenciasAleatorias() {
    //obtiene los tag de la funcion anterior
    //Usa un tag al azar para construir la URL Pide 4 GIFs que coincidan con ese tag.
    const tag = obtenerTagAleatorio();
    const endpoint = `${ENV.BASE_URL}/search?api_key=${ENV.API_KEY}&q=${tag}&limit=4`;
    //peticion a la api
    try {
        const respuesta = await fetch(endpoint);
        const resultado = await respuesta.json();
        renderizarSugerencias(resultado.data);
    } catch (error) {
        //mensaje de error que saldria en consola
        console.error("Error al obtener sugerencias:", error);
    }
}
//Funcion que pasa el array para mostrar los gifs
function renderizarSugerencias(gifArray) {
    const contenedor = document.getElementById('suggestedGifs');
    contenedor.innerHTML = '';
    //llama a la funcion de crearTarjetasGif del archivo helpers.js y crea las tarjetas
    gifArray.forEach(gif => {
        const tarjeta = crearTarjetaGif(gif);
        contenedor.appendChild(tarjeta);
    });
}