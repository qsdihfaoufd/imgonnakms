document.addEventListener('DOMContentLoaded', function() {

 

 // Reset on scroll
 window.addEventListener('resize', function() {
  if (window.innerWidth >= 1900 && window.innerHeight >= 900) {
   window.scrollTo(0, 0);
  }
 });

 // 3D CAROUSEL

const carousel = document.querySelector('.carousel');
const orbits = document.querySelectorAll('.orbit-transform');

const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');

let currentAngle = 0;

const stepSize = 90;

// How fast it moves
const rotationSpeed = 0.2;


function rotatecarousel() {

    orbits.forEach((orbitimage, i) => {

        const rotationAngle =
            i * stepSize + currentAngle;

        orbitimage.style.transform =
            `rotateY(${rotationAngle}deg)
             translateZ(400px)
             rotateY(${-rotationAngle}deg)`;

        // Keep all 4 images visible
        orbitimage.style.opacity = 1;
        orbitimage.style.visibility = 'visible';

    });

}


// AUTOMATIC ROTATION

function animateCarousel() {

    currentAngle += rotationSpeed;

    rotatecarousel();

    requestAnimationFrame(animateCarousel);

}

animateCarousel();


// NEXT BUTTON

if (nextButton) {

    nextButton.addEventListener('click', () => {

        currentAngle -= stepSize;

        rotatecarousel();

    });

}


// PREVIOUS BUTTON

if (prevButton) {

    prevButton.addEventListener('click', () => {

        currentAngle += stepSize;

        rotatecarousel();

    });

}


// Initial position

rotatecarousel();

 // Orbit Image hover effects
 orbits.forEach(orbitimage => {
  orbitimage.addEventListener("mouseenter", function() {
   this.style.transform = this.style.transform + " scale(1.2)";
  });
  orbitimage.addEventListener("mouseleave", function() {
   this.style.transform = this.style.transform.replace(" scale(1.2)", "");
  });
 });

 rotatecarousel();
 orbitlabel();

 // Status cafe fallback
 setTimeout(function() {
  var statusContent = document.getElementById('statuscafe-content');
  var fallback = document.getElementById('status-fallback');
  if (statusContent && statusContent.textContent.trim() === '' && fallback) {
   fallback.style.display = 'block';
   statusContent.setAttribute('data-fallback', 'true');
  }
 }, 1500);

 // Sound Stuff
 function playHoverSound() {
  var sound = document.getElementById('hoversound');
  if (sound) {
    sound.volume = 0.5;
   sound.play();
  }
 }

 function playHoverSound2() {
  var sound = document.getElementById('hoversound2');
  if (sound) {
   sound.volume = 0.1;
   sound.play();
  }
 }

 window.playHoverSound = playHoverSound;
 window.playHoverSound2 = playHoverSound2;

 // Coler Change Hover
 var latestShrine = document.getElementById('latestshrine');
 var shadow1 = document.querySelector('.shadow1');

 if (latestShrine && shadow1) {
  latestShrine.addEventListener('mouseenter', () => {
   shadow1.style.background = 'radial-gradient(rgba(24, 21, 219, 0.2), rgb(12, 192, 51) 72%)';
   shadow1.style.filter = 'drop-shadow(0 0 10px rgba(255, 0, 255, 0.7))';
  });

  latestShrine.addEventListener('mouseleave', () => {
   shadow1.style.background = 'radial-gradient(rgba(24, 21, 219, 0.048), rgb(207, 4, 247) 72%)';
   shadow1.style.filter = 'none';
  });
 }



 // Power On/Off
 var powerButton = document.getElementById('off');
 var sound1 = document.getElementById('sound1');
 var sound2 = document.getElementById('sound2');
 var powerdownDiv = document.getElementById('powerdown');
 var clickCount = 0;
 var isAnimating = false;
 var isPowerOn = false;

 if (powerButton) {
  powerButton.onclick = function() {
   if (isAnimating) return;

   clickCount = clickCount + 1;
   isAnimating = true;

   if (sound1 && sound2) {
    sound1.pause();
    sound2.pause();
    sound1.currentTime = 0;
    sound2.currentTime = 0;

    if (clickCount % 2 !== 0) {
     sound1.play().catch(e => {});
    }
    else {
     sound2.play().catch(e => {});
    }
   }

   if (powerdownDiv) {
    powerdownDiv.classList.remove('animate-poweroff');
    powerdownDiv.classList.remove('animate-poweron');
    powerdownDiv.offsetHeight;

    if (!isPowerOn) {
     powerdownDiv.style.display = 'flex';
     powerdownDiv.classList.add('animate-poweron');
    }
    else {
     powerdownDiv.classList.add('animate-poweroff');
     setTimeout(function() {
      powerdownDiv.style.display = 'none';
     }, 2000);
    }
   }

   setTimeout(function() {
    isAnimating = false;
    isPowerOn = !isPowerOn;
   }, 2000);
  };
 }

 // Antennas
 var antennaButton = document.getElementById('down');
 var antenna1 = document.getElementById('ants');
 var antenna2 = document.getElementById('ants2');
 var electric1 = document.getElementById('electricity1');
 var electric2 = document.getElementById('electricity2');
 var antennaSound = document.getElementById('sound3');

 if (antenna1 && antenna2) {
  antenna1.classList.add('animate-ants-up-initial');
  antenna2.classList.add('animate-ants2-up-initial');

  setTimeout(function() {
   if (electric1 && electric2) {
    electric1.classList.add('show');
    electric2.classList.add('show');
   }
  }, 4000);

  var antennasDown = false;

  if (antennaButton) {
   antennaButton.onclick = function() {
   if (antennaSound) {
   antennaSound.volume = 0.3;
   antennaSound.currentTime = 0;
   antennaSound.play();
  }

  antenna1.classList.remove('animate-ants', 'animate-ants-up', 'animate-ants-up-initial');
  antenna2.classList.remove('animate-ants2', 'animate-ants2-up', 'animate-ants2-up-initial');

  antenna1.offsetHeight;
  antenna2.offsetHeight;

  if (antennasDown) {
  antenna1.classList.add('animate-ants-up');
  antenna2.classList.add('animate-ants2-up');

  setTimeout(function() {
   if (electric1 && electric2) {
   electric1.classList.add('show');
   electric2.classList.add('show');
  }}, 2000);
  }
  else {
  if (electric1 && electric2) {
  electric1.classList.remove('show');
  electric2.classList.remove('show');
  }
  antenna1.classList.add('animate-ants');
  antenna2.classList.add('animate-ants2');
  }
 antennasDown = !antennasDown;
 };
 }
}

 // Slideup update
 var closeButton = document.getElementById('closeupdate');
 var updatePopup = document.getElementById('lastupdate');

 if (closeButton && updatePopup) {
  let popupVisible = true;

  function showPopup() {
   updatePopup.style.display = 'flex';
   updatePopup.style.animation = 'slide-bottom 1s cubic-bezier(0.240, 0.460, 0.450, 0.940) both';
   popupVisible = true;
  }

  function hidePopup() {
   updatePopup.style.animation = 'slide-up 1s cubic-bezier(0.240, 0.460, 0.450, 0.940) both';
   popupVisible = false;
   setTimeout(showPopup, 7999);
  }

  closeButton.addEventListener('click', function() {
   if (popupVisible) {
    hidePopup();
   }
  });

  updatePopup.addEventListener('animationend', function() {
   if (updatePopup.style.animationName === 'slide-up') {
    updatePopup.style.display = 'none';
    updatePopup.style.animation = '';
    updatePopup.style.transform = 'translateY(0)';
   }
  });
 }

 // link show/hide
 var linkme = document.getElementById('linkme');
 var linkmetext = document.getElementById('linkmetext');

 if (linkme && linkmetext) {
  linkme.addEventListener('click', function() {
   linkmetext.classList.toggle('hidden');
  });
 }
 // show/hide websring
 var showhide = document.getElementById('longad');
 var showhideiframe = document.getElementById('webrings');

 if (showhide && showhideiframe) {
  showhide.addEventListener('click', function() {
   showhideiframe.classList.toggle('hidden');
  });
 }

//  TODO List Minigame thinfg
let ship = document.getElementById('movingimage');
let gamearea = document.getElementById('todoinside');
let messages = ["WELCOME", "MADMAX", "AO3", "REVAMP", "RECIPES", "SECRET!", "RED"];
let availableMessages = [...messages];
let usedMessages = [];

function getRandomMessage() {
  if (availableMessages.length === 0) {
    availableMessages = [...messages];
    usedMessages = [];
  }
  const randomIndex = Math.floor(Math.random() * availableMessages.length);
  const selectedMessage = availableMessages[randomIndex];
  availableMessages.splice(randomIndex, 1);
  usedMessages.push(selectedMessage);
  return selectedMessage;
}

function setupShip() {
  if (!ship || !gamearea) return;
  let x = gamearea.clientWidth / 2 - 30;
  let y = gamearea.clientHeight - 70;
  ship.style.transform = `translate(${x}px, ${y}px)`;
}

function moveShip(e) {
  if (!ship || !gamearea) return;
  let rect = gamearea.getBoundingClientRect();
  let x = e.clientX - rect.left - 30;
  let y = gamearea.clientHeight - 70;
  x = Math.max(0, Math.min(x, gamearea.clientWidth - 60));
  ship.style.transform = `translate(${x}px, ${y}px)`;
}

function createBullet(e) {
  if (!ship || !gamearea) return;
  let sound = document.getElementById('shootsound');
  if (sound) {
    sound.currentTime = 0;
    sound.volume = 0.1;
    sound.play();
  }

  let shipRect = ship.getBoundingClientRect();
  let areaRect = gamearea.getBoundingClientRect();
  let x = shipRect.left - areaRect.left + 30;
  let y = shipRect.top - areaRect.top + 30;

  let bullet = document.createElement('div');
  bullet.style.cssText = `
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    width: 3px;
    height: 10px;
    background: #ff0;
    z-index: 999;
    pointer-events: none;`;

  gamearea.appendChild(bullet);

  let currentY = y;
  let bulletAnimation = setInterval(() => {
    currentY -= 10;
    bullet.style.top = currentY + 'px';

    if (currentY < y - 100) { e
      clearInterval(bulletAnimation);
      bullet.remove();
    }
  }, 16);
}

function TargetClick(e) {
  let target = e.target;
  if (!target.classList.contains('target')) return;
  if (target.dataset.hit === 'true') return;

  let targetRect = target.getBoundingClientRect();
  let areaRect = gamearea.getBoundingClientRect();

  let targetX = targetRect.left - areaRect.left;
  let targetY = targetRect.top - areaRect.top;

  let text = document.createElement('div');
  text.textContent = getRandomMessage();
  text.style.cssText = `
    position: absolute;
    left: ${targetX + targetRect.width/2}px;
    top: ${targetY + targetRect.height/2}px;
    transform: translate(-50%, -50%);
    color: rgb(14, 233, 62);
    font-weight: bold;
    z-index: 1000;
    pointer-events: none;
    font-size: 12px;
  `;
  gamearea.appendChild(text);

  setTimeout(() => text.remove(), 1500);
  target.dataset.hit = 'true';
  target.style.opacity = '0.3';

  setTimeout(() => {
    target.style.opacity = '1';
    target.dataset.hit = 'false';
  }, 5000);
}

function reset() {

  document.querySelectorAll('.target').forEach(target => {
    target.style.opacity = '1';
    target.dataset.hit = 'false';
  });
  availableMessages = [...messages];
  usedMessages = [];
}

// Dynamic Tabs
function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  const tablinks = document.getElementsByClassName("tablinks");
  const phoneMain = document.getElementById('phonemain');
  const wasActive = evt.currentTarget.classList.contains("active");

  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  if (wasActive) {
    if (phoneMain) phoneMain.style.display = 'flex';
    if (gamearea) {
      gamearea.removeEventListener('mousemove', moveShip);
      gamearea.removeEventListener('click', createBullet);
      gamearea.removeEventListener('click', TargetClick);
    }
  }
  else {
    const tabElement = document.getElementById(tabName);
    if (tabElement) tabElement.style.display = "flex";
    evt.currentTarget.classList.add("active");
    if (phoneMain) phoneMain.style.display = 'none';

    if (tabName === 'todo' && gamearea) {
      setTimeout(() => {
        setupShip();
        gamearea.addEventListener('mousemove', moveShip);
        gamearea.addEventListener('click', createBullet);
        gamearea.addEventListener('click', TargetClick);
      }, 100);
    }
    else if (gamearea) {
      gamearea.removeEventListener('mousemove', moveShip);
      gamearea.removeEventListener('click', createBullet);
      gamearea.removeEventListener('click', TargetClick);
    }
  }
}



window.openTab = openTab;

if (ship && gamearea) {
  reset();
  setupShip();
}

if (typeof initializeMusicPlayer === 'function') {
  initializeMusicPlayer();
}


//  Play audio on hover
  var hoverAudio = document.getElementById('hoveraudio');
  var hoverAudio2 = document.getElementById('hoveraudio2');

  function playAstroHoverAudio() {
    if (hoverAudio) {
      hoverAudio.currentTime = 0;
      hoverAudio.volume = 0.5;
      hoverAudio.play();
    }
  }
  function playAstroHoverAudio2() {
    if (hoverAudio2) {
      hoverAudio2.currentTime = 0;
      hoverAudio2.volume = 0.5;
      hoverAudio2.play();
    }
  }

  document.querySelectorAll('.orbit-transform').forEach(function(img) {
    img.addEventListener('mouseenter', playAstroHoverAudio);
  });

  var alienMusic = document.getElementById('alienmusic');
  if (alienMusic) {
    alienMusic.addEventListener('mouseenter', playAstroHoverAudio);
  }

  var planet = document.getElementById('latestshrine');
  if (planet) {
    planet.addEventListener('mouseenter', playAstroHoverAudio2);
  }
  var pinkplanet = document.getElementById('pinkplanettitle');
  if (pinkplanet) {
    pinkplanet.addEventListener('mouseenter', playAstroHoverAudio2);
  }
  var astroid = document.getElementById('astroid');
  if (astroid) {
    astroid.addEventListener('mouseenter', playAstroHoverAudio2);
  }
  var thevoid = document.getElementById('voidtitle');
  if (thevoid) {
    thevoid.addEventListener('mouseenter', playAstroHoverAudio2);
  }
});

document.body.classList.remove('preload');
document.body.classList.add('loaded');