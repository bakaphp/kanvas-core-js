import { gql } from '@apollo/client/core';

export const REGISTER_MUTATTION = gql`
  mutation register($data: RegisterInput!) {
    register(data: $data) {
      user {
        id
        displayname
        uuid
        welcome
      }
      token {
        token
        refresh_token
        token_expires
        refresh_token_expires
        time
        timezone
      }
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($data: ForgotPasswordInput!) {
    forgotPassword(data: $data)
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      uuid
      firstname
      lastname
      displayname
      default_company
      default_company_branch
      email
      branches {
        id
        name
        phone
      }
      welcome
      companies {
        id
        name
      }
      contact {
        phone_number
        cell_phone_number
      }
      roles
      abilities
      custom_fields(orderBy: [{ column: UPDATED_AT, order: DESC }]) {
        data {
          name
          value
        }
      }
      photo {
        url
      }
    }
  }
`;

export const UPDATE_USER_SOCIAL_MUTATION = gql`
  mutation updateUser($id: ID!, $data: UpdateUserInput!) {
    updateUser(id: $id, data: $data) {
      id
      uuid
      firstname
      lastname
      displayname
      description
      default_company
      default_company_branch
      social {
        total_message
        total_followers
        total_following
        is_following
        is_blocked
      }
      email
      branches {
        id
        name
        phone
      }
      welcome
      companies {
        id
        name
      }
      contact {
        phone_number
        cell_phone_number
      }
      roles
      abilities
      custom_fields(orderBy: [{ column: UPDATED_AT, order: DESC }]) {
        data {
          name
          value
        }
      }
      photo {
        url
      }
    }
  }
`;


export const UPDATE_DISPLAY_NAME_MUTATION = gql`
  mutation appUpdateUserDisplayname($user_id: ID!, $displayname: String!) {
    appUpdateUserDisplayname(user_id: $user_id, displayname: $displayname)
  }
`

export const INVITE_USER_MUTATION = gql`
  mutation ($input: InviteInput!) {
    inviteUser(input: $input) {
      id
      email
      invite_hash
      role_id
    }
  }
`;

export const GET_INVITE_MUTATION = gql`
  mutation ($hash: String!) {
    getInvite(hash: $hash) {
      email
      invite_hash
      firstname
      lastname
      role_id
    }
  }
`;

export const PROCESS_INVITE_MUTATION = gql`
  mutation processInvite($input: CompleteInviteInput!) {
    processInvite(input: $input) {
      id
      token
      refresh_token
      token_expires
      refresh_token_expires
      time
      timezone
    }
  }
`;

export const DELETE_INVITE_MUTATION = gql`
  mutation deleteInvite($id: Int!) {
    deleteInvite(id: $id)
  }
`;

export const SWITCH_COMPANY_BRANCH_MUTATION = gql`
  mutation switchCompanyBranch($company_branch_id: Int!) {
    switchCompanyBranch(company_branch_id: $company_branch_id)
  }
`;

export const SOCIAL_LOGIN_MUTATTION = gql`
  mutation socialLogin($data: SocialLoginInput!) {
    socialLogin(data: $data) {
      id
      token
      refresh_token
      token_expires
      refresh_token_expires
      time
      timezone
    }
  }
`;

export const REQUEST_DELETED_ACCOUNT_MUTATION = gql`
  mutation requestDeleteAccount {
    requestDeleteAccount
  }
`;

export const SHARE_USER_MUTATION = gql`
  mutation shareUser($id: ID!) {
    shareUser(id: $id)
  }
`;

export const BLOCK_USER_MUTATION = gql`
  mutation blockUser($id: ID!) {
    blockUser(id: $id)
  }
`;

export const UNBLOCK_USER_MUTATION = gql`
  mutation unBlockUser($id: ID!) {
    unBlockUser(id: $id)
  }
`;

export const UPDATE_EMAIL_MUTATION = gql`
  mutation updateEmail($email: String!) {
    updateEmail(email: $email)
  }
`;

export const LINK_DEVICE_MUTATION = gql`
  mutation linkDevice($data: DeviceInput!) {
    linkDevice(data: $data)
  }
`;

export const UNLINK_DEVICE_MUTATION = gql`
  mutation unLinkDevice($data: DeviceInput!) {
    unLinkDevice(data: $data)
  }
`;