import axios from 'axios';

/* По хорошему винести в енви */
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

export const searchMulti = async (query: string, page = 1) => {
    const res = await axios.get(`${BASE_URL}/search/multi`, {
        params: {
            api_key: API_KEY,
            query,
            page,
        },
    });

    return res.data; // тепер повертаємо весь об’єкт з results, total_pages, total_results
};
