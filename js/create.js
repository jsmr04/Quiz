var base64Resource = "";
var fileName = "";

function setFormat(){
  var image = document.getElementById('image').checked;
  var audio = document.getElementById('audio').checked;
  var video = document.getElementById('video').checked;

  var accept = "";

  if (image == true){
    accept = "image/png, image/jpeg";
  }else if(audio == true){
    accept = "audio/wav, audio/mpeg, audio/mp4";
  }else if(video  == true){
    accept = "video/mp4, video/ogg";
  }

  if (accept != ""){
    var filePicker = document.getElementById('resource');
    filePicker.setAttribute('accept', accept);
  }
}

  function saveQuestion(){

    if (validateFields()){
    var type = "";
    var name = "";
    var fullFileName = "";
    var result = document.getElementById("result");
    //Getting the name of the question
    name = document.getElementById("name").value;

    var resourceName = document.getElementById('resource').value;
    //Getting type of resource
    if (base64Resource != ""){
      var image = document.getElementById('image').checked;
      var audio = document.getElementById('audio').checked;
      var video = document.getElementById('video').checked;

      if (image == true){
        type = "image";
      }else if(audio == true){
        type = "audio";
      }else if(video  == true){
        type = "video";
      }
      if (fileName != ""){
        fullFileName = name + "_" + fileName;
      }

    }

    //Storing data into Firebase
    firebase.database().ref("question/" +  name).set({
      description: document.getElementById("description").value,
      choice1: document.getElementById("choice1").value,
      choice2: document.getElementById("choice2").value,
      choice3: document.getElementById("choice3").value,
      choice4: document.getElementById("choice4").value,
      choice1Correct: document.getElementById("choice1Correct").checked,
      choice2Correct: document.getElementById("choice2Correct").checked,
      choice3Correct: document.getElementById("choice3Correct").checked,
      choice4Correct: document.getElementById("choice4Correct").checked,
      typeResource: type, 
      file: name + "_" + fileName,
    });

    console.log('Data stored on Firebase');

    //Storing resource
    if (base64Resource != "" && fileName != ""){
      // Points to the root reference
      var storageRef = firebase.storage().ref();
      var resourceRef = storageRef.child('resouce');
      var childRef = resourceRef.child(fullFileName);

      childRef.putString(base64Resource, 'base64').then(function(snapshot) {
        console.log('Uploaded a base64 string!');
      });
    }

    clearFields();
    result.innerHTML = 'Question created successfully';
  }
}


function validateFields(){
  var name = document.getElementById("name").value;
  var description = document.getElementById("description").value;
  var choice1 = document.getElementById("choice1").value;
  var choice2 = document.getElementById("choice2").value;
  var choice3 = document.getElementById("choice3").value;
  var choice4 = document.getElementById("choice4").value;
  var result = document.getElementById("result");
  var message = "";

  if (name.trim() == ""){
    message = "You must complete the field Name";
  }

  if (description.trim() == ""){
    message = message + "\n" + "You must complete the field Description";
  }

  if (choice1.trim() == ""){
    message = message + "\n" + "You must complete the field Choice1";
  }

  if (choice2.trim() == ""){
    message = message + "\n" + "You must complete the field Choice2";
  }

  if (choice3.trim() == ""){
    message = message + "\n" + "You must complete the field Choice3";
  }

  if (choice4.trim() == ""){
    message = message + "\n" + "You must complete the field Choice4";
  }

  if (message != ""){
    result.innerHTML = message;
    return false;
  }else{
    return true;
  }
}

function handleFileSelect(evt) {
      
  var f = evt.target.files[0]; // FileList object
  var reader = new FileReader();
  // Closure to capture the file information.
  reader.onload = (function(theFile) {
    return function(e) {
      var binaryData = e.target.result;
      console.log(f);
      //Converting Binary Data to base 64
      base64Resource = window.btoa(binaryData);
      fileName = f.name;
      console.log('File converted to base64 successfuly!');
    };
  })(f);
  // Read in the image file as a data URL.
  reader.readAsBinaryString(f);
}

 // Check for the File API support.
 if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('resource').addEventListener('change', handleFileSelect, false);
} else {
    alert('The File APIs are not fully supported in this browser.');
}

function clearFields(){
  document.getElementById("name").value = '';
  document.getElementById("description").value = '';
  document.getElementById("choice1").value = '';
  document.getElementById("choice2").value = '';
  document.getElementById("choice3").value = '';
  document.getElementById("choice4").value = '';
  document.getElementById("choice1Correct").checked = false;
  document.getElementById("choice2Correct").checked = false;
  document.getElementById("choice3Correct").checked = false;
  document.getElementById("choice4Correct").checked = false;
  document.getElementById('image').checked = false;
  document.getElementById('resource').value = '';
}