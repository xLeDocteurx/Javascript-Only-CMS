
var myDatas = [];
var myJSON = "JSON/save.json";

var regex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,16}$/g;

// console.log(localStorage.getItem("json").length);
if (localStorage.getItem("json") == null) {
    console.log(`Aucun LocalStorage "json" trouvé. nous allons le créer`);
    requestJSON(myJSON);

    console.log(myDatas);
    console.log(localStorage.getItem("json"));
} else {
    console.log(`LocalStorage trouvé !!!`);
    console.log(`LocalStorage trouvé : // ${typeof JSON.parse(localStorage.getItem("json"))} // "json" trouvé.`);
    // console.log(`LocalStorage trouvé : // ${localStorage.getItem("json").split(",")} // "json" trouvé.`);
    getLocalStorage();
}

// reader.addEventListener("load", function() {
//     pre.textContent = JSON.stringify(reader.result, null, 2);
//   });


function checkIfFormIsOk() {

    var form = document.forms.namedItem("user-form");
    // console.log(form);


    // for (var element of form) {
    //     console.log(element.id);
    // }

    // if (truc.value == null || truc.value == "") {
    //     alert(`Vous devez impérativement remplir le champ ${truc.id} // ${truc.name}`);
    // }


    var email = form.email.value;
    var password = form.password.value;
    var x = form.x.checked;
    var y = form.y.checked;
    var firstname = form.firstname.value;
    var lastname = form.lastname.value;
    var address = form.address.value;
    var city = form.city.value;
    var zip = form.zip.value;
    var phone = form.phone.value;
    var username = form.username.value;
    var hobbies = form.hobbies.value;
    var website = form.website.value;
    var color = form.color.value;

    var sex;
    if (x == true) {
        sex = "m";
    } else if (y == true) {
        sex = "f"
    }

    registerNewUser(username, password, firstname, lastname, sex, email, phone, address, city, website, color, hobbies);
}

function registerNewUser(username, password, firstname, lastname, sex, email, phonenumber, adress, city, website, color, hobbies) {

    var currentUser = new User(username, password, firstname, lastname, sex, email, phonenumber, adress, city, website, color, hobbies);
    // console.log(currentUser);
    myDatas = JSON.parse(localStorage.getItem("json"));
    myDatas.users.push(currentUser);
    console.log("mydatas : ");
    console.log(myDatas);
    localStorage.setItem("json", JSON.stringify(myDatas));
    console.log("localstorage : ");
    console.log(localStorage.getItem("json"));
    getLocalStorage();
}

function logIn() {
    var form = document.forms.namedItem("signin-form");    

    myDatas = JSON.parse(localStorage.getItem("json"));
    var indexOfUsername = myDatas.users.indexOf(email);
    if (indexOfUsername) {
        console.log(myDatas.users[indexOfUsername]);
        if (form.username === myDatas.users[indexOfUsername].username && form.password === myDatas.users[indexOfUsername].password) {
            var user = myDatas.users[indexOfUsername];
            localStorage.setItem("currentUser", JSON.stringify(user));
            console.log("Connexion réussie");
        } else {
            localStorage.removeItem("currentUser");
            console.log("Adresse email ou mot de passe invalide");
        }
    }
}

function getCurrentUser() {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    return user;
}

function getOneUser(id) {
    var user = JSON.parse(localStorage.getItem("json")).users[id];
    return user;
}

function getLocalStorage() {
    var local = JSON.parse(localStorage.getItem("json"));
    // console.log(local);
    // console.log(local.stringify(myDatas));

    var paragraphe = document.getElementById("aside").getElementsByTagName("div")[0];
    paragraphe.innerHTML = "";
    for (var user of local.users) {
        // paragraphe.innerHTML += `<br> ${user.firstname} ${user.lastname}`;
        var element = document.createElement("p");
        element.setAttribute("id", `user_${user.username}`);
        element.setAttribute("class", "card");
        element.innerText = `${user.firstname} ${user.lastname} // ${user.city}`;

        paragraphe.appendChild(element);
    }
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

// function createJSONFile(name, json) {

//     var file, url, reader = new FileReader;

//     // code.classList.remove("invalid");
//     file = new File([json], name, { type: "application/json" });
//     url = URL.createObjectURL(file);
//     document.location.href = "data:application/json;base64,/9j/4AAQSkZJRgABAQAAAQAB…";
//     console.log("URL : ");
//     console.log(url);
//     console.log(file);
//     return url;

// }

function convertJSON(url) {

    fetch(url, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(json => {
            myDatas = json;
            console.log(myDatas);
        });
}

function requestJSON(url) {
    convertJSON(url);
    setTimeout(requestJSONLater, 1000);
    // localStorage.setItem("json", JSON.stringify(myDatas));
    console.log(localStorage.getItem("json"));
}

function requestJSONLater() {

    // console.log(JSON.stringify(myDatas));
    localStorage.setItem("json", JSON.stringify(myDatas));
    console.log(myDatas);

    var paragraphe = document.getElementById("aside").getElementsByTagName("div")[0];
    paragraphe.innerHTML = "";

    myDatas = JSON.parse(localStorage.getItem("json"));
    console.table(myDatas);
    for (var user of myDatas.users) {
        // paragraphe.innerHTML += `<br> ${user.firstname} ${user.lastname}`;
        var element = document.createElement("p");
        element.setAttribute("id", `user_${user.username}`);
        element.setAttribute("class", "card");
        element.innerText = `${user.firstname} ${user.lastname} // ${user.city}`;

        paragraphe.appendChild(element);
    }
    localStorage.setItem("json", JSON.stringify(myDatas));

}