document.addEventListener('DOMContentLoaded', function () {
  const hamburgerButton = document.getElementById('hamburger-button');
  const sidebar = document.getElementById('sidebar');
  const menuLinks = document.querySelectorAll('.menu-icon-link');
  const musicToggle = document.getElementById('music-toggle');
  const musicIcon = document.getElementById('music-icon');
  const musicText = document.getElementById('music-text');
  let currentlyPlayingSound = null;
  let musicEnabled = localStorage.getItem('musicEnabled') !== 'false';

  hamburgerButton.addEventListener('click', function () {
    sidebar.classList.toggle('show');
    hamburgerButton.classList.toggle('open');
    hamburgerButton.classList.toggle('active');
  });

  function playSound(soundSrc) {
    if (musicEnabled) {
      if (currentlyPlayingSound) {
        currentlyPlayingSound.pause();
      }
      const sound = new Audio(soundSrc);
      sound.currentTime = 0;
      sound.play();
      currentlyPlayingSound = sound;
    }
  }

  menuLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      const soundSrc = link.dataset.sound;

      playSound(soundSrc);
      event.preventDefault();

      setTimeout(() => {
        window.location.href = link.href;
      }, getSoundDuration(soundSrc) + 100);
    });
  });

  function getSoundDuration(soundSrc) {
    // Logic to retrieve sound duration
    return 2000;
  }

  function updateMusicState() {
    const body = document.body;

    if (musicEnabled) {
      body.classList.remove('music-off');
      musicIcon.textContent = '🎵';
      musicText.textContent = 'Sounds On';
    } else {
      body.classList.add('music-off');
      musicIcon.textContent = '🔇';
      musicText.textContent = 'Sounds Off';
    }
  }

  function toggleMusic() {
    musicEnabled = !musicEnabled;
    if (!musicEnabled && currentlyPlayingSound) {
      currentlyPlayingSound.pause();
    }
    localStorage.setItem('musicEnabled', musicEnabled.toString());
    updateMusicState();
  }

  musicToggle.addEventListener('click', toggleMusic);
  updateMusicState();

  // Smooth scrolling navigation and section appearance update
  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.menu-icon-link');
  const screenWidth = window.innerWidth;

  const smoothScrollToSection = (targetSectionId) => {
    const targetSection = document.getElementById(targetSectionId);
    targetSection.scrollIntoView({ behavior: 'smooth' });

    sections.forEach(section => {
      section.classList.remove('active');
    });

    targetSection.classList.add('active');

    // Rest of your navigation logic

    // Update the color of the title element
    const titleElement = document.querySelector(`#${targetSectionId}-title.title-xxl`);
    if (titleElement) {
      const titleColorVariable = `--${targetSectionId}-title-color`;
      titleElement.style.color = getComputedStyle(document.documentElement).getPropertyValue(titleColorVariable);
    }
  };

  // Navigation links click events
  navLinks.forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault();
      const targetSectionId = link.getAttribute('data-target');

      // Call the smoothScrollToSection function
      smoothScrollToSection(targetSectionId);

      if (screenWidth <= 1100) {
        sidebar.classList.remove('show');
        hamburgerButton.classList.remove('active');
      }
    });
  });

  // Music link click event in hero section
  const musicLink = document.querySelector('.link-to-music');
  musicLink.addEventListener('click', function (event) {
    event.preventDefault();
    const targetSectionId = musicLink.getAttribute('href').substring(1); // Remove the leading '#'

    // Call the smoothScrollToSection function
    smoothScrollToSection(targetSectionId);
  });

  // Section headers and appearance update
  sections.forEach(section => {
    const sectionId = section.getAttribute('id');
    const sectionHeader = section.querySelector('.page-header');
    sectionHeader.classList.add(`${sectionId}-header`);
  });

  // Show and hide sections with transition effect
  function showSection(targetSectionId) {
    sections.forEach(section => {
      section.classList.remove('active');
    });

    const targetSection = document.getElementById(targetSectionId);
    targetSection.classList.add('active');

    setTimeout(() => {
      sections.forEach(section => {
        if (section !== targetSection) {
          section.classList.add('hidden');
        }
      });
    }, 300); // Delay the hiding of other sections after 300ms (adjust as needed)
  }
});
