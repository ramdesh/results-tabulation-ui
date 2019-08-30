import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.tabulation.ecstag.opensource.lk'
});

export default instance;
