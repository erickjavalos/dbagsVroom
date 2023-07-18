const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Asset {
  _id: ID!
  asset: String!
  policy_id: String!
  asset_name: String!
  fingerprint: String!
  quantity: String!
  initial_mint_tx_hash: String!
  mint_or_burn_count: String!
  onchain_metadata: OnchainMetadata!
  onchain_metadata_standard: String!
  createdAt: String!
  updatedAt: String!
}

type OnchainMetadata {
  name: String
  Car: String
  Background: String
  ExhaustFumes: String
  image: String
}

type SelectedMetaData {
  dbagAssets: [Asset]
  autoAssets: [Asset]
}

type Query {
  getSelectedMetaData(dbagAssets: [String], autoAssets: [String]): SelectedMetaData
  getAsset(id: ID!): Asset
  getAllAssets: [Asset]
}

type Mutation {
  createAsset(assetInput: AssetInput): Asset
  updateAsset(id: ID!, assetInput: AssetInput): Asset
  deleteAsset(id: ID!): Asset
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

