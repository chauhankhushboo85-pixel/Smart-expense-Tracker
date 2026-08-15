document.getElementById("loginForm").addEventListener
("submit", function(event) {

    event.preventDefault();

    let email = document.getElementById("email").value;

    let password = document.getElementById("password").value;


    if (email == "" || password == "") {

        alert("Please enter email and password.");

    } else {

        alert("Login Successful!");

    }

});


function forgotPassword() {

    alert("Password reset option will open here.");

}


function signUp() {

    alert("Registration page will open here.");

}