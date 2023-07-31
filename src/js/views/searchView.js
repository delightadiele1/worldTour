import { View } from "./view.js";

class SearchView extends View {
  _search = document.querySelector(".search__form");
  _parentElement = document.querySelector(".result__sheet");
  _errMsg = "No related search result found.. Try again";

  _generateMarkup() {
    return `<div class="title">
    <em class="text-left py-3 text-warning">${
      this._data.numOfResult
    } countries found</em>
  </div>
  ${this._data.result
    .map(country => {
      let population;
      if (country.population >= 1000000)
        population = +(country.population / 1000000).toFixed(1) + `M`;

      if (country.population >= 1000000000)
        population = +(country.population / 1000000000).toFixed(1) + `B`;

      if (country.population < 1000000)
        population = Math.floor(country.population / 1000) + `k+`;

      return `<a href="#${country.name}=${
        country.continent
      }"><div class="d-flex py-3 result-item-container">
    <div class="p-2 ms-3 result__item"><i class="fa-solid fa-file-signature"></i> ${
      country.name.length > 6 ? country.name.slice(0, 6) + `...` : country.name
    }</div>
    <div class="p-2 ms-3 result__item"><i class="fa-solid fa-people-group"></i> ${population}</div>
    <div class="p-2 ms-3 text-center result__item"><img width="20px" height="20px" src="${
      country.flag
    }"></div>
  </div></a>`;
    })
    .join("")}
  `;
  }

  getQuery() {
    const query = this._search.querySelector(".search__input").value;

    // Clear input
    this._clearInput();

    // Return query
    return query;
  }

  _clearInput() {
    this._search.querySelector(".search__input").value = "";
  }

  addHandlerSearch(handler) {
    this._search.addEventListener("submit", function(e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
