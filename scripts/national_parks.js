"use strict"
// this is an eyesore, but trimming this down is on the to-do list

window.onload = () => {

    let myDropdown = document.querySelector("#parkDropdown");
    let locationRadio = document.querySelector("#locationRadio");
    let parkTypeRadio = document.querySelector("#parkTypeRadio");
    let myTable = document.querySelector("#parksTable");
    myTable.style.display = "none";
    myDropdown.style.display = "none";

    locationRadio.addEventListener("click", buildMyDropdown);
    parkTypeRadio.addEventListener("click", buildMyDropdown);

    myDropdown.addEventListener("change", buildTable);
}

function buildTable(event) {
    let theTable = document.querySelector("#parksTable");
    theTable.style.display = "inline";
    let theDropdown = event.target;
    let btsIndex = (theDropdown.selectedIndex);
    let tbody = document.querySelector("#tbody");
    tbody.innerHTML = "";

    if (btsIndex !== 0) {
        let relevantParksArray = nationalParksArray.filter(park => (park.State === theDropdown[btsIndex].value || park.LocationName.indexOf(theDropdown[btsIndex].value) !== -1));
        console.log(relevantParksArray);

        relevantParksArray.forEach((park) => {
            let newRow = tbody.insertRow();
            let cellId = newRow.insertCell();
            cellId.innerHTML = park.LocationID;

            let cellName = newRow.insertCell();
            cellName.innerHTML = park.LocationName;

            let cellAddress = newRow.insertCell();
            cellAddress.innerHTML = `${park.Address}, ${park.State} ${park.ZipCode}`;

            let cellPhone = newRow.insertCell();
            cellPhone.innerHTML = `<div><b>Phone:</b> ${isApplicable(park.Phone)}</div>
            <div><b>Fax:</b> ${isApplicable(park.Fax)}</div>`;

            let cellURL = newRow.insertCell();
            if (park.Visit === undefined) {
                cellURL.innerHTML = "N/A";
            } else {
                cellURL.innerHTML = `<a href="${isApplicable(park.Visit)}">${isApplicable(park.Visit)}</a>`;
            }

        });
    } else {
        theTable.style.display = "none";
    }
}

function buildMyDropdown() {
    let dropdown = document.querySelector("#parkDropdown");
    let location = document.querySelector("#locationRadio");
    let parkType = document.querySelector("#parkTypeRadio");
    let table = document.querySelector("#parksTable");
    dropdown.style.display = "none";
    table.style.display = "none";

    dropdown.length = 0;

    if (document.querySelector("#locationRadio").checked) {
        createDefaultOption("-- Choose a Park Location --", dropdown);
        buildDropdown(locationsArray, dropdown);
    } else if (document.querySelector("#parkTypeRadio").checked) {
        createDefaultOption("-- Choose a Park Type --", dropdown);;
        buildDropdown(parkTypesArray, dropdown);
    }
    dropdown.style.display = "inline";
}

function createDefaultOption(name, dropdown) {
    let defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = name;

    dropdown.appendChild(defaultOption);
}

function buildDropdown(array, dropdown) {
    array.forEach((arrayItem) => {
        let newOption = document.createElement("option");
        newOption.value = arrayItem;
        newOption.textContent = arrayItem;

        dropdown.appendChild(newOption);
    });
}

function isApplicable(parameter) {
    if (parameter === 0 || parameter === undefined) {
        return "N/A"
    } else {
        return parameter
    }
}

// spent too long not looking at my data, that's funny

// correspondingArray = nationalParksArray;
// property = "State";
// correspondingArray.forEach((arrayItem) => {
//     let newOption = document.createElement("option");
//     newOption.value = arrayItem[property];
//     newOption.textContent = arrayItem[property];

//     dropdown.appendChild(newOption);