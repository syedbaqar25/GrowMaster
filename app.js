let lastScrollY = window.scrollY;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    navbar.style.top = '-80px';
  } else {
    navbar.style.top = '0';
  }
  lastScrollY = window.scrollY;
});




document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const dropdown = document.getElementById('dropdown');
  const hamburgerParent = document.getElementById('hamburger-parent');
  const body = document.body;
  const blobs = document.querySelectorAll('.blobs');

  function hideBlobsWithDelay() {
    blobs.forEach(blob => {
      blob.style.transition = 'opacity 0.4s ease-in-out';
      blob.style.opacity = '0';
      setTimeout(() => {
        blob.style.display = 'none';
      }, 400);
    });
  }

  function showBlobs() {
    blobs.forEach(blob => {
      blob.style.display = '';
      setTimeout(() => {
        blob.style.opacity = '0.3';
      }, 10);
    });
  }

  function moveHamburgerToDropdown() {
    if (dropdown && hamburger && !dropdown.contains(hamburger)) {
      dropdown.appendChild(hamburger);
      hamburger.style.position = 'absolute';
      hamburger.style.top = '32px';
      hamburger.style.right = '32px';
      hamburger.style.zIndex = '21001';
    }
  }

  function moveHamburgerBack() {
  const hamburgerParent = document.querySelector('.navright');
  if (hamburgerParent && hamburger && !hamburgerParent.contains(hamburger)) {
    hamburgerParent.appendChild(hamburger);
    hamburger.removeAttribute('style');
  }
}

  if (hamburger && dropdown) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('show');
      hamburger.classList.toggle('active');
      body.classList.toggle('no-scroll', dropdown.classList.contains('show'));
      if (dropdown.classList.contains('show')) {
        hideBlobsWithDelay();
        moveHamburgerToDropdown();
      } else {
        showBlobs();
        moveHamburgerBack();
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target) && !hamburger.contains(e.target)) {
        dropdown.classList.remove('show');
        hamburger.classList.remove('active');
        body.classList.remove('no-scroll');
        showBlobs();
        moveHamburgerBack();
      }
    });

    dropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.remove('show');
        hamburger.classList.remove('active');
        body.classList.remove('no-scroll');
        showBlobs();
        moveHamburgerBack();
        const href = link.getAttribute('href');
        setTimeout(() => {
          window.location.href = href;
        }, 500);
      });
    });
  }
});
