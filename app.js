import { advantages, progressBar, careerPackages, ourTeams, testimonials } from './public/data/data.js';

let advantageContainer = ``;
let progressBarContainer = ``;
let careerPackagesContainer = ``;
let ourTeamContainer = ``;
let testimonialSliderContainer = ``;
const btnApply = document.querySelectorAll(".btn-apply");

// advantages card
advantages.forEach((advantage) => {
    advantageContainer += `
        <div id="${advantage.id}" class="advantage">
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
            <div class="progress-bar-icon" style="width: 20%">
                i
            </div>

            <div class="" style="width: 80%">
                <div class="progress-bar-top">
                    <h3 class="progress-bar-title">
                        ${progressBar.title}
                    </h3>

                    <div class="progress-bar-percentage">
                        ${progressBar.filled}%
                    </div>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar-inner" style="width: ${progressBar.filled}%"></div>
                </div>
            </div>
        </div>`
});
document.getElementById('progressBarContainer').innerHTML = progressBarContainer;

// career packages
careerPackages.forEach((careerPackage) => {
    careerPackagesContainer += `<div class="career-card col-12 col-md-4 my-2 ${careerPackage.recommended ? 'recommended' : ''}">
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
    testimonialSliderContainer += `
         <li class="carousel-card swiper-slide">
            <div class="carousel-image">
                <img src="${testimonial.image}" alt="">
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

for (let i = 0; i < btnApply.length; i++) {
    btnApply[i].addEventListener("click", () => {
        location.href = 'application-form.html';
    });
}

function applyNow() {
    location.href = 'application-form.html';
}

// footer
const currentYear = new Date().getFullYear();
document.getElementById('copyright').innerText = `Copyright © ${currentYear} Talents Weave. All Rights Reserved.`