import { gql } from "@apollo/client";

export const DATA = gql`
  query GetProjects {
    projects {
      id
      name
      description
      stack
      repository
    }
    user {
      name
      email
    }
  }
`;
