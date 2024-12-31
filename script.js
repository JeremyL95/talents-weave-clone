// hamburger
const btnHamburger = document.querySelector('.navbar-toggler');
btnHamburger.addEventListener('click', () => {
    document.getElementById('nav-icon4').classList.toggle('open');
});

// mouse follower
(() => {
    const follower = document.querySelector('#follower');

    let posX = 0;
    let posY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const ease = 0.1;

    function easeTo() {
        const followerBounds = follower.getBoundingClientRect();

        const dX = mouseX - (followerBounds.left + 4);
        const dY = mouseY - (followerBounds.top + 4);

        posX += dX * ease;
        posY += dY * ease;
    }

    function update() {
        easeTo();
        follower.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        requestAnimationFrame(update);
    }

    function setCoords(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    document.onmousemove = setCoords;
    update();
})();

// footer
const currentYear = new Date().getFullYear();
document.getElementById('copyright').innerText = `Copyright © ${currentYear} Talents Weave. All Rights Reserved.`