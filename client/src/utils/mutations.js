import { gql } from '@apollo/client';

export const MINT = gql`
mutation Mint($autoInput: AutoInput, $dbagInput: DbagInput) {
  mint(autoInput: $autoInput, dbagInput: $dbagInput) {
    hashedMeta
    metadata
  }
}`;
