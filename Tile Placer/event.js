function newTile(ids) {
    //other parameters
    col = parseInt(document.getElementById("columnNumber").innerHTML);
    row = parseInt(document.getElementById("rowNumber").innerHTML);
    //new tile properties
    const divTag = document.createElement("div");
    divTag.id ="row"+row+"col"+col;
    divTag.className = "tile";
    divTag.onclick = function() {
    colorChange(this);
};
    if(ids === "red") divTag.style.backgroundColor = "rgb(255, 0, 0)";
    else if(ids === "green") divTag.style.backgroundColor = "rgb(0, 128, 0)";
    else if(ids === "blue") divTag.style.backgroundColor = "rgb(0, 0, 255)";
    else if(ids === "black") divTag.style.backgroundColor = "rgb(0, 0, 0)";
    else if(ids === "white") divTag.style.backgroundColor = "rgb(255, 228, 196)";    

    document.getElementById("row"+row).appendChild(divTag);
    /*
    if (col < 5) {
        document.getElementById("row"+row).appendChild(divTag);
    }
    else {
        document.getElementById("row"+row).appendChild(divTag);
    }*/
    

}

function colorChange(tile) {
    var currentColor = window.getComputedStyle(tile).backgroundColor;
    console.log("Current color:", tile.style.backgroundColor);
    /*red*/if (currentColor === "rgb(255, 0, 0)") tile.style.backgroundColor = "green";
    /*green*/else if (currentColor === "rgb(0, 128, 0)") tile.style.backgroundColor = "blue";
    /*blue*/else if (currentColor === "rgb(0, 0, 255)") tile.style.backgroundColor = "black";
    /*black*/else if (currentColor === "rgb(0, 0, 0)") tile.style.backgroundColor = "bisque";
    /*white*/else if (currentColor === "rgb(255, 228, 196)") tile.style.backgroundColor = "red";
    console.log("Current color:", tile.style.backgroundColor);
}