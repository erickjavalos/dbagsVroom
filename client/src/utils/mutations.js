import { gql } from '@apollo/client';

export const MINT = gql`
mutation Mint($autoInput: AutoInput, $dbagInput: DbagInput) {
  mint(autoInput: $autoInput, dbagInput: $dbagInput) {
    hashedMeta
    metadata
  }
}
`;

export const SUBMIT_MINT = gql`
mutation Mutation($transaction: String, $witnessSignature: String) {
  submitMint(transaction: $transaction, witnessSignature: $witnessSignature)
}`;
