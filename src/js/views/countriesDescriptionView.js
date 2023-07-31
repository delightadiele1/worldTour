import { View } from "./view.js";

class countriesDescriptionView extends View {
  _parentElement = document.querySelector(".map");
  _errMsg =
    "Could not load country data... Please check your internet connection";

  _generateMarkup() {
    console.log(this._data);
    const result = this._data.result;
    const [cur] = Object.keys(result.currencies);
    const [lang] = Object.keys(result.languages);

    let population;
    if (result.population >= 1000000)
      population = +(result.population / 1000000).toFixed(1) + `M`;

    if (result.population >= 1000000000)
      population = +(result.population / 1000000000).toFixed(1) + `B`;

    if (result.population < 1000000)
      population = Math.floor(result.population / 1000) + `k+`;
    return `
      <div class="country__container p-5">
        <div class="w-50 h-100 bg-white rounded-3">
          <img class="rounded-top" src="${
            result.flags.png
          }" width="100%" height="180rem">
          <div class="description p-4 text-secondary">
            <h2 class="fw-bolder">${result.name.common}</h2>
            <h4 class="fw-bolder text-black-50">${result.region}</h4>
            <div class="mt-3 fs-6">
            <p class=""><span class="me-3 text-primary"><i class="fa-solid fa-city"></i></span>${
              result.capital[0]
            }</p>
            <p class=""><span class="me-3 text-danger">👫</span>${population} people</p>
            <p class=""><span class="me-3 text-warning">🗣️</span>${
              result.languages[lang]
            }</p>
            <p class=""><span class="me-3">💰</span>${
              result.currencies[cur].name
            }</p>
            </div>
          </div>
        </div>
      </div>
      
    `;
  }
}

export default new countriesDescriptionView();
