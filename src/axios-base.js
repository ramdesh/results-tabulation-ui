import axios from 'axios';

const instance = axios.create({
    // baseURL: 'https://api.tabulation.ecstag.opensource.lk'
    baseURL: 'https://dev.tabulation.ecdev.opensource.lk'
});

export default instance;
