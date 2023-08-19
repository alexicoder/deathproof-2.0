const hamburgerButton = document.getElementById('hamburger-button');
const sidebar = document.getElementById('sidebar');
const menuLinks = document.querySelectorAll('.menu-icon-link');
const soundToggle = document.getElementById('sound-toggle');
const soundIcon = document.getElementById('sound-icon');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');
let currentlyPlayingSound = null;

hamburgerButton.addEventListener('click', function () {
  sidebar.classList.toggle('show');
  hamburgerButton.classList.toggle('open');
  hamburgerButton.classList.toggle('active');
});

function playSound(soundSrc) {
  const sound = new Audio(soundSrc);
  sound.currentTime = 0; // Reset audio to the beginning
  sound.play();
}

menuLinks.forEach(link => {
  link.addEventListener('click', function(event) {
    const soundSrc = link.dataset.sound;

    // Play the corresponding sound effect
    playSound(soundSrc);
    
    // Prevent the default hyperlink behavior
    event.preventDefault();
    
    // Delay the navigation after the sound finishes playing
    setTimeout(() => {
      // Navigate to the hyperlink URL
      window.location.href = link.href;
    }, getSoundDuration(soundSrc) + 100); // Adjust the delay as needed
  });
});

// Helper function to get sound duration (in milliseconds)
function getSoundDuration(soundSrc) {
  // Implement logic to retrieve sound duration from the sound file
  // You may need to use an audio library or API to get this information
  // For demonstration purposes, returning a fixed value of 2000 milliseconds (2 seconds)
  return 2000;
}

// Check local storage for music preference
let musicEnabled = localStorage.getItem('musicEnabled') !== 'false';

// Update button appearance and play sound
function updateMusicState() {
  if (musicEnabled) {
    document.body.classList.remove('music-off');
    musicIcon.textContent = '🎵';
    musicText.textContent = 'Sounds On';
  } else {
    document.body.classList.add('music-off');
    musicIcon.textContent = '🔇';
    musicText.textContent = 'Sounds Off';
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

document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.menu-icon-link');
  const sidebar = document.querySelector('.sidebar');
  const hamburgerButton = document.querySelector('.hamburger');
  const screenWidth = window.innerWidth;

  // Set default color for home title
  const homeTitleElement = document.querySelector('#home-title.title-xxl');
  if (homeTitleElement) {
    homeTitleElement.style.color = getComputedStyle(document.documentElement).getPropertyValue('--home-title-color');
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetSectionId = link.getAttribute('data-target');

      sections.forEach(function (section) {
        section.classList.remove('active');
      });

      const targetSection = document.getElementById(targetSectionId);
      targetSection.classList.add('active');

      if (screenWidth <= 1100) {
        sidebar.classList.remove('show');
        hamburgerButton.classList.remove('active');
      }

      const titleElement = document.querySelector(`#${targetSectionId}-title.title-xxl`);
      if (titleElement) {
        const titleColorVariable = `--${targetSectionId}-title-color`;
        titleElement.style.color = getComputedStyle(document.documentElement).getPropertyValue(titleColorVariable);
      }
    });
  });
});
