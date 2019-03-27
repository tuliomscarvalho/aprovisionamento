import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.2.2:8080/TesteWebservice/onuconfig'
});

export default api;
