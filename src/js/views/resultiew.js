import { data } from "browserslist";
import { View } from "./view";

class ResultView extends View {
  _parentElement = document.querySelector(".result__sheet");
  _errMsg = "No related search result found.. Try again";

  _generateMarkup() {
    return `<div class="title">
    <h2 class="text-center py-3">${this._data.region}</h2>
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

  renderAntarcticaError() {
    return `There are no Countries in Antartica <p class="text-secondary m-5 antarctica">Antarctica is the fifth-largest continent, being about 40% larger than <em class="text-primary">Europe</em>, and has an area of<span class="contd">...</span><span class="more-text hide-content"> 14,200,000 km<sup>2</sup> (5,500,000 sq mi).<br>Most of Antarctica is covered by the <em class="text-primary">Antarctic ice sheet</em>, with an average thickness of 1.9 km (1.2 mi)</span><div class="cont-btn m-4 me-5"><button class='btn btn-primary see-more'>see more &darr;</button></div></p>`;
  }

  addHandlerMoreContent() {
    this._parentElement.addEventListener("click", function(e) {
      const btn = e.target.closest(".see-more");

      if (!btn) return;
      const contd = document.querySelector(".contd");
      const moreText = document.querySelector(".more-text");
      contd.classList.toggle("hide-content");
      moreText.classList.toggle("hide-content");

      moreText.classList.contains("hide-content")
        ? (btn.innerHTML = "see more &darr;")
        : (btn.innerHTML = "see less &uarr;");
    });
  }
}

export default new ResultView();
