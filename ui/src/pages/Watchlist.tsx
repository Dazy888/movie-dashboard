import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { MovieCard } from '../components/MovieCard';
import { getWatchlist, removeFromWatchlist } from '../utils/localStorage';
import type { Media } from '../graphql/generated.ts';
import { gridStyle } from './Search';

export const Watchlist = () => {
    const [watchlist, setWatchlist] = useState<Media[]>([]);

    useEffect(() => {
        setWatchlist(getWatchlist());
    }, []);

    const handleRemove = (id: string) => {
        removeFromWatchlist(id);
        setWatchlist(getWatchlist());
    };

    if (!watchlist.length) {
        return (
            <Box sx={{ mt: 10, textAlign: 'center' }}>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                    Your watchlist is empty
                </Typography>
                <Typography variant="body1" color="text.disabled">
                    Go to the search tab and add some movies!
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={gridStyle}>
            {watchlist.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onRemove={handleRemove}
                />
            ))}
        </Box>
    );
};
