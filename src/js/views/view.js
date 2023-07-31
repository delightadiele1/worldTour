export class View {
  _data;

  render(data) {
    // Check if there is returned data
    if (!data || (Array.isArray(data) && data.length === 0))
      return renderError();
    this._data = data;
    // Generate markup
    const markup = this._generateMarkup();

    // clear parent element
    this._clear();
    //insert into parent element
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `<div id="loading">
    <div id="circle">
      <div id="square"></div>
    </div>
    loading...
  </div>`;
    // clear parent element
    this._clear();
    //insert into parent element
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(errMsg = this._errMsg) {
    const markup = `<div class="error text-danger pb-5">
    <i class="fa-solid fa-triangle-exclamation"></i>.. ${errMsg}   
    </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach(event => {
      window.addEventListener(event, handler);
    });
  }
}
