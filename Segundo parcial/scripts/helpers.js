function crearTarjetaGif(gif) {
    // Crea elementos y les asigna una clase Ej: crea un div y su clase es card-container
    const tarjeta = document.createElement('div');
    tarjeta.className = 'card-container';

    const header = document.createElement('div');
    header.className = 'header';

    const titulo = document.createElement('p');
    titulo.textContent = `#${gif.title || 'GIF'}`;

    const botonCerrar = document.createElement('img');
    botonCerrar.src = 'fotos/button close.svg';
    botonCerrar.alt = 'Cerrar';
    botonCerrar.style.cursor = 'pointer';
    botonCerrar.onclick = async () => {
        try {
            // Obtener un nuevo GIF aleatorio
            const nuevoTag = obtenerTagAleatorio();
            const endpoint = `${ENV.BASE_URL}/search?api_key=${ENV.API_KEY}&q=${nuevoTag}&limit=1`;
            const respuesta = await fetch(endpoint);
            const resultado = await respuesta.json();

            if (resultado.data.length > 0) {
                const nuevoGif = resultado.data[0];
                const nuevaTarjeta = crearTarjetaGif(nuevoGif);
                // Reemplaza la tarjeta vieja por la nueva
                tarjeta.replaceWith(nuevaTarjeta);
            } else {
                // Si no hay resultado, simplemente elimina la tarjeta
                tarjeta.remove();
            }
        } catch (error) {
            console.error("Error al reemplazar GIF:", error);
            tarjeta.remove(); // En caso de error, eliminar el GIF actual
        }
    };


    //pone el titulo y el boton X en el encabezado
    header.appendChild(titulo);
    header.appendChild(botonCerrar);
    // agrega la imagen del gif 
    const imagen = document.createElement('img');
    imagen.src = gif.images.fixed_height.url;
    imagen.alt = gif.title || 'GIF';
    // Creo el contenedor 
    const contenedorImg = document.createElement('div');
    contenedorImg.className = 'img-container';
    contenedorImg.appendChild(imagen);
    // Creacion del boton ver mas que te manda a la pagina de Gihpy
    const verMasBtn = document.createElement('button');
    const textoBtn = document.createElement('p');
    textoBtn.textContent = 'Ver más...';
    verMasBtn.appendChild(textoBtn);
    verMasBtn.onclick = () => window.open(gif.url, '_blank');
    //contenedor 
    const contenedorBoton = document.createElement('div');
    contenedorBoton.className = 'button-container';
    contenedorBoton.appendChild(verMasBtn);
    //meter boton dentro del contenedor 
    contenedorImg.appendChild(contenedorBoton);
    // armado y devuelve la tarjeta
    tarjeta.appendChild(header);
    tarjeta.appendChild(contenedorImg);

    return tarjeta;
}