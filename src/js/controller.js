import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model.js";
import dataDescriptionView from "./views/dataDescriptionView.js";
import resultView from "./views/resultiew.js";
import paginationView from "./views/paginationView.js";
import searchView from "./views/searchView.js";
import countriesDescriptionView from "./views/countriesDescriptionView.js";
import borderContriesView from "./views/borderContriesView.js";

console.log('Welcome to git')
/**
 *control the continent fetch data
 @returns {undefined}
 */
//
const controlContinent = async function() {
  try {
    // Render the loading spinner
    dataDescriptionView.renderSpinner();
    // Await fetch data from model
    await model.loadContinent();
    // Render the fetch data to DOM
    dataDescriptionView.render(model.state.continents);
  } catch (err) {
    // Render error message to DOM
    dataDescriptionView.renderError();
  }
};

/**
 *control the list of countries in a continent
 @returns {undefined}
 */
//
const controlCountries = async function() {
  try {
    // Get region ie continent from url
    let region = window.location.hash.slice(1);
    // Check if region exit
    if (!region) return;

    // Check urlHash i.e region for '%20' and replace with " ";
    if (region.includes("%20")) region = region.replace("%20", " ");

    // Region array
    const regionArr = [
      "Asia",
      "Africa",
      "South America",
      "North America",
      "Europe",
      "Oceania",
      "Antarctica"
    ];
    // this checks if urlHash i.e region is contained in regionArr
    if (!regionArr.includes(region)) return;
    // Render loading spinner for the results of countries
    resultView.renderSpinner();
    // Checks if region is Antarctica, generate error message if yes
    if (region === "Antarctica") {
      // Clear pagination view if region is antarctica
      paginationView.clear();
      // Throw new error
      throw new Error(resultView.renderAntarcticaError());
    }
    // Await the data coming from the  model.loadCountries
    await model.loadCountries(region);
    // Render result view with accurate pagination
    resultView.render(model.getCountriesResultPage(1));
    // Render pagination view
    paginationView.render(model.state.countries);
  } catch (error) {
    // Render any error emanated in the process
    resultView.renderError(error.message);
  }
};

/**
 * Controls the pagination
 * @param {number} goto The number to determine pagination
 * @param {string} query If query string is true then get search result
 * @returns {undefined}
 */
const controlPagiation = function(goto, query) {
  // Check if query is false
  if (query === "false") {
    // Render result
    resultView.render(model.getCountriesResultPage(goto));
    // Render pagination
    paginationView.render(model.state.countries);
  }
  // Check if query is true
  if (query === "true") {
    // Render result from search
    searchView.render(model.getCountriesSearchPage(goto));
    // Render pagination
    paginationView.render(model.state.search);
  }
};

/**
 * This controls and renders the search result data to the DOM
 * @returns {undefined}
 */
const controlSearchCountries = async function() {
  try {
    // Get the search string
    const query = searchView.getQuery();
    // return if search box is empty
    if (!query) return;
    // Render loading spinner
    searchView.renderSpinner();
    // Await the data coming from the search result API
    await model.loadSearchCountries(query);
    // If the search result is one, render the country data and description
    // If the search result is more than one, render a list of countries
    if (model.state.search.result.length === 1) {
      // Render loading spinner
      countriesDescriptionView.renderSpinner();
      // Await data for the single country result
      await model.loadSingleCountry(query);
      // Set url hash to reflect the search result
      window.location.hash = `#${model.state.country.result.name.common}=${model.state.country.result.continents}`;
    } else {
      // Render the data of search result to DOM
      searchView.render(model.getCountriesSearchPage(1));
      // Render pagination for the search result
      paginationView.render(model.state.search);
    }
  } catch (err) {
    // Render error if any occurs
    searchView.renderError();
  }
};

/**
 * Controls the contries data and description
 * @returns {undefined}
 */
const controlCountriesData = async function() {
  try {
    // Get url hash
    let urlHash = window.location.hash.slice(1);
    // Check if there is URL hash
    if (!urlHash) return;

    const regionArr = [
      "Asia",
      "Africa",
      "South%20America",
      "North%20America",
      "Europe",
      "Oceania",
      "Antarctica"
    ];
    // If URL hash is any of the string in regionArr, return
    if (regionArr.includes(urlHash)) return;
    // Replace all %20 symbol with spaces
    if (urlHash.includes("%20")) urlHash = urlHash.replaceAll("%20", " ");
    // Get country name from the URL hash
    const country = urlHash.slice(0, urlHash.indexOf("="));
    // Get continent name from the URL hash
    const region = urlHash.slice(urlHash.indexOf("=") + 1);
    // Render loading spinner
    countriesDescriptionView.renderSpinner();
    // Await data for the single country result
    await model.loadSingleCountry(country);
    // Render the country data and description to DOM
    countriesDescriptionView.render(model.state.country);
    // Await the countries result for each continent/region
    await model.loadCountries(region);
    // getting exact page of the country
    // len: no. of countries in result
    const len = model.state.countries.result.length;
    // noPage: no. of pages for the result
    const noPage = Math.ceil(len / 10);

    let arr = [];
    let newArr = [];
    for (let i = 1, j = 0, k = 10; i <= noPage; i++, j += 10, k += 10) {
      model.state.countries.result.forEach((el, ni) => {
        if (ni < j || ni >= k) return;
        arr.push(el);
      });
      newArr.push(arr);
      arr = [];
    }
    // Getting page no for the country
    const pageNo =
      newArr.findIndex(el =>
        el.some(
          el => el.name.toLocaleLowerCase() === country.toLocaleLowerCase()
        )
      ) + 1;

    // Render result view
    resultView.render(model.getCountriesResultPage(pageNo));
    // Render pagination
    paginationView.render(model.state.countries);
    // Get country border data
    controlBorderCountriesData();
  } catch (err) {
    // Render error if any occured while fetching country data
    controlCountriesData.renderError();
  }
};
/**
 * controls the border countries of each country
 * @returns {undefined}
 */
const controlBorderCountriesData = async function() {
  try {
    // Await the list of result border countries
    await model.loadBorderCountries();
    // Render only after 1s whereby the data has arrived
    setTimeout(async () => {
      // render contries border
      borderContriesView.render(model.state.country.borderResult);
    }, 1000);
  } catch (err) {
    // Render error if country has no neighbouring country
    borderContriesView.renderError();
  }
};

const init = function() {
  dataDescriptionView.addHandlerRender(controlContinent);
  resultView.addHandlerRender(controlCountries);
  paginationView.addHandlerRender(controlPagiation);
  searchView.addHandlerSearch(controlSearchCountries);
  resultView.addHandlerMoreContent();
  countriesDescriptionView.addHandlerRender(controlCountriesData);
};

init();
