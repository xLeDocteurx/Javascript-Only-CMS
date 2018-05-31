var myDatas = [];
var myJSON = "JSON/save.json";

requestJSON(myJSON);

var whenSaving = [];
// reader.addEventListener("load", function() {
//     pre.textContent = JSON.stringify(reader.result, null, 2);
//   });


function checkIfFormIsOk () {

}

function registerNewUser(username, password, firstname, lastname, sex, email, phonenumber, adress, city, website, color, hobbies) {
    var currentUser = new User(username, password, firstname, lastname, sex, email, phonenumber, adress, city, website, color, hobbies);
}

function logIn(email, password) {

    var indexOfEmail = myDatas.users.indexOf(email);
    if (indexOfEmail) {
        console.log(users[indexOfEmail]);
        if (email === myDatas.users[indexOfEmail].email && password === myDatas.users[indexOfEmail].password) {
            var user = myDatas.users[indexOfEmail];
            setCurrentUser(user);
            console.log("Connexion réussie");
        } else {
            console.log("Adresse email ou mot de passe invalide");            
        }
    }
}

function setCurrentUser(email) {
    localStorage.setItem('myStorage', JSON.stringify(currentUser));
}

function getCurrentUser() {
    var user = JSON.parse(localStorage.getItem('myStorage'));
    return user;
}

function getOneUser(that) {
    var user = myDatas.users[that.value];
    return user;
}

function getAllUsers() {
    var users = myDatas.users;
    return users;
}

class User {

    constructor(username, password, firstname, lastname, sex, email, phonenumber, adress, city, website, color, hobbies) {

        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.sex = sex,
            this.email = email,
            this.phonenumber = this.phonenumber,
            this.adress = adress,
            this.city = city,
            this.zip = zip,
            this.website = website,
            this.color = color,
            this.hobbies = hobbies
    }
}

// function convertJSON(url) {

//     var folio = document.getElementById("folio");

//     var request = new XMLHttpRequest();
//     request.open('GET', url);
//     // request.responseType = 'json';
//     // request.send();
//     request.onload = function () {
//         console.log(request.responseText);
//         diapo = request.responseText;        
//         myDatas = JSON.parse(diapo);        
//         // diapo.users.map(x => myDatas.push(x));
//         console.log(myDatas);
//     }
//     request.send();
// }

function convertJSON(url) {

    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(json => {
            myDatas = json;
            // console.log(myDatas);
        });
}

function createJSONFile(name, json) {

    var file, url, reader = new FileReader;

    code.classList.remove("invalid");
    file = new File([json], name, { type: "application/json" });
    url = URL.createObjectURL(file);
    return url;

}

function requestJSON(url) {
    convertJSON(url);
    setTimeout(requestJSONLater, 1000);
}

function requestJSONLater() {

    console.log(myDatas);
    // console.log(JSON.stringify(myDatas));

    var paragraphe = document.getElementById("aside").getElementsByTagName("div")[0];

    for (var user of myDatas.users) {
        // paragraphe.innerHTML += `<br> ${user.firstname} ${user.lastname}`;
        var element = document.createElement("p");
        element.setAttribute("id", `user_${user.username}`);
        element.setAttribute("class", "card");
        element.innerText = `${user.firstname} ${user.lastname} // ${user.city}`;

        paragraphe.appendChild(element);
        console.log("TADA ONE USER");
    }

}