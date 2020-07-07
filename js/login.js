function loginRequest(){
    if (validateFields()){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var result = document.getElementById('result');
  
    firebase.auth().signInWithEmailAndPassword(email, password).then((success) => {
      window.location.href = "./list-questions.html";
    }).catch((error) => {
      // Handle Errors here.
      result.innerHTML = error.code + '-' + error.message;
    });
  
    return false;
  }
}
  
  function validateFields(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var message = '';
   
    if (email.trim() == ""){
      message = "You must complete the field E-mail";
    }
  
    if (password.trim() == ""){
      message = message + "\n" + "You must complete the field Password";
    }
  
    if (message != ""){
      result.innerHTML = message;
      return false;
    }else{
      return true;
    }
  }
  
  