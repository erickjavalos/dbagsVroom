import { gql } from '@apollo/client';

export const MINT = gql`
mutation Mint($autoInput: AutoInput, $dbagInput: DbagInput, $address: String) {
  mint(autoInput: $autoInput, dbagInput: $dbagInput, address: $address) {
    hashedMeta
    metadata
  }
}
`;

export const SUBMIT_MINT = gql`
mutation Mutation($transaction: String, $witnessSignature: String) {
  submitMint(transaction: $transaction, witnessSignature: $witnessSignature)
}`;

export const LOGIN_USER = gql`
mutation Mutation($code: String) {
  login(code: $code) {
    token
  }
}`