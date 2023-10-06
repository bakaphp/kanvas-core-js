import { gql } from '@apollo/client/core';

export const CREATE_MESSAGE_MUTATION = gql`
        mutation createMessage($input: MessageInput!) {
            createMessage(input: $input) {
                id
                uuid
                message
                user {
                    id
                    firstname
                    lastname
                    displayname
                }
                appModuleMessage {
                    entity_id
                    system_modules
                }
            }
        }
    `;