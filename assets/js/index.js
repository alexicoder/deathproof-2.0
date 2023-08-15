const hamburgerButton = document.getElementById('hamburger-button');
const sidebar = document.getElementById('sidebar');

hamburgerButton.addEventListener('click', function () {
  sidebar.classList.toggle('show');
});

