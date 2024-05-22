"use strict"

window.onload = () => {
    const myDropdown = document.querySelector("#parkDropdown");
    const locationRadio = document.querySelector("#locationRadio");
    const parkTypeRadio = document.querySelector("#parkTypeRadio");
    const myTable = document.querySelector("#parksTable");

    myTable.style.display = "none";
    myDropdown.style.display = "none";

    // Why use closures? I believe if I can avoid calling the document I should, this allows me to pass in the already called
    // elements and last time I tried to pass in arguments to a function in an event listener without closures, it got mad.
    locationRadio.addEventListener("click", () => generateDropdown(myDropdown, locationRadio, parkTypeRadio, myTable));
    parkTypeRadio.addEventListener("click", () => generateDropdown(myDropdown, locationRadio, parkTypeRadio, myTable));
    myDropdown.addEventListener("change", (event) => { generateTable(event.target, locationRadio, parkTypeRadio, myTable) });
}

function generateTable(dropdown, location, parkType, table) {
    const tbody = document.querySelector("#tbody");

    table.style.display = "none";

    const currentSelection = dropdown.value;

    if (currentSelection) {
        tbody.innerHTML = "";

        let relevantParksArray;

        if (location.checked) {
            const filteredArray = nationalParksArray.filter(park => (park.State === currentSelection));
            relevantParksArray = filteredArray;
        } else if (parkType.checked) {
            const filteredArray = nationalParksArray.filter(park => (park.LocationName.toLowerCase().indexOf(currentSelection.toLowerCase()) !== -1));
            relevantParksArray = filteredArray;
        }

        relevantParksArray.forEach((park) => {
            const newRow = tbody.insertRow();

            const cellId = newRow.insertCell();
            cellId.innerHTML = park.LocationID;

            const cellName = newRow.insertCell();
            cellName.innerHTML = park.LocationName;

            const cellAddress = newRow.insertCell();
            cellAddress.innerHTML = `<div>${park.Address}</div>
            <div>${park.City}, ${park.State} ${park.ZipCode}</div>`;

            const cellPhone = newRow.insertCell();
            cellPhone.innerHTML = `<div><b>Phone:</b> ${convertNA(park.Phone)}</div>
            <div><b>Fax:</b> ${convertNA(park.Fax)}</div>`;

            const cellURL = newRow.insertCell();
            if (park.Visit) {
                cellURL.innerHTML = `<a href="${park.Visit}" target="_blank">${park.Visit}</a>`;
            } else {
                cellURL.innerHTML = "N/A";
            }
        });

        if (tbody.innerHTML) {
            table.style.display = "block";
        }
    }
}

function generateDropdown(dropdown, location, parkType, table) {
    dropdown.style.display = "none";
    table.style.display = "none";

    dropdown.length = 0;

    if (location.checked) {
        createDefaultOption("-- Choose a Park Location --", dropdown);
        buildDropdown(locationsArray, dropdown);
    } else if (parkType.checked) {
        createDefaultOption("-- Choose a Park Type --", dropdown);;
        buildDropdown(parkTypesArray, dropdown);
    }

    dropdown.style.display = "block";
}

function createDefaultOption(name, dropdown) {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = name;

    dropdown.appendChild(defaultOption);
}

function buildDropdown(array, dropdown) {
    array.forEach((arrayItem) => {
        const newOption = document.createElement("option");
        newOption.value = arrayItem;
        newOption.textContent = arrayItem;

        dropdown.appendChild(newOption);
    });
}

function convertNA(parameter) {
    // this line says: if (parameter === true) -> return parameter; else -> return "N/A"
    return parameter ? parameter : "N/A";
}