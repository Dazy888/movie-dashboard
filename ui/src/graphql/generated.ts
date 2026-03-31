export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Media = {
  __typename: 'Media';
  id: Scalars['ID']['output'];
  poster: Maybe<Scalars['String']['output']>;
  rating: Maybe<Scalars['Float']['output']>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  year: Maybe<Scalars['String']['output']>;
};

export type MediaPage = {
  __typename: 'MediaPage';
  page: Scalars['Int']['output'];
  results: Array<Media>;
  total_pages: Scalars['Int']['output'];
  total_results: Scalars['Int']['output'];
};

export type Query = {
  __typename: 'Query';
  search: MediaPage;
};


export type QuerySearchArgs = {
  page?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type SearchQueryVariables = Exact<{
  query: Scalars['String']['input'];
  page: Scalars['Int']['input'];
}>;


export type SearchQuery = { search: { __typename: 'MediaPage', page: number, total_pages: number, total_results: number, results: Array<{ __typename: 'Media', id: string, title: string, year: string | null, rating: number | null, poster: string | null, type: string }> } };
