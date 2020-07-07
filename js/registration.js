var firstName = document.getElementById('first_name');
var lastName = document.getElementById('last_name');
var email = document.getElementById('email');
var message = document.getElementById('message');

function goToQuiz(){
  if (validateFields()){
    window.location.href = './questions-quiz.html?firstName=' + firstName.value + '&lastName=' + lastName.value + '&email=' + email.value;
  }
}

function validateFields(){
  if (firstName.value == '') {
    firstName.focus();
    message.innerHTML = 'First Name is required.';
    return false;
  }

  if (email.value == '') {
    email.focus();
    message.innerHTML = 'Email is required.';
    return false;
  }

  if (!email.value.includes('@')) {
    email.focus();
    message.innerHTML = 'Email is not valid.';
    return false;
  }

  return true;
}