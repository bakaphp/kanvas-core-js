import { gql } from '@apollo/client/core';

export const INVITE_SPONSOR_MUTATION = gql`
 mutation( $input: InviteInput!){
    inviteUser(input: $input){
        id
        email,
        invite_hash
    }
}
`;