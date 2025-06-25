async function mostrarTendencias() {
    //url de tendencias 
    const TRENDING_URL = `${ENV.BASE_URL}/trending?api_key=${ENV.API_KEY}&limit=12&rating=g`;

    try {
        //Peticion a la api y luego lo pasa a formato JSON(JSON = almacena e intercambia datos entre sistemas)
        const respuesta = await fetch(TRENDING_URL);
        const datos = await respuesta.json();
        //selecciona el elemento html donde se van a mostrar los gifs
        const seccion = document.getElementById('contenedor-gifs');
        //recorre y muestra gifs 
        datos.data.forEach(gif => {
            //contenedor para cada gif 
            const gifDiv = document.createElement('div');
            gifDiv.classList.add('gif-item');
            //inserta cada imagen 
            const img = document.createElement('img');
            img.src = gif.images.fixed_height.url;
            img.alt = gif.title;
            img.classList.add('gif');
            //insertar en el DOM
            gifDiv.appendChild(img);
            seccion.appendChild(gifDiv);
        });
    } catch (error) {
        console.error('Error al obtener los GIFs de tendencias:', error);
    }
}