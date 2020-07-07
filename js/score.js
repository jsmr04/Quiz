var tableBody = document.getElementById("scoreBody");
var userRef = firebase.database().ref('score/').orderByKey();
        userRef.once('value', function(snapshot){
          snapshot.forEach(function(childSnapshot){
            var tr = document.createElement("tr");
            
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            
            var tdfirstName = document.createElement("td");
            tdfirstName.innerHTML = childKey;
            tr.appendChild(tdfirstName);

            var tdLastName = document.createElement("td");
            tdLastName.innerHTML = childData["lastName"];
            tr.appendChild(tdLastName);
            
            var tdEmail = document.createElement("td");
            tdEmail.innerHTML = childData["email"];
            tr.appendChild(tdEmail);

            var tdScore = document.createElement("td");
            tdScore.innerHTML = childData["score"];
            tr.appendChild(tdScore);

            tableBody.appendChild(tr);

          }); 
        })