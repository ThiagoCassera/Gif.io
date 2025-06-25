const video = document.getElementById('preview');
const comenzarBtn = document.querySelector('.boton-comenzar');
const grabarBtn = document.getElementById('grabarBtn');
const stopBtn = document.getElementById('stopBtn');
const grabacionContainer = document.getElementById('grabacion-container');
const cajaInstrucciones = document.getElementById('caja-instrucciones');

const accionesFinales = document.getElementById('acciones-finales');
const repetirBtn = document.getElementById('repetirBtn');
const subirBtn = document.getElementById('subirBtn');
const miniatura = document.getElementById('miniatura-video');

let stream, recorder, videoBlob;

function mostrarElemento(el) {
  el.classList.remove('oculto');
  el.classList.add('visible-inline');
}

function ocultarElemento(el) {
  el.classList.add('oculto');
  el.classList.remove('visible-inline');
}

comenzarBtn.onclick = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;
    video.classList.remove('oculto');

    cajaInstrucciones.classList.add('oculto');
    grabacionContainer.classList.remove('oculto');
    mostrarElemento(grabarBtn);
    ocultarElemento(stopBtn);
    accionesFinales.classList.add('oculto');
    miniatura.style.display = 'none';
  } catch (error) {
    alert('No se pudo acceder a la cámara: ' + error.message);
  }
};

grabarBtn.onclick = () => {
  recorder = RecordRTC(stream, { type: 'video' });
  recorder.startRecording();

  ocultarElemento(grabarBtn);
  mostrarElemento(stopBtn);
};

stopBtn.onclick = () => {
  recorder.stopRecording(() => {
    videoBlob = recorder.getBlob();
    stream.getTracks().forEach(track => track.stop());

    video.srcObject = null;
    video.classList.add('oculto');

    const previewFinal = document.getElementById('preview-final');
    const videoURL = URL.createObjectURL(videoBlob);
    
    previewFinal.src = videoURL;
    previewFinal.classList.remove('oculto');
    previewFinal.play();

    // Generar miniatura a partir del primer frame del video grabado
    const videoTemp = document.createElement('video');
    videoTemp.src = videoURL;
    videoTemp.muted = true;
    videoTemp.playsInline = true;

    videoTemp.addEventListener('loadedmetadata', () => {
      videoTemp.currentTime = 0;
    });

    videoTemp.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoTemp.videoWidth;
      canvas.height = videoTemp.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoTemp, 0, 0, canvas.width, canvas.height);
      const imgUrl = canvas.toDataURL('image/png');
      miniatura.src = imgUrl;
      miniatura.style.display = 'block';
    });

    ocultarElemento(stopBtn);
    ocultarElemento(grabarBtn);
    accionesFinales.classList.remove('oculto');
    accionesFinales.classList.add('visible-block');
  });
};

repetirBtn.onclick = async () => {
  accionesFinales.classList.add('oculto');
  miniatura.style.display = 'none';
  const previewFinal = document.getElementById('preview-final');
  previewFinal.classList.add('oculto');

  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    video.srcObject = stream;

    grabacionContainer.classList.remove('oculto');
    mostrarElemento(grabarBtn);
    ocultarElemento(stopBtn);
    video.classList.remove('oculto');
  } catch (error) {
    alert('No se pudo acceder a la cámara: ' + error.message);
  }
};

subirBtn.onclick = () => {
  if (!videoBlob) {
    alert('No hay video para subir.');
    return;
  }

  const reader = new FileReader();
  reader.onloadend = function () {
    const guifosGuardados = JSON.parse(localStorage.getItem('misGuifos')) || [];

    guifosGuardados.push(reader.result);
    localStorage.setItem('misGuifos', JSON.stringify(guifosGuardados));

    alert('GIF/video guardado en localStorage');

    cargarGuifos();
  };
  reader.readAsDataURL(videoBlob);
};

function cargarGuifos() {
  const galeria = document.getElementById('galeria-guifos');
  if (!galeria) return;

  galeria.innerHTML = '';
  const guifosGuardados = JSON.parse(localStorage.getItem('misGuifos')) || [];

  guifosGuardados.forEach((guifoBase64, index) => {
    const videoElem = document.createElement('video');
    videoElem.src = guifoBase64;
    videoElem.controls = true;
    videoElem.loop = true;
    videoElem.className = 'preview-video';

    const borrarBtn = document.createElement('button');
    borrarBtn.textContent = 'Eliminar';
    borrarBtn.className = 'boton-eliminar';
    borrarBtn.onclick = () => {
      guifosGuardados.splice(index, 1);
      localStorage.setItem('misGuifos', JSON.stringify(guifosGuardados));
      cargarGuifos();
    };

    const contenedor = document.createElement('div');
    contenedor.className = 'contenedor-guifo';
    contenedor.appendChild(videoElem);
    contenedor.appendChild(borrarBtn);

    galeria.appendChild(contenedor);
  });
}

window.onload = () => {
  cargarGuifos();
};

