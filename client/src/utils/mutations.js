import { gql } from '@apollo/client';

export const MINT = gql`
mutation Mutation($dbagInput: DbagInput, $autoInput: AutoInput) {
  mint(dbagInput: $dbagInput, autoInput: $autoInput) {
    hashedMeta
    assetName
  }
}
`;

export const SUBMIT_MINT = gql`
mutation SubmitMint($transaction: String, $witnessSignature: String, $autoInput: AutoInput) {
  submitMint(transaction: $transaction, witnessSignature: $witnessSignature, autoInput: $autoInput)
}`;

export const LOGIN_USER = gql`
mutation Mutation($code: String) {
  login(code: $code) {
    token
  }
}`
export const SIGNIN_USER = gql`
mutation SignupMutation($DiscordID: String!, $password: String!, $email: String!) {
  signup(DiscordID: $DiscordID, password: $password, email: $email) {
    token
  }
}
`;

export const GET_ASSETS = gql`
mutation Mutation($address: String) {
  getAssetsInWallet(address: $address) {
    dbags
    whips
  }
}`

export const GET_AVAILABLE_ASSETS = gql`
mutation Mutation($assets: [AutoInput]) {
  getAvailableWhips(assets: $assets)
}`


