import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const formRef = document.querySelector('.feedback-form');
const textareaRef = document.querySelector('textarea');
const inputEmailRef = document.querySelector('input');

formRef.addEventListener('submit', onFormSubmit);
textareaRef.addEventListener('input', throttle(onTextareaInput, 500));
inputEmailRef.addEventListener('input', throttle(onTextareaInput, 500));

populateTextareaData();

function onFormSubmit(event) {
  event.preventDefault();
  event.currentTarget.reset();

  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput() {
  const infoForSubmit = {
    email: inputEmailRef.value,
    message: textareaRef.value,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(infoForSubmit));
}

function populateTextareaData() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    textareaRef.value = savedMessage;
  }
}
