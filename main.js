
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
    getLocalPosts();
}

isUserConnected();

// if (localStorage.getItem("currentUser") != null) {

//     document.getElementById("");
// }

// reader.addEventListener("load", function() {
//     pre.textContent = JSON.stringify(reader.result, null, 2);
//   });
function checkIfPostIsOk() {

    var form = document.forms.namedItem("user-form");

    var title = form.title.value;
    var content = form.content.value;
    var author = JSON.parse(localStorage.getItem("currentUser")).username;

    registerNewPost(title, content, author);
}

function editPost(id) {

    console.log("user istrying to edit post n°" + id);
    myDatas = JSON.parse(localStorage.getItem("json"));

    var actualpostcontent = document.getElementById(`post-content_${id}`);
    var newpostcontent = document.createElement("textarea");
    var newpostbutton = document.createElement("button");
    newpostbutton.setAttribute("class", "btn btn-sm btn-warning");
    newpostbutton.setAttribute("onclick", `registerPostContent(${id})`);
    newpostbutton.innerText = "Save It !";
    newpostcontent.setAttribute("id", `new-post-content_${id}`);
    newpostcontent.setAttribute("class", `w-100`);
    newpostcontent.setAttribute("style", `height:200px;`);
    newpostcontent.innerText = myDatas.posts[id].content;
    actualpostcontent.parentNode.insertBefore(newpostcontent, document.getElementById(`guide_${id}`));
    actualpostcontent.parentNode.insertBefore(newpostbutton, document.getElementById(`guide_${id}`));

    actualpostcontent.innerHTML = "";
    // actualpostcontent.innerHTML = ``;

}

function registerPostContent(id) {

    myDatas.posts[id].content = document.getElementById(`new-post-content_${id}`).value;
    console.log(document.getElementById(`new-post-content_${id}`).value);
    // console.log(myDatas.posts[id].content);
    localStorage.setItem("json", JSON.stringify(myDatas));
    backHomeMarty();
    console.log("user is trying to save a post. post : " + id);
}

function deletePost(id) {

    myDatas = JSON.parse(localStorage.getItem("json"));

    // var found = myDatas.posts.find(element => {
    //     return element.title == title;
    // });
    // var indexxx = myDatas.posts.indexOf(found);
    console.log("user istrying to delete post n° " + id);

    myDatas.posts.splice(id, 1);
    localStorage.setItem("json", JSON.stringify(myDatas));
    backHomeMarty();
}

function checkIfEditIsOk() {

    var form = document.forms.namedItem("user-form");

    var title = form.title.value;
    var content = form.content.value;
    var author = JSON.parse(localStorage.getItem("currentUser")).username;

    registerNewPost(title, content, author);
}

function checkUsername(that) {
    var input = that.value;

    myDatas = JSON.parse(localStorage.getItem("json"));
    var found = myDatas.users.find(element => {
        return element.username == input;
    });
    if (found == null) {
        console.log("input : " + input + " // toujours pas de match !");
    } else {
        console.log("input : " + input + " // Cet username est déja présent dans la base de donnés !");
        var inputField = document.getElementById("username");
        inputField.setAttribute("class", "form-control is-invalid");
    }
}

function checkIfFormIsOk() {

    if (document.getElementsByClassName("invalid")[0]) {
        
        console.log(document.getElementsByClassName("invalid")[0]);

        var form = document.forms.namedItem("user-form");

        var email = form.email.value;
        console.log(form.password);
        form.password.type = "text";
        console.log(form.password);
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
}

function registerNewPost(title, content, author) {

    if (title != "" && content != "") {

        var newPost = new Post(title, content, author);
        myDatas = JSON.parse(localStorage.getItem("json"));
        myDatas.posts.push(newPost);
        localStorage.setItem("json", JSON.stringify(myDatas));

        backHomeMarty();
    }
}

function backHomeMarty() {
    window.location.href = "index.html";
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

    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // backHomeMarty();
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

                //                           /////////////////////



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

// function getCurrentUser() {
//     var user = JSON.parse(localStorage.getItem("currentUser"));
//     return user;
// }

function isUserConnected() {

    if (localStorage.getItem("currentUser") != null) {
        console.log("user is connected");
        document.getElementById("login-button").style.display = "none";
        document.getElementById("logged-button").style.display = "inline-block";
        document.getElementById("userpage").innerText = JSON.parse(localStorage.getItem("currentUser")).username;
        document.getElementById("joinlink").style.display = "none";


    } else {
        console.log("user is not connected");
        document.getElementById("login-button").style.display = "inline-block";
        document.getElementById("logged-button").style.display = "none";
        document.getElementById("newpost-link").style.display = "none";
        document.getElementById("newpost-divider").style.display = "none";

        if (document.getElementsByClassName("post-edit")) {
            var postsedit = document.getElementsByClassName("post-edit");
            for (var post of postsedit) {
                post.style.display = "none";
            }
        }
    }
}

function logOut() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

function oneUser(user) {
    // console.log(local);
    // console.log(local.stringify(myDatas));
    // if (document.getElementById("aside")) {
    var wanted = document.getElementById("wanted");
    wanted.style.display = "block";
    wanted.innerHTML = `
                <div class="col">          
                <div class="card w-50  mx-auto mt-5" style="width: 18rem;">
                    <img class="card-img-top m-auto" src="img/${user.img}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${user.username} : ${user.firstname} ${user.lastname}</h5>
                        <p class="card-text">
                            <b>Sex : </b>${user.sex}<br>
                            <b>City : </b>${user.city}<br>
                            <b>Hobbies : </b>${user.hobbies}<br>
                            <b>website : </b><a href="${user.website}">${user.website}</a><br>
                        </p>
                        <b>Favorite Color : </b><div class="favcolor" style="background-color:${user.color}"></div><br>
                        <br>
                    </div>
                </div>                                   
            </div>
        `;
    // }
}

function getLocalPosts() {
    var local = JSON.parse(localStorage.getItem("json"));
    // console.log(local);
    // console.log(local.stringify(myDatas));


    if (document.getElementById("dz")) {
        var paragraphe = document.getElementById("dz");
        paragraphe.innerHTML = `<h2 class="text-center">Posts List</h2>
                                <hr class="mb-4">`;
        var id = 0;
        for (var post of local.posts) {
            // paragraphe.innerHTML += `<br> ${user.firstname} ${user.lastname}`;
            var element = document.createElement("div");
            element.setAttribute("id", `post_${id}`);
            element.setAttribute("class", "card mb-5 px-4 py-3");
            element.innerHTML = `<hr class="mb-4">
				<article>
					<header class="row">
						<div class="col-md-10">
							<h4 class="text-info">${post.title}</h4>
						</div>
						<div class="post-edit col-md-2 text-right">
							<button class="btn btn-sm" onclick="editPost(${id})">✎</button>
                            <button class="btn btn-sm" onclick="deletePost(${id})">␡</button>
						</div>
                    </header>
                    <hr class="mb-4">
                    <p id="post-content_${id}">
						${post.content}
                    </p>
                    <hr id="guide_${id}" class="mb-4">
					<footer>
						<!-- <small> -->
							Author : ${post.author}
						<!-- </small> -->
					</footer>
                    <hr class="mb-4">
				</article>`;

            paragraphe.appendChild(element);
            id += 1;
        }
    }
}

function getLocalStorage() {
    var local = JSON.parse(localStorage.getItem("json"));
    // console.log(local);
    // console.log(local.stringify(myDatas));
    if (document.getElementById("aside")) {
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
}
