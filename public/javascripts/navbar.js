function myFunction() {
    var navbar = document.getElementById("myTopnav");
    if (navbar.className === "topnav") {
        navbar.className += " responsive";
    } else {
        navbar.className = "topnav";
    }
}
