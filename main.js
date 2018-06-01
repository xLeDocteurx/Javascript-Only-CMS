
var myDatas = [];
var myJSON = "JSON/save.json";

// var regex = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,16}$/g;
// var regex = ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}$;
// var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,24}$/g;

// console.log(localStorage.getItem("json").length);
if (localStorage.getItem("json") == null) {
    console.log(`Aucun LocalStorage "json" trouvé. nous allons le créer`);
    requestJSON(myJSON);

    console.log(myDatas);
    console.log(localStorage.getItem("json"));
} else {
    // console.log(`LocalStorage trouvé !!!`);
    // console.log(`LocalStorage trouvé : // ${typeof JSON.parse(localStorage.getItem("json"))} // "json" trouvé.`);
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


    var username = String(form.inputUsername.value);
    var password = String(form.inputPassword.value);
    console.log("form username : ");
    console.log(username);
    console.log("form password : ");
    console.log(password);

    myDatas = JSON.parse(localStorage.getItem("json"));
    var found = myDatas.users.find(element => {
        return element.username == username;
    });
    // console.log("username in array :");
    // console.log(found);


    if (found != null) {
        // console.log("found got found : ");
        // console.log(found);
        // var indexOfUsername = myDatas.users.indexOf(found);
        // console.log("index of username : ");
        // console.log(indexOfUsername);
        console.log("console.log(myDatas.users.indexOf(found));");
        console.log(myDatas.users.indexOf(found));

        // if (myDatas.users.indexOf(found) > 0) {
            var indexOfUsername = myDatas.users.indexOf(found);
            console.log("index of username : ");
            console.log(indexOfUsername);
            console.log("Username in array");
            console.log(myDatas.users[indexOfUsername].username);
            if (username == myDatas.users[indexOfUsername].username) {
                if (password == myDatas.users[indexOfUsername].password) {
                    var user = myDatas.users[indexOfUsername];
                    localStorage.setItem("currentUser", JSON.stringify(user));
                    alert("Connexion réussie");
                } else {
                    localStorage.removeItem("currentUser");
                    alert("Wrong password");
                }
            }
        // }
    } else {
        localStorage.removeItem("currentUser");
        alert("We don't know this user");
    }
}

function getCurrentUser() {
    var user = JSON.parse(localStorage.getItem("currentUser"));
    return user;
}

function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html"
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
        element.innerText = `${user.username} // ${user.city}`;

        paragraphe.appendChild(element);
    }
}
