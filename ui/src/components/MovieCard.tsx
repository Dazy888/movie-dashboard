import React from 'react';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Chip,
    Box,
    Skeleton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import type { Media } from '../graphql/generated.ts';

type Props = {
    movie: Media;
    onAdd?: (movie: Media) => void;
    onRemove?: (id: string) => void;
    isInWatchlist?: boolean;
};

export const MovieCard: React.FC<Props> = ({ movie, onAdd, onRemove, isInWatchlist }) => (
    <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: '0.3s',
        position: 'relative', // Важливо для абсолютного позиціонування бейджа
        // Додаємо рамку, якщо фільм у списку:
        border: isInWatchlist ? '2px solid' : '2px solid transparent',
        borderColor: isInWatchlist ? 'primary.main' : 'transparent',
        '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 }
    }}>

        {/* Візуальний бейдж поверх постера */}
        {isInWatchlist && (
            <Chip
                icon={<BookmarkIcon fontSize="small" />}
                label="In Watchlist"
                color="primary"
                size="small"
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1,
                    boxShadow: 2,
                    backdropFilter: 'blur(4px)'
                }}
            />
        )}

        <CardMedia
            component="img"
            height="350"
            image={movie.poster || 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={movie.title}
            sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', lineHeight: 1.2, mb: 2 }}>
                {movie.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label={movie.year || 'N/A'} size="small" variant="outlined" />
                <Chip label={`⭐ ${movie.rating || 'N/A'}`} size="small" color="primary" variant="outlined" />
                <Chip label={movie.type} size="small" />
            </Box>
        </CardContent>
        <CardActions sx={{ p: 2, pt: 0 }}>
            {onAdd && !isInWatchlist && (
                <Button size="small" variant="contained" startIcon={<AddIcon />} onClick={() => onAdd(movie)} fullWidth>
                    Watchlist
                </Button>
            )}
            {onAdd && isInWatchlist && (
                <Button size="small" variant="outlined" color="success" startIcon={<CheckIcon />} disabled fullWidth>
                    Added
                </Button>
            )}
            {onRemove && (
                <Button size="small" variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={() => onRemove(movie.id)} fullWidth>
                    Remove
                </Button>
            )}
        </CardActions>
    </Card>
);

export const SkeletonCard = () => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Skeleton variant="rectangular" height={350} />
        <CardContent sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 1 }} />
            <Skeleton variant="text" sx={{ fontSize: '1.5rem', width: '60%', mb: 2 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rounded" width={50} height={24} />
                <Skeleton variant="rounded" width={60} height={24} />
            </Box>
        </CardContent>
        <CardActions sx={{ p: 2 }}>
            <Skeleton variant="rounded" width="100%" height={30} />
        </CardActions>
    </Card>
);
