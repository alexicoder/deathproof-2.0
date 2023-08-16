const hamburgerButton = document.getElementById('hamburger-button');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.sidebar-nav-link');
const socialLinks = document.querySelectorAll('.sidebar-social-icon');
const soundToggle = document.getElementById('sound-toggle');
const soundIcon = document.getElementById('sound-icon');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');
let currentlyPlayingSound = null;

hamburgerButton.addEventListener('click', function () {
  sidebar.classList.toggle('show');
  hamburgerButton.classList.toggle('open');
});

function playSound(soundSrc) {
  const sound = new Audio(soundSrc);
  sound.currentTime = 0; // Reset audio to the beginning
  sound.play();
}

navLinks.forEach((link) => {
  const soundSrc = link.getAttribute('data-sound');

  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior
    playSound(soundSrc);
  });
});

socialLinks.forEach((link) => {
  const soundSrc = link.getAttribute('data-sound');

  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent the default link behavior
    playSound(soundSrc);
  });
});

// Check local storage for music preference
let musicEnabled = localStorage.getItem('musicEnabled') !== 'false';

// Update button appearance and play sound
function updateMusicState() {
  if (musicEnabled) {
    document.body.classList.remove('music-off');
    musicIcon.textContent = '🎵';
    musicText.textContent = 'Music On';
  } else {
    document.body.classList.add('music-off');
    musicIcon.textContent = '🔇';
    musicText.textContent = 'Music Off';
  }
}

// Play sound if music is enabled
function playSound(soundSrc) {
  if (musicEnabled) {
    if (currentlyPlayingSound) {
      currentlyPlayingSound.pause();
    }
    const sound = new Audio(soundSrc);
    sound.currentTime = 0; // Reset audio to the beginning
    sound.play();
    currentlyPlayingSound = sound;
  }
}

// Toggle music state
function toggleMusic() {
  musicEnabled = !musicEnabled;
  if (!musicEnabled && currentlyPlayingSound) {
    currentlyPlayingSound.pause();
  }
  localStorage.setItem('musicEnabled', musicEnabled.toString());
  updateMusicState();
}

// Attach click event listener to music toggle button
musicToggle.addEventListener('click', toggleMusic);

// Initialize button appearance on page load
updateMusicState();