export let AUTH_APP_URL = "http://localhost:3001";

if (process.env.REACT_APP_AUTH_APP_URL) {
    AUTH_APP_URL = process.env.REACT_APP_AUTH_APP_URL;
}
