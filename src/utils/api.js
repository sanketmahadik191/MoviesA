import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// Set up default headers for all requests using Axios interceptors
axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${TMDB_TOKEN}`;
    return config;
});

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(`${BASE_URL}${url}`, { params });
        return data;
    } catch (error) {
        // Throw the error for the caller to handle or log it
        throw error;
    }
};
