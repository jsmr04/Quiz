var tableBody = document.getElementById("questionsBody");
var userRef = firebase.database().ref('question/');
userRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var tr = document.createElement("tr");

        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();

        var tdName = document.createElement("td");
        tdName.innerHTML = childKey;
        tr.appendChild(tdName);

        var tdDescription = document.createElement("td");
        tdDescription.innerHTML = childData["description"];
        tr.appendChild(tdDescription);

        var tdChoice1 = document.createElement("td");
        tdChoice1.innerHTML = childData["choice1"];
        tr.appendChild(tdChoice1);

        var tdChoice2 = document.createElement("td");
        tdChoice2.innerHTML = childData["choice2"];
        tr.appendChild(tdChoice2);

        var tdChoice3 = document.createElement("td");
        tdChoice3.innerHTML = childData["choice3"];
        tr.appendChild(tdChoice3);


        var tdChoice4 = document.createElement("td");
        tdChoice4.innerHTML = childData["choice4"];
        tr.appendChild(tdChoice4);

        var tdCorrect = document.createElement("td");

            if (childData["choice1Correct"]){
              tdCorrect.innerHTML = childData["choice1"];
            }

            if (childData["choice2Correct"]){
              tdCorrect.innerHTML = childData["choice2"];
            }

            if (childData["choice3Correct"]){
              tdCorrect.innerHTML = childData["choice3"];
            }

            if (childData["choice4Correct"]){
              tdCorrect.innerHTML = childData["choice4"];
            }

            tr.appendChild(tdCorrect);

        tableBody.appendChild(tr);
    });
})