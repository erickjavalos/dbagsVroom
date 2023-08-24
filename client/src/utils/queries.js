import { gql } from '@apollo/client';

export const GET_AUTO_ASSETS = gql`
query GetAutoMetaData($assets: [String]) {
  getAutoMetaData(assets: $assets) {
    _id
    asset
    asset_name
    createdAt
    fingerprint
    initial_mint_tx_hash
    mint_or_burn_count
    onchain_metadata {
      Background
      Car
      ExhaustFumes
      image
      name
    }
    onchain_metadata_standard
    policy_id
    quantity
    updatedAt
  }
}
`;

export const GET_DBAG_ASSETS = gql`
query GetAllDbagAssets($assets: [String]) {
  getDbagMetaData(assets: $assets) {
    _id
    asset
    asset_name
    createdAt
    fingerprint
    mint_or_burn_count
    initial_mint_tx_hash
    onchain_metadata {
      mediaType
      image
      Special
      Mouth
      MouthItems
      HeadPhones
      HeadItems
      Eyes
      Clothes
      BodyType
      Background
      name
    }
    onchain_metadata_standard
    policy_id
    quantity
    updatedAt
  }
}`

export const GET_ASSETS = gql`
query GetAssetsInWallet($address: String) {
  getAssetsInWallet(address: $address) {
    whips
    dbags
  }
}`

export const GET_AVAILABLE_ASSETS = gql`
query Query($assets: [AutoInput]) {
  getAvailableWhips(assets: $assets)
}`
