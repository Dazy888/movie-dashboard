import { ChangeEvent, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import {
    TextField,
    Box,
    Typography,
    InputAdornment,
    Alert,
    Pagination,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MovieCard, SkeletonCard } from '../components/MovieCard';
import { useDebouncedValue } from '../hooks/useDebouncedQuery';
import {addToWatchlist, getWatchlist} from '../utils/localStorage';
import type { Media, MediaPage } from '../graphql/generated.ts';
import { useSearchParams } from 'react-router-dom';
import {useQuery} from "@apollo/client/react";

export const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 3,
    mt: 4,
};

const SEARCH_QUERY = gql`
  query Search($query: String!, $page: Int = 1) {
    search(query: $query, page: $page) {
      results {
        id
        title
        year
        rating
        poster
        type
      }
      page
      total_pages
      total_results
    }
  }
`;

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('query') || '');
    const [page, setPage] = useState(Number(searchParams.get('page') || 1));
    const [watchlistIds, setWatchlistIds] = useState<Array<String>>([]);
    const debouncedQuery = useDebouncedValue(query, 300);

    const { data, loading, error } = useQuery<
        { search: MediaPage },
        { query: string; page: number }
    >(SEARCH_QUERY, {
        variables: { query: debouncedQuery, page },
        skip: !debouncedQuery,
    });

    useEffect(() => {
        const watchList = getWatchlist()
        setWatchlistIds(watchList.map(item => item.id));
    }, [data]);

    useEffect(() => {
        const params: Record<string, string> = {};
        if (debouncedQuery) params.query = debouncedQuery;
        if (page > 1) params.page = String(page);
        setSearchParams(params);
    }, [debouncedQuery, page, setSearchParams]);

    const handlePageChange = (_: any, value: number) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleInpChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
        setPage(1);
    };

    const onAdd = (movie: Media) => {
        addToWatchlist(movie)
        setWatchlistIds(prev => [...prev, movie.id]);
    }

    return (
        <Box>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search movies, TV shows..."
                value={query}
                onChange={handleInpChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'text.secondary' }} />
                        </InputAdornment>
                    ),
                    sx: {
                        backgroundColor: '#1e1e1e',
                        borderRadius: 2,
                        color: 'white',
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: '#333' },
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#90caf9' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#90caf9' },
                    },
                }}
                sx={{ mb: 3 }}
            />

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    Error: {error.message}
                </Alert>
            )}

            {!loading && data?.search.results.length === 0 && debouncedQuery && (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
                    No results found for "{debouncedQuery}"
                </Typography>
            )}

            <Box sx={gridStyle}>
                {loading && Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}

                {data?.search.results.map((movie: Media) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onAdd={() => onAdd(movie)}
                        isInWatchlist={watchlistIds.includes(movie.id)}
                    />
                ))}
            </Box>

            {data && data.search.total_pages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={data.search.total_pages}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        color="primary"
                    />
                </Box>
            )}
        </Box>
    );
};
