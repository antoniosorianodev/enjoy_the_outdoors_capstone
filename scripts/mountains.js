"use strict"

window.onload = () => {
    let dropdown = document.querySelector("#selectMountain");
    let card = document.querySelector("#card");
    card.style.display = "none";

    initDropdown(dropdown);

    dropdown.addEventListener("change", () => generateCard(dropdown, card));
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

function generateCard(dropdown, card) {
    card.style.display = "none";

    if (dropdown[dropdown.selectedIndex]) {
        let objectFromArray = mountainsArray[dropdown.selectedIndex - 1];

        // this is a lot of DOM calls, possibly revisit this
        let cardImg = document.querySelector("#cardImg");
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
            document.querySelector("#cardSunrise").innerHTML = `<b>Sunrise:</b> ${sunsetData.results.sunrise}`
            document.querySelector("#cardSunset").innerHTML = `<b>Sunrise:</b> ${sunsetData.results.sunset}`
        });

        card.style.display = "block";
    }
}
