"use strict"

window.onload = () => {
    let dropdown = document.querySelector("#selectMountain");
    let card = document.querySelector("#card");
    card.style.display = "none";

    initDropdown(dropdown);

    dropdown.addEventListener("change", createFnToGenerateCard(dropdown, card));
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

function createFnToGenerateCard(dropdown, card) {
    return () => {
        let objectFromArray = mountainsArray[dropdown.selectedIndex - 1];

        card.style.display = "inline";

        // this is a lot of document requests, revisit this
        document.querySelector("#cardTitle").innerHTML = objectFromArray.name;
        document.querySelector("#cardImg").setAttribute("src", `./images/${objectFromArray.img}`);
        document.querySelector("#cardImg").setAttribute("alt", `An image of ${objectFromArray.name}`);
        document.querySelector("#cardDescription").innerHTML = objectFromArray.desc;
        document.querySelector("#cardElevation").innerHTML = `<b>Elevation:</b> ${objectFromArray.elevation} feet`;
        document.querySelector("#cardEffort").innerHTML = `<b>Effort:</b> ${objectFromArray.effort}`;
        document.querySelector("#cardCoordinates").innerHTML = `<b>Lat:</b> ${objectFromArray.coords.lat} <b>Lng:</b> ${objectFromArray.coords.lng}`;

        //function that can "fetch" the sunset/sunrise times
        async function getSunsetForMountain(lat, lng) {
            let response = await fetch(`http://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`)
            let data = await response.json()
            return data
        }

        //Using the function to fetch the sunset/sunrise times for a specific mountain 
        getSunsetForMountain(objectFromArray.coords.lat, objectFromArray.coords.lng).then(sunsetData => {
            console.log(sunsetData.results);
            document.querySelector("#cardSunTimes").innerHTML = `<b>Sunrise:</b> ${sunsetData.results.sunrise} <b>Sunset:</b> ${sunsetData.results.sunset}`
        });
    }
}
