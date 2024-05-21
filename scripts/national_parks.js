"use strict"

window.onload = () => {
    let myDropdown = document.querySelector("#parkDropdown");
    let locationRadio = document.querySelector("#locationRadio");
    let parkTypeRadio = document.querySelector("#parkTypeRadio");
    let myTable = document.querySelector("#parksTable");

    myTable.style.display = "none";
    myDropdown.style.display = "none";

    // Why use closures? I believe if I can avoid calling the document I should, this allows me to pass in the already called
    // elements and last time I tried to pass in arguments to a function in an event listener without closures, it got mad.
    locationRadio.addEventListener("click", createFnToGenerateDropdown(myDropdown, locationRadio, parkTypeRadio, myTable));
    parkTypeRadio.addEventListener("click", createFnToGenerateDropdown(myDropdown, locationRadio, parkTypeRadio, myTable));
    myDropdown.addEventListener("change", createFnToGenerateTable(myDropdown, locationRadio, parkTypeRadio, myTable));
}

function createFnToGenerateTable(dropdown, location, parkType, table) {
    return () => {
        let index = (dropdown.selectedIndex);
        let tbody = document.querySelector("#tbody");

        table.style.display = "inline";
        tbody.innerHTML = "";

        // if (index === 0), and then switching what's in the blocks works, so does if (index) and no switch, which is better?
        if (index !== 0) {
            // man, what an ugly solution :L
            let relevantParksArray;
            if (location.checked) {
                let filteredArray = nationalParksArray.filter(park => (park.State === dropdown[index].value));
                relevantParksArray = filteredArray;
            } else if (parkType.checked) {
                let filteredArray = nationalParksArray.filter(park => (park.LocationName.indexOf(dropdown[index].value) !== -1));
                relevantParksArray = filteredArray;
            }
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
                cellPhone.innerHTML = `<div><b>Phone:</b> ${convertNA(park.Phone)}</div>
                <div><b>Fax:</b> ${convertNA(park.Fax)}</div>`;

                let cellURL = newRow.insertCell();
                if (park.Visit === undefined) {
                    cellURL.innerHTML = "N/A";
                } else {
                    cellURL.innerHTML = `<a href="${convertNA(park.Visit)}" target="_blank">${convertNA(park.Visit)}</a>`;
                }

            });
        } else {
            table.style.display = "none";
        }
    }
}

function createFnToGenerateDropdown(dropdown, location, parkType, table) {
    return () => {
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
        dropdown.style.display = "inline";
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

function convertNA(parameter) {
    // this line says: if (parameter === true) -> return parameter; else -> return "N/A"
    return parameter ? parameter : "N/A";
}