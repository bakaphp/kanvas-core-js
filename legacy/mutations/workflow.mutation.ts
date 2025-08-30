import { gql } from "@apollo/client/core";

export const RUN_WORKFLOW_FROM_ENTITY = gql`
    mutation runWorkflowEntityInput($input: runWorkflowEntityInput!) {
        runWorkflowFromEntity(input: $input)
    }
`;
