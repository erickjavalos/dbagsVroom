import { gql } from '@apollo/client';

export const GET_AUTO_ASSETS = gql`
query GetAutoMetaData {
    getAutoMetaData {
      _id
      asset
      asset_name
      createdAt
      onchain_metadata {
        Background
        Car
        ExhaustFumes
        image
        name
      }
      fingerprint
      initial_mint_tx_hash
      mint_or_burn_count
      onchain_metadata_standard
      policy_id
      quantity
      updatedAt
    }
  }
`;
