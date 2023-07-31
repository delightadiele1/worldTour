import { View } from "./view";

class DataDescriptionView extends View {
  _parentElement = document.querySelector(".data__description");
  // _data;
  _errMsg =
    "Oops. Could not load data... check your internet connection and then reload page.";

  _generateMarkup() {
    const continents = this._data;
    return `
    <h2 class="pt-4 text-center">Continent</h2>
    <ol class="continent__list">
      ${continents
        .map(continent => {
          return `<li><a class="continent" href="#${continent.name}">${continent.name} (${continent.code})</a></li>`;
        })
        .join("")}   
    </ol>`;
  }

  addHandlerRender(handler) {
    window.addEventListener("load", handler);
  }
}

export default new DataDescriptionView();
