"use strict"

window.onload = () => {
    // declaring all the HTML elements I'll need once and ONLY once
    const myDropdown = document.querySelector("#parkDropdown");
    const allRadio = document.querySelector("#allRadio");
    const locationRadio = document.querySelector("#locationRadio");
    const parkTypeRadio = document.querySelector("#parkTypeRadio");
    const myTable = document.querySelector("#parksTable");
    const myTableBody = document.querySelector("#tbody");

    // hide the table and dropdown ASAP
    myTable.style.display = "none";
    myDropdown.style.display = "none";

    // Arrow functions are needed for all these event listeners because I'm giving them arguments. If I were to call them without arrow
    // functions, JS would attempt to run the function as soon as it's seen, without waiting for a given event

    // Passing event into line 18's arrow function could(?) work, but I forsee issues as addTableCells isn't tied to an event listener in
    // other lines where it is called
    allRadio.addEventListener("click", () => addTableCells(nationalParksArray, myTable, myTableBody, myDropdown, allRadio));
    locationRadio.addEventListener("click", () => populateDropdown(myDropdown, locationRadio, parkTypeRadio, myTable));
    parkTypeRadio.addEventListener("click", () => populateDropdown(myDropdown, locationRadio, parkTypeRadio, myTable));
    myDropdown.addEventListener("change", (event) => { populateTable(event.target, locationRadio, parkTypeRadio, myTable, myTableBody, allRadio) });
}

// this Fn's job is to add the correct data to the table and hide/show the table and dropdown as needed
function addTableCells(array, table, tbody, dropdown, all) {

    // when the all radio button is clicked, hide the table ASAP
    table.style.display = "none";

    // if the allRadio button is checked, hide the dropdown, otherwise display it
    if (all.checked) {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }


    // for a given array, add a table rows with specific table data
    array.forEach((park) => {
        // creates a table row that we add to later
        const newRow = tbody.insertRow();

        // creates table data for LocationID property
        const cellId = newRow.insertCell();
        cellId.innerHTML = park.LocationID;

        // creates table data for LocationName property
        const cellName = newRow.insertCell();
        cellName.innerHTML = park.LocationName;

        // creates table data for the address and displays it in the appropriate mailing address format
        const cellAddress = newRow.insertCell();
        cellAddress.innerHTML = `<div>${park.Address}</div>
        <div>${park.City}, ${park.State} ${park.ZipCode}</div>`;

        // creates table data for the phone and fax numbers and displays them on seperate lines, convertNA() returns "N/A" if argumnet is FALSEY
        const cellPhone = newRow.insertCell();
        cellPhone.innerHTML = `<div><b>Phone:</b> ${convertNA(park.Phone)}</div>
        <div><b>Fax:</b> ${convertNA(park.Fax)}</div>`;

        // creates table data for Visit property
        const cellURL = newRow.insertCell();

        // if a given park.Visit has a TRUTHY value, display it, otherwise just display "N/A"
        if (park.Visit) {
            cellURL.innerHTML = `<a href="${park.Visit}" target="_blank">${park.Visit}</a>`;
        } else {
            cellURL.innerHTML = "N/A";
        }
    });

    // if tbody.innerHTML has a TRUTHY value, show the entire table, since the first thing we do in this Fn is hide the table, there's no need to hide for FALSEY values
    if (tbody.innerHTML) {
        table.style.display = "block";
    }
}


function populateTable(dropdown, location, parkType, table, tbody, all) {

    // when the location or ParkType radio button is clicked, hide the table ASAP
    table.style.display = "none";

    const currentSelection = dropdown.value;

    // if currentSelection is a TRUTHY value...
    if (currentSelection) {

        // clear tbody
        tbody.innerHTML = "";

        let relevantParksArray;

        if (location.checked) {

            // create a filtered array of parks that contain the user's currentSelection (in this case, a State)
            const filteredArray = nationalParksArray.filter(park => (park.State === currentSelection));

            //then make relevantParksArray a reference to this filtered array
            relevantParksArray = filteredArray;

        } else if (parkType.checked) {

            // create a filtered array of parks that contain the user's currentSelection (in this case, a parkType), the make
            const filteredArray = nationalParksArray.filter(park => (park.LocationName.toLowerCase().indexOf(currentSelection.toLowerCase()) !== -1));

            // relevantParksArray a reference to this filtered array
            relevantParksArray = filteredArray;

        }

        // use the data from relevantParksArray, loop through it, and make table row with data for each park in the array
        addTableCells(relevantParksArray, table, tbody, dropdown, all);
    }
}

// this Fn's job is to fill the dropdown with the requested data
function populateDropdown(dropdown, location, parkType, table) {
    // hide dropdown and table ASAP
    dropdown.style.display = "none";
    table.style.display = "none";

    // empty out the dropdown's options
    dropdown.length = 0;

    // these if statements just generate the appropriate default text based on which mode the user chose
    if (location.checked) {
        addDefaultToDropdown("-- Choose a Park Location --", dropdown);
        addParksToDropdown(locationsArray, dropdown);
    } else if (parkType.checked) {
        addDefaultToDropdown("-- Choose a Park Type --", dropdown);;
        addParksToDropdown(parkTypesArray, dropdown);
    }

    // now that the dropdown is populated, show it
    dropdown.style.display = "block";
}

// this Fn's job is only to create a default option for our dropdown
function addDefaultToDropdown(name, dropdown) {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";

    // this line sets the default option's text to be equal to name, so I can pass in "potato" and the default option will say potato
    defaultOption.textContent = name;

    // add our defaultOption to the dropdown
    dropdown.appendChild(defaultOption);
}

// this Fn's job is only to add the correct parks our dropdown
function addParksToDropdown(array, dropdown) {
    array.forEach((arrayItem) => {
        const newOption = document.createElement("option");
        newOption.value = arrayItem;
        newOption.textContent = arrayItem;

        dropdown.appendChild(newOption);
    });
}

// this Fn's purpose is just to turn not-helpful/non-existent data to "N/A", the data is left alone if it's ok
function convertNA(parameter) {
    // this line says: if (parameter === true) -> return parameter; else -> return "N/A"
    return parameter ? parameter : "N/A";
}