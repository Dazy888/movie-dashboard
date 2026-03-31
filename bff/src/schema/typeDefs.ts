import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Media {
    id: ID!
    title: String!
    year: String
    rating: Float
    poster: String
    type: String!
  }

  type MediaPage {
    results: [Media!]!
    page: Int!
    total_pages: Int!
    total_results: Int!
  }

  type Query {
    search(query: String!, page: Int = 1): MediaPage!
  }
`;
