var textScore = document.getElementById('score');
var message = document.getElementById('message');
var name = document.getElementById('username');

var urlParams = new URLSearchParams(window.location.search);
var email;
var firstName;
var lastName;
var score;
var text;

if (urlParams.has('score')) {
    score = urlParams.get('score');
    textScore.innerHTML = score + ' of 10';

    if (urlParams.has('firstName')) {
        firstName = urlParams.get('firstName');

        if (score >= 8) {
            text = 'You have successfully passed the test. You are now certified in Spanish Language';
        } else {
            text = 'Unfortunately you did not pass the test. Please try again later!';
        }
        name.innerHTML = firstName;
        message.innerHTML = text;
    }
}

function goToQuiz() {
    urlParams.delete('score');
    window.location.href = './questions-quiz.html?' + urlParams.toString();
}