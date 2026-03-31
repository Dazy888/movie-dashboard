import { gql } from '@apollo/client';

export const SEARCH_QUERY = gql`
  query Search($query: String!, $page: Int!) {
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
