import { View } from "./view.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.result.length / this._data.result_per_page
    );
    const queryString = this._data.query;

    // Page 1 and there are other pages
    if (curPage === 1 && numPage > 1) {
      return `
      <button class="btn page-btn" type="button" data-goto="${curPage +
        1}" data-query="${queryString}">
        page ${curPage + 1} <i class="fa-solid fa-arrow-right"></i>
      </button>`;
    }

    // Last page
    if (curPage === numPage && numPage > 1) {
      return `
      <button class="btn page-btn" type="button" data-goto="${curPage -
        1}" data-query="${queryString}">
        page ${curPage - 1} <i class="fa-solid fa-arrow-left"></i>
      </button>`;
    }

    // Other pages
    if (curPage < numPage) {
      return `<button class="btn page-btn" type="button"     data-goto="${curPage -
        1}" data-query="${queryString}">
        <i class="fa-solid fa-arrow-left"></i> page ${curPage - 1} 
      </button>
      <button class="btn page-btn" type="button" data-goto="${curPage +
        1}" data-query="${queryString}">
        page ${curPage + 1} <i class="fa-solid fa-arrow-right"></i>
      </button>
      `;
    }

    // Only page 1
    return "";
  }

  clear() {
    this._clear();
  }

  addHandlerRender(handler) {
    this._parentElement.addEventListener("click", function(e) {
      const btn = e.target.closest(".page-btn");
      if (!btn) return;
      const goto = +btn.dataset.goto;
      const query = btn.dataset.query;

      handler(goto, query);
    });
  }
}

export default new PaginationView();
