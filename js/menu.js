function myFunction() {
  var x = document.getElementById("menu-links");
  if (x.style.display === "block") {
      x.style.display = "none";
  } else {
      x.style.display = "block";
  }
}

//Menu Icon 

var logo = document.createElement('a');
logo.setAttribute('class', 'active base-bar');


var menuIcon = document.createElement('a');
menuIcon.setAttribute('href', 'javascript:void(0);');
menuIcon.setAttribute('class', 'menu-icon-left base-bar');
menuIcon.setAttribute('onclick', 'myFunction()');
var iconBar = document.createElement('i');
iconBar.setAttribute('class', 'fa fa-bars');


//Login Icon
var menuLogin = document.createElement('a');
menuLogin.setAttribute('href', 'login.html');
menuLogin.setAttribute('class', 'menu-icon-right base-bar');
var iconLogin = document.createElement('i');
iconLogin.setAttribute('class', 'fas fa-user-circle ');


//Mobile Links
var menuMob = document.createElement('div');
menuMob.setAttribute('id', 'menu-links');

var menuLink1 = document.createElement('a');
menuLink1.setAttribute('href', 'index.html');
menuLink1.setAttribute('class', 'menu-itens');
var nodeLink1 = document.createTextNode("Home");

var menuLink2 = document.createElement('a');
menuLink2.setAttribute('href', 'score.html');
menuLink2.setAttribute('class', 'menu-itens');
var nodeLink2 = document.createTextNode("Score");

var menuLink3 = document.createElement('a');
menuLink3.setAttribute('href', 'about.html');
menuLink3.setAttribute('class', 'menu-itens');
var nodeLink3 = document.createTextNode("About Us");


var menu = document.getElementById('menu');
menu.appendChild(logo);


menu.appendChild(menuIcon);
menuIcon.appendChild(iconBar);

menu.appendChild(menuLogin);
menuLogin.appendChild(iconLogin);

menu.appendChild(menuMob);
menuMob.appendChild(menuLink1);
menuLink1.appendChild(nodeLink1);

menuMob.appendChild(menuLink2);
menuLink2.appendChild(nodeLink2);

menuMob.appendChild(menuLink3);
menuLink3.appendChild(nodeLink3);