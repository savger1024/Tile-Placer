function newTile(ids) {
    //other parameters
    colTag = document.getElementById("columnNumber");
    rowTag = document.getElementById("rowNumber");
    col = parseInt(colTag.innerHTML);
    row = parseInt(rowTag.innerHTML);
    const divTag = document.createElement("div");



    if (col < 5) {
        document.getElementById("row"+row).appendChild(divTag);
        newCol = col  + 1;
        //new tile properties
        
        divTag.id ="row"+row+"col"+newCol;
        divTag.className = "tile";
        divTag.onclick = function() {
        colorChange(this);
    };
        if(ids === "red") divTag.style.backgroundColor = "rgb(255, 0, 0)";
        else if(ids === "green") divTag.style.backgroundColor = "rgb(0, 128, 0)";
        else if(ids === "blue") divTag.style.backgroundColor = "rgb(0, 0, 255)";
        else if(ids === "black") divTag.style.backgroundColor = "rgb(0, 0, 0)";
        else if(ids === "white") divTag.style.backgroundColor = "rgb(255, 228, 196)";           
        colTag.innerHTML = newCol.toString();
    }
    else {
        newRow = row + 1;
        const tileRow = document.createElement("div");
        tileRow.id ="row"+newRow;
        tileRow.className = "tile-row";
        document.getElementById("tileContainer").appendChild(tileRow);
        //new tile properties
        divTag.id ="row"+newRow+"col1";
        divTag.className = "tile";
        divTag.onclick = function() {
        colorChange(this);
        };
        if(ids === "red") divTag.style.backgroundColor = "rgb(255, 0, 0)";
        else if(ids === "green") divTag.style.backgroundColor = "rgb(0, 128, 0)";
        else if(ids === "blue") divTag.style.backgroundColor = "rgb(0, 0, 255)";
        else if(ids === "black") divTag.style.backgroundColor = "rgb(0, 0, 0)";
        else if(ids === "white") divTag.style.backgroundColor = "rgb(255, 228, 196)";           
        document.getElementById("row"+newRow).appendChild(divTag);
        colTag.innerHTML = "1";
        rowTag.innerHTML = newRow.toString();
    }
    

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