import axios from 'axios';

let instance = axios.create({
    baseURL:"https://pokeapi.co/api/v2/",
    responseType: 'json',
    headers:{'X-Request-With': 'XMLHttpRequest'}
})

export default instance;