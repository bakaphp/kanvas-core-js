import { gql } from '@apollo/client/core';

export const INVITE_SPONSOR_MUTATION = gql`
 mutation(
    $email: String!
    $role_id: Int!
    $companies_branches_id: Int!
    $firstname: String
    $lastname : String
){
    inviteUser(input: {
        role_id: $role_id,
        email: $email,
        companies_branches_id:$companies_branches_id,
        firstname : $firstname,
        lastname: $lastname
    }){
        id
        email,
        invite_hash
    }
}
`;