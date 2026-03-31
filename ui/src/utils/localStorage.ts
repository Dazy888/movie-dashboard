import type {Media} from '../graphql/generated.ts';

const WATCHLIST_KEY = 'watchlist';

export const getWatchlist = (): Media[] => {
    const raw = localStorage.getItem(WATCHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
};

export const addToWatchlist = (movie: Media) => {
    const current = getWatchlist();
    if (!current.find((m) => m.id === movie.id)) {
        localStorage.setItem(WATCHLIST_KEY, JSON.stringify([...current, movie]));
    }
};

export const removeFromWatchlist = (id: string) => {
    const current = getWatchlist();
    localStorage.setItem(
        WATCHLIST_KEY,
        JSON.stringify(current.filter((m) => m.id !== id))
    );
};
