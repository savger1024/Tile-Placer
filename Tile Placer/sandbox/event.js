function newTile(ids) {
    //other parameters
    colTag = document.getElementById("columnNumber");
    rowTag = document.getElementById("rowNumber");
    col = parseInt(colTag.innerHTML);
    row = parseInt(rowTag.innerHTML);
    const divTag = document.createElement("div");


    if (row == 1 && col == 0) {
        document.getElementById("row"+row).appendChild(divTag);
        newCol = col  + 1;
        //new tile properties
        
        divTag.id ="row"+row+"col"+newCol;
        divTag.className = "tile active-tile";
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
    else if (col < 5) {
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
    /*red*/if (currentColor === "rgb(255, 0, 0)") tile.style.backgroundColor = "green";
    /*green*/else if (currentColor === "rgb(0, 128, 0)") tile.style.backgroundColor = "blue";
    /*blue*/else if (currentColor === "rgb(0, 0, 255)") tile.style.backgroundColor = "black";
    /*black*/else if (currentColor === "rgb(0, 0, 0)") tile.style.backgroundColor = "bisque";
    /*white*/else if (currentColor === "rgb(255, 228, 196)") tile.style.backgroundColor = "red";

    
    activeTile = document.getElementsByClassName("active-tile");

    if (activeTile.length > 0) {
    var firstElement = activeTile[0];
    var activeIdString = firstElement.id;
    }
    else  console.log("No elements with the specified class found");
    
    counter = 0;
    activeRowString = "";
    activeColString = "";
    
    for (var i = 0; i < activeIdString.length; i++) {
        var currentCharacter = activeIdString[i];
        if (counter == 0 && !isNaN(currentCharacter)) {
            activeRowString += currentCharacter; counter += 1;
        }
        else if (counter == 1) {
            if (!isNaN(currentCharacter)) activeRowString += currentCharacter; else counter += 1;
        }
        else if (counter == 2 && !isNaN(currentCharacter)) {
            activeColString += currentCharacter; counter += 1;
        }  
        else if (counter == 3) {
            if (!isNaN(currentCharacter)) activeColString += currentCharacter; else counter += 1;
        }
        
    }

    activeCol = parseInt(activeColString);
    activeRow = parseInt(activeRowString);


    counter = 0;
    clickedRowString = "";
    clickedColString = "";

    for (var i = 0; i < tile.id.length; i++) {
        var currentCharacter = tile.id[i];
        if (counter == 0 && !isNaN(currentCharacter)) {
            clickedRowString += currentCharacter; counter += 1;
        }
        else if (counter == 1) {
            if (!isNaN(currentCharacter)) clickedRowString += currentCharacter; else counter += 1;
        }
        else if (counter == 2 && !isNaN(currentCharacter)) {
            clickedColString += currentCharacter; counter += 1;
        }  
        else if (counter == 3) {
            if (!isNaN(currentCharacter)) clickedColString += currentCharacter; else counter += 1;
        }
    }
    clickedCol = parseInt(clickedColString);
    clickedRow = parseInt(clickedRowString);
    //activeCol = parseInt(activeColString);
    //activeRow = parseInt(activeRowString);


    //bástya mozgás
    /*if (activeCol==clickedCol || activeRow==clickedRow) {
        tile.classList.toggle("active-tile");
        firstElement.classList.toggle("active-tile");
    }*/
    //futó mozgás
    if (((activeCol-clickedCol)/(activeRow-clickedRow)==1) || ((activeCol-clickedCol)/(activeRow-clickedRow)==-1)) {
        tile.classList.toggle("active-tile");
        firstElement.classList.toggle("active-tile");
    }


}