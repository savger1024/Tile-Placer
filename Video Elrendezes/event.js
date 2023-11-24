function darkModeSwitch(ids) {
    if(ids === "lightMode") {
        let element = document.getElementById("videoContainer");
        element.style.backgroundColor = "bisque";
    }
    else if(ids === "darkMode") {
        let element = document.getElementById("videoContainer");
        element.style.backgroundColor = "darkgray";
    }
}