export default class Paginator {
  constructor(container) {
    this._container = container;
    this._buttons = {};
    this._buttons.prev = this._container.querySelector("#prev");
    this._buttons.next = this._container.querySelector("#next");

    this._container.addEventListener("click", e => {
      const button = e.target.closest("button");

      if (!button) return;

      if (button.id === "prev") {
        this.prevPage();
      } else if (button.id === "next") {
        this.nextPage();
      }
    });
  }

  initData = (records, pageSize) => {
    this._currentPage = 0;
    this._records = records;
    this._pageSize = pageSize;
    this._maxPage = Math.ceil(this._records.length / this._pageSize);
  };

  getPagedRecords = () => {
    const currentPageRecords = this._records.slice(
      this.currentPage * this._pageSize,
      (this.currentPage + 1) * this._pageSize
    );

    return currentPageRecords;
  };

  _updateState = () => {
    if (!this._records) {
      this._buttons.prev.classList.add("hidden");
      this._buttons.next.classList.add("hidden");
      return;
    }

    if (this.currentPage === 0) {
      this._buttons.prev.classList.add("hidden");
      return;
    }

    if (this.currentPage === this._maxPage) {
      this._buttons.next.classList.add("hidden");
      return;
    }
  };
  // callback
  nextPage = () => {
    const cur = this.currentPage;
    this.currentPage += 1;

    if (cur === this.currentPage) return;
    // this.render();
    this._container.dispatchEvent(new CustomEvent("Paging"));
  };

  // callback
  prevPage = () => {
    const cur = this.currentPage;
    this.currentPage -= 1;

    if (cur === this.currentPage) return;
    // this.render();
    this._container.dispatchEvent(new CustomEvent("Paging"));
  };

  get currentPage() {
    return this._currentPage;
  }

  set currentPage(index) {
    if (index >= this._maxPage || index < 0) return;

    this._currentPage = index;
  }
}
