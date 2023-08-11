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

type HashMetadata {
  hashedMeta: String
  metadata: String
}

type SelectedMetaData {
  dbagAssets: [DbagAsset]
  autoAssets: [AutoAsset]
}

type Query {
  getDbagMetaData(assets: [String]): [DbagAsset]
  getAutoMetaData(assets: [String]): [AutoAsset]
}

type Auth {
  token: ID!
}

type Mutation {
  createAsset(assetInput: AssetInput): AutoAsset
  login(code: String): Auth
  mint(dbagInput: DbagInput, autoInput: AutoInput, address: String): HashMetadata
  submitMint(transaction: String, witnessSignature: String, metadata: String): String
  updateAsset(id: ID!, assetInput: AssetInput): AutoAsset
  deleteAsset(id: ID!): AutoAsset
}

input DbagInput {
  _id: ID!
  asset: String!
  policy_id: String!
  asset_name: String!
  fingerprint: String!
  quantity: String!
  initial_mint_tx_hash: String!
  mint_or_burn_count: String!
  onchain_metadata: DbagMetadataInput!
  onchain_metadata_standard: String!
  createdAt: String!
  updatedAt: String!
}

input DbagMetadataInput {
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

input AutoInput {
  _id: ID!
  asset: String!
  policy_id: String!
  asset_name: String!
  fingerprint: String!
  quantity: String!
  initial_mint_tx_hash: String!
  mint_or_burn_count: String!
  onchain_metadata: AutoMetadataInput!
  onchain_metadata_standard: String!
  createdAt: String!
  updatedAt: String!
}

input AutoMetadataInput {
  name: String
  Car: String
  Background: String
  ExhaustFumes: String
  image: String
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

