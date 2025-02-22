const emailInput = document.querySelector('.subscription-form__input');

emailInput.addEventListener('input', function() {
  if (emailInput.checkValidity()) {
    emailInput.classList.remove('error');  
  } else {
    emailInput.classList.add('error'); 
  }
});