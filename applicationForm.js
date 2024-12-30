import { countries } from './public/data/data.js'

const selectBox = document.querySelector('.options'),
    searchBox = document.querySelector('.search-box'),
    caretIcon = document.querySelector('.fa-caret-down'),
    selectedOption = document.querySelector('.selected-option div'),
    dialCode = document.querySelector('.country-dialcode'),
    phoneInput = document.querySelector('input[type="tel"]'),
    form = document.getElementById('form'),
    nameInput = document.getElementById('name'),
    emailInput = document.getElementById('email'),
    nationalityInput = document.getElementById('nationality');

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

function returnStringOnly(el) {
    return el.target.value = el.target.value.replace(/[^a-zA-Z]/g, '');
}

function validateForm(evt) {
    evt.preventDefault();
    validateUserInput();
}

function validateUserInput() {
    const userNameValue = nameInput.value.trim(),
        userEmailValue = emailInput.value.trim(),
        userPhoneNumberValue = phoneInput.value.trim(),
        userNationalityValue = nationalityInput.value.trim();

    // name validation
    if (userNameValue === "") {
        setError(nameInput, 'Username is required');
    } else {
        setSuccess(nameInput);
    }

    // email validation
    if (userEmailValue === "") {
        setError(emailInput, 'Email is required');
    } else if (!isValidEmail(userEmailValue)) {
        setError(emailInput, 'Enter a valid email address');
    } else {
        setSuccess(emailInput);
    }

    // phone validation
    if (userPhoneNumberValue === "") {
        setError(phoneInput, 'Phone number is required');
    } else {
        setSuccess(phoneInput);
    }

    // nationality validation
    if (userNationalityValue === "") {
        setError(nationalityInput, 'Nationality is required');
    } else {
        setSuccess(nationalityInput)
    }
}

function isValidEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
}

function setError(element, message) {
    let inputControl, errorMessageDisplay;

    if (element.id === 'phone') {
        inputControl = element.closest('.custom-phone-dropdown');
    } else {
        inputControl = element.parentElement;
    }

    errorMessageDisplay = inputControl.querySelector('.error-message');
    errorMessageDisplay.innerText = message;
    inputControl.classList.add('error');
}

function setSuccess(element) {
    let inputControl, errorMessageDisplay;

    if (element.id === 'phone') {
        inputControl = element.closest('.custom-phone-dropdown');
    } else {
        inputControl = element.parentElement;
    }

    errorMessageDisplay = inputControl.querySelector('.error-message');
    errorMessageDisplay.innerText = "";
    inputControl.classList.remove('error');
}

phoneInput.addEventListener('input', returnNumberOnly);
nationalityInput.addEventListener('input', returnStringOnly);
selectedOption.addEventListener('click', toggleDialCodeDropdown);
searchBox.addEventListener('input', searchCountryByName);

form.addEventListener('submit', validateForm);