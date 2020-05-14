class SearchForm {
  constructor(parent) {
    this.parent = parent;
  }

  fetchData = (url) => {
    return fetch(url).then((response) => response.json());
  };

  getCompanyProfile = async (searchValue, creationCallback) => {
    this.loaderOn();
    let url = `https://financialmodelingprep.com/api/v3/search?query=${searchValue}&limit=10&exchange=NASDAQ`;
    let fetchedData = await this.fetchData(url);

    let extendedCompanies = await Promise.all(
      fetchedData.map(async (company) => {
        let url = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}`;
        company.profile = (await this.fetchData(url)).profile;
        creationCallback(searchValue, company);
        return company;
      })
    );

    this.companies = extendedCompanies;
    console.log(extendedCompanies);
    this.loaderOff();
  };

  async onSearch(callback) {
    document.getElementById("button").addEventListener("click", async () => {
      const searchValue = document.getElementById("inputField").value;
      this.searchValue = searchValue;
      await this.getCompanyProfile(searchValue, callback);
    });
  }

  highlightSearch(string) {
    const regex = new RegExp(this.searchValue, "gi");
    return string.replace(regex, (match) => `<mark>${match}><mark>`);
  }

  loaderOn() {
    document.getElementById("loadRing").classList.add("visibility-vis");
  }

  loaderOff() {
    document.getElementById("loadRing").classList.add("visibility-hid");
  }
}
