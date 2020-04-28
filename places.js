//Algolio places autocomplete function
(function () {
    var placesAutoComplete = places({
        appId: "plADZ2YX21JB",
        apiKey: "44feabdfe1364e95de212f4818f7d010",
        container: document.querySelector("#search"),
        templates: {
            value: function (suggestion) {
                return suggestion.name;
            },
        },
    }).configure({
        type: "address",
    });

    placesAutoComplete.on("change", function resultSelected(e) {
        console.log(e.suggestion);
        const city = e.suggestion.city;
        const state = e.suggestion.administrative;
        const country = e.suggestion.country.toUpperCase();

        console.log(city, state, country);
        getCityData(city, state, country);
    });
})();
/**
 * get weather data
 */
let idCount = 0;

// Nearest City

async function getNearestCity() {
    const urlNearestCity =
        "https://api.airvisual.com/v2/nearest_city?key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0";

    const response = await fetch(urlNearestCity);
    const processedResponse = await response.json();

    console.log("nearest city", processedResponse);
    displayData(processedResponse);
}
// Get data of cities
async function getCityData(city, state, country) {
    const urlCityData = `https://api.airvisual.com/v2/city?city=${city}&state=${state}&country=${country}&key=a3765a9b-e91c-4fc7-9b0e-0992e69410f0`;

    const response = await fetch(urlCityData);
    const processedResponse = await response.json();

    if (processedResponse.status === "success") {
        console.log(processedResponse);
        displayData(processedResponse);
    } else {
        console.log("error");
    }
}

// Display data
function displayData(cityData) {
    console.log(cityData.status);

    //get city name
    const city = cityData.data.city;
    //get weather of that city
    const weather = cityData.data.current.weather;
    //get weather details
    const humidity = weather.hu;
    const pressure = weather.pr;
    const temp = weather.tp;
    //get AQI
    const aqi = cityData.data.current.pollution.aqius;

    console.log(city);
    // console.log(weather);
    console.log(aqi);

    console.log(humidity);
    console.log(pressure);
    console.log(temp);

    // Create a div container that will store the other elements
    //get body
    const body = document.getElementById("weather-details");
    const container = document.createElement("div");
    container.className = "card";
    container.id = idCount;

    // city name
    const cityh3 = document.createElement("h3");
    cityh3.className = "city";
    cityh3.innerHTML = `<i class="uil uil-building"></i>${city}`;
    container.appendChild(cityh3);

    // AQI

    const aqih2 = document.createElement("h2");
    aqih2.className = "aqi";
    if (aqi <= 50) {
        container.classList.add("green");
    } else if (aqi <= 100) {
        container.classList.add("yellow");
    } else if (aqi <= 150) {
        container.classList.add("orange");
    } else if (aqi <= 200) {
        container.classList.add("red");
    } else if (aqi <= 300) {
        container.classList.add("purple");
    } else if (aqi <= 500) {
        container.classList.add("brown");
    }

    aqih2.innerHTML = `AQI ${aqi}`;
    container.appendChild(aqih2);

    // temperature
    const temph3 = document.createElement("h3");
    temph3.className = "temp";
    temph3.innerHTML = `${temp}<i class="uil uil-celsius"></i>`;
    container.appendChild(temph3);

    // humidity
    const humidityp = document.createElement("p");
    humidityp.className = "humidity";
    humidityp.innerHTML = `<i class="uil uil-tear"></i>${humidity}`;
    container.appendChild(humidityp);

    // pressure
    const pressurep = document.createElement("p");
    pressurep.className = "pressure";
    pressurep.innerHTML = `<i class="uil uil-dashboard"></i>${pressure}`;
    container.appendChild(pressurep);

    // <i class="uil uil-trash-alt"></i>
    // delete
    const deleteIcon = document.createElement("span");
    deleteIcon.innerHTML = `<i class="uil uil-trash-alt" onclick="removeElement(${idCount})"></i>`;
    deleteIcon.classList.add("delete");
    container.appendChild(deleteIcon);

    body.appendChild(container);
}

//  delete the card
function removeElement(parentDiv) {
    console.log(parentDiv);
    if (document.getElementById(parentDiv)) {
        var parent = document.getElementById(parentDiv);
        var div = document.getElementById("weather-details");
        div.removeChild(parent);
    } else {
        alert("Child div has already been removed or does not exist.");
        return false;
    }
    console.log("remove btn clicked");
}
