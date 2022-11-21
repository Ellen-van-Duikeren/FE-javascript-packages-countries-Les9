import axios from "axios";

console.log("Script is running");

// 1. Data Fetchen
// Create reference
const list = document.getElementById("list-of-users");

// Verwijzing naar error message
const errorMessage = document.getElementById("error-message");

// Asynchrone functie (normale syntax):
async function fetchData(name) {
    let uri = "https://restcountries.com/v2/all";
    if (name) {
        uri = "https://restcountries.com/v2/name/" + name;
    } else {
        uri = "https://restcountries.com/v2/all";
    }

    try {
        errorMessage.textContent = "";
        const response = await axios.get(uri);

        // Leeg de lijst bij aanvang
        list.replaceChildren();

        // sorteren op populatie grootte van groot naar klein want dat vind ik leuker dan andersom zoals gevraagd
        response.data.sort((a, b) => b.population - a.population);

        // Map door de data heen
        // feedback: hier zou je nog dit kunnen doen: response.data.map(({ flags: { png }, name, currencies, population, capital }) => { zodat je overal country weg kan halen
        response.data.map((country) => {

            //flag
            const flag = document.createElement("img");
            flag.setAttribute("src", country.flags.png);
            flag.setAttribute("class", "flag");
            list.append(flag);

            //name
            const countryName = document.createElement("li");
            countryName.setAttribute("class", "countryname");
            switch (country.region) {
                case "Africa":
                    countryName.setAttribute("id", "africa");
                    break;
                case "Americas":
                    countryName.setAttribute("id", "americas");
                    break;
                case "Asia":
                    countryName.setAttribute("id", "asia");
                    break;
                case "Europe":
                    countryName.setAttribute("id", "europe");
                    break;
                case "Oceania":
                    countryName.setAttribute("id", "oceania");
                    break;
                default:
                    ;
            }
            countryName.textContent = country.name;
            // Voeg alle items toe aan list
            list.appendChild(countryName);

            //population
            const population = document.createElement("li");
            population.setAttribute("class", "population");
            population.textContent = `${country.name} is situated in ${country.region}. It has a population of ${country.population.toLocaleString("nl")} people.`;
            list.appendChild(population);

            //capital
            const capital = document.createElement("li");
            capital.setAttribute("class", "capital");
            let currenciesCountry = "";
            for (let i = 0; i < country.currencies.length; i++) {
                if (country.currencies.length == 1 || i == country.currencies.length - 2) {
                    currenciesCountry += country.currencies[i].name;
                } else if (i < (country.currencies.length - 1)) {
                    currenciesCountry += country.currencies[i].name + ", ";
                } else {
                    currenciesCountry += " and " + country.currencies[i].name;
                }
            };
            capital.textContent = `The capital is ${country.capital} and you can pay with ${currenciesCountry}.`;
            list.appendChild(capital);

            //language
            const language = document.createElement("li");
            language.setAttribute("class", "language");
            let languages = "";
            for (let i = 0; i < country.languages.length; i++) {
                if (country.languages.length == 1 || i == country.languages.length - 2) {
                    languages += country.languages[i].name;
                } else if (i < (country.languages.length - 1)) {
                    languages += country.languages[i].name + ", ";
                } else {
                    languages += " and " + country.languages[i].name;
                }
            };
            language.textContent = `They speak ${languages}.`;
            list.appendChild(language);
        });
    } catch
        (err) {
        console.error(err);
        if (err.response.status === 404) {
            list.replaceChildren();
            errorMessage.textContent = "Page Not Found | 404";
        }
        if (err.response.status === 500) {
            list.replaceChildren();
            errorMessage.textContent = "Internal Server Error | 500";
        }
    }
}

// 2. Event Listeners
//button get all countries
const btn = document.getElementById("button");
// Implement event listener
btn.addEventListener("click", () => {
    // Voeg de input value toe als argument (daarom ook een callback)
    fetchData();
});

//button search
const btnSearch = document.getElementById("search");
btnSearch.addEventListener("click", () => {
    fetchData(countryId.value.toLowerCase());
    countryId.value = "";
});

//input value
const countryId = document.getElementById("country-name");
countryId.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        fetchData(countryId.value.toLowerCase());
        countryId.value = "";
    }
})
;

