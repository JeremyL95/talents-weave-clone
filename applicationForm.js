import { countries } from './public/data/data.js'

const selectBox = document.querySelector('.options'),
    searchBox = document.querySelector('.search-box'),
    caretIcon = document.querySelector('.fa-caret-down'),
    selectedOption = document.querySelector('.selected-option div'),
    dialCode = document.querySelector('.country-dialcode'),
    phoneInput = document.querySelector('input[type="tel"]')

let options = null;

countries.forEach((country, index) => {
    const option = `<li id="${index}" class="option">
                        <div>
                            <span class="iconify" data-icon="flag:${country.country_code.toLowerCase()}-4x3"></span>
                            <span class="country-name">${country.country_name}</span>
                        </div>
                        <strong class="dialcode">+${country.dial_code}</strong>
                    </li>`

    selectBox.querySelector('ol').insertAdjacentHTML('beforeend', option);
    options = document.querySelectorAll('.option');
});

options.forEach(option => {
    option.addEventListener('click', selectDialCode);
})

function selectDialCode() {
    const currentIcon = this.querySelector('.iconify').cloneNode(true);
    const currentDialCode = this.querySelector('.dialcode');

    dialCode.innerHTML = '';
    dialCode.append(currentIcon);
    document.querySelector('.current-dialcode').innerText = currentDialCode.innerText;

    toggleDialCodeDropdown();

    searchBox.value = "";
    selectBox.querySelectorAll('.hide').forEach((element) => element.classList.remove('hide'));
}

function searchCountryByName() {
    let searchQuery = searchBox.value.toLowerCase();

    options.forEach(option => {
        let isMatched = option.querySelector('.country-name').innerText.toLowerCase().includes(searchQuery);
        option.classList.toggle('hide', !isMatched);
    });
}

function toggleDialCodeDropdown() {
    selectBox.classList.toggle('active');
    caretIcon.classList.toggle('active');

    searchBox.focus();
}

function returnNumberOnly(el) {
    return el.target.value = el.target.value.replace(/[^0-9]/g, '');
}

phoneInput.addEventListener('input', returnNumberOnly)
selectedOption.addEventListener('click', toggleDialCodeDropdown);
searchBox.addEventListener('input', searchCountryByName);

const currentYear = new Date().getFullYear();
document.getElementById('copyright').innerText = `Copyright © ${currentYear} Talents Weave. All Rights Reserved.`