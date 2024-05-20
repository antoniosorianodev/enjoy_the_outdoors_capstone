"use strict"

window.onload = () => {

    let myDropdown = document.querySelector("#parkDropdown");
    let location = document.querySelector("#locationRadio");
    let parkType = document.querySelector("#parkTypeRadio");

    location.addEventListener("click", buildMyDropdown);
    parkType.addEventListener("click", buildMyDropdown);
}

function buildMyDropdown() {
    let dropdown = document.querySelector("#parkDropdown");
    let location = document.querySelector("#locationRadio");
    let parkType = document.querySelector("#parkTypeRadio");

    dropdown.length = 0;

    if (document.querySelector("#locationRadio").checked) {
        createDefaultOption("-- Choose a Park Location --", dropdown);
        buildDropdown(locationsArray, dropdown);
    } else if (document.querySelector("#parkTypeRadio").checked) {
        createDefaultOption("-- Choose a Park Type --", dropdown);;
        buildDropdown(parkTypesArray, dropdown);
    }
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

// spent too long not looking at my data, that's funny

// correspondingArray = nationalParksArray;
// property = "State";
// correspondingArray.forEach((arrayItem) => {
//     let newOption = document.createElement("option");
//     newOption.value = arrayItem[property];
//     newOption.textContent = arrayItem[property];

//     dropdown.appendChild(newOption);