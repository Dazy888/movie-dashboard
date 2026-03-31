import { searchMulti } from '@/services/tmdb.js';

export const resolvers = {
    Query: {
        search: async (_: any, { query, page }: { query: string, page: number }) => {
            if (!query) return { results: [], page: 1, total_pages: 1, total_results: 0 };

            const data = await searchMulti(query, page);

            const results = data.results
                .filter((item: any) => item.media_type === 'movie' || item.media_type === 'tv')
                .map((item: any) => ({
                    id: item.id,
                    title: item.title || item.name,
                    year: (item.release_date || item.first_air_date || '').slice(0, 4),
                    rating: item.vote_average,
                    poster: item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : null,
                    type: item.media_type,
                }));

            return {
                results,
                page: data.page,
                total_pages: data.total_pages,
                total_results: data.total_results,
            };
        },
    },
};
