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

class Post {
    
    constructor (title, content, author) {
        this.title = title;
        this.content = content;
        this.author = author;
    }
}