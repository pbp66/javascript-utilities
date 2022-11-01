const axios = require("axios");

class API {
    #defaultURL;

    constructor(baseURL) {
        this.url = new URL(baseURL);
        this.setDefaultURL(baseURL);
    }

    setDefaultURL(url) {
        this.#defaultURL = new URL(url);
    }

    getDefaultURL() {
        return this.#defaultURL;
    }

    resetURL() {
        this.url = this.#defaultURL;
    }

    async fetch() {
        return (await axios.get(this.url)).data;
    }

    setSearchParameters(parameterObject) {
        this.resetURL();
        let keys = Object.keys(parameterObject);
        for (const key of keys) {
            this.url.searchParams.append(key, parameterObject[key]);
        }
    }
}

module.exports = {API: API};