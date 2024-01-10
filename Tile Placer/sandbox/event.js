//FILE SCOPE CONSTANTS
//URLs 1 MODIFIERS
const WHITE_FILTER = "url('https://i.imgur.com/B3Pj5xc.png')";
const BLACK_FILTER = "url('https://i.imgur.com/7gkqAFk.png')";
const MARKER = "url('https://i.imgur.com/6wRNIWn.png')";
//URLs 2 UNITS
const KING = 'url("https://i.imgur.com/ZSf7hoY.png")';
const ROOK = 'url("https://i.imgur.com/eddE7mk.png")';
const UNITS = ["king", "rook"];
const UNITS_URL = [KING, ROOK];
//URLs 3 TERRAINS
const GRASS = 'url("https://i.imgur.com/GgJKJlI.jpg")';
const OCEAN = 'url("https://i.imgur.com/CKdRuk9.jpg")';
const SNOW = 'url("https://i.imgur.com/TIPaq6X.jpg")';
const LAVA = 'url("https://i.imgur.com/SEzz84Z.jpg")';
const STONE = 'url("https://i.imgur.com/tkRL7AD.jpg")';
const TERRAINS = ["grass", "ocean", "snow", "lava", "stone"];
const TERRAINS_URL = [GRASS, OCEAN, SNOW, LAVA, STONE];

function infoWrite(info, conArr, msgArr) {
    msg = info;
    first = true;
    console.log(conArr, msgArr);
    for (var i = 0; i < conArr.length; i++) {
        if(conArr[i] && !first) msg += ", " + msgArr[i];
        else if(conArr[i] && first) { msg += msgArr[i]; first = false; }
    }
    if (msg == info) msg += "none";
    return msg;
}

function terrainRefresh(tile, sorsz) {
    console.log("To: terrainRefresh");
    //FUNCTION SCOPE VARIABLES
    info = document.getElementById("info"+sorsz);
    active = document.getElementsByClassName("active-tile"); active1 = active[0];
    arr = tile.style.backgroundImage.split(",");
    //CONDITIONS
    const hasGRASS = arr.some(element => element.trim() === GRASS.trim());
    const hasSTONE = arr.some(element => element.trim() === STONE.trim());
    const hasSNOW = arr.some(element => element.trim() === SNOW.trim());
    const hasOCEAN = arr.some(element => element.trim() === OCEAN.trim());
    const hasLAVA = arr.some(element => element.trim() === LAVA.trim());
    const hasTERRAIN = [hasGRASS, hasOCEAN, hasSNOW, hasLAVA, hasSTONE]
    //OPERATIONS
    info.textContent = infoWrite("Terrain: ", hasTERRAIN, TERRAINS);
}

function unitRefresh(tile, sorsz) {
    console.log("To: unitRefresh");
    //FUNCTION SCOPE VARIABLES
    info = document.getElementById("info"+sorsz);
    active = document.getElementsByClassName("active-tile");
    active1 = active[0];
    arr = tile.style.backgroundImage.split(",");
    //CONDITIONS
    const hasKING = arr.some(element => element.trim() === KING.trim());
    const hasROOK = arr.some(element => element.trim() === ROOK.trim());
    const hasUNIT = [hasKING, hasROOK];
    //OPERATIONS
    info.textContent = infoWrite("Unit: ", hasUNIT, UNITS);
}

function rowColRefresh(sorsz, msg) {
    console.log("To: rowColRefresh");
    //FUNCTION SCOPE VARIABLES
    info = document.getElementById("info"+sorsz);
    active = document.getElementsByClassName("active-tile");
    active1 = active[0];
    let tileID = active1.id.split("_");
    //FUNCTION SCOPE CONSTANTS
    const row = tileID[0] + " " + tileID[1];
    const col = tileID[2] + " " + tileID[3];
    //OPERATIONS
    info.textContent = infoWrite(msg, [true, true], [row, col]);
}

function newTile(ids) {
    console.log("To: newTile");
    //FUNCTION SCOPE VARIABLES
    colTag = document.getElementById("columnNumber");
    rowTag = document.getElementById("rowNumber");
    col = parseInt(colTag.innerHTML);
    row = parseInt(rowTag.innerHTML);
    let divTag = document.createElement("div");
    //OPERATIONS
    if (col < 5) {//no new row
        document.getElementById("row"+row).appendChild(divTag);
        newCol = col  + 1;
        //new tile properties
        divTag.id ="row_"+row+"_col_"+newCol;
        if (row == 1 && newCol == 1)  divTag.className = "tile active-tile king-tile light-tile";
        else if (col % 2 == 0 && row % 2 == 1) divTag.className = "tile light-tile";
        else if (col % 2 == 1 && row % 2 == 1) divTag.className = "tile dark-tile";
        else if (col % 2 == 1 && row % 2 == 0) divTag.className = "tile light-tile";
        else divTag.className = "tile dark-tile";        
        colTag.innerHTML = newCol.toString();
    }
    else {//new row
        newRow = row + 1;
        const tileRow = document.createElement("div");
        tileRow.id ="row"+newRow;
        tileRow.className = "tile-row";
        document.getElementById("tileContainer").appendChild(tileRow);
        //new tile properties
        divTag.id ="row_"+newRow+"_col_1";
        if (row % 2 == 1) divTag.className = "tile dark-tile";
        else divTag.className = "tile light-tile";
        document.getElementById("row"+newRow).appendChild(divTag);
        colTag.innerHTML = "1";
        rowTag.innerHTML = newRow.toString();
    }
    divTag.onclick = function() {//events
    console.log("From: " + this.id + " click"); rowColRefresh(0, "From: ");
    console.log("From: " + this.id + " click"); unitMove(this);
    console.log("From: " + this.id + " click"); rowColRefresh(1, "To: ");
    console.log("From: " + this.id + " click"); unitRefresh(this, 2);
    console.log("From: " + this.id + " click"); terrainRefresh(this, 3);
    }
    //select
    if (row==1 && col==0) theNewTile = document.getElementById("row_1_col_1");
    else if (col < 5) theNewTile = document.getElementById("row_"+row+"_col_"+newCol);
    else  theNewTile =  document.getElementById("row_"+newRow+"_col_1");
    //add
    if(ids === "red") theNewTile.classList.add("lava-tile");
    else if(ids === "green")  theNewTile.classList.add("grass-tile");
    else if(ids === "blue") theNewTile.classList.add("ocean-tile");
    else if(ids === "black") theNewTile.classList.add("stone-tile");
    else if(ids === "white") theNewTile.classList.add("snow-tile");
    console.log("From: newTile"); tileRefresh(divTag);
}
function unitMove(unit) {
    console.log("To: unitMove");
    activeTile = document.getElementsByClassName("active-tile");
    active1 = activeTile[0];
    var activeIdString = active1.id;
    //Identifying origin coordinates
    //VARIABLES
    counter = 0;
    activeRowString = "";
    activeColString = "";
    activeCol = -1;
    activeRow = null;
    //OPERATIONS
    for (var i = 0; i < activeIdString.length; i++) {//activeColString; activeRowString
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
    for (var i = 0; i < unit.id.length; i++) {//clickedColString; clickedRowString
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
    const moveKING = Math.abs(activeCol-clickedCol) < 2 && Math.abs(activeRow-clickedRow) < 2;
    const moveROOK = activeCol==clickedCol || activeRow==clickedRow
    arr = active1.style.backgroundImage.split(",");
    console.log(document.getElementById(activeIdString).style.backgroundImage);
    const hasKING = arr.some(element => element.trim() === KING.trim());
    const hasROOK = arr.some(element => element.trim() === ROOK.trim());
    
    if (hasKING && moveKING) moveOperation(hasKING, moveKING, "king-tile", unit, active1, activeIdString);
    else if (hasROOK && moveROOK) moveOperation(hasROOK, moveROOK, "rook-tile", unit, active1, activeIdString);
}

function moveOperation(cond1, cond2, unitTile, unit, active1, activeIdString) {
    if (cond1 && cond2) {
        unit.classList.toggle("active-tile");
        active1.classList.toggle("active-tile");
        unit.classList.toggle(unitTile);
        active1.classList.toggle(unitTile);
        console.log("From: unitMove");
        tileRefresh(unit);
        tileRefresh(document.getElementById(activeIdString));
        unitRefresh(document.getElementById(activeIdString), 2)
    }
}

function tileRefresh(ids) { //correct display of tiles
    console.log("To: tileRefresh");
    //FUNCTION SCOPE VARIABLES
    bgImg = "";
    let tileElement = document.getElementById(ids.id);
    //CONDITIONS
    const LIGHT_TILE = tileElement.classList.contains("light-tile");
    const DARK_TILE = tileElement.classList.contains("dark-tile");
    const ACTIVE_TILE = tileElement.classList.contains("active-tile");
    const KING_TILE = tileElement.classList.contains("king-tile");
    const ROOK_TILE = tileElement.classList.contains("rook-tile");
    const GRASS_TILE = tileElement.classList.contains("grass-tile");
    const OCEAN_TILE = tileElement.classList.contains("ocean-tile");
    const SNOW_TILE = tileElement.classList.contains("snow-tile");
    const LAVA_TILE = tileElement.classList.contains("lava-tile");
    const STONE_TILE = tileElement.classList.contains("stone-tile");
    //OPERATIONS
    if (LIGHT_TILE) bgImg += WHITE_FILTER;
    if (DARK_TILE) bgImg += BLACK_FILTER;
    if (KING_TILE) bgImg += "," + KING;
    if (ROOK_TILE) bgImg += "," + ROOK;
    if (ACTIVE_TILE) bgImg += "," + MARKER;
    if (GRASS_TILE) bgImg += "," + GRASS;
    if (OCEAN_TILE) bgImg += "," + OCEAN;
    if (SNOW_TILE) bgImg += "," + SNOW;
    if (LAVA_TILE) bgImg += "," + LAVA;
    if (STONE_TILE) bgImg += "," + STONE;
    if (bgImg == "") bgImg += "none";
    tileElement.style.backgroundImage = bgImg;
}
function inspectTiles() {
    //TRASH
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            //if activeTile.row-1 > 0 && activeTile.col-1 > 0
            //LoadElement(activeRow-1, activeCol-1);
            //if activeTile.row-1 > 0 stb.
            //if activeTile.row+1 <= row && activeTile.col-1 > 0
            // LoadElement(activeRow+1, activeCol-1);   
            // if stb.
        }
    }
}