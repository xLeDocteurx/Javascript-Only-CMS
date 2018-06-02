var hasBeenClicked = false;

// convertJSON();
// console.log(wanteds);

function clickOnUser(that) {


    var item = JSON.parse(localStorage.getItem("json")).users[that.value];
    console.log("item : ");
    console.log(item);
    // var item = wanteds.users[that.value];
    var wanted = document.getElementById("wanted");
    wanted.style.display = "block";
    wanted.innerHTML = `
                <div class="col">          
                    <div class="card w-50  mx-auto mt-5" style="width: 18rem;">
                        <img class="card-img-top m-auto" src="img/${item.img}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${item.firstname} ${item.lastname}</h5>
                            <p class="card-text">
                                <b>Sex : </b>${item.sex}<br>
                                &<br>
                                <b>City : </b>${item.city}<br>
                                <b>Hobbies : </b>${item.hobbies}<br>
                                <b>website : </b><a href="${item.website}">${item.website}</a><br>
                            </p>
                            <b>Favorite Color : </b><div class="favcolor" style="background-color:#${item.color}"></div><br>
                            <br>
                        </div>
                    </div>                                   
                </div>
        `;


}


//////////////////// FUNCTION LAUNCHED WITH DELAY /////////////////////    

function update() {
    var wanteds = JSON.parse(localStorage.getItem("json"));
    if (hasBeenClicked == false) {
        wanteds.users.forEach((element, index) => {
            var users_select = document.getElementById("users_select");
            var option = document.createElement("option");
            option.setAttribute("value", index);
            // option.setAttribute("onclick", "clickOnUser(this)");
            option.innerHTML = `${element.username} | ${element.city}`;

            users_select.appendChild(option);
        });
    }
    hasBeenClicked = true;
}


////////////////////////////////////////////////////////////////////////