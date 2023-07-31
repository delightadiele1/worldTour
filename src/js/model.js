import {
  API_URL_CONTINENT,
  API_ACCESS_KEYS,
  API_URL_COUNTRIES,
  RESULT_PER_PAGE
} from "./config.js";
import { getJSON } from "./helpers.js";

// State object
export const state = {
  continents: [],
  countries: {
    region: "",
    result: [],
    result_per_page: RESULT_PER_PAGE,
    page: 1,
    query: false
  },
  search: {
    result: [],
    region: "",
    query: true,
    queryStrig: "",
    numOfResult: 1,
    page: 1,
    result_per_page: RESULT_PER_PAGE
  },
  country: {
    result: {},
    border: [],
    borderResult: []
  }
};

// load continent function
export const loadContinent = async function() {
  try {
    const continentData = await getJSON(
      `${API_URL_CONTINENT}_Continent`,
      API_ACCESS_KEYS
    );

    const { results } = continentData;
    state.continents = [...results];
  } catch (err) {
    throw err;
  }
};

// Load countries function
export const loadCountries = async function(region) {
  try {
    const countries = await getJSON(`${API_URL_COUNTRIES}/region/${region}`);
    state.countries.region = region;
    state.countries.result = countries.map(country => {
      return {
        name: country.name.common,
        population: country.population,
        flag: country.flags.png,
        continent: country.continents[0]
      };
    });
  } catch (err) {
    throw err;
  }
};

export const loadSingleCountry = async function(countryName) {
  try {
    const country = await getJSON(`${API_URL_COUNTRIES}/name/${countryName}`);
    [state.country.result] = country;
    state.country.border = country[0].borders || [];
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const loadBorderCountries = async function() {
  try {
    state.country.borderResult = [];

    console.log(state.country.result);
    state.country.result.borders.map(async function(country) {
      const result = await getJSON(`${API_URL_COUNTRIES}/alpha/${country}`);

      console.log(result);

      state.country.borderResult.push(result[0]);
    });
  } catch (err) {
    throw err;
  }
};

export const getCountriesResultPage = function(page = state.countries.page) {
  try {
    const start = (page - 1) * state.countries.result_per_page;
    const end = page * state.countries.result_per_page;

    state.countries.page = page;
    // console.log(state.countries.page);
    return {
      result: state.countries.result.slice(start, end),
      region: state.countries.region,
      query: state.countries.query
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchCountries = async function(query) {
  try {
    // Load country
    const countries = await getJSON(`${API_URL_COUNTRIES}/name/${query}`);

    state.search.numOfResult = countries.length;
    state.search.result = countries.map(country => {
      return {
        name: country.name.common,
        population: country.population,
        flag: country.flags.png,
        continent: country.continents[0]
      };
    });
    // if (country.length > 1)
    //   throw new Error("there are more than one contries for your search");

    console.log(state.country);
  } catch (err) {
    throw err;
  }
};

export const getCountriesSearchPage = function(page = state.search.page) {
  const start = (page - 1) * state.search.result_per_page;
  const end = page * state.search.result_per_page;

  state.search.page = page;
  // console.log(state.countries.page);
  console.log(state.search.result.slice(start, end));
  return {
    result: state.search.result.slice(start, end),
    numOfResult: state.search.numOfResult,
    query: state.search.query
  };
};
