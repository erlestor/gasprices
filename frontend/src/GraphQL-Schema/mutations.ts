import {gql} from '@apollo/client';

export const CREATE_POST = gql`
    mutation createPost($title: String!, $description: String!) {
        createPost(title: $title, description: $description) {
            id
            title
            description
        }
    }
`;