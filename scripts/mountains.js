"use strict"

window.onload = () => {
    // declaring all the HTML elements I'll need once and ONLY once
    const dropdown = document.querySelector("#selectMountain");
    const card = document.querySelector("#card");

    // hide the card ASAP
    card.style.display = "none";

    // add all the mountains to the dropdown
    populateDropdown(dropdown);

    // when the dropdown is changed, create the correct card
    dropdown.addEventListener("change", () => createCard(dropdown, card));
}

// this Fn's job is to create a default option to the dropdown and add it
function addDefaultToDropdown(dropdown) {
    const newOption = document.createElement("option");
    newOption.value = "";
    newOption.textContent = "-- Select a Mountain --";

    dropdown.appendChild(newOption);
}

// this Fn's job is to fill the dropdown with the default and all the mountains
function populateDropdown(dropdown) {
    addDefaultToDropdown(dropdown);

    mountainsArray.forEach((mountain) => {
        const newOption = document.createElement("option");
        newOption.value = mountain.name;
        newOption.textContent = mountain.name;

        dropdown.appendChild(newOption);
    });
}

// this Fn's job is to change all of the card's elements to match the user's selected mountain
function createCard(dropdown, card) {
    // hide the card ASAP
    card.style.display = "none";

    // if dropdown.value doesn't equal "", or other FALSEY values
    if (dropdown.value) {
        // this is our currently selected mountain as an object
        const objectFromArray = mountainsArray[dropdown.selectedIndex - 1];

        // set this to a constant because it's called more than once
        const cardImg = document.querySelector("#cardImg");

        document.querySelector("#cardTitle").innerHTML = objectFromArray.name;
        cardImg.src = `./images/${objectFromArray.img}`;
        cardImg.alt = `An image of ${objectFromArray.name}`;
        document.querySelector("#cardDescription").innerHTML = objectFromArray.desc;
        document.querySelector("#cardElevation").innerHTML = `<b>Elevation:</b> ${objectFromArray.elevation} feet`;
        document.querySelector("#cardEffort").innerHTML = `<b>Effort:</b> ${objectFromArray.effort}`;
        document.querySelector("#cardCoordinates").innerHTML = `<b>Lat:</b> ${objectFromArray.coords.lat} <b>Lng:</b> ${objectFromArray.coords.lng}`;

        // function that can "fetch" the sunset/sunrise times
        async function getSunsetForMountain(lat, lng) {
            let response = await fetch(`http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
            let data = await response.json()
            return data
        }

        // Using the function to fetch the sunset/sunrise times for a specific mountain 
        getSunsetForMountain(objectFromArray.coords.lat, objectFromArray.coords.lng).then(sunsetData => {
            document.querySelector("#cardSunrise").innerHTML = `<b>Sunrise:</b> ${sunsetData.results.sunrise} (UTC)`
            document.querySelector("#cardSunset").innerHTML = `<b>Sunrise:</b> ${sunsetData.results.sunset} (UTC)`
        });

        // after all this work is done, show the finished card
        card.style.display = "block";
    }
}
