const { gql } = require('apollo-server-express');

const typeDefs = gql`
type DbagAsset {
  _id: ID!
  asset: String!
  policy_id: String!
  asset_name: String!
  fingerprint: String!
  quantity: String!
  initial_mint_tx_hash: String!
  mint_or_burn_count: String!
  onchain_metadata: DbagMetadata!
  onchain_metadata_standard: String!
  createdAt: String!
  updatedAt: String!
}

type AutoAsset {
  _id: ID!
  asset: String!
  policy_id: String!
  asset_name: String!
  fingerprint: String!
  quantity: String!
  initial_mint_tx_hash: String!
  mint_or_burn_count: String!
  onchain_metadata: AutoMetadata!
  onchain_metadata_standard: String!
  createdAt: String!
  updatedAt: String!
}

type AutoMetadata {
  name: String
  Car: String
  Background: String
  ExhaustFumes: String
  image: String
}
type DbagMetadata {
  Eyes: String
  name: String
  Mouth: String
  image: String
  Clothes: String
  Special: String
  BodyType: String
  HeadItems: String
  mediaType: String
  Background: String
  HeadPhones: String
  MouthItems: String
}

type SelectedMetaData {
  dbagAssets: [AutoAsset]
  autoAssets: [AutoAsset]
}

type Query {
  getSelectedMetaData(dbagAssets: [String], autoAssets: [String]): SelectedMetaData
  getAsset(id: ID!): AutoAsset
  getAllAutoAssets: [AutoAsset]
  getAllDbagAssets: [DbagAsset]
}

type Mutation {
  createAsset(assetInput: AssetInput): AutoAsset
  updateAsset(id: ID!, assetInput: AssetInput): AutoAsset
  deleteAsset(id: ID!): AutoAsset
}

input AssetInput {
  asset: String!
  policy_id: String!
  asset_name: String!
  fingerprint: String!
  quantity: String!
  initial_mint_tx_hash: String!
  mint_or_burn_count: String!
  onchain_metadata: OnchainMetadataInput!
  onchain_metadata_standard: String!
}

input OnchainMetadataInput {
  name: String
  Car: String
  Background: String
  ExhaustFumes: String
  image: String
}

scalar DateTime
`;

module.exports = typeDefs;

