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

    // if (document.getElementById("aside")) {

    //     var paragraphe = document.getElementById("aside").getElementsByTagName("div")[0];
    //     paragraphe.innerHTML = "";
    
    //     myDatas = JSON.parse(localStorage.getItem("json"));
    //     console.table(myDatas);
    //     for (var user of myDatas.users) {
    //         // paragraphe.innerHTML += `<br> ${user.firstname} ${user.lastname}`;
    //         var element = document.createElement("p");
    //         element.setAttribute("id", `user_${user.username}`);
    //         element.setAttribute("class", "card");
    //         element.innerText = `${user.username} // ${user.city}`;
    
    //         paragraphe.appendChild(element);
    //     }
    //     localStorage.setItem("json", JSON.stringify(myDatas));
    // }

    if (document.getElementById("dz")) {
        getLocalPosts();
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
