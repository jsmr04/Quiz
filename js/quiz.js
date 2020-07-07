let maxQuestions = 10;
var img = document.getElementById('question-image');
var progressBar = document.getElementById('progress-bar');
var questionNumber = document.getElementById('question-number');
var audioSource = document.getElementById('audio_source');
var videoSource = document.getElementById('video_source');
var audio = document.getElementById('audio');
var video = document.getElementById('video');
var desc = document.getElementById('description');
var c1 = document.getElementById('choice1');
var c2 = document.getElementById('choice2');
var c3 = document.getElementById('choice3');
var c4 = document.getElementById('choice4');
var index = 0;
var correctAnswers = 0;
var choice = '';


class Question {
    constructor(name, description, choice1, choice2, choice3, choice4, choice1Correct, choice2Correct, choice3Correct, choice4Correct, typeResource, fileName, file) {
        this.name = name;
        this.description = description;
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.choice4 = choice4;
        this.choice1Correct = choice1Correct;
        this.choice2Correct = choice2Correct;
        this.choice3Correct = choice3Correct;
        this.choice4Correct = choice4Correct;
        this.typeResource = typeResource;
        this.fileName = fileName;
        this.file = file;
    }
}

var quiz = [];
var userRef = firebase.database().ref('question/');
userRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var question = new Question(childKey,
            childData["description"],
            childData["choice1"],
            childData["choice2"],
            childData["choice3"],
            childData["choice4"],
            childData["choice1Correct"],
            childData["choice2Correct"],
            childData["choice3Correct"],
            childData["choice4Correct"],
            childData["typeResource"],
            childData["file"],
            ''
        );
        quiz.push(question);
        console.log(quiz.length);
    });
    shuffle();
    getResources();
    updateUi();
})

function shuffle() {
    //var currentIndex = quiz.length, temporaryValue, randomIndex;
    var currentIndex = quiz.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = quiz[currentIndex];
        quiz[currentIndex] = quiz[randomIndex];
        quiz[randomIndex] = temporaryValue;
    }

    return quiz;
}

function next() {

    if (choice != '') {
        checkCorrectAnswer();
        index++;
        if (index > maxQuestions - 1) {
            console.log(correctAnswers);
            saveScore();
            window.location.href = './result.html' + window.location.search + '&score=' + correctAnswers;
        } else {
            updateUi();
        }

    }

}

function increaseProgress() {
    var currentQuestion = index + 1;
    var w = (currentQuestion / maxQuestions) * 100;

    progressBar.setAttribute('style', 'width:' + w + '%;');
    questionNumber.innerHTML = currentQuestion;

}

function checkCorrectAnswer() {
    var correct = false;
    switch (choice) {
        case 'choice1':
            correct = quiz[index].choice1Correct;
            console.log(correct);
            break;
        case 'choice2':
            correct = quiz[index].choice2Correct;
            console.log(correct);
            break;
        case 'choice3':
            correct = quiz[index].choice3Correct;
            console.log(correct);
            break;
        case 'choice4':
            correct = quiz[index].choice4Correct;
            console.log(correct);
            break;
        default:
            correct = false;
    }

    if (correct) {
        correctAnswers++;
    }
    console.log(correctAnswers);
}

function setChoice(pChoice) {
    choice = pChoice;

    setDefaultChoiceStyle();

    switch (choice){
      case 'choice1':
        c1.setAttribute('class','button-choice button-choice-focus');
        break;  
      case 'choice2':
        c2.setAttribute('class','button-choice button-choice-focus');
        break; 
      case 'choice3':
        c3.setAttribute('class','button-choice button-choice-focus');
        break; 
      case 'choice4':
        c4.setAttribute('class','button-choice button-choice-focus');
        break; 
    }
    console.log(choice);
}

function setDefaultChoiceStyle(){
    c1.setAttribute('class','button-choice');
    c2.setAttribute('class','button-choice');
    c3.setAttribute('class','button-choice');
    c4.setAttribute('class','button-choice');
}

function clearChoice() {
    choice = '';
    console.log('clear' + choice);
}

function updateUi() {
    setDefaultChoiceStyle();
    desc.innerHTML = quiz[index].description;
    c1.value = quiz[index].choice1;
    c2.value = quiz[index].choice2;
    c3.value = quiz[index].choice3;
    c4.value = quiz[index].choice4;

    if (quiz[index].typeResource == 'image') {
        img.src = quiz[index].file;
        console.log('URL: ' + quiz[index].file);
        img.setAttribute('style', 'display:initial');
        audio.setAttribute('style', 'display:none');
        video.setAttribute('style', 'display:none');
    } else if (quiz[index].typeResource == 'audio') {
        audioSource.src = quiz[index].file;
        audio.load();
        img.setAttribute('style', 'display:none');
        audio.setAttribute('style', 'display:initial');
        video.setAttribute('style', 'display:none');
    } else if (quiz[index].typeResource == 'video') {
        videoSource.src = quiz[index].file;
        video.load();
        img.setAttribute('style', 'display:none');
        audio.setAttribute('style', 'display:none');
        video.setAttribute('style', 'display:initial');
    } else {
        img.setAttribute('style', 'display:none');
        audio.setAttribute('style', 'display:none');
        video.setAttribute('style', 'display:none');
    }

    increaseProgress();
}

function getResources() {
    //Getting file URL
    var storage = firebase.storage();
    var storageRef = storage.ref('resouce');
    quiz.forEach(function(question) {
        console.log(question.fileName);
        if (question.fileName != '' && question.fileName != undefined) {
            storageRef.child(question.fileName).getDownloadURL().then(function(url) {
                question.file = url;
                updateUi();
            })
        }
    });
}

function saveScore() {
    var urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has('firstName')) {

        var email = urlParams.get('email');
        var firstName = urlParams.get('firstName');
        var lastName = urlParams.get('lastName');

        //Storing data into Firebase
        firebase.database().ref("score/" + firstName).set({
            lastName: lastName,
            email: email,
            score: correctAnswers
        });
        console.log('score saved on cloud');
    }

}