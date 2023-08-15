const hamburgerButton = document.getElementById('hamburger-button');
const sidebar = document.getElementById('sidebar');
const navLinks = document.querySelectorAll('.sidebar-nav-link');
const socialLinks = document.querySelectorAll('.sidebar-social-icon');

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

