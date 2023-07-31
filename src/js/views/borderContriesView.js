import { View } from "./view";

class BorderCountriesView extends View {
  _parentElement = document.querySelector(".data__description");
  _errMsg = "Does not have a neighbouring country";

  _generateMarkup() {
    console.log(this._data);
    return `
    <div>
      <h1 class="text-center text-primary p-4">Neighbouring Countries</h1>  
    </div>
    <div class="d-flex m-4 borders__container">
      ${this._data
        .map(borders => {
          return `
          <div class="p-2 w-25"><a href="#${borders.name.common}=${borders.continents}" class="text-secondary text-decoration-none"><img class="w-100 h-50" src='${borders.flags.png}'>
          <p class="fw-bold">${borders.name.common}</p></a>
            
          </div>`;
        })
        .join("")}; 
    </div>`;
  }
}

export default new BorderCountriesView();
