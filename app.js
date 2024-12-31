import { advantages, progressBar, careerPackages, ourTeams, testimonials } from './public/data/data.js';

let advantageContainer = ``;
let progressBarContainer = ``;
let careerPackagesContainer = ``;
let ourTeamContainer = ``;
let testimonialSliderContainer = ``;
const btnApply = document.querySelectorAll(".btn-apply");
const counters = document.querySelectorAll('.counter-value');

// advantages card
advantages.forEach((advantage) => {
    advantageContainer += `
        <div id="${advantage.id}" class="advantage" data-aos="fade-up" data-aos-duration="${advantage.duration}">
            <img src='${advantage.icon}' alt="icon"
                class="advantage-icon">

            <h3 class="advantage-title">
                ${advantage.title}
            </h3>

            <p class="advantage-description">
                ${advantage.description}
            </p>
        </div>
        
    `
});
document.getElementById('advantages').innerHTML = advantageContainer;

// progress bar
progressBar.forEach((progressBar) => {
    progressBarContainer += `
        <div id="progressBar${progressBar.id}" class="progress-bar-container">
            <div class="progress-bar-icon">
                ${progressBar.icon}
            </div>

            <div class="" style="width: 80%">
                <div class="progress-bar-top">
                    <h3 class="progress-bar-title">
                        ${progressBar.title}
                    </h3>

                    <div class="progress-bar-percentage">
                        <span class="counter-value progressbar-value" data-speed="100" data-target="${progressBar.filled}">
                            0
                        </span> %
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar-inner" style="width: ${progressBar.filled}%"></div>
                </div>
            </div>
        </div>`
});
document.getElementById('progressBarContainer').innerHTML = progressBarContainer;

const progressBarCounter = document.querySelectorAll('.progressbar-value');

progressBarCounter.forEach(progressBarCounterNode => {
    function counterAnim() {
        const value = +progressBarCounterNode.getAttribute('data-target');
        const speed = +progressBarCounterNode.getAttribute('data-speed');
        const data = +progressBarCounterNode.innerText;
        const time = value / speed;

        if (data < value) {
            progressBarCounterNode.innerText = Math.ceil(data + time);
            setTimeout(counterAnim, 25);
        }
    }

    counterAnim();
})

// career packages
careerPackages.forEach((careerPackage) => {
    careerPackagesContainer += `<div class="career-card col-12 col-md-4 my-2 ${careerPackage.recommended ? 'recommended' : ''}"
    data-aos="fade-up" data-aos-duration="${careerPackage.duration}">
                <div class="recommend-package">
                
                </div>

                <h3 class="text-center">
                    ${careerPackage.title}
                </h3>

                <h2 class="text-center">
                    ${careerPackage.price} Riyal / day
                </h2>

                <div class="career-image">
                    <img src="${careerPackage.image}" alt="careers">
                </div>

                <p>${careerPackage.description}</p>

                <hr>
                
                <ul>`

    careerPackage.lists.map((list, index) => {
        careerPackagesContainer += `
        <li id="list${index + 1}" class="my-2">
            ${list}
            
             <div>
                 <i class="fa-solid fa-check"></i>
             </div>
         </li>`
    })

    careerPackagesContainer += `</ul>
                <div class="d-flex justify-content-center">
                    <button class="btn-apply my-3">
                        Apply Now
                    </button>
                </div>
            </div>`
});
document.getElementById('careerCards').innerHTML = careerPackagesContainer;

// manually grab and assign function to button after done dynamic rendering
let careerCardBtnApply = document.querySelectorAll('.career-card .btn-apply');

for (let i = 0; i < careerCardBtnApply.length; i++) {
    careerCardBtnApply[i].addEventListener('click', applyNow);
}

// our team
ourTeams.forEach((ourTeam) => {
    let imageDisplay = `url('${ourTeam.image}')`;

    ourTeamContainer += `
        <div id="team${ourTeam.id}" class="team-container col-12 col-md-6 col-lg-4" style="background-image: ${imageDisplay}">
            <div class="team-content">
                <h4 class="team-name">
                    ${ourTeam.name}
                </h4>

                <div class="team-position">
                    ${ourTeam.position}
                </div>
            </div>
        </div>`
});
document.getElementById('teams').innerHTML = ourTeamContainer;

//testimonial carousel
testimonials.forEach((testimonial) => {
    let testimonialImageDisplay = `url('${testimonial.image}')`;

    testimonialSliderContainer += `
         <li class="carousel-card swiper-slide">
            <div class="carousel-image" style="background-image: ${testimonialImageDisplay}">
            </div>

            <ul class="testimonial-ratings">`

    for (let i = 0; i < testimonial.rating; i++) {
        testimonialSliderContainer +=
            `<li>
                <i class="fa-solid fa-star"></i>
            </li>`
    }

    for (let i = 0; i < testimonial.empty_rating; i++) {
        testimonialSliderContainer +=
            `<li>
                <i class="fa-regular fa-star"></i>
            </li>`
    }

    testimonialSliderContainer += `</ul>
            <p class="testimonial-feedback">
                ${testimonial.feedback}
            </p>

            <hr>

            <h3 class="testimonial-name">
                ${testimonial.name}
            </h3>
        </li>
    `
})
document.getElementById('slider').innerHTML = testimonialSliderContainer;

new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,

    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },

        992: {
            slidesPerView: 3,
            spaceBetween: 30
        }
    },

    navigation: {
        nextEl: '.btn-next',
        prevEl: '.btn-prev',
    }
});

// counter animation
counters.forEach(counter => {
    function counterAnim() {
        const value = +counter.getAttribute('data-target');
        const speed = +counter.getAttribute('data-speed');
        const data = +counter.innerText;
        const time = value / speed;

        if (data < value) {
            counter.innerText = Math.ceil(data + time);

            if (value <= 10) {
                setTimeout(counterAnim, 200);
            } else {
                setTimeout(counterAnim, 1);
            }
        } else {
            counter.innerText = numberWithCommas(value);
        }

    }

    counterAnim();
});

for (let i = 0; i < btnApply.length; i++) {
    btnApply[i].addEventListener("click", applyNow);
}

function applyNow() {
    location.href = 'application-form.html';
}

function numberWithCommas(number) {
    number = number.toString();
    let pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(number))
        number = number.replace(pattern, "$1,$2");
    return number;
}