export let AUTH_APP_URL = "http://localhost:3001";
export let TABULATION_API_URL = 'https://apim-gateway.ecdev.opensource.lk/tabulation-localhost/1.0.0';

if (process.env.REACT_APP_AUTH_APP_URL) {
    AUTH_APP_URL = process.env.REACT_APP_AUTH_APP_URL;
}

if (process.env.REACT_APP_TABULATION_API_URL) {
    TABULATION_API_URL = process.env.REACT_APP_TABULATION_API_URL;
}
