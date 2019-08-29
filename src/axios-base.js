import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dev.tabulation.ecdev.opensource.lk'
});

export default instance;
