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
        divTag.className = "tile active-tile light-tile";
        divTag.onclick = function() {
            colorChange(this);
            unitMove(this);
        };
        colTag.innerHTML = newCol.toString();
    }
    else if (col < 4) {
        document.getElementById("row"+row).appendChild(divTag);
        newCol = col  + 1;
        //new tile properties
        divTag.id ="row"+row+"col"+newCol;
        if (col % 2 == 0 && row % 2 == 1) divTag.className = "tile light-tile";
        else if (col % 2 == 1 && row % 2 == 1) divTag.className = "tile dark-tile";
        else if (col % 2 == 1 && row % 2 == 0) divTag.className = "tile light-tile";
        else divTag.className = "tile dark-tile";
        
        divTag.onclick = function() {
            colorChange(this);
            unitMove(this);
        }
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
        if (row % 2 == 1) divTag.className = "tile dark-tile";
        else divTag.className = "tile light-tile";

        divTag.onclick = function() {
        colorChange(this);
        unitMove(this);
        };
        document.getElementById("row"+newRow).appendChild(divTag);
        colTag.innerHTML = "1";
        rowTag.innerHTML = newRow.toString();
    }
    if (row==1 && col==0) theNewTile = document.getElementById("row1col1");
    else if (col < 4) theNewTile = document.getElementById("row"+row+"col"+newCol);
    else  theNewTile =  document.getElementById("row"+newRow+"col1");

    if(ids === "red") theNewTile.classList.add("lava-tile");
    else if(ids === "green")  theNewTile.classList.add("grass-tile");
    else if(ids === "blue") theNewTile.classList.add("ocean-tile");
    else if(ids === "black") theNewTile.classList.add("stone-tile");
    else if(ids === "white") theNewTile.classList.add("snow-tile");
    tileRefresh(divTag);
}
function unitMove(unit) {
    console.log("Hello from unitMove");
    activeTile = document.getElementsByClassName("active-tile");
    if (activeTile.length > 0) {
    var firstElement = activeTile[0];
    var activeIdString = firstElement.id;
    }
    else  console.log("No elements with the specified class found");
    //Identifying origin coordinates
    //VARIABLES
    counter = 0;
    activeRowString = "";
    activeColString = "";
    activeCol = -1;
    activeRow = null;
    //CONDITIONS
    //const
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
    //identifying destination coordinates
    counter = 0;
    clickedRowString = "";
    clickedColString = "";
    for (var i = 0; i < unit.id.length; i++) {
        var currentCharacter = unit.id[i];
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

    //move validation, execution
    if (activeCol==clickedCol || activeRow==clickedRow) { //bástya mozgás
        unit.classList.toggle("active-tile");
        firstElement.classList.toggle("active-tile");
        tileRefresh(unit);
        tileRefresh(document.getElementById(activeIdString));
    }
    /*if (Math.abs((activeCol-clickedCol)/(activeRow-clickedRow)==1)) { //futó mozgás (nem működik?)
        tile.classList.toggle("active-tile");
        firstElement.classList.toggle("active-tile");
    }*/
    //Math.abs(activeCol-clickedCol) < 2 | Math.abs(activeCol-clickedCol) % 5 < 2
}

function tileRefresh(ids) { //correct display of tiles
    //VARIABLES
    bgImg = "";
    let tileElement = document.getElementById(ids.id);
    //URLs 1 FILTERS
    const WHITE_FILTER = "url('https://i.imgur.com/B3Pj5xc.png')";
    const BLACK_FILTER = "url('https://i.imgur.com/7gkqAFk.png')";
    //URLs 2 UNITS
    const UNIT = ", url('https://i.imgur.com/ZSf7hoY.png')";
    //URLs 3 TERRAINS
    const GRASS = ", url('https://i.imgur.com/9cH7Rth.jpg')";
    const OCEAN = ", url('https://i.imgur.com/qgu6ALx.jpg')";
    const SNOW = ", url('https://i.imgur.com/VI9445s.jpg')";
    const LAVA = ", url('https://i.imgur.com/9QsPXWN.jpg')";
    const STONE = ", url('https://i.imgur.com/vWs7xAY.jpg')";
    //CONDITIONS
    const LIGHT_TILE = tileElement.classList.contains("light-tile");
    const DARK_TILE = tileElement.classList.contains("dark-tile");
    const ACTIVE_TILE = tileElement.classList.contains("active-tile");
    const GRASS_TILE = tileElement.classList.contains("grass-tile");
    const OCEAN_TILE = tileElement.classList.contains("ocean-tile");
    const SNOW_TILE = tileElement.classList.contains("snow-tile");
    const LAVA_TILE = tileElement.classList.contains("lava-tile");
    const STONE_TILE = tileElement.classList.contains("stone-tile");
    //OPERATIONS
    if (LIGHT_TILE) bgImg += WHITE_FILTER;
    if (DARK_TILE) bgImg += BLACK_FILTER;
    if (ACTIVE_TILE) bgImg += UNIT;
    if (GRASS_TILE) bgImg += GRASS;
    if (OCEAN_TILE) bgImg += OCEAN;
    if (SNOW_TILE) bgImg += SNOW;
    if (LAVA_TILE) bgImg += LAVA;
    if (STONE_TILE) bgImg += STONE;
    if (bgImg == "") bgImg += "none";
    tileElement.style.backgroundImage = bgImg;
};

function colorChange(tile) { //Ezt akár ki is lehetne venni, de gyakorlásnak/tesztelésnek jó volt
    var currentColor = window.getComputedStyle(tile).backgroundColor;
    /*red*/if (currentColor === "rgb(255, 0, 0)") tile.style.backgroundColor = "green";
    /*green*/else if (currentColor === "rgb(0, 128, 0)") tile.style.backgroundColor = "blue";
    /*blue*/else if (currentColor === "rgb(0, 0, 255)") tile.style.backgroundColor = "black";
    /*black*/else if (currentColor === "rgb(0, 0, 0)") tile.style.backgroundColor = "bisque";
    /*white*/else if (currentColor === "rgb(255, 228, 196)") tile.style.backgroundColor = "red";
}