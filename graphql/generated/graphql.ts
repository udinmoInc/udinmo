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

export type RootQueryType = {
  __typename?: 'RootQueryType';
  workspaces?: Maybe<Array<Maybe<Workspace>>>;
};

export type Workspace = {
  __typename?: 'Workspace';
  bannerUrl?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['String']['output'];
  data?: Maybe<Scalars['String']['output']>;
  iconId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  inTrash?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  workspaceOwner: Scalars['String']['output'];
};
