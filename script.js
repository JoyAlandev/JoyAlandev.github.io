const circle = document.querySelector('.circle');
const text = document.getElementById('text');
const techniqueSelect = document.getElementById('technique');

let inhaleTime = 4000;
let holdTime = 0;
let exhaleTime = 4000;
let pauseTime = 0;
let interval;

// Configura los tiempos según la técnica elegida
function setTechnique(technique) {
  switch (technique) {
    case 'normal':
      inhaleTime = 4000;
      holdTime = 0;
      exhaleTime = 4000;
      pauseTime = 0;
      break;
    case 'box':
      inhaleTime = 4000;
      holdTime = 4000;
      exhaleTime = 4000;
      pauseTime = 4000;
      break;
    case 'relax':
      inhaleTime = 4000;
      holdTime = 0;
      exhaleTime = 6000;
      pauseTime = 0;
      break;
    case 'deep':
      inhaleTime = 6000;
      holdTime = 2000;
      exhaleTime = 6000;
      pauseTime = 0;
      break;
  }
}

// Animación de respiración
function breathAnimation() {
  text.innerText = 'Inhala...';
  circle.style.transform = 'scale(1.5)';

  setTimeout(() => {
    if (holdTime > 0) {
      text.innerText = 'Pausa...';

      setTimeout(() => {
        text.innerText = 'Exhala...';
        circle.style.transform = 'scale(1)';

        setTimeout(() => {
          if (pauseTime > 0) {
            text.innerText = 'Pausa...';
          }
        }, exhaleTime);

      }, holdTime);

    } else {
      text.innerText = 'Exhala...';
      circle.style.transform = 'scale(1)';

      setTimeout(() => {
        if (pauseTime > 0) {
          text.innerText = 'Pausa...';
        }
      }, exhaleTime);
    }
  }, inhaleTime);
}

// Inicia el ciclo
function startBreathing() {
  clearInterval(interval); // limpiar ciclo anterior
  const totalCycle = inhaleTime + holdTime + exhaleTime + pauseTime;
  breathAnimation();
  interval = setInterval(breathAnimation, totalCycle);
}

// Detecta cambio de técnica
techniqueSelect.addEventListener('change', (e) => {
  setTechnique(e.target.value);
  startBreathing();
});

// Config inicial
setTechnique('normal');
startBreathing();