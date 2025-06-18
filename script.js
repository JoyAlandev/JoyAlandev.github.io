const circle = document.querySelector('.circle'); // selecciona la imagen del pulmón
const text = document.getElementById('text'); // selecciona el texto que cambia
const techniqueSelect = document.getElementById('technique'); // selecciona el dropdown de técnicas
const music = document.getElementById('bg-music'); // selecciona el audio de fondo

// Variables de tiempo para inhalar, retener, exhalar y pausar (en milisegundos)
let inhaleTime = 4000;
let holdTime = 0;
let exhaleTime = 4000;
let pauseTime = 0;
let interval; // para guardar el intervalo de respiración

// Función que cambia los tiempos según la técnica elegida
function setTechnique(technique) {
  switch (technique) {
    case 'normal': // Técnica 4-7-8
      inhaleTime = 4000;
      holdTime = 7000;
      exhaleTime = 8000;
      pauseTime = 0;
      break;
    case 'box': // Técnica caja
      inhaleTime = 4000;
      holdTime = 4000;
      exhaleTime = 4000;
      pauseTime = 0;
      break;
    case 'relax': // Técnica relajante
      inhaleTime = 4000;
      holdTime = 0;
      exhaleTime = 6000;
      pauseTime = 0;
      break;
    case 'deep': // Técnica profunda
      inhaleTime = 6000;
      holdTime = 2000;
      exhaleTime = 6000;
      pauseTime = 0;
      break;
  }
}

// Función principal de animación de respiración
function breathAnimation() {
  text.innerText = 'Inhala...'; // Muestra texto "Inhala"
  circle.style.transition = `transform ${inhaleTime}ms linear`; // Aplica tiempo de transición
  circle.style.transform = 'scale(3)'; // Aumenta tamaño (inhala)

  setTimeout(() => { // después de inhalar
    if (holdTime > 0) { // Si hay tiempo de retener
      text.innerText = 'Retén...'; // Muestra texto "Retén"

      setTimeout(() => { // después de retener
        text.innerText = 'Exhala...'; // Cambia a "Exhala"
        circle.style.transition = `transform ${exhaleTime}ms linear`; // tiempo de exhalación
        circle.style.transform = 'scale(1)'; // reduce tamaño (exhala)

        setTimeout(() => { // después de exhalar
          if (pauseTime > 0) { // si hay pausa
            text.innerText = 'Pausa'; // muestra "Pausa"
          }
        }, exhaleTime);

      }, holdTime);

    } else { // Si no hay retención
      text.innerText = 'Exhala...'; // Cambia a "Exhala"
      circle.style.transition = `transform ${exhaleTime}ms linear`; // tiempo de exhalación
      circle.style.transform = 'scale(1)'; // reduce tamaño (exhala)

      setTimeout(() => { // después de exhalar
        if (pauseTime > 0) {
          text.innerText = 'Pausa...'; // muestra "Pausa"
        }
      }, exhaleTime);
    }
  }, inhaleTime);
}

// Inicia el ciclo de respiración
function startBreathing() {
  clearInterval(interval); // limpia cualquier ciclo anterior
  const totalCycle = inhaleTime + holdTime + exhaleTime + pauseTime; // suma de todo el ciclo
  breathAnimation(); // ejecuta la animación
  interval = setInterval(breathAnimation, totalCycle); // repite ciclo completo
}

// Detecta si cambian la técnica en el selector
techniqueSelect.addEventListener('change', (e) => {
  setTechnique(e.target.value); // cambia los tiempos según la técnica seleccionada
  startBreathing(); // reinicia el ciclo con nuevos tiempos
});

// Hace que la música empiece cuando la persona hace clic por primera vez (algunos navegadores bloquean autoplay)
document.body.addEventListener('click', function() {
  music.play(); // inicia la música
}, { once: true }); // solo se ejecuta una vez

// Configuración inicial al cargar la página
setTechnique('normal'); // técnica por defecto
startBreathing(); // empieza la respiración 