// hamburger
const btnHamburger = document.querySelector('.navbar-toggler');
btnHamburger.addEventListener('click', () => {
    document.getElementById('nav-icon4').classList.toggle('open');
})

// footer
const currentYear = new Date().getFullYear();
document.getElementById('copyright').innerText = `Copyright © ${currentYear} Talents Weave. All Rights Reserved.`