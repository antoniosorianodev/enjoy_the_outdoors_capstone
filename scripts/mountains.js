"use strict"

window.onload = () => {
    let dropdown = document.querySelector("#selectMountain");
    let card = document.querySelector("#card");
    card.style.display = "none";

    initDropdown(dropdown);

    dropdown.addEventListener("change", createCard);
}

function initDefault(dropdown) {
    let newOption = document.createElement("option");
    newOption.value = "";
    newOption.textContent = "-- Select a Mountain --";

    dropdown.appendChild(newOption);
}

function initDropdown(dropdown) {
    initDefault(dropdown);

    mountainsArray.forEach((mountain) => {
        let newOption = document.createElement("option");
        newOption.value = mountain.name;
        newOption.textContent = mountain.name;

        dropdown.appendChild(newOption);
    });
}

function createCard() {
    let card = document.querySelector("#card");
    card.style.display = "inline";

    let dropdown = event.target;
    let objectFromArray = mountainsArray[dropdown.selectedIndex - 1];

    document.querySelector("#cardTitle").innerHTML = objectFromArray.name;
    document.querySelector("#cardImg").setAttribute("src", `./images/${objectFromArray.img}`);
    document.querySelector("#cardImg").setAttribute("alt", `An image of ${objectFromArray.name}`);
    document.querySelector("#cardDescription").innerHTML = objectFromArray.desc;
    document.querySelector("#cardElevation").innerHTML = `<b>Elevation:</b> ${objectFromArray.elevation} feet`;
    document.querySelector("#cardEffort").innerHTML = `<b>Effort:</b> ${objectFromArray.effort}`;
    document.querySelector("#cardCoordinates").innerHTML = `<b>Lat:</b> ${objectFromArray.coords.lat} <b>Lng:</b> ${objectFromArray.coords.lng}`;
}