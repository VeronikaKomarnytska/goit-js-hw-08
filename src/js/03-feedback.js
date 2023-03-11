import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const infoForSubmit = {};

const formRef = document.querySelector('.feedback-form');
const textareaRef = document.querySelector('textarea');
const inputEmailRef = document.querySelector('input');

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onTextareaInput, 500));

populateTextareaData();

function onFormSubmit(event) {
  event.preventDefault();
  const email = inputEmailRef.value;
  const message = textareaRef.value;
  if (email === '' || message === '') {
    return;
  }
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  }

function onTextareaInput(e) {
  infoForSubmit[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(infoForSubmit));
}

function populateTextareaData() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const objectValuesToString = JSON.parse(savedMessage);
  if (savedMessage) {
    console.log(savedMessage);
    inputEmailRef.value = objectValuesToString.email;

    textareaRef.value = objectValuesToString.message;
   
  }
}
