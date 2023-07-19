import { gql } from '@apollo/client';

export const MINT = gql`
mutation Mutation($dbagInput: DbagInput, $autoInput: AutoInput) {
  mint(dbagInput: $dbagInput, autoInput: $autoInput) {
    hashedMeta
    metadata
  }
}`;
