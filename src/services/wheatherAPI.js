import axios from 'axios'


export const wheatherApi = axios.create({
    baseURL: "https://api.weatherapi.com/v1",
    params: { key: "a13086e921ec4885a3d72648232403"}
  })